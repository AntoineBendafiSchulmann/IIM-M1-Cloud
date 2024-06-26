import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { TeamContext } from "../../TeamContext";
import './TeamBuilder.css';

const TeamBuilder = () => {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const { team, setTeam, teamName, setTeamName } = useContext(TeamContext);
  const teamLimit = 6;
  const limit = 20;

  useEffect(() => {
    const loadPokemons = async () => {
      setLoading(true);

      try {
        const response = await axios.get(`https://ulxy6s8cub.execute-api.us-east-1.amazonaws.com/prod/getPokemons`, { headers: { 'Cache-Control': 'no-cache' } });
        if (response.data && response.data.results) {
          const promises = response.data.results.map(pokemon => {
            const id = pokemon.url.split('/').filter(Boolean).pop();
            return axios.get(`/prod/getPokemonById/${id}`);
          });
          const responses = await Promise.all(promises);
          const pokemonsWithDetails = responses.map(response => response.data);
          setPokemons(prevPokemons => [...prevPokemons, ...pokemonsWithDetails]);
        }
      } catch (error) {
        console.error('Error fetching pokemons:', error);
      }

      setLoading(false);
    };
    loadPokemons();
  }, [offset]);

  const loadMorePokemons = () => {
    setOffset(prevOffset => prevOffset + limit);
  };

  const addToTeam = async (pokemon) => {
    const id = pokemon.id;

    if (!id) {
      console.error('Pokemon ID is undefined');
      return;
    }

    if (team.length < teamLimit) {
      try {
        const response = await axios.get(`/api/getPokemonById/${id}`);
        const pokemonDetails = response.data;
        setTeam([...team, { ...pokemonDetails, sprite: pokemonDetails.sprites.front_default, uniqueId: `${pokemon.name}-${team.length}-${Date.now()}` }]);
      } catch (error) {
        console.error('Error adding pokemon to team:', error);
      }
    }
  };

  const removeFromTeam = (pokemon) => {
    setTeam(team.filter(p => p.uniqueId !== pokemon.uniqueId));
  };

  return (
    <div className="team-builder">
      <h2>Team Builder</h2>
      <h3>Available Pokémon</h3>
      <ul className="pokemon-list">
        {pokemons.map((pokemon, index) => (
          <li key={`${pokemon.id}-${index}`} className="pokemon-card">
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
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
      {loading && <p>Loading...</p>}
      {!loading && (
        <button onClick={loadMorePokemons} className="load-more">
          Load More Pokémon
        </button>
      )}
      <div className="my-team">
        <h3>My Team</h3>
        <p>{`You can add ${teamLimit - team.length} more Pokémon to your team.`}</p>

        <label>
          Team Name:
          <input type="text" value={teamName} onChange={e => setTeamName(e.target.value)} />
        </label>

        <ul className="pokemon-list">
          {team.map(pokemon => (
            <li key={pokemon.uniqueId} className="pokemon-card">
              <img src={pokemon.sprites.front_default} alt={pokemon.name} />
              <Link to={`/pokemon/${pokemon.name}`}>{pokemon.name}</Link>
              <button className="remove" onClick={() => removeFromTeam(pokemon)}>Remove from Team</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TeamBuilder;
