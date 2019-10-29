// const TRAINERSURL = "http://localhost:8000/trainers/"
// const POKEMONSURL = "http://localhost:8000/pokemons/"

const TRAINERSURL = "https://pokemonbattler-gg.herokuapp.com/trainers/"
const POKEMONSURL = "https://pokemonbattler-gg.herokuapp.com/pokemons/"

const GYMBATTLE = new Audio("./assets/sounds/GymBattle.mp3");
const WINAUDIO = new Audio("./assets/sounds/Victory.mp3");
const LOSEAUDIO = new Audio("./assets/sounds/PCenter.mp3");
const GYMAUDIO = new Audio("./assets/sounds/Gym.mp3")


document.addEventListener("DOMContentLoaded",()=>{
    console.log("DOM Loaded and Connected.")
    splashLoad();
    setupControls();
});

function splashLoad(){
    let owCont = document.getElementById("overworld");
        owCont.style.display = "none";
    let bCont = document.getElementById("battlecontainer");
        bCont.style.display = "none";
    let sCont = document.getElementById("switchcontainer");
        sCont.style.display = "none";
    let endCont = document.getElementById("gameend");
        endCont.style.display = "";
    let splashImage = document.createElement("img");
        splashImage.id = "splash";
        splashImage.src = "./assets/splashTest.gif"
        endCont.append(splashImage);
        endCont.style.backgroundImage = "url('./assets/splashWait.gif')";
        setTimeout(changeSplash,6500);
    endCont.addEventListener("dblclick",overworldHandler)
}

function overworldHandler(e){
    GYMAUDIO.loop = true;
    GYMAUDIO.play();
    document.getElementById("titleaudio").remove();
    let owCont = document.getElementById("overworld");
        owCont.style.display = "";
    let endCont = document.getElementById("gameend");
        endCont.style.display = "none";
    let avatar = document.getElementById("red");
        avatar.style.left = "47.5%";
        avatar.style.bottom = "0%";
    document.addEventListener("keydown",moveRed)
}

function changeSplash(){
    let splashImage = document.getElementById("splash");
    let endCont = document.getElementById("gameend");
        endCont.removeChild(splashImage);
    
}

 function gameStartHandler(){
    document.removeEventListener("keydown",moveRed);
    let endCont = document.getElementById("gameend");
        endCont.removeEventListener("dblclick",gameStartHandler);
    GYMAUDIO.pause();
    GYMAUDIO.muted = true;
    GYMBATTLE.loop = true;
    GYMBATTLE.play();
    setupBattleUI();
    setupSwitchUI();
    addMoveEvent();
    addMenuControls();
    Trainer.getAllTrainers();
}

function setupBattleUI(){
    let bCont = document.getElementById("battlecontainer");
        bCont.style.display = "";
    let bgScreen = document.getElementById("bgscreen");
        bgScreen.style.backgroundImage = "url('./assets/BattleBG.png')";
    let notification = document.getElementById("notification");
        notification.style.backgroundImage = "url('./assets/NotificationBar.png')";
    let sCont = document.getElementById("switchcontainer");
        sCont.style.display = "none";
    let endCont = document.getElementById("gameend");
        endCont.style.display = "none";
    let owCont = document.getElementById("overworld");
        owCont.style.display = "none";
    displayMenuUI();
}

function setupSwitchUI(){
    let sCancel = document.getElementById("switchcancel");
        sCancel.addEventListener("click",switchCancelHandler)
}

function switchUI(){
    let bCont = document.getElementById("battlecontainer");
        bCont.style.display = "none";
    let sCont = document.getElementById("switchcontainer");
        sCont.style.display = ""
}

function setupControls(){
    document.getElementById("hardreset").addEventListener("click",resetHandler);
    document.getElementById("playcontrol").addEventListener("click",()=>GYMBATTLE.play());
    document.getElementById("pausecontrol").addEventListener("click",()=>GYMBATTLE.pause());
    // document.getElementById("playcontrol").addEventListener("click",()=>document.getElementById("audio").play());
    // document.getElementById("pausecontrol").addEventListener("click",()=>document.getElementById("audio").pause());
}

function battleUI(){
    let bCont = document.getElementById("battlecontainer");
    bCont.style.display = "";
    let sCont = document.getElementById("switchcontainer");
    sCont.style.display = "none";
}

function displayMovesUI(){
    let mMenu = document.getElementById("movesmenu");
        mMenu.style.display = "";
    let hText = document.getElementById("halftextarea");
        hText.style.display = "none";
    let fText = document.getElementById("fulltextarea");
        fText.style.display = "none";
    let menu = document.getElementById("actionmenu");
        menu.style.display = "none";
    
}

function displayFullTextUI(){
    let mMenu = document.getElementById("movesmenu");
        mMenu.style.display = "none";
    let hText = document.getElementById("halftextarea");
        hText.style.display = "none";
    let fText = document.getElementById("fulltextarea");
        fText.style.display = "";
    let menu = document.getElementById("actionmenu");
        menu.style.display = "none";
}

function displayMenuUI(){
    let cPokemonName = document.getElementById("playername").innerText;
    let mMenu = document.getElementById("movesmenu");
        mMenu.style.display = "none";
    let hText = document.getElementById("halftextarea");
        hText.style.display = "";
        hText.innerText = `What will ${cPokemonName} do?`
    let fText = document.getElementById("fulltextarea");
        fText.style.display = "none";
        fText.removeEventListener("click",displayMenuUI);
        fText.removeEventListener("click",checkEnemyFaint);
        fText.removeEventListener("click",checkPlayerFaint);
        fText.removeEventListener("click",enemyTurn);
        fText.removeEventListener("click",backToMenu);
        fText.removeEventListener("click",skipBackToMenu);
    let menu = document.getElementById("actionmenu");
        menu.style.display = "";
}

function addMenuControls(){
    let fight = document.getElementById("fight")
        fight.addEventListener("click",fightHandler);
    let bag = document.getElementById("bag")
        bag.addEventListener("click",bagHandler)
    let run = document.getElementById("run")
        run.addEventListener("click",runHandler)
    let pkmn = document.getElementById("pkmn")
        pkmn.addEventListener("click",pkmnHandler)
}

function addMoveEvent(){
    let move1 = document.getElementById("move1")
        move1.addEventListener("click",move1Handler);
    let move2 = document.getElementById("move2")
        move2.addEventListener("click",move2Handler)
    let move3 = document.getElementById("move3")
        move3.addEventListener("click",move3Handler)
    let move4 = document.getElementById("move4")
        move4.addEventListener("click",move4Handler)
    let back = document.getElementById("back")
        back.innerHTML = "BACK"
        back.style.paddingTop = "25%";
        back.addEventListener("click",backHandler)
    let back2 = document.getElementById("back2")
        back2.addEventListener("click",backHandler)
}

function move1Handler(e){
    provideFeedback("p1",e.currentTarget.innerText,e.currentTarget.dataset.moveDmg);
}

function move2Handler(e){
    provideFeedback("p1",e.currentTarget.innerText,e.currentTarget.dataset.moveDmg);
}

function move3Handler(e){
    provideFeedback("p1",e.currentTarget.innerText,e.currentTarget.dataset.moveDmg);
}

function move4Handler(e){
    //place holder for future.
}

function backHandler(e){
    displayMenuUI();
}

function fightHandler(e){
    displayMovesUI();
}

function enemyMove(){
    let eNamePlate = document.getElementById("enemynameplate");
    let dmgArray = [
                    Number(eNamePlate.dataset.move0Dmg),
                    Number(eNamePlate.dataset.move1Dmg),
                    Number(eNamePlate.dataset.move2Dmg)
                    ];
    let nameArray = [
        eNamePlate.dataset.move0Name,
        eNamePlate.dataset.move1Name,
        eNamePlate.dataset.move2Name
                    ];
    let randomNum = Math.floor(Math.random() * Math.floor(3));
    return {name: nameArray[randomNum],damage: dmgArray[randomNum]};
}

function bagHandler(e){
    let textArea = document.getElementById("halftextarea");
    textArea.innerText = "There are no items in the bag."
    let cPokemonName = document.getElementById("playername").innerText;
    setTimeout(function(){ textArea.innerText =`What will ${cPokemonName} do?` }, 1500);
}

function runHandler(e){
    let textArea = document.getElementById("halftextarea");
    textArea.innerText = "You cannot run away from a Trainer battle!!"
    let cPokemonName = document.getElementById("playername").innerText;
    setTimeout(function(){ textArea.innerText =`What will ${cPokemonName} do?` }, 1500);
}

function pkmnHandler(e){
    //populate switch screen
    fetch(TRAINERSURL+"1")
    .then(res => res.json())
    .then(trainer => {
        let red = new Trainer(trainer)
        red.populateSwitch();
        switchUI();
    });
}

function switchCancelHandler(e){
    let cPokemonHp = document.getElementById("playerhpbar");
    if (cPokemonHp.value === 0){
        let cPokemonName = document.getElementById("cpokemonname").innerHTML;
        let textArea = document.getElementById("switchtextarea");
            textArea.innerText = `${cPokemonName} does not have the will to battle!!`;
        setTimeout(function(){ textArea.innerText ="Select a Pokemon to swap in." }, 1500);
    }else{
        battleUI();
    }   
}

function currentPokemonHandler(e){
    let cPokemonName = document.getElementById("cpokemonname").innerHTML;
    let textArea = document.getElementById("switchtextarea");
    let cPokemonHp = document.getElementById("playerhpbar");
    if (cPokemonHp.value === 0){
        textArea.innerText = `${cPokemonName} does not have the will to battle!!`;
    }else{
        textArea.innerText = `${cPokemonName} is already in battle!!`;
    }
    setTimeout(function(){ textArea.innerText ="Select a Pokemon to swap in." }, 1500);
}

function resetHandler(e){
    let bCont = document.getElementById("battlecontainer");
        bCont.style.display = "none";
    let sCont = document.getElementById("switchcontainer");
        sCont.style.display = "none";
    let endCont = document.getElementById("gameend");
        endCont.style.display = "none";
    let owCont = document.getElementById("overworld");
        owCont.style.display = "none";
    fetch(POKEMONSURL+"reset")
    .then(res => res.json())
    .then(message => {
        alert(message.message);
        location.reload();
    });
}
    
function switchPokemon(e){
    let newPokemonId = e.currentTarget.dataset.pokemonId;
    let textArea = document.getElementById("fulltextarea");
        textArea.innerHTML = `Red withdrew ${document.getElementById("cpokemonname").innerText}!!`;
    let currentPokemonHp = Number(document.getElementById("cpokemonhp").innerText.split(" ")[0]);
    if (Number(e.currentTarget.dataset.currentHp)!==0 && currentPokemonHp === 0){
        fetch(POKEMONSURL+newPokemonId)
        .then(res => res.json())
        .then(pokemon => {
            let npokemon = new Pokemon(pokemon); 
            npokemon.renderPokemon();
            battleUI();
            let textArea = document.getElementById("fulltextarea");
                textArea.innerHTML += `<br><br>Red sent out ${npokemon.specie.name}!!`;
                displayFullTextUI();
                textArea.addEventListener("click",backToMenu);
        });
    }else if (Number(e.currentTarget.dataset.currentHp)!==0 ){
        fetch(POKEMONSURL+newPokemonId)
        .then(res => res.json())
        .then(pokemon => {
            let npokemon = new Pokemon(pokemon); 
            npokemon.renderPokemon();
            battleUI();
            let textArea = document.getElementById("fulltextarea");
                textArea.innerHTML += `<br><br>Red sent out ${npokemon.specie.name}!!`;
                displayFullTextUI();
                textArea.addEventListener("click",skipBackToMenu);
        });
    }else{
        let textArea = document.getElementById("switchtextarea");
        let cPokemonName = e.currentTarget.firstElementChild.innerText;
            textArea.innerText = `${cPokemonName} does not have the will to battle!!`;
        setTimeout(function(){ textArea.innerText ="Select a Pokemon to swap in." }, 1500);
    }
}

function dealDamage(moveDmg,foe){
    let damage = Number(moveDmg);
    let hpBar = document.getElementById(foe);
    let maxHp = Number(hpBar.dataset.maxHp);
    let currentHP = Number(hpBar.dataset.currentHp);
    let hitPokemonId = hpBar.parentElement.dataset.pokemonId;
        if(damage > currentHP){
            damage = currentHP;
            hpBar.dataset.currentHp = currentHP - damage;
        }else{
            hpBar.dataset.currentHp = currentHP - damage;
        }
    let spriteDiv;
    if (foe==="playerhpbar"){
        spriteDiv = document.getElementById("playerspritediv");
    }else{
        spriteDiv = document.getElementById("enemyspritediv");
    }
    spriteDiv.style.animationIterationCount = "infinite"
    spriteDiv.style.animationDuration = ".35s"
    spriteDiv.style.animationName = "shaking";
    setTimeout(()=>{spriteDiv.style.animationName="";},500);
    currentHP = currentHP - damage;
    let newHpPercent = Math.round((hpBar.dataset.currentHp/Number(maxHp))*100);
    hpBar.value = newHpPercent;
    fetch(POKEMONSURL+hitPokemonId,{
        method: "PATCH",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify({current_hp: currentHP})
    })
}

function provideFeedback(mType,attackName,attackDmg){
    let textArea = document.getElementById("fulltextarea");
    let eName = document.getElementById("enemyname").innerText;
    let pName = document.getElementById("playername").innerText;
    switch (mType) {
        case "p1":
                textArea.innerText = `${pName} used ${attackName}!`;
            displayFullTextUI();
            dealDamage(attackDmg,"enemyhpbar");
            if(document.getElementById("enemyhpbar").value === 0){
                provideFeedback("e2");
            }else{
            textArea.addEventListener("click",enemyTurn);
            }
        break;
        case "p2":
                textArea.innerHTML += `<br> <br>${pName} fainted!`;
                displayFullTextUI();
                textArea.removeEventListener("click",enemyTurn);
                textArea.addEventListener("click",checkPlayerFaint);
        break;
        case "e1":
                textArea.innerText = `The foe's ${eName} used ${attackName}!`;
            displayFullTextUI();
            dealDamage(attackDmg,"playerhpbar");
            if(document.getElementById("playerhpbar").value === 0){
                provideFeedback("p2");
            }else{
            textArea.removeEventListener("click",enemyTurn);
            textArea.addEventListener("click",backToMenu);
            }
        break;
        case "e2":
            textArea.innerHTML += `<br> <br>The foe's ${eName} fainted!`;
            displayFullTextUI();
            textArea.addEventListener("click",checkEnemyFaint);
        break;    
        default:
            break;
    }

}

function enemyTurn(e){
    let eMove = enemyMove();
    provideFeedback("e1",eMove.name,eMove.damage);
}

function checkEnemyFaint(){
let eTrainerId = document.getElementById("enemynameplate").dataset.trainerId;
    fetch(TRAINERSURL+eTrainerId)
    .then(res => res.json())
    .then(trainer => {
        let eTrainer = new Trainer(trainer);
            if(eTrainer.hasViablePokemon()){
                eTrainer.nextViablePokemon();
                let textArea = document.getElementById("fulltextarea");
                    textArea.innerHTML = `${trainer.name} sent out ${document.getElementById("enemyname").innerText}!!`;
                    textArea.addEventListener("click",backToMenu);
                displayFullTextUI();
            }else{
                let endCont = document.getElementById("gameend")
                    endCont.style.backgroundImage = "url('./assets/WinScreen.png')"
                let bCont = document.getElementById("battlecontainer");
                    bCont.style.display = "none";
                let sCont = document.getElementById("switchcontainer");
                    sCont.style.display = "none";
                let owCont = document.getElementById("overworld");
                    owCont.style.display = "none";
                endCont.style.display ="";
                GYMBATTLE.muted = true;
                GYMBATTLE.pause();
                WINAUDIO.loop = "true";
                WINAUDIO.play();
                endCont.addEventListener("dblclick",resetHandler);
            }
    });
}

function checkPlayerFaint(){
let pTrainerId = document.getElementById("playernameplate").dataset.trainerId;
    fetch(TRAINERSURL+pTrainerId)
    .then(res => res.json())
    .then(trainer => {
        let pTrainer = new Trainer(trainer);
            if(pTrainer.hasViablePokemon()){
                pTrainer.nextViablePokemon();
            }else{
            let endCont = document.getElementById("gameend")
                endCont.style.backgroundImage = "url('./assets/LoseScreen.png')"
            let bCont = document.getElementById("battlecontainer");
                bCont.style.display = "none";
            let sCont = document.getElementById("switchcontainer");
                sCont.style.display = "none";
            let owCont = document.getElementById("overworld");
                owCont.style.display = "none";
            endCont.style.display ="";
            GYMAUDIO.muted = true;
            GYMBATTLE.pause();
            LOSEAUDIO.loop = "true";
            LOSEAUDIO.play();
            endCont.addEventListener("dblclick",resetHandler);
            }
    });
}

function backToMenu(){
    let textArea = document.getElementById("fulltextarea");
        textArea.innerHTML = "";
    displayMenuUI();
}

function skipBackToMenu(){
    let textArea = document.getElementById("fulltextarea");
        textArea.innerHTML = "";
    displayMenuUI();
    enemyTurn();
}

function moveRed(e){
    let redAvatar = document.getElementById("red");
    let cPos = getPos();
    switch (e.key){
        case "ArrowUp":
            if(cPos.cBottom < 75){
            redAvatar.style.bottom = (cPos.cBottom + 3) + "%";
            redAvatar.src = "./assets/overworld/Red_aNorthFace.gif"
            let chPos = getPos();
                    if((chPos.cLeft>38.5 && chPos.cLeft<55.5) && (chPos.cBottom>56 && chPos.cBottom<67)){
                        gameStartHandler();
                    }
            }
        break;
        case "ArrowDown":
                if(cPos.cBottom > 0){
                    redAvatar.style.bottom = (cPos.cBottom - 3) + "%";
                    redAvatar.src = "./assets/overworld/Red_aSouthFace.png"
            let chPos = getPos();
                    if((chPos.cLeft>38.5 && chPos.cLeft<55.5) && (chPos.cBottom>56 && chPos.cBottom<67)){
                        gameStartHandler();
                    }
            }
        break;

        case "ArrowLeft":
            if(cPos.cLeft > 3.5){
                redAvatar.style.left = (cPos.cLeft - 5) + "%";
                redAvatar.src = "./assets/overworld/Red_aWestFace.gif"
            let chPos = getPos();
                    if((chPos.cLeft>38.5 && chPos.cLeft<55.5) && (chPos.cBottom>56 && chPos.cBottom<67)){
                        gameStartHandler();
                    }
            }
        break;
        case "ArrowRight":
                if(cPos.cLeft < 91.5){
                    redAvatar.style.left = (cPos.cLeft + 5) + "%";
                    redAvatar.src = "./assets/overworld/Red_aEastFace.gif"
                    let chPos = getPos();
                    if((chPos.cLeft>38.5 && chPos.cLeft<55.5) && (chPos.cBottom>56 && chPos.cBottom<67)){
                        gameStartHandler();
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