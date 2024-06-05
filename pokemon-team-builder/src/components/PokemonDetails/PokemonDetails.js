import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const PokemonDetails = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then(response => setPokemon(response.data));
  }, [id]);

  if (!pokemon) return <div>Loading...</div>;

  return (
    <div>
      <h2>{pokemon.name}</h2>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <p>Height: {pokemon.height}</p>
      <p>Weight: {pokemon.weight}</p>
      <p>Base Experience: {pokemon.base_experience}</p>
      <p>Abilities:</p>
      <ul>
        {pokemon.abilities.map(ability => (
          <li key={ability.ability.name}>{ability.ability.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default PokemonDetails;
