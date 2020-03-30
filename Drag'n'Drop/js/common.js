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
}