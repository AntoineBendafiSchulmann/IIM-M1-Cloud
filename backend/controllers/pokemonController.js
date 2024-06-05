const pokemonService = require("../services/pokemonService");

async function getPokemonById(req, res) {
	try {
		const pokemonId = req.params.id;
		const pokemon = await pokemonService.getPokemonById(pokemonId);
		res.json(pokemon);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}

async function getAllPokemons(req, res) {
	try {
		const limit = req.params.limit || 20;
		const offset = req.params.offset || 0;
		const pokemons = await pokemonService.getAllPokemons(limit, offset);
		res.json(pokemons);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}

module.exports = {
	getPokemonById,
	getAllPokemons,
};
