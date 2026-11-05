// =============================================
// CLASSES TAILWIND
// Todas as classes do visual ficam aqui, agrupadas
// por componente. Para mudar cores, espaçamentos ou
// tamanhos, edite somente este arquivo.
// =============================================

const CLASSES = {

    // ---------------------------------------------
    // FILTRO DE ANOS (botões da barra rosa)
    // ---------------------------------------------
    filtroAno: {
        ativo:
            "bg-white text-rose-800 px-3 py-1.5 rounded-md text-xs font-bold whitespace-nowrap shrink-0",
        inativo:
            "bg-rose-700 hover:bg-rose-600 text-white px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap shrink-0 transition"
    },

    // ---------------------------------------------
    // FILTRO DE UNIDADES (1N / RO)
    // ---------------------------------------------
    filtroUnidade: {
        ativo:
            "bg-white text-rose-800 px-2 py-1 text-xs font-bold rounded transition",
        inativo:
            "text-white hover:bg-rose-800 px-2 py-1 text-xs font-semibold rounded transition"
    },

    // ---------------------------------------------
    // MENSAGEM DE LISTA VAZIA
    // ---------------------------------------------
    semResultado:
        "bg-white border border-gray-200 rounded-xl p-6 text-center text-gray-600",

    // ---------------------------------------------
    // CARD DE CADA ANO
    // ---------------------------------------------
    cardAno: {
        card: "bg-white rounded-xl shadow-sm border border-gray-200 p-5",
        cabecalho: "flex items-center justify-between mb-4",
        titulo: "text-lg font-bold text-gray-800",
        contador: "text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full",
        lista: "space-y-3"
    },

    // ---------------------------------------------
    // CARTÃO DO ALUNO
    // ---------------------------------------------
    aluno: {

        // Cabeçalho (nome + ícone +/−)
        cartao: "border border-gray-200 rounded-lg overflow-hidden",
        botao: "w-full flex justify-between items-center p-4 text-left hover:bg-gray-50 transition",
        nome: "font-semibold text-gray-800",
        icone: "text-gray-500 text-xl",

        // Área que abre e fecha
        detalhes: "hidden border-t border-gray-200 p-4 bg-gray-50",
        conteudo: "space-y-4",
        grade: "grid grid-cols-1 sm:grid-cols-2 gap-3",

        // Textos de informação
        rotulo: "text-xs text-gray-500 uppercase font-semibold",
        valor: "text-gray-800",

        // Campos editáveis (convidados, foto lembrança, observações)
        rotuloCampo: "block text-xs text-gray-500 uppercase font-semibold mb-1",
        input: "w-full border border-gray-300 rounded-lg p-2 bg-white text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500",
        textareaCampo: "w-full border border-gray-300 rounded-lg p-3 text-sm bg-white text-gray-800 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500",

        // Selects de atendimento e pagamento
        selectBloco: "block",
        select: "mt-1 w-full border border-gray-300 rounded-lg p-2 bg-white",

        // Telefones
        telefonesTitulo: "text-xs text-gray-500 uppercase font-semibold mb-2",
        telefonesLista: "space-y-2",
        telefoneOpcao: "flex items-center gap-3 bg-white border border-gray-200 rounded-lg p-3 cursor-pointer hover:border-blue-400",
        telefoneRadio: "w-4 h-4 accent-blue-600",
        telefoneTexto: "text-sm text-gray-700",
        telefoneVazio: "text-sm text-gray-500",

        // Mensagem do WhatsApp
        mensagemRotulo: "flex items-center gap-2 text-sm text-gray-700 mb-3",
        mensagemCheckbox: "w-4 h-4 accent-blue-600",
        mensagemTexto: "w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500",

        // Botões de ação
        acoes: "flex flex-col sm:flex-row gap-2",
        botaoWhatsApp: "flex-1 text-center bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition",
        botaoTelefone: "flex-1 border border-gray-300 hover:bg-gray-100 text-gray-700 font-semibold py-3 rounded-lg transition",

        // Aviso de salvamento
        status: "text-xs text-gray-500"
    }

};
