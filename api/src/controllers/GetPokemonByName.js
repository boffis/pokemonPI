const {Pokemon, Type, Name} = require ("../db")
const axios = require ("axios")
const { Op } = require('sequelize')

const GetPokemonByName = async (name) => {
    try {
        let ApiPokemon = []

        const Names = await Name.findAll({where:{name:{[Op.iLike]:`%${name}%`}}})
            for (const poke of Names){
                if (poke.url) {
                    const {data} = await axios(poke.url)
                    
                    const healthI = data.stats.find(stat=> stat.stat.name === "hp")
                    const attackI = data.stats.find(stat=> stat.stat.name === "attack")
                    const defenseI = data.stats.find(stat=> stat.stat.name === "defense")
                    const speedI = data.stats.find(stat=> stat.stat.name === "speed")
                    
                    ApiPokemon.push ({
                        name:data.forms[0]["name"],
                        image: data.sprites.other["official-artwork"]["front_default"],
                        health: healthI["base_stat"],
                        attack:attackI["base_stat"],
                        defense:defenseI["base_stat"],
                        speed:speedI["base_stat"],
                        height:data.height,
                        weight:data.weight
                    })
                }
            }
        
        
            const DBList = await Pokemon.findAll({where:{name:{[Op.iLike]:`%${name}%`}}, include:Type})

            let DBPokemon = []

            for (const poke of DBList) {
                const jsonPoke = poke.toJSON()
                let typeArray = []
                for(const type of jsonPoke.types) {
                    typeArray.push(type.name)
                }
                jsonPoke.types = typeArray
                DBPokemon.push(jsonPoke)
            }


            return ([...ApiPokemon, ...DBPokemon])
    }
    catch (error) {
        throw (error)
    }
}

module.exports = GetPokemonByName