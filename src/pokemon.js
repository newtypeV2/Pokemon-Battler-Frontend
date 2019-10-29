class Pokemon{
    constructor(pokemon){
        this.id = pokemon.id;
        this.trainer_id = pokemon.trainer_id;
        this.level = pokemon.level;
        this.current_hp = pokemon.current_hp;
        this.imgFront = pokemon.imgFront;
        this.imgBack = pokemon.imgBack;
        this.imgMenu = pokemon.imgMenu;
        this.specie = pokemon.specie;
        this.moves = pokemon.moves;
        this.max_hp = pokemon.max_hp;
    }

    renderPokemon(){
    if(this.trainer_id===1){
        let target = document.getElementById("playersprite");
            let imgEl = document.createElement("img");
                imgEl.id = "playersprite"
                imgEl.src = this.imgBack;
            let nameEl = document.getElementById("playername");
                nameEl.innerText = this.specie.name;
            let levelEl = document.getElementById("playerlevel");
                levelEl.innerText = `Lv ${this.level}`;
            imgEl.onload = (e) => {
                e.currentTarget.parentElement.style.paddingTop = 210 - e.currentTarget.height + "px";
                e.currentTarget.parentElement.dataset.pokemonId = e.currentTarget.dataset.pokemonId;
            };
            target.replaceWith(imgEl);
            document.getElementById("fight").dataset.pokemonId = this.id;
            let pNamePlate = document.getElementById("playernameplate");
                pNamePlate.dataset.pokemonId = this.id;
                pNamePlate.dataset.trainerId = this.trainer_id;
            let pHpBar = document.getElementById("playerhpbar");
                pHpBar.dataset.maxHp = this.max_hp;
                pHpBar.dataset.currentHp = this.current_hp;
                pHpBar.value = Math.round((this.current_hp / this.max_hp)*100);
            let move1 = document.getElementById("move1");
                move1.innerHTML = this.moves[0].name;
                move1.dataset.moveDmg = this.moves[0].base_damage;
            let move2 = document.getElementById("move2");
                move2.innerHTML = this.moves[1].name;
                move2.dataset.moveDmg = this.moves[1].base_damage;
            let move3 = document.getElementById("move3");
                move3.innerHTML = this.moves[2].name;
                move3.dataset.moveDmg = this.moves[2].base_damage;
            displayMenuUI();
    }else{
        let target = document.getElementById("enemysprite");
            let imgEl = document.createElement("img");
                imgEl.id = "enemysprite"
                imgEl.src = this.imgFront;
            let nameEl = document.getElementById("enemyname");
                nameEl.innerText = this.specie.name;
            let levelEl = document.getElementById("enemylevel");
                levelEl.innerText = `Lv ${this.level}`;
            imgEl.onload = (e) => {
                e.currentTarget.parentElement.style.paddingTop = 222 - e.currentTarget.height + "px";
            };
            target.replaceWith(imgEl);
            let eNamePlate = document.getElementById("enemynameplate");
                eNamePlate.dataset.pokemonId = this.id;
                eNamePlate.dataset.trainerId = this.trainer_id;
                eNamePlate.dataset.move0Dmg = this.moves[0].base_damage;
                eNamePlate.dataset.move0Name = this.moves[0].name;
                eNamePlate.dataset.move1Dmg = this.moves[1].base_damage;
                eNamePlate.dataset.move1Name = this.moves[1].name;
                eNamePlate.dataset.move2Dmg = this.moves[2].base_damage;
                eNamePlate.dataset.move2Name = this.moves[2].name;
            let eHpBar = document.getElementById("enemyhpbar");
                eHpBar.dataset.maxHp = this.max_hp;
                eHpBar.dataset.currentHp = this.current_hp;
                eHpBar.value = Math.round((this.current_hp / this.max_hp)*100);
            displayMenuUI();
    }
    }

    renderToSwitch(prefix){
        let pName = document.getElementById(prefix+"pokemonname");
            pName.innerHTML = this.specie.name;
        let pLevel = document.getElementById(prefix+"pokemonlevel");
            pLevel.innerHTML = `Lv ${this.level}`;
        let pHp = document.getElementById(prefix+"pokemonhp");
            pHp.innerHTML = `${this.current_hp} / ${this.max_hp}`;
        let pSprite = document.getElementById(prefix+"pokemonsprite");
            pSprite.src = this.imgMenu;
            pSprite.parentElement.dataset.pokemonId = this.id;
            pSprite.parentElement.dataset.currentHp = this.current_hp;
        if (prefix === "c"){
            pSprite.parentElement.addEventListener("click",currentPokemonHandler);
        }
        else{
            pSprite.parentElement.addEventListener("click",switchPokemon);
        }
    }
}