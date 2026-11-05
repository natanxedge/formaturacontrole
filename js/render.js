// =============================================
// DESENHAR A LISTA NA TELA
// =============================================

// ---------------------------------------------
// RENDERIZAR LISTA
// ---------------------------------------------

function renderizarLista() {

    container.innerHTML = "";
    alunoAberto = null;

    const alunosFiltrados = alunos
        .map((aluno, index) => ({ ...aluno, index }))
        .filter(aluno => {

            // COMPARAÇÃO DIRETA DO CAMPO TURMA
            const ano = obterAno(aluno.turma);
            const unidade = obterUnidade(aluno.unidade);

            return (
                ano === anoSelecionado &&
                unidade === unidadeSelecionada
            );

        });

    if (alunosFiltrados.length === 0) {

        container.innerHTML = templateSemResultado();

        return;
    }

    // Agrupar por ano
    const anos = {};

    alunosFiltrados.forEach(aluno => {

        const ano = obterAno(aluno.turma);

        if (!anos[ano]) {
            anos[ano] = [];
        }

        anos[ano].push(aluno);

    });

    Object.keys(anos).forEach(ano => {

        const cardAno = document.createElement("section");

        cardAno.className = CLASSES.cardAno.card;
        cardAno.innerHTML = templateCardAno(ano, anos[ano].length);

        container.appendChild(cardAno);

        const lista = cardAno.querySelector("[data-lista-ano]");

        anos[ano].forEach(aluno => {
            lista.appendChild(criarCartaoAluno(aluno));
        });

    });

}

// ---------------------------------------------
// CRIAR O CARTÃO DE UM ALUNO
// ---------------------------------------------

function criarCartaoAluno(aluno) {

    const cartao = document.createElement("article");

    cartao.className = CLASSES.aluno.cartao;
    cartao.innerHTML = templateCartaoAluno(aluno);

    // Telefones (opções de rádio)
    const listaTelefones =
        cartao.querySelector(`#telefones-${aluno.index}`);

    aluno.telefones.forEach((telefone, posicao) => {

        const opcao = document.createElement("label");

        opcao.className = CLASSES.aluno.telefoneOpcao;
        opcao.innerHTML =
            templateOpcaoTelefone(telefone, posicao, aluno.index);

        listaTelefones.appendChild(opcao);

    });

    if (aluno.telefones.length === 0) {
        listaTelefones.innerHTML = templateSemTelefone();
    }

    // O link do WhatsApp só existe depois que o cartão está no DOM,
    // por isso a atualização acontece em seguida (ver abaixo).
    // Como o cartão ainda não foi inserido, buscamos dentro dele.
    atualizarMensagemNoCartao(cartao, aluno.index);

    return cartao;
}

// ---------------------------------------------
// ABRIR E FECHAR DETALHES
// ---------------------------------------------

function alternarAluno(index) {

    if (alunoAberto !== null) {

        document.getElementById(`detalhes-${alunoAberto}`)
            ?.classList.add("hidden");

        const iconeAnterior =
            document.getElementById(`icone-${alunoAberto}`);

        if (iconeAnterior) {
            iconeAnterior.textContent = "+";
        }

    }

    if (alunoAberto === index) {

        alunoAberto = null;

    } else {

        alunoAberto = index;

        document.getElementById(`detalhes-${index}`)
            ?.classList.remove("hidden");

        document.getElementById(`icone-${index}`).textContent = "−";

    }

}
