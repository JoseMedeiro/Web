addEventListener("scroll", (event) => moveEye(event));
addEventListener("scroll", (event) => scrollButBetter(false));

dot = (a, b) => a.map((x, i) => a[i] * b[i]).reduce((m, n) => m + n);
norm = (a) => Math.sqrt(dot(a,a));

var wasHeight = [Math.ceil(window.scrollY/window.innerHeight),Math.ceil(window.scrollY/window.innerHeight)];

function animate(callbackObj, duration) {
    var requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame;
    var startTime = 0, percentage = 0, animationTime = 0;

    duration = duration*1000 || 1000;

    var animation = function(timestamp) {

      if (startTime === 0) {
          startTime = timestamp;
        } else {
          animationTime = timestamp - startTime;
        }

      if (typeof callbackObj.start === 'function' && startTime === timestamp) {
         callbackObj.start();

         requestAnimationFrame(animation);
      } else if (animationTime < duration) {
         if (typeof callbackObj.progress === 'function') {
           percentage = animationTime / duration;
           callbackObj.progress(percentage);
         }

        requestAnimationFrame(animation);
      } else if (typeof callbackObj.done === 'function'){
          callbackObj.done();
      }
    };

  return requestAnimationFrame(animation);
}
function easeInOutQuad(t) { return t<.5 ? 2*t*t : -1+(4-2*t)*t  }
function sideScroll(rangeInPixels) {
    var element = window;

    var sequenceObj = {};
    var seconds = 2;
    var startingScrollPosition = element.scrollY;

    sequenceObj.progress = (function(percentage) {element.scroll(0,startingScrollPosition + (easeInOutQuad(percentage))*rangeInPixels)});

    animate(sequenceObj, seconds);
  
}
function scrollButBetter(button){
    wasHeight[1] = Math.ceil(window.scrollY/window.innerHeight);
    if(button){
      sideScroll(window.innerHeight*(1.01));
      wasHeight[0] = 1;
    }
    if(wasHeight[1] == 1 ){
        if(wasHeight[0] == 2){
            sideScroll(-window.innerHeight);
            wasHeight[0] = 1;
        }
    }
    if(wasHeight[1] <= 0){
        wasHeight[0] = 0;
    }
    if(wasHeight[1] >= 2){
        wasHeight[0] = 2;
    }
}
function moveEye(){
    var windowHeight = window.innerHeight*0.4;
    var windowWidth  = window.innerWidth/2;
    var scrollNorm   = window.scrollY*0.4/1;
    var eye          = document.getElementById('eyeSocket');
    var distance     = Math.min(1, scrollNorm/windowHeight);
    
    var futureSize = 2*128*(1-distance/2);
    eye.style.width = futureSize+'px';
    eye.style.height = futureSize+'px';
    eye.style.top = Math.max(0, windowHeight - scrollNorm + futureSize/2*(distance -1))+'px';
    eye.style.left = windowWidth - futureSize/2+'px';
    /*
    eye.animate({
        width: `${futureSize}px`,
        height: `${futureSize}px`,
        top: `${Math.max(0, windowHeight - window.scrollY - futureSize/2)}px`,
        left: `${windowWidth - futureSize/2}px`
    }, {  fill: "forwards" })
    */
}
function scrolldy(){
  scroll(0,window.scrollY+1)
}