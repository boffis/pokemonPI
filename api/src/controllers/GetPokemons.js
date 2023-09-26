const axios = require ("axios")

const GetPokemons = async () => {
    try {
        const PokemonListFormatted = []
        
        for  (i = 1; i < 100; i++) {
            const {data} = await axios(`https://pokeapi.co/api/v2/pokemon/${i}/`)
            
            const healthI = data.stats.find(stat=> stat.stat.name === "hp")
            const attackI = data.stats.find(stat=> stat.stat.name === "attack")
            const defenseI = data.stats.find(stat=> stat.stat.name === "defense")
            const speedI = data.stats.find(stat=> stat.stat.name === "speed")

            const pokemonFormatted = {
                name:data.forms[0]["name"],
                image: data.sprites.other["official-artwork"]["front_default"],
                health: healthI["base_stat"],
                attack:attackI["base_stat"],
                defense:defenseI["base_stat"],
                speed:speedI["base_stat"],
                height:data.height,
                weight:data.weight
            }

            const pokemonTypes = data.types.map(type =>{return({name:type.type.name})})

            PokemonListFormatted.push({
                ...pokemonFormatted, 
                types:pokemonTypes
            })
        }
        
        return(PokemonListFormatted)
    }
    catch (error) {
        throw (error)

    }
}

module.exports = GetPokemons