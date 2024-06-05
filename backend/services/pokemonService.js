const axios = require("axios");

// Fonction pour obtenir un Pokémon par son ID
async function getPokemonById(id) {
	const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
	return response.data;
}

module.exports = {
	getPokemonById,
};
