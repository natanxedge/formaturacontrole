// =============================================
// PONTO DE ENTRADA
// Liga os botões e carrega a lista ao abrir a página.
// =============================================

// ---------------------------------------------
// BOTÃO ATUALIZAR
// ---------------------------------------------

document.getElementById("atualizar-lista")
    .addEventListener("click", carregarAlunos);

// ---------------------------------------------
// INICIALIZAÇÃO
// ---------------------------------------------

carregarAlunos();
