const {Type} = require ("../db")

const GetTypes = async () => {
    try {
        const DBList = await Type.findAll ()
        const list = DBList.map(type => {return(type.toJSON())})
        return (list)
    }
    catch (error) {
        console.log(error)
        throw (error.message)
    }
}

module.exports = GetTypes