const colorPalette = document.querySelector('#color-palette');
const paletteColors = colorPalette.children;

function createRandomColor() {
  const r = Math.round(Math.random() * 255);
  const g = Math.round(Math.random() * 255);
  const b = Math.round(Math.random() * 255);

  return `rgb(${r}, ${g}, ${b})`;
}

function createColors(paletteSize) {
  const colors = ['black'];

  for (let index = 1; index < paletteSize; index += 1) {
    const randomColor = createRandomColor();
    colors.push(randomColor);
  }

  return colors;
}

function createColorPalette(paletteSize) {
  const colors = createColors(paletteSize);

  for (let index = 0; index < paletteSize; index += 1) {
    const color = document.createElement('li');

    color.className = 'color';
    color.innerHTML = colors[index];
    color.style.backgroundColor = colors[index];
    color.style.color = colors[index];
    color.style.fontSize = '0px';

    colorPalette.appendChild(color);
  }
}

createColorPalette(4);

const pixelBoard = document.querySelector('#pixel-board');
const boardSizeInput = document.querySelector('#board-size');
const generateBoardButton = document.querySelector('#generate-board');

function fillPixelBoard(boardSize) {
  for (let rowIndex = 0; rowIndex < boardSize; rowIndex += 1) {
    const row = document.createElement('div');
    row.className = 'row';
    pixelBoard.appendChild(row);

    for (let pixelIndex = 0; pixelIndex < boardSize; pixelIndex += 1) {
      const pixel = document.createElement('div');
      pixel.className = 'pixel';
      pixel.style.backgroundColor = 'white';
      row.appendChild(pixel);
    }
  }
}

fillPixelBoard(5);

function generateBoard() {
  const boardSize = boardSizeInput.value;

  for (let index = pixelBoard.children.length - 1; index >= 0; index -= 1) {
    pixelBoard.children[index].remove();
  }

  if (boardSize < 5) {
    alert('Board inválido!');
    fillPixelBoard(5);
  } else if (boardSize > 50) {
    alert('Board inválido!');
    fillPixelBoard(50);
  } else {
    fillPixelBoard(boardSize);
  }
}

generateBoardButton.addEventListener('click', generateBoard);

function iniciateColorPalette() {
  for (let index = 0; index < paletteColors.length; index += 1) {
    if (paletteColors[index].style.backgroundColor === 'black') {
      paletteColors[index].classList.add('selected');
    }
  }
}

iniciateColorPalette();

function removeSelected() {
  for (let index = 0; index < paletteColors.length; index += 1) {
    if (paletteColors[index].className.includes('selected')) {
      paletteColors[index].classList.remove('selected');
    }
  }
}

function selectColor(event) {
  const element = event.target;

  if (element.id !== 'color-palette') {
    removeSelected();
    element.classList.add('selected');
  }
}

colorPalette.addEventListener('click', selectColor);

function paintPixel(event) {
  const element = event.target;

  if (element.className === 'pixel') {
    const selected = document.querySelector('.selected');
    const color = selected.style.backgroundColor;
    element.style.backgroundColor = color;
  }
}

pixelBoard.addEventListener('click', paintPixel);

const clearButton = document.querySelector('#clear-board');
const pixels = document.querySelectorAll('.pixel');

function clearBoard() {
  for (let index = 0; index < pixels.length; index += 1) {
    pixels[index].style.backgroundColor = 'white';
  }
}

clearButton.addEventListener('click', clearBoard);
