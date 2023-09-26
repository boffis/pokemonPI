
const axios = require ("axios")
const {Name} = require("../db")

const DownloadNames = async () => {
    try{
        const {data} = await axios ("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0")

        Name.bulkCreate (data.results)
        console.log ("good")

    }
    catch (error) {
        console.log (error.message)
    }
}

module.exports = DownloadNames