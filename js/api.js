// =============================================
// COMUNICAÇÃO COM O APPS SCRIPT (planilha)
// =============================================

// ---------------------------------------------
// CONVERTER UM ALUNO VINDO DA PLANILHA
// ---------------------------------------------

function mapearAluno(aluno) {

    const telefone1 = aluno.telefone1 ?? "";
    const telefone2 = aluno.telefone2 ?? "";
    const telefone3 = aluno.telefone3 ?? "";

    return {

        id: String(aluno.id ?? ""),
        nome: aluno.nome ?? "",

        telefone1,
        telefone2,
        telefone3,

        telefones: Array.isArray(aluno.telefones)
            ? aluno.telefones.filter(Boolean)
            : [telefone1, telefone2, telefone3].filter(Boolean),

        responsavel: aluno.responsavel ?? "",

        // RECEBE O CAMPO TURMA DA PLANILHA
        turma: String(aluno.turma ?? "").trim(),

        unidade: aluno.unidade ?? "",

        atendimento: aluno.atendimento || "tratamento",
        pagamento: aluno.pagamento || "pendente",

        convidados: aluno.convidados ?? "",
        fotoLembranca: aluno.fotoLembranca ?? "",
        observacao: aluno.observacao ?? ""

    };
}

// ---------------------------------------------
// CARREGAR ALUNOS
// ---------------------------------------------

async function carregarAlunos() {

    estadoConexao.textContent = "Carregando alunos da planilha...";
    container.innerHTML = "";

    try {

        // "no-store" + parâmetro com a hora: garante dados novos da planilha,
        // nunca uma resposta antiga guardada pelo navegador.
        const response = await fetch(
            `${API_URL}?acao=listar&_=${Date.now()}`,
            { cache: "no-store" }
        );

        if (!response.ok) {
            throw new Error("Falha na resposta do servidor");
        }

        const resposta = await response.json();

        if (
            !resposta ||
            resposta.sucesso !== true ||
            !Array.isArray(resposta.alunos)
        ) {
            throw new Error(
                resposta?.mensagem ||
                resposta?.erro ||
                "A API retornou uma resposta inválida."
            );
        }

        alunos = resposta.alunos.map(mapearAluno);

        // Diagnóstico: o Apps Script informa quais colunas não achou na planilha
        const naoEncontradas = resposta.colunasNaoEncontradas || [];

        console.log("Cabeçalhos da planilha:", resposta.cabecalhos);

        if (naoEncontradas.length > 0) {
            console.warn("Colunas não encontradas na planilha:", naoEncontradas);
        }

        console.log("Turmas recebidas da planilha:");
        console.table(alunos.map(aluno => ({
            id: aluno.id,
            nome: aluno.nome,
            turma: aluno.turma,
            anoIdentificado: obterAno(aluno.turma),
            unidade: aluno.unidade,
            convidados: aluno.convidados,
            fotoLembranca: aluno.fotoLembranca,
            observacao: aluno.observacao
        })));

        // O salvamento localiza a linha pelo ID: IDs repetidos gravam na linha errada
        const idsRepetidos = alunos
            .map(aluno => aluno.id)
            .filter((id, posicao, lista) => lista.indexOf(id) !== posicao);

        if (idsRepetidos.length > 0) {
            console.warn("IDs repetidos na planilha:", [...new Set(idsRepetidos)]);
        }

        atualizarFiltros();
        renderizarLista();

        estadoConexao.textContent =
            `${alunos.length} aluno(s) carregado(s) da planilha.` +
            (naoEncontradas.length > 0
                ? ` Atenção: coluna(s) não encontrada(s): ${naoEncontradas.join(", ")}.`
                : "");

    } catch (erro) {

        console.error(erro);

        estadoConexao.textContent =
            erro.message || "Erro ao acessar o Apps Script.";

    }
}

// ---------------------------------------------
// SALVAR CAMPO NA PLANILHA
// (atendimento, pagamento, convidados,
// foto lembrança e observações)
// ---------------------------------------------

async function salvarCampo(index, campo, valor) {

    const aluno = alunos[index];

    const aviso =
        document.getElementById(`status-salvamento-${index}`);

    if (!aluno || !(campo in CAMPOS_SALVAVEIS)) {
        return;
    }

    const permitidos = CAMPOS_SALVAVEIS[campo];

    if (permitidos && !permitidos.includes(valor)) {
        return;
    }

    aviso.textContent = "Enviando alteração...";

    try {

        // Sem "no-cors": assim a resposta do Apps Script pode ser lida
        // e o site mostra se a planilha realmente aceitou a alteração.
        const response = await fetch(API_URL, {

            method: "POST",

            headers: {
                "Content-Type": "text/plain;charset=utf-8"
            },

            body: JSON.stringify({
                acao: "atualizarStatus",
                id: aluno.id,
                campo,
                valor
            })

        });

        const resposta = await response.json();

        console.log("Resposta do Apps Script ao salvar:", resposta);

        if (!resposta || resposta.sucesso !== true) {
            throw new Error(
                resposta?.mensagem || "A planilha recusou a alteração."
            );
        }

        // Guarda o novo valor na memória, para não perder ao trocar de filtro
        aluno[campo] = valor;

        aviso.textContent = "Salvo na planilha.";

    } catch (erro) {

        console.error("Erro ao salvar:", erro);

        aviso.textContent =
            `Não foi salvo: ${erro.message}`;

    }
}
