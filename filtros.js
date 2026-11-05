// =============================================
// FILTROS (ano e unidade)
// =============================================

// ---------------------------------------------
// DESENHAR OS BOTÕES DOS FILTROS
// ---------------------------------------------

function atualizarFiltros() {

    filtroAnos.innerHTML = "";

    ORDEM_ANOS.forEach(ano => {

        const botao = document.createElement("button");

        botao.type = "button";
        botao.textContent = nomeAno(ano);

        const ativo = anoSelecionado === ano;

        botao.className = ativo
            ? CLASSES.filtroAno.ativo
            : CLASSES.filtroAno.inativo;

        botao.setAttribute("aria-pressed", String(ativo));

        botao.addEventListener("click", () => {

            anoSelecionado = ano;

            atualizarFiltros();
            renderizarLista();

        });

        filtroAnos.appendChild(botao);

    });

    filtroUnidades.querySelectorAll("[data-unidade]").forEach(botao => {

        const ativo = botao.dataset.unidade === unidadeSelecionada;

        botao.className = ativo
            ? CLASSES.filtroUnidade.ativo
            : CLASSES.filtroUnidade.inativo;

        botao.setAttribute("aria-pressed", String(ativo));

    });

}

// ---------------------------------------------
// SELECIONAR UNIDADE
// ---------------------------------------------

filtroUnidades.addEventListener("click", evento => {

    const botao = evento.target.closest("[data-unidade]");

    if (!botao) return;

    unidadeSelecionada = botao.dataset.unidade;

    atualizarFiltros();
    renderizarLista();

});
