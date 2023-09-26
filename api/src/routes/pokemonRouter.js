const { Router } = require('express');
const GetPokemons = require("../controllers/GetPokemons")
const GetPokemonById = require("../controllers/GetPokemonById")
const GetPokemonByName = require("../controllers/GetPokemonByName")
const PostPokemon = require("../controllers/PostPokemon")

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const pokemonRouter = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

pokemonRouter.get("/name", async (req, res) => {
    try {
        const {name} = req.query
        const pokemonList = await GetPokemonByName(name)
        if (pokemonList.length>0){
            res.status(200).send(pokemonList)
        } else {
            res.status(404).send("trouble")
        }
    }
    catch (error) {
        res.status(400).send(error.message)
    }
})

pokemonRouter.get("/:id", async (req, res) => {
    try {
        const {id} = req.params
        const pokemon = await GetPokemonById(id)
        res.status(200).send(pokemon)
    }
    catch (error) {
        res.status(400).send(error.message)
    }
})

pokemonRouter.get("/", async (req, res) => {
    try {
        const list = await GetPokemons()
        res.status(200).send(list)
    }
    catch (error) {
        res.status(400).send(error.message)
    }
})

pokemonRouter.post("/", async (req, res) => {
    try {
        await PostPokemon(req.body)
        res.status(200).send("success!")
    } catch (error) {
        res.status(400).send(error.message)
    }
})


module.exports = pokemonRouter;
