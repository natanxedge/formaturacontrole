// =============================================
// ESTADO DA APLICAÇÃO E ELEMENTOS DA PÁGINA
// =============================================

let alunos = [];
let alunoAberto = null;

let anoSelecionado = "Pré-2";
let unidadeSelecionada = "1N";

const container = document.getElementById("lista-formandos");
const estadoConexao = document.getElementById("estado-conexao");
const filtroAnos = document.getElementById("filtro-anos");
const filtroUnidades = document.getElementById("filtro-unidades");
