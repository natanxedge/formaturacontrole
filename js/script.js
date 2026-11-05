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

// Se esta linha aparecer no Console (F12), a versão nova está carregada
console.log("Versão com campos editáveis (Convidados, Foto lembrança, Observações)");

carregarAlunos();
