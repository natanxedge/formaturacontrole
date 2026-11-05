// =============================================
// FUNÇÕES AUXILIARES (não mexem na tela)
// =============================================

// ---------------------------------------------
// ESCAPAR HTML
// ---------------------------------------------

function escaparHTML(valor) {
    return String(valor ?? "").replace(/[&<>"']/g, caractere => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[caractere]);
}

// ---------------------------------------------
// NORMALIZAR TEXTO
// ---------------------------------------------

function normalizarTexto(valor) {
    return String(valor ?? "")
        .normalize("NFD")
        .replace(/[̀-ͯ]/g, "")
        .trim()
        .toLowerCase()
        .replace(/\s+/g, " ");
}

// ---------------------------------------------
// IDENTIFICAR ANO DA TURMA
// Usa apenas o primeiro número do campo turma:
// 2 = Pré-2, e 1, 3, 5, 9 = anos correspondentes
// ---------------------------------------------

function obterAno(turma) {

    const numero = String(turma ?? "").match(/\d+/)?.[0];

    return numero === "2" ? "Pré-2" : (numero || "");
}

// ---------------------------------------------
// NOME DO ANO
// ---------------------------------------------

function nomeAno(ano) {

    if (ano === "Pré-2") return "Pré-2";

    return `${ano}º Ano`;
}

// ---------------------------------------------
// UNIDADE
// ---------------------------------------------

function obterUnidade(unidade) {

    const valor = normalizarTexto(unidade).toUpperCase();

    if (
        valor === "1N" ||
        valor.includes("UNAMAR") ||
        /(^|\W)1N($|\W)/.test(valor)
    ) {
        return "1N";
    }

    if (
        valor === "RO" ||
        valor.includes("RIO DAS OSTRAS") ||
        /(^|\W)RO($|\W)/.test(valor)
    ) {
        return "RO";
    }

    return "outra";
}

// ---------------------------------------------
// TELEFONES
// ---------------------------------------------

function normalizarTelefone(telefone) {

    let numero = String(telefone ?? "").replace(/\D/g, "");

    if (numero && !numero.startsWith("55")) {
        numero = "55" + numero;
    }

    return numero;
}

function gerarLink(telefone, mensagem = "") {

    const numero = normalizarTelefone(telefone);

    if (!numero) return "#";

    if (!mensagem) {
        return `https://wa.me/${numero}`;
    }

    const texto = encodeURIComponent(mensagem).replace(/%20/g, "+");

    return `https://wa.me/${numero}?text=${texto}`;
}
