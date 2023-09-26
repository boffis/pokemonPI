
const axios = require ("axios")

const GetNames = async () => {
    try{
        const {data} = await axios ("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0")
        return (data)
    }
    catch (error) {
        console.log (error.message)
    }
}

module.exports = GetNames