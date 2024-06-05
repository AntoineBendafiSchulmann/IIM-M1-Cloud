import React, { createContext, useState } from 'react';

export const TeamContext = createContext();

export const TeamProvider = ({ children }) => {
  const [team, setTeam] = useState([]);
  const [teamName, setTeamName] = useState(''); 

  return (
    <TeamContext.Provider value={{ team, setTeam, teamName, setTeamName }}> 
      {children}
    </TeamContext.Provider>
  );
};