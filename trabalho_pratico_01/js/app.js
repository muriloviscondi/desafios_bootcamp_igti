const bodyColor = document.querySelector('body');

let redColor = document.querySelector('#red').value;
let greenColor = document.querySelector('#green').value;
let blueColor = document.querySelector('#blue').value;

addEventListener('load', start);

function start() {
  const contentInputs = document.querySelectorAll('.content-input');

  for (let contentInput of contentInputs) {
    contentInput.addEventListener('input', () => {
      const slider = contentInput.querySelector('.slider');
      const box = contentInput.querySelector('.box');

      const colorBox = box.getAttribute('id');

      handleSliderBoxValue(slider, box);
      handleColorBox(slider, colorBox);
    });
  }
}

function handleSliderBoxValue(slider, box) {
  box.value = slider.value;

  slider.oninput = function () {
    box.value = this.value;
  };
}

function handleColorBox(box, colorBox) {
  let red = document.querySelector('#red');
  let green = document.querySelector('#green');
  let blue = document.querySelector('#blue');

  color = box.value;

  switch (colorBox) {
    case 'red':
      redColor = color;
      red.style.backgroundColor = `rgb(${color}, 0, 0)`;
      break;
    case 'green':
      greenColor = color;
      green.style.backgroundColor = `rgb(0, ${color}, 0)`;
      break;
    case 'blue':
      blueColor = color;
      blue.style.backgroundColor = `rgb(0, 0, ${color})`;
      break;
  }

  bodyColor.style.backgroundImage = `radial-gradient(white, rgb(${redColor}, ${greenColor}, ${blueColor}))`;
}
