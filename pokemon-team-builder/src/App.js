import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Auth from "./components/Auth/Auth";
import TeamBuilder from "./components/TeamBuilder/TeamBuilder";
import PokemonDetails from "./components/PokemonDetails/PokemonDetails";
import BattleSimulator from "./components/BattleSimulator/BattleSimulator";
import { TeamProvider } from "./TeamContext";

function App() {
  return (
    <TeamProvider>
      <Router>
        <div>
          <nav>
            <ul>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/team-builder">Team Builder</Link></li>
              <li><Link to="/battle-simulator">Battle Simulator</Link></li>
            </ul>
          </nav>
          <Routes>
            <Route path="/login" element={<Auth />} />
            <Route path="/team-builder" element={<TeamBuilder />} />
            <Route path="/pokemon/:id" element={<PokemonDetails />} />
            <Route path="/battle-simulator" element={<BattleSimulator />} />
            <Route path="/" element={<TeamBuilder />} />
          </Routes>
        </div>
      </Router>
    </TeamProvider>
  );
}

export default App;
