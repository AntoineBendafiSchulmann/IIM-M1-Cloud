import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { TeamContext } from "../../TeamContext";
import { useNavigate } from "react-router-dom";

const BattleSimulator = () => {
  const { team: team1 } = useContext(TeamContext);
  const [allPokemons, setAllPokemons] = useState([]);
  const [team2, setTeam2] = useState([]);
  const [result, setResult] = useState("");
  const teamLimit = 6;
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to team-builder if team1 is empty
    if (team1.length === 0) {
      navigate("/team-builder");
    }
  }, [team1, navigate]);

  useEffect(() => {
    // Fetch list of Pokémon from the PokeAPI
    axios.get("https://pokeapi.co/api/v2/pokemon?limit=151")
      .then(response => setAllPokemons(response.data.results));
  }, []);

  const addToTeam2 = async (pokemon) => {
    if (team2.length < teamLimit) {
      const response = await axios.get(pokemon.url);
      const pokemonDetails = response.data;
      setTeam2([...team2, { ...pokemonDetails, uniqueId: `${pokemon.name}-${team2.length}-${Date.now()}` }]);
    }
  };

  const removeFromTeam2 = (pokemon) => {
    setTeam2(team2.filter(p => p.uniqueId !== pokemon.uniqueId));
  };

  const generateRandomTeam = async () => {
    let randomTeam = [];
    while (randomTeam.length < teamLimit) {
      const randomIndex = Math.floor(Math.random() * allPokemons.length);
      const randomPokemon = allPokemons[randomIndex];
      if (randomPokemon && randomPokemon.url && !randomTeam.some(p => p.name === randomPokemon.name)) {
        const response = await axios.get(randomPokemon.url);
        const pokemonDetails = response.data;
        randomTeam.push({ ...pokemonDetails, uniqueId: `${pokemonDetails.name}-${randomTeam.length}-${Date.now()}` });
      }
    }
    setTeam2(randomTeam);
  };

  const rollDice = () => {
    return Math.floor(Math.random() * 6) + 1; 
  };

  const simulateBattle = () => {
    let team1Score = 0;
    let team2Score = 0;

    for (let i = 0; i < teamLimit; i++) {
      team1Score += rollDice();
      team2Score += rollDice();
    }

    const winner = team1Score > team2Score ? "Team 1 wins!" : "Team 2 wins!";
    setResult(`${winner} (Team 1: ${team1Score}, Team 2: ${team2Score})`);
  };

  useEffect(() => {
    if (allPokemons.length > 0) {
      generateRandomTeam();
    }
  }, [allPokemons]);

  return (
    <div>
      <h2>Battle Simulator</h2>
      <div>
        <h3>Team 1</h3>
        <ul>
          {team1.map(pokemon => (
            <li key={pokemon.uniqueId}>
              <img src={pokemon.sprites.front_default} alt={pokemon.name} />
              {pokemon.name}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Team 2 (Random)</h3>
        <ul>
          {team2.map(pokemon => (
            <li key={pokemon.uniqueId}>
              <img src={pokemon.sprites.front_default} alt={pokemon.name} />
              {pokemon.name} 
            </li>
          ))}
        </ul>
      </div>
      <button onClick={simulateBattle}>Simulate Battle</button>
      {result && <p>{result}</p>}
    </div>
  );
};

export default BattleSimulator;
