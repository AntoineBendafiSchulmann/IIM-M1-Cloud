import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api"
});

export const getPokemonById = (id) => api.get(`/pokemon/${id}`);
export const createTeam = (team) => api.post(`/teams`, team);
export const getTeams = () => api.get(`/teams`);
export const simulateBattle = (team1, team2) => api.post(`/battle`, { team1, team2 });
