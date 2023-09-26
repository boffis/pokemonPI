const {Pokemon, Type} = require ("../db")
const axios = require ("axios")

const PostPokemon = async (pokemon) => {
    try {
        const pokeKeys = Object.keys(pokemon)
        let pokeObject = {}
        for (const key of pokeKeys) {
            if (key != "type"){
                pokeObject[key] = pokemon[key]
            }
        }
        const DBPokemon = await Pokemon.create (pokeObject)
        const DBTypes = []
        for (const type of pokemon.type) {
            const DBType = await Type.findOne({where:{name:type}})
            DBTypes.push(DBType)
        }

        await DBPokemon.addTypes(DBTypes)
        console.log("POKEMON POSTED")

    } catch (error) {
        throw (error)
    }
}

module.exports = PostPokemon