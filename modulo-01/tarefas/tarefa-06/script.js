const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const emptyMessage = document.getElementById("empty-message");

const btnTodas = document.getElementById("btn-todas");
const btnPendentes = document.getElementById("btn-pendentes");

let listaDeTarefas = [];

let filtroAtual = "todas";


function adicionarTarefa(nome) {

    const nomeTratado = nome.trim();

    if (!nomeTratado) {
        return;
    }

    const novaTarefa = {
        id: Date.now(),
        nome: nomeTratado,
        dataCriacao: new Date().toLocaleDateString("pt-BR"),
        concluida: false
    };

    listaDeTarefas.push(novaTarefa);

    renderizarTarefas();

    taskInput.value = "";
    taskInput.focus();
}


function marcarComoConcluida(id) {

    const tarefa = listaDeTarefas.find(
        tarefa => tarefa.id === id
    );

    if (!tarefa) {
        return;
    }

    tarefa.concluida = true;

    renderizarTarefas();
}


function listarPendentes() {

    return listaDeTarefas.filter(
        tarefa => !tarefa.concluida
    );
}


function obterTarefasExibidas() {

    if (filtroAtual === "pendentes") {
        return listarPendentes();
    }

    return listaDeTarefas;
}


function criarElementoTarefa(tarefa) {

    const li = document.createElement("li");

    li.classList.add("task-item");

    if (tarefa.concluida) {
        li.classList.add("completed");
    }


    const taskInfo = document.createElement("div");

    taskInfo.classList.add("task-info");


    const taskName = document.createElement("span");

    taskName.classList.add("task-name");
    taskName.textContent = tarefa.nome;


    const taskDate = document.createElement("span");

    taskDate.classList.add("task-date");
    taskDate.textContent = `Criada em: ${tarefa.dataCriacao}`;


    taskInfo.append(
        taskName,
        taskDate
    );


    li.appendChild(taskInfo);


    if (tarefa.concluida) {

        const status = document.createElement("span");

        status.classList.add("status-completed");
        status.textContent = "✓ Finalizada";

        li.appendChild(status);

    } else {

        const button = document.createElement("button");

        button.classList.add(
            "btn",
            "btn-complete"
        );

        button.textContent = "Concluir";

        button.addEventListener(
            "click",
            () => marcarComoConcluida(tarefa.id)
        );

        li.appendChild(button);
    }


    return li;
}


function renderizarTarefas() {

    taskList.innerHTML = "";


    const tarefas = obterTarefasExibidas();


    emptyMessage.style.display =
        tarefas.length === 0
            ? "block"
            : "none";


    tarefas.forEach(tarefa => {

        const elemento =
            criarElementoTarefa(tarefa);

        taskList.appendChild(elemento);

    });
}


function atualizarFiltro(botaoAtivo) {

    document
        .querySelectorAll(".btn-filter")
        .forEach(botao => {
            botao.classList.remove("active");
        });

    botaoAtivo.classList.add("active");
}


taskForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();

        adicionarTarefa(taskInput.value);

    }
);


btnTodas.addEventListener(
    "click",
    () => {

        filtroAtual = "todas";

        atualizarFiltro(btnTodas);

        renderizarTarefas();

    }
);


btnPendentes.addEventListener(
    "click",
    () => {

        filtroAtual = "pendentes";

        atualizarFiltro(btnPendentes);

        renderizarTarefas();

    }
);


renderizarTarefas();
