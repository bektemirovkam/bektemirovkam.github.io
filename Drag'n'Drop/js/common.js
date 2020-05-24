function navBar(){
  let burger = document.querySelector('.header__burger');
  let menu = document.querySelector('.header__menu');
  burger.onclick = ()=>{
    if (burger.classList.contains('active')){
      burger.classList.remove('active');
      menu.classList.remove('active');
      document.querySelector('body').classList.remove('lock');
    }
    else{
      burger.classList.add('active');
      menu.classList.add('active');
      document.querySelector('body').classList.add('lock');
    }
  }
};
navBar();

document.onmousedown = function(event){
  if (!event.target.classList.contains('draggable')) return;

  event.preventDefault();

  let target = event.target;
  
  let shiftX = event.clientX - target.getBoundingClientRect().left;
  let shiftY = event.clientY - target.getBoundingClientRect().top;

  target.style.position = 'fixed';
  target.style.zIndex = 1000;

  moveAt(event.clientX, event.clientY);

  function moveAt(pageX, pageY){
    target.style.position = 'fixed';
    let left = pageX - shiftX;
    let top = pageY - shiftY;
    if (left < 0){
      left = 0;
    } else if (left > document.body.clientWidth - target.offsetWidth){
      left = document.body.scrollWidth - target.offsetWidth;
    }
    if (top < 0){
      top = 0;
      if (window.pageYOffset){
        window.scrollBy(0,-10);
      }
    } else if (top > document.documentElement.clientHeight - target.offsetHeight){
      top = document.documentElement.clientHeight - target.offsetHeight;
      if (document.documentElement.scrollHeight - window.pageYOffset - document.documentElement.clientHeight > 0) {
        window.scrollBy(0,10);
      }
    }
    target.style.left = left + 'px';
    target.style.top = top + 'px';
  };

  function onMouseMove(event){
    moveAt(event.clientX, event.clientY);
  };


  document.addEventListener('mousemove', onMouseMove);
  target.onmouseup = function(event){
    document.removeEventListener('mousemove', onMouseMove);
    target.onmouseup = null;
    let left = event.pageX - shiftX;
    let top = event.pageY - shiftY;
    target.style.position = 'absolute';
    
    if (left < 0){
      left = 0;
    } else if (left > document.body.scrollWidth - target.offsetWidth){
      left = document.body.scrollWidth - target.offsetWidth;
    }
    if (top < 0){
      top = 0;
    } else if (top > document.body.scrollHeight - target.offsetHeight){
      top = document.body.scrollHeight - target.offsetHeight + 20;
    };

    target.style.left = left + 'px';
    target.style.top = top + 'px';
  };

  target.ondragstart = ()=>{
    return false;
  }
};

let table = document.getElementById('bagua-table');
let cacheTdHTML = null;
let editing = false;

table.onclick = function(event){
  let td = event.target.closest('td');
  let okBtn = event.target.closest('.ok-btn');
  let cancelBtn = event.target.closest('.cancel-btn');
  
  if(okBtn){
    stopEdit(td, true);
  } else if (cancelBtn){
    stopEdit(td, false);
  } else if (td){

   if (editing) return;  
   
   td.classList.add('edit-td');
   
   createArea(td);
   
   editing = true;
   
   createControl(td);
 };
};

function createArea(parent){
  let area = document.createElement('textarea');
  area.innerHTML = parent.innerHTML;
  area.style.width = parent.offsetWidth + 'px';
  area.style.height = parent.offsetHeight + 'px';
  area.style.resize = 'none';
  area.style.display = 'block';
  area.className = 'edit-area';
  cacheTdHTML = parent.innerHTML;
  parent.innerHTML = '';
  parent.append(area);
  area.focus();
};


function createControl (parent){
  let div = document.createElement('div');
  div.classList.add('edit-controls');
  div.style.position = 'absolute';

  div.style.top = window.pageYoffset + parent.getBoundingClientRect().bottom + 'px';
  div.style.left = 0 + 'px';
  div.style.zIndex = 1000;
  let okBtn = document.createElement('button');
  okBtn.innerHTML = 'OK';
  okBtn.className = 'ok-btn';

  div.append(okBtn);

  let cancelBtn = document.createElement('button');
  cancelBtn.innerHTML = 'Cancel';
  cancelBtn.className = 'cancel-btn';

  div.append(cancelBtn);

  parent.append(div);

};

function stopEdit(parent, bool){
  editing = false;
  let controlDiv = document.querySelector('.edit-controls');
  controlDiv.remove();
  parent.classList.remove('edit-td');
  let area = document.querySelector('.edit-area');
  if (bool){
    parent.innerHTML = area.value;
  } else {
    parent.innerHTML = cacheTdHTML;
    area.remove();
  }
};

let showBtn = document.querySelector('#show-form');
let formContainer = document.querySelector('#prompt-form-container');
let formMessage = document.querySelector('#prompt-message');

let form = document.querySelector('#prompt-form');
let formCancel = form.elements.cancel;
let formText = form.elements[0]

showBtn.onclick = function(){ 
  console.log(form);
  formContainer.style.display = 'block';
  document.body.style.overflowY = 'hidden';
  formText.focus();
};


function showPrompt(html, callback){
  formMessage.innerHTML = html;

  formCancel.onkeydown = (e)=> {
    if (e.key == 'Tab' && !e.shiftKey){
      formText.focus();
      return false;
    };
  };

  formText.onkeydown = (e)=>{
    if (e.key == 'Tab' && e.shiftKey){
      formCancel.focus();
      return false;
    }
  }

  form.onkeydown = (e)=>{
    if (e.key == 'Escape'){
      callback(null);
      formContainer.style.display = 'none';
      document.body.style.overflowY = '';
    };
  };

  form.onsubmit = ()=>{
    let value = form.elements[0].value;
    if (value == '') return false;
    document.body.style.overflowY = '';
    form.onkeydown = null;
    callback(value);
    formContainer.style.display = 'none';
    return false;
  };

  formCancel.onclick = function(){
    formContainer.style.display = 'none';
    document.body.style.overflowY = '';
    callback(null);
  };

};

showPrompt("Введите что-нибудь<br>...умное :)", function(value) {
  alert('Вы ввели: ' + value);
});

// mouse

function mouseMove(){
  let mouse = document.querySelector('#mouse');
  mouse.setAttribute('tabindex', 0);
  mouse.style.position = 'relative';
  mouse.style.top = '0px';
  mouse.style.left = '0px';
  let inFocus = false;
  

  mouse.onclick = () =>{
    mouse.focus();
    inFocus = true;
  };

  mouse.onblur = () =>{
    inFocus = false;
  };

  mouse.onkeydown = (event) =>{
    if (event.key == 'ArrowUp' || event.key == 'ArrowDown' || event.key == 'ArrowLeft' || event.key == 'ArrowRight'){
      event.preventDefault();
      if (inFocus) move(event.key);
    };
  }

  function move(direct){
    let coords = mouse.getBoundingClientRect();
    let docBottom = document.documentElement.scrollHeight;
    let docright = document.documentElement.offsetWidth;
    switch (direct) {
      case 'ArrowUp':
        mouse.style.top = parseInt(mouse.style.top) - mouse.offsetHeight + 'px';
        break;
      case 'ArrowDown':
        mouse.style.top = parseInt(mouse.style.top) + mouse.offsetHeight + 'px';
        break;
      case 'ArrowLeft':
        mouse.style.left = parseInt(mouse.style.left) - mouse.offsetWidth + 'px';
        break;
      case 'ArrowRight':
        mouse.style.left = parseInt(mouse.style.left) + mouse.offsetWidth + 'px';
        break;
    };
  };
};
mouseMove();

function calculator(){
  let formCalc = document.forms.calculator;
  let moneyBefore = document.querySelector('#money-before');
  let moneyAfter = document.querySelector('#money-after');
  let diagramAfter = document.querySelector('#height-after')

  formCalc.oninput = showCalc;

  function showCalc(){
    let initial = formCalc.elements.money.value;
    let years = formCalc.elements.months.value / 12;
    let interest = formCalc.elements.interest.value / 100;
    let result = Math.round(initial * (1 + interest * years));

    moneyBefore.innerHTML = initial;
    moneyAfter.innerHTML = result;

    diagramAfter.style.height = result / initial * 100 + 'px';
  };
  showCalc();
};
calculator();