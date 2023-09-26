const { Router } = require('express');
const GetTypes = require ("../controllers/GetTypes")
const pokemonRouter = require ("./pokemonRouter");
const GetNames = require('../controllers/GetNames');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/types", async (req, res) => {
    try{
        const types = await GetTypes()
        res.status(200).send(types)
    }
    catch (error) {
        res.status(400).send(error.message)
    }
})

router.get("/names", async (req, res) => {
    try{
        const names = await GetNames()
        res.status(200).send(names.results)
    }
    catch (error) {
        res.status(400).send(error.message)
    }
})

router.use("/pokemons", pokemonRouter)

module.exports = router;
