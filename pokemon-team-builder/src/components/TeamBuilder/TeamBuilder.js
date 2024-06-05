import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { TeamContext } from "../../TeamContext";

const TeamBuilder = () => {
  const [pokemons, setPokemons] = useState([]);
  const { team, setTeam } = useContext(TeamContext);
  const teamLimit = 6;

  useEffect(() => {
    // Fetch list of Pokémon from the PokeAPI
    axios.get("https://pokeapi.co/api/v2/pokemon?limit=151")
      .then(response => setPokemons(response.data.results));
  }, []);

  const addToTeam = async (pokemon) => {
    if (team.length < teamLimit) {
      const response = await axios.get(pokemon.url);
      const pokemonDetails = response.data;
      setTeam([...team, { ...pokemonDetails, uniqueId: `${pokemon.name}-${team.length}-${Date.now()}` }]);
    }
  };

  const removeFromTeam = (pokemon) => {
    setTeam(team.filter(p => p.uniqueId !== pokemon.uniqueId));
  };

  return (
    <div>
      <h2>Team Builder</h2>
      <div>
        <h3>Available Pokémon</h3>
        <ul>
          {pokemons.map((pokemon, index) => (
            <li key={`${pokemon.name}-${index}`}>
              <Link to={`/pokemon/${pokemon.name}`}>{pokemon.name}</Link>
              <button 
                onClick={() => addToTeam(pokemon)}
                disabled={team.length >= teamLimit}
              >
                Add to Team
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3>My Team</h3>
        <p>{`You can add ${teamLimit - team.length} more Pokémon to your team.`}</p>
        <ul>
          {team.map(pokemon => (
            <li key={pokemon.uniqueId}>
              <img src={pokemon.sprites.front_default} alt={pokemon.name} />
              <Link to={`/pokemon/${pokemon.name}`}>{pokemon.name}</Link>
              <button onClick={() => removeFromTeam(pokemon)}>Remove from Team</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TeamBuilder;
