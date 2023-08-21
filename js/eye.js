addEventListener("scroll", (event) => moveEye(event));
addEventListener("mousemove", (event) => trackEye(event));

dot = (a, b) => a.map((x, i) => a[i] * b[i]).reduce((m, n) => m + n);
norm = (a) => Math.sqrt(dot(a,a));

function moveEye(){
    var windowHeight = window.innerHeight/2;
    var eye          = document.getElementById('eyeSocket');

    eye.style.top    = Math.max(0, windowHeight - window.scrollY - eye.getBoundingClientRect().height/2)+'px';
    console.log(window.scrollY);
}

function trackEye(event){
    var eye     = document.getElementById('eyeSocket').getBoundingClientRect();
    var pupil   = document.getElementById('eyeIris');
    var pupilPos= pupil.getBoundingClientRect();
    console.log(pupil.style.top)
    console.log(pupil.style.left)

    var eyeCenter = [(eye.right+eye.left)/2, (eye.bottom+eye.top)/2];
    var eyeLimit  = (eye.width - pupilPos.width)/2*0.9;
    var mousePos  = [event.clientX, event.clientY];
    // Vector between eye and Mouse
    var vectoToLook = eyeCenter.map((x, i) => mousePos[i] - eyeCenter[i]);
    console.log(vectoToLook);
    vectoToLook = vectoToLook.map((x) => x/norm(vectoToLook)*Math.min(norm(vectoToLook), eyeLimit));

    console.log(vectoToLook)
    pupil.animate({
        left: `${Math.floor(eye.width/2 - pupilPos.width/2 + vectoToLook[0])}px`,
        top: `${Math.floor(eye.height/2 - pupilPos.height/2 + vectoToLook[1])}px`
    }, { duration: 500, fill: "forwards" });

    console.log(pupil.style.top)
    console.log(pupil.style.left)

}