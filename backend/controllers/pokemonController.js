const pokemonService = require("../services/pokemonService");

// Exemple de méthode dans le contrôleur pour obtenir un Pokémon par son ID
async function getPokemonById(req, res) {
	try {
		const pokemonId = req.params.id;
		const pokemon = await pokemonService.getPokemonById(pokemonId);
		res.json(pokemon);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}

module.exports = {
	getPokemonById,
};
