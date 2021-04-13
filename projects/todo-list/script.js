const textoTarefa = document.querySelector('#texto-tarefa');
const criarTarefa = document.querySelector('#criar-tarefa');
const listaTarefas = document.querySelector('#lista-tarefas');
const tarefas = listaTarefas.children;

function addTarefaClick() {
  const tarefa = document.createElement('li');

  tarefa.innerText = textoTarefa.value;
  tarefa.className = 'tarefa';
  listaTarefas.appendChild(tarefa);

  textoTarefa.value = '';
  textoTarefa.focus();
}

function addTarefaKeypress(event) {
  if (event.keyCode === 13) {
    const tarefa = document.createElement('li');

    tarefa.innerText = textoTarefa.value;
    tarefa.className = 'tarefa';
    listaTarefas.appendChild(tarefa);

    textoTarefa.value = '';
  }
}

criarTarefa.addEventListener('click', addTarefaClick);
textoTarefa.addEventListener('keypress', addTarefaKeypress);

function removerSelecao() {
  for (let index = 0; index < tarefas.length; index += 1) {
    tarefas[index].classList.remove('selected');
  }
}

function selecionarTarefa(event) {
  const element = event.target;

  if (element.className.includes('tarefa')) {
    removerSelecao();
    element.classList.add('selected');
  }
}

function completarTarefa(event) {
  const element = event.target;

  element.classList.toggle('completed');
}

listaTarefas.addEventListener('click', selecionarTarefa);
listaTarefas.addEventListener('dblclick', completarTarefa);

const apagaTudo = document.querySelector('#apaga-tudo');

function apagarTudo() {
  for (let index = (tarefas.length - 1); index >= 0; index -= 1) {
    listaTarefas.removeChild(tarefas[index]);
  }
}

apagaTudo.addEventListener('click', apagarTudo);

const removeFinalizados = document.querySelector('#remover-finalizados');

function removerFinalizados() {
  for (let index = (tarefas.length - 1); index >= 0; index -= 1) {
    if (tarefas[index].className.includes('completed')) {
      listaTarefas.removeChild(tarefas[index]);
    }
  }
}

removeFinalizados.addEventListener('click', removerFinalizados);

const salvaTarefas = document.querySelector('#salvar-tarefas');

function salvarTarefas() {
  const listaSalva = listaTarefas.innerHTML;
  localStorage.setItem('listaSalva', listaSalva);
}

function carregarLista() {
  const listaSalva = localStorage.getItem('listaSalva');

  if (listaSalva) {
    listaTarefas.innerHTML = listaSalva;
    removerSelecao();
  }
}

salvaTarefas.addEventListener('click', salvarTarefas);

carregarLista();

const moveParaBaixo = document.querySelector('#mover-baixo');
const moveParaCima = document.querySelector('#mover-cima');

function moverParaBaixo() {
  const tarefaSelecionada = document.querySelector('.selected');

  if (tarefaSelecionada) {
    const proximoElemento = tarefaSelecionada.nextElementSibling;

    if (proximoElemento !== null) {
      proximoElemento.insertAdjacentElement('afterend', tarefaSelecionada);
    }
  }
}

function moverParaCima() {
  const tarefaSelecionada = document.querySelector('.selected');

  if (tarefaSelecionada) {
    const elementoAnterior = tarefaSelecionada.previousElementSibling;

    if (elementoAnterior !== null) {
      listaTarefas.insertBefore(tarefaSelecionada, elementoAnterior);
    }
  }
}

moveParaBaixo.addEventListener('click', moverParaBaixo);
moveParaCima.addEventListener('click', moverParaCima);

const removeSelecionado = document.querySelector('#remover-selecionado');

function removerSelecionado() {
  const tarefaSelecionada = document.querySelector('.selected');

  if (tarefaSelecionada) {
    listaTarefas.removeChild(tarefaSelecionada);
  }
}

removeSelecionado.addEventListener('click', removerSelecionado);
