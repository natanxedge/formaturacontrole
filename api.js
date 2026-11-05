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

        const response = await fetch(`${API_URL}?acao=listar`);

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

        console.log("Turmas recebidas da planilha:");
        console.table(alunos.map(aluno => ({
            nome: aluno.nome,
            turma: aluno.turma,
            anoIdentificado: obterAno(aluno.turma),
            unidade: aluno.unidade
        })));

        atualizarFiltros();
        renderizarLista();

        estadoConexao.textContent =
            `${alunos.length} aluno(s) carregado(s) da planilha.`;

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

        await fetch(API_URL, {

            method: "POST",

            mode: "no-cors",

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

        // Guarda o novo valor na memória, para não perder ao trocar de filtro
        aluno[campo] = valor;

        aviso.textContent =
            "Solicitação enviada. Atualize a lista para conferir se a planilha recebeu a alteração.";

    } catch (erro) {

        aviso.textContent =
            "Não foi possível enviar. Verifique sua conexão.";

    }
}
