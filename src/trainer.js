class Trainer{
    constructor(trainer){
        this.id = trainer.id;
        this.name = trainer.name;
        this.pokemons = trainer.pokemons;

    }
    getFirstPokemon(){
        this.pokemons.sort(function(a, b){return Number(a.id) - Number(b.id)});
        let firstPokemon = new Pokemon(this.pokemons[0]);
        firstPokemon.renderPokemon();
    }
    
    populateSwitch(){
        let cPokemonId =Number(document.getElementById("playernameplate").dataset.pokemonId);
        let switchPosition = 1;
        this.pokemons.forEach(pokemon => {
            let nPokemon = new Pokemon(pokemon)
            if (nPokemon.id === cPokemonId){
                nPokemon.renderToSwitch("c")
            }else{
                nPokemon.renderToSwitch("pp"+switchPosition);
                switchPosition+=1;
            }
        });
    }

    hasViablePokemon(){
        let cPokemon
        if (this.id ===1){
            cPokemon = Number(document.getElementById("playernameplate").dataset.pokemonId);
        }else{
            cPokemon = Number(document.getElementById("enemynameplate").dataset.pokemonId);
        }
        if(this.pokemons.find(pokemon => pokemon.current_hp > 0 && pokemon.id!==cPokemon)){
            return true;
        }else{
            return false;
        }
    }

    nextViablePokemon(){
        if(this.id===1){
            pkmnHandler();
        }else{
            let viablePokemon = new Pokemon(this.pokemons.find(pokemon => pokemon.current_hp > 0));
            viablePokemon.renderPokemon();
        }
    }

    static getAllTrainers(){
        fetch(TRAINERSURL)
        .then(res => res.json())
        .then(trainers => trainers.forEach(trainer => {
            let newTrainer = new Trainer(trainer);
            newTrainer.getFirstPokemon();
        }));
    }
}
