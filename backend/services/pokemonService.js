const axios = require("axios");

// Fonction pour obtenir un Pokémon par son ID
async function getPokemonById(id) {
	const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
	return response.data;
}

async function getAllPokemons(limit, offset) {
	const response = await axios.get(
		`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
	);
	return response.data;
}

async function saveBattleResult(battleResult) {
	// Ici, vous pouvez sauvegarder le résultat du combat dans une base de données
	// Pour cet exemple, nous allons juste le loguer
	console.log("Battle result:", battleResult);
	// Vous pouvez remplacer cette partie par la logique pour sauvegarder dans une base de données
}

module.exports = {
	getPokemonById,
	getAllPokemons,
	saveBattleResult,
};
