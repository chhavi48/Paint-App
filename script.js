const canvas=document.querySelector("canvas");
ctx=canvas.getContext("2d");
toolbtn=document.querySelectorAll('.tool');

let prevMouseX,prevMouseY,
isDrwaing=false;
selectedTool='brush'
brushWidth=5;

window.addEventListener("load",()=>{
    canvas.width=canvas.offsetWidth;
    canvas.height=canvas.offsetHeight;
})

const startDraw=(e)=>{
     isDrwaing=true;
     prevMouseX=e.offsetX;
     prevMouseY=e.offsetY;
     ctx.beginPath();
     ctx.lineWidth=brushWidth;
}
const drawRect=(e)=>{
   ctx.strokeRect(e.offsetX,e.offsetY,prevMouseX-e.offsetX,prevMouseY-e.offsetY);
}

const drawing=(e)=>{
    if(!isDrwaing) return;
    if(selectedTool==='brush'){
        ctx.lineTo(e.offsetX,e.offsetY);
        ctx.stroke();
    }
    else if(selectedTool==='reactangle'){
         drawRect(e)
    }
}

toolbtn.forEach(btn=>{
    btn.addEventListener('click',()=>{
        document.querySelector('.options .active').classList.remove('active');
        btn.classList.add('active');
        selectedTool=btn.id;
        console.log(selectedTool)
    });
})



canvas.addEventListener("mousedown",startDraw)

canvas.addEventListener("mousemove",drawing)
canvas.addEventListener("mouseup",()=>isDrwaing=false);