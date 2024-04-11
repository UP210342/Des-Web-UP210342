const containerClicks = document.getElementById('containerClicks');
const btnIncrement = document.querySelector('.btn-primary');
const btnDecrement = document.querySelector('.btn-secondary');
const btnReset = document.querySelector('.btn-reset');
let counter = 0; 

btnIncrement.onclick = function(){
  counter++;
  containerClicks.innerText = counter;
}

btnDecrement.onclick = () => {
  counter--;
  containerClicks.innerText = counter;
};

btnReset.onclick = () => {
  counter = 0;
  containerClicks.innerText = counter;
};