import React, { useState, useEffect, useContext, useCallback } from "react";
import axios from "axios";
import { TeamContext } from "../../TeamContext";
import { useNavigate } from "react-router-dom";
import './BattleSimulator.css';

const diceImages = {
  1: "/images/dice/dice1.png",
  2: "/images/dice/dice2.png",
  3: "/images/dice/dice3.png",
  4: "/images/dice/dice4.png",
  5: "/images/dice/dice5.png",
  6: "/images/dice/dice6.png",
};

const BattleSimulator = () => {
  const { team: team1, teamName } = useContext(TeamContext);
  const [allPokemons, setAllPokemons] = useState([]);
  const [team2, setTeam2] = useState([]);
  const [result, setResult] = useState("");
  const [diceResults, setDiceResults] = useState({ team1: [], team2: [] });
  const [animate, setAnimate] = useState(false);
  const teamLimit = 6;
  const navigate = useNavigate();

  useEffect(() => {
    if (team1.length === 0) {
      navigate("/team-builder");
    }
  }, [team1, navigate]);

  useEffect(() => {
    axios.get("https://ulxy6s8cub.execute-api.us-east-1.amazonaws.com/prod/getPokemons?limit=151")
      .then(response => setAllPokemons(response.data.results));
  }, []);
  
  const generateRandomTeam = useCallback(async () => {
    let randomTeam = [];
    while (randomTeam.length < teamLimit) {
      const randomIndex = Math.floor(Math.random() * allPokemons.length);
      const randomPokemon = allPokemons[randomIndex];
      if (randomPokemon && randomPokemon.url && !randomTeam.some(p => p.name === randomPokemon.name)) {
        const id = randomPokemon.url.split('/').filter(Boolean).pop();
        const response = await axios.get(`https://ulxy6s8cub.execute-api.us-east-1.amazonaws.com/prod/getPokemonById/${id}`);
        const pokemonDetails = response.data;
        randomTeam.push({ ...pokemonDetails, uniqueId: `${pokemonDetails.name}-${randomTeam.length}-${Date.now()}` });
      }
    }
    setTeam2(randomTeam);
  }, [allPokemons, teamLimit]);
  
  const rollDice = () => {
    return Math.floor(Math.random() * 6) + 1; 
  };

  const simulateBattle = async () => {
    setAnimate(true);
    let team1Score = 0;
    let team2Score = 0;
    const team1Dice = [];
    const team2Dice = [];

    for (let i = 0; i < teamLimit; i++) {
      const roll1 = rollDice();
      const roll2 = rollDice();
      team1Score += roll1;
      team2Score += roll2;
      team1Dice.push(roll1);
      team2Dice.push(roll2);
    }

    setTimeout(() => {
      setDiceResults({ team1: team1Dice, team2: team2Dice });
      setAnimate(false);
    }, 1000); // La durée de l'animation

    const winner = team1Score > team2Score ? "Team 1 wins!" : "Team 2 wins!";
    const resultMessage = `${winner} (Team 1: ${team1Score}, Team 2: ${team2Score})`;
    setResult(resultMessage);

    const battleResult = {
      winner: winner,
      team1: {
        name: teamName,
        score: team1Score,
        pokemons: team1.map(pokemon => pokemon.name)
      },
      team2: {
        name: "Random Team",
        score: team2Score,
        pokemons: team2.map(pokemon => pokemon.name)
      }
    };

    try {
      await axios.post('http://localhost:3000/api/battle-results', battleResult);
      console.log('Battle result submitted successfully');
    } catch (error) {
      console.error('Error submitting battle result', error);
    }
  };

  useEffect(() => {
    if (allPokemons.length > 0) {
      generateRandomTeam();
    }
  }, [allPokemons, generateRandomTeam]);

  return (
    <div className="battle-simulator">
      <h2>Battle Simulator</h2>
      <div>
        <h3>{teamName}</h3>
        <ul className="team">
          {team1.map((pokemon, index) => (
            <li key={pokemon.uniqueId} className="pokemon-card">
              <img src={pokemon.sprites.front_default} alt={pokemon.name} />
              {pokemon.name}
              <div className={`dice ${animate ? 'rolling' : 'rolled'}`}>
                {diceResults.team1[index] && <img src={diceImages[diceResults.team1[index]]} alt={`Dice showing ${diceResults.team1[index]}`} />}
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Team 2 (Random)</h3>
        <ul className="team">
          {team2.map((pokemon, index) => (
            <li key={pokemon.uniqueId} className="pokemon-card">
              <img src={pokemon.sprites.front_default} alt={pokemon.name} />
              {pokemon.name}
              <div className={`dice ${animate ? 'rolling' : 'rolled'}`}>
                {diceResults.team2[index] && <img src={diceImages[diceResults.team2[index]]} alt={`Dice showing ${diceResults.team2[index]}`} />}
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="battle-actions">
        <button className="simulate-button" onClick={simulateBattle}>Simulate Battle</button>
        {result && <div className="result">{result}</div>}
      </div>
    </div>
  );
};

export default BattleSimulator;