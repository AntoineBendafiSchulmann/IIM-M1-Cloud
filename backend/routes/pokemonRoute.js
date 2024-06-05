const express = require("express");
const router = express.Router();
const pokemonController = require("../controllers/pokemonController");

// Définition des routes
router.get("/pokemon/:id", pokemonController.getPokemonById);

module.exports = router;
