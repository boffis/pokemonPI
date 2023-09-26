const {Type} = require ("../db")
const axios = require ("axios")

const DownloadTypes = async  () => {
    try {
        const TypeList = await axios ("https://pokeapi.co/api/v2/type")
        const TypeListFormatted = TypeList.data.results.map(type=> {return({name :type.name})})
        await Type.bulkCreate(TypeListFormatted)
    }
    catch (error) {
        console.log (error.message)
    }
}

module.exports = DownloadTypes