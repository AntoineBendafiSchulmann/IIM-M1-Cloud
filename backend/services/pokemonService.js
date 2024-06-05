const axios = require("axios");

// Fonction pour obtenir un Pokémon par son ID
async function getPokemonById(id) {
	const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
	return response.data;
}

async function getAllPokemons(limit, offset) {
	const response = await axios.get(
		`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`,
	);
	return response.data;
}

module.exports = {
	getPokemonById,
	getAllPokemons,
};
