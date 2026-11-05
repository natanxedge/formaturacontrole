// =============================================
// CONFIGURAÇÕES
// Valores fixos do sistema. Para trocar a API ou
// a mensagem padrão, edite somente este arquivo.
// =============================================

const API_URL = "https://script.google.com/macros/s/AKfycbynHPP03YCpveD0LD2R02ViTvAQP-a2rDD1GtrhI7UlLIMXBpcmGu2MBQXD5L77t_BH/exec";

const mensagemPadrao =
    "Olá! Estamos entrando em contato sobre a formatura escolar. Tudo bem?";

// Ordem em que os botões de ano aparecem no filtro
const ORDEM_ANOS = [
    "Pré-2",
    "1",
    "5",
    "9",
    "3"
];

// Campos que podem ser gravados na planilha.
// Lista = só aceita esses valores; null = texto livre.
const CAMPOS_SALVAVEIS = {
    atendimento: ["tratamento", "resolvido"],
    pagamento: ["pendente", "pago"],
    convidados: null,
    fotoLembranca: null,
    observacao: null
};
