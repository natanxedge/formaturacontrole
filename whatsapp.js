// =============================================
// WHATSAPP
// =============================================

// ---------------------------------------------
// ATUALIZAR LINK WHATSAPP
// "raiz" é onde procurar os elementos: o documento
// inteiro (padrão) ou um cartão que ainda não foi
// inserido na página.
// ---------------------------------------------

function atualizarMensagem(index, raiz = document) {

    const telefone = raiz.querySelector(
        `input[name="telefone-${index}"]:checked`
    );

    const link = raiz.querySelector(`#whatsapp-${index}`);

    if (!telefone || !link) {

        if (link) link.href = "#";

        return;
    }

    const usarMensagem =
        raiz.querySelector(`#usar-mensagem-${index}`).checked;

    const mensagem =
        raiz.querySelector(`#mensagem-${index}`).value;

    link.href = gerarLink(
        telefone.value,
        usarMensagem ? mensagem : ""
    );

}

// Atalho usado ao montar um cartão novo
function atualizarMensagemNoCartao(cartao, index) {
    atualizarMensagem(index, cartao);
}

// ---------------------------------------------
// ABRIR WHATSAPP
// ---------------------------------------------

function abrirWhatsApp(index, comMensagem) {

    const telefone = document.querySelector(
        `input[name="telefone-${index}"]:checked`
    );

    if (!telefone) {
        alert("Este aluno não possui telefone cadastrado.");
        return;
    }

    const mensagem = comMensagem
        ? document.getElementById(`mensagem-${index}`).value
        : "";

    window.open(
        gerarLink(telefone.value, mensagem),
        "_blank",
        "noopener"
    );

}
