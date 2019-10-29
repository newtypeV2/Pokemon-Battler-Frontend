
document.addEventListener("DOMContentLoaded",()=>{
    let avatar = document.getElementById("red");
        avatar.style.left = "47.5%";
        avatar.style.bottom = "0%";
    document.addEventListener("keydown",moveRed)
});

function moveRed(e){
    let redAvatar = document.getElementById("red");
    let cPos = getPos();
    console.log(cPos);
    switch (e.key){
        case "ArrowUp":
            if(cPos.cBottom < 75){
            redAvatar.style.bottom = (cPos.cBottom + 3) + "%";
            redAvatar.src = "./assets/overworld/Red_aNorthFace.gif"
            let chPos = getPos();
                    if((chPos.cLeft>38.5 && chPos.cLeft<55.5) && (chPos.cBottom>56 && chPos.cBottom<67)){
                        alert("START BATTLE");
                    }
            }
        break;
        case "ArrowDown":
                if(cPos.cBottom > 0){
                    redAvatar.style.bottom = (cPos.cBottom - 3) + "%";
                    redAvatar.src = "./assets/overworld/Red_SouthFace.png"
            let chPos = getPos();
                    if((chPos.cLeft>38.5 && chPos.cLeft<55.5) && (chPos.cBottom>56 && chPos.cBottom<67)){
                        alert("START BATTLE");
                    }
            }
        break;

        case "ArrowLeft":
            if(cPos.cLeft > 3.5){
                redAvatar.style.left = (cPos.cLeft - 5) + "%";
                redAvatar.src = "./assets/overworld/Red_WestFace.png"
            let chPos = getPos();
                    if((chPos.cLeft>38.5 && chPos.cLeft<55.5) && (chPos.cBottom>56 && chPos.cBottom<67)){
                        alert("START BATTLE");
                    }
            }
        break;
        case "ArrowRight":
                if(cPos.cLeft < 91.5){
                    redAvatar.style.left = (cPos.cLeft + 5) + "%";
                    redAvatar.src = "./assets/overworld/Red_EastFace.png"
                    let chPos = getPos();
                    if((chPos.cLeft>38.5 && chPos.cLeft<55.5) && (chPos.cBottom>56 && chPos.cBottom<67)){
                        alert("START BATTLE");
                    }
                }
        break;   
        case "a":
                
                if (cPos.cLeft === 47.5 && cPos.cBottom >= 54 && cPos.cBottom <=56 ){
                    debugger
                }
        break;         

    }
}

function getPos(){
    let avatar = document.getElementById("red");
    let leftPos = Number(avatar.style.left.split("%")[0]);
    let bottomPos = Number(avatar.style.bottom.split("%")[0]);
    return {cLeft: leftPos, cBottom: bottomPos};
}