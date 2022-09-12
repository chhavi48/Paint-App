const canvas=document.querySelector("canvas");
ctx=canvas.getContext("2d");
toolbtn=document.querySelectorAll('.tool');
fillColor=document.querySelector("#fill-color")
sizeSlider=document.querySelector("#size-slider");
colorBtn=document.querySelectorAll(".colors .option");
colorPicker=document.querySelector("#color-picker");
clearCanvas=document.querySelector(".clear-canvas");
saveImg=document.querySelector(".save-img");
let prevMouseX,prevMouseY,snapShot
isDrwaing=false;
selectedTool='brush';
brushWidth=5;
selectedColor="#000";

const setCanvasBackground=()=>{
    ctx.fillStyle="#fff";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle=selectedColor;
    
}

window.addEventListener("load",()=>{
    canvas.width=canvas.offsetWidth;
    canvas.height=canvas.offsetHeight;
    setCanvasBackground();
})

const startDraw=(e)=>{
     isDrwaing=true;
     prevMouseX=e.offsetX;
     prevMouseY=e.offsetY;
     ctx.beginPath();
     ctx.lineWidth=brushWidth;
     ctx.strokeStyle=selectedColor;
     ctx.fillStyle=selectedColor;
     snapShot=ctx.getImageData(0,0,canvas.width,canvas.height);
}
const drawRect=(e)=>{
    if(!fillColor.checked){
        return  ctx.strokeRect(e.offsetX,e.offsetY,prevMouseX-e.offsetX,prevMouseY-e.offsetY);
    }
    ctx.fillRect(e.offsetX,e.offsetY,prevMouseX-e.offsetX,prevMouseY-e.offsetY);
}

const drawCircle=(e)=>{
    ctx.beginPath();
    let radius=Math.sqrt(Math.pow((prevMouseX-e.offsetX),2) + Math.pow((prevMouseY-e.offsetY),2));
    ctx.arc(prevMouseX,prevMouseY,radius,0,2*Math.PI);
     fillColor.checked?ctx.fill():ctx.stroke();
}

const drawTriangle=(e)=>{
    ctx.beginPath();
    ctx.moveTo(prevMouseX, prevMouseY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.lineTo(prevMouseX*2-e.offsetX, e.offsetY)
    ctx.closePath();
    ctx.stroke();
    fillColor.checked?ctx.fill():ctx.stroke();

}


const drawing=(e)=>{
    if(!isDrwaing) return;
    ctx.putImageData(snapShot,0,0)
    if(selectedTool==='brush' || selectedTool==='eraser'){

        ctx.strokeStyle=selectedTool==='eraser' ? '#fff':selectedColor;
        ctx.lineTo(e.offsetX,e.offsetY);
        ctx.stroke();
    }
    else if(selectedTool==='reactangle'){
         drawRect(e)
    }
    else if(selectedTool==='circle'){
        drawCircle(e)
   }
   else {
    drawTriangle(e)
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

sizeSlider.addEventListener('change',()=>brushWidth=sizeSlider.value)

colorBtn.forEach(btn=>{
    btn.addEventListener('click',()=>{
        document.querySelector('.options .selected').classList.remove('selected');
        btn.classList.add('selected');
       selectedColor=window.getComputedStyle(btn).getPropertyValue('background-color');
    });
})

colorPicker.addEventListener('change',()=>
{
  colorPicker.parentElement.style.background=colorPicker.value;
  colorPicker.parentElement.click()
})

clearCanvas.addEventListener('click',()=>{
    ctx.clearRect(0,0,canvas.width,canvas.height);
     setCanvasBackground()
})
saveImg.addEventListener('click',()=>{
    const link=document.createElement('a');
    link.download=`${Date.now()}.jpg`;
    link.href=canvas.toDataURL();
    link.click();
});


canvas.addEventListener("mousedown",startDraw)
canvas.addEventListener("mousemove",drawing)
canvas.addEventListener("mouseup",()=>isDrwaing=false);