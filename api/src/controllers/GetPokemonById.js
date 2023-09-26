const {Pokemon, Type} = require ("../db")
const axios = require ("axios")

const GetPokemonById = async (id) => {
    try{

        if (isNaN(id)){
            const pokemon = await Pokemon.findOne ({where:{id:id}, include:Type})
            console.log(pokemon)
            return({message:"lol lmao"})
        } else {

            const {data} = await axios(`https://pokeapi.co/api/v2/pokemon/${id}/`)
            
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

            return({
                ...pokemonFormatted, 
                types:pokemonTypes
            })
        }

    }
    catch (error) {
        throw (error)
    }
}

module.exports = GetPokemonById