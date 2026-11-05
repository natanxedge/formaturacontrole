// =============================================
// TEMPLATES HTML
// Cada função devolve um pedaço de HTML. As classes
// Tailwind vêm de classes.js (objeto CLASSES).
// =============================================

// ---------------------------------------------
// LISTA VAZIA
// ---------------------------------------------

function templateSemResultado() {

    return `
        <div class="${CLASSES.semResultado}">
            Nenhum formando encontrado para os filtros selecionados.
        </div>
    `;
}

// ---------------------------------------------
// CARD DO ANO (título + contador + lista vazia)
// ---------------------------------------------

function templateCardAno(ano, total) {

    const C = CLASSES.cardAno;

    return `

        <div class="${C.cabecalho}">

            <h2 class="${C.titulo}">
                ${escaparHTML(nomeAno(ano))}
            </h2>

            <span class="${C.contador}">
                ${total} aluno(s)
            </span>

        </div>

        <div class="${C.lista}" data-lista-ano></div>

    `;
}

// ---------------------------------------------
// OPÇÃO DE TELEFONE (radio)
// ---------------------------------------------

function templateOpcaoTelefone(telefone, posicao, index) {

    const C = CLASSES.aluno;
    const numero = normalizarTelefone(telefone);

    return `

        <input type="radio"
            name="telefone-${index}"
            value="${escaparHTML(telefone)}"
            ${posicao === 0 ? "checked" : ""}
            onchange="atualizarMensagem(${index})"
            class="${C.telefoneRadio}">

        <span class="${C.telefoneTexto}">
            +${escaparHTML(numero)}
        </span>

    `;
}

function templateSemTelefone() {

    return `<p class="${CLASSES.aluno.telefoneVazio}">Nenhum telefone cadastrado.</p>`;
}

// ---------------------------------------------
// CARTÃO DO ALUNO
// ---------------------------------------------

function templateCartaoAluno(aluno) {

    const C = CLASSES.aluno;
    const i = aluno.index;

    return `

        <button type="button"
            onclick="alternarAluno(${i})"
            class="${C.botao}">

            <span class="${C.nome}">
                ${escaparHTML(aluno.nome)}
            </span>

            <span id="icone-${i}"
                class="${C.icone}">+</span>

        </button>

        <div id="detalhes-${i}"
            class="${C.detalhes}">

            <div class="${C.conteudo}">

                <div class="${C.grade}">

                    <div>
                        <p class="${C.rotulo}">
                            Responsável
                        </p>
                        <p class="${C.valor}">
                            ${escaparHTML(aluno.responsavel || "Não informado")}
                        </p>
                    </div>

                    <div>
                        <p class="${C.rotulo}">
                            Turma
                        </p>
                        <p class="${C.valor}">
                            ${escaparHTML(aluno.turma || "Não informada")}
                        </p>
                    </div>

                    <div>
                        <p class="${C.rotulo}">
                            Unidade
                        </p>
                        <p class="${C.valor}">
                            ${escaparHTML(aluno.unidade || "Não informada")}
                        </p>
                    </div>

                    <div>
                        <p class="${C.rotulo}">
                            ID
                        </p>
                        <p class="${C.valor}">
                            ${escaparHTML(aluno.id)}
                        </p>
                    </div>

                </div>

                <div class="${C.grade}">

                    <div>
                        <label for="convidados-${i}"
                            class="${C.rotuloCampo}">
                            Convidados
                        </label>

                        <input type="text"
                            id="convidados-${i}"
                            value="${escaparHTML(aluno.convidados)}"
                            onchange="salvarCampo(${i}, 'convidados', this.value)"
                            class="${C.input}">
                    </div>

                    <div>
                        <label for="foto-${i}"
                            class="${C.rotuloCampo}">
                            Foto lembrança
                        </label>

                        <input type="text"
                            id="foto-${i}"
                            value="${escaparHTML(aluno.fotoLembranca)}"
                            onchange="salvarCampo(${i}, 'fotoLembranca', this.value)"
                            class="${C.input}">
                    </div>

                </div>

                <div>
                    <label for="observacao-${i}"
                        class="${C.rotuloCampo}">
                        Observações
                    </label>

                    <textarea id="observacao-${i}"
                        rows="3"
                        onchange="salvarCampo(${i}, 'observacao', this.value)"
                        class="${C.textareaCampo}">${escaparHTML(aluno.observacao)}</textarea>
                </div>

                <div class="${C.grade}">

                    <label class="${C.selectBloco}">
                        <span class="${C.rotulo}">
                            Atendimento
                        </span>

                        <select id="atendimento-${i}"
                            onchange="salvarCampo(${i}, 'atendimento', this.value)"
                            class="${C.select}">

                            <option value="tratamento" ${aluno.atendimento === "tratamento" ? "selected" : ""}>
                                Em tratamento
                            </option>

                            <option value="resolvido" ${aluno.atendimento === "resolvido" ? "selected" : ""}>
                                Resolvido
                            </option>

                        </select>
                    </label>

                    <label class="${C.selectBloco}">
                        <span class="${C.rotulo}">
                            Pagamento
                        </span>

                        <select id="pagamento-${i}"
                            onchange="salvarCampo(${i}, 'pagamento', this.value)"
                            class="${C.select}">

                            <option value="pendente" ${aluno.pagamento === "pendente" ? "selected" : ""}>
                                Pendente
                            </option>

                            <option value="pago" ${aluno.pagamento === "pago" ? "selected" : ""}>
                                Pago
                            </option>

                        </select>
                    </label>

                </div>

                <div>
                    <p class="${C.telefonesTitulo}">
                        Telefone para contato
                    </p>

                    <div class="${C.telefonesLista}" id="telefones-${i}"></div>
                </div>

                <div>

                    <label class="${C.mensagemRotulo}">
                        <input type="checkbox"
                            id="usar-mensagem-${i}"
                            checked
                            onchange="atualizarMensagem(${i})"
                            class="${C.mensagemCheckbox}">

                        Utilizar mensagem com texto
                    </label>

                    <textarea id="mensagem-${i}"
                        rows="3"
                        oninput="atualizarMensagem(${i})"
                        class="${C.mensagemTexto}">${escaparHTML(mensagemPadrao)}</textarea>

                </div>

                <div class="${C.acoes}">

                    <a id="whatsapp-${i}"
                        href="#"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="${C.botaoWhatsApp}">
                        Abrir WhatsApp
                    </a>

                    <button type="button"
                        onclick="abrirWhatsApp(${i}, false)"
                        class="${C.botaoTelefone}">
                        Somente telefone
                    </button>

                </div>

                <p id="status-salvamento-${i}"
                    class="${C.status}"
                    aria-live="polite"></p>

            </div>

        </div>

    `;
}
