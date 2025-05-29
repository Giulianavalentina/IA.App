import React, { createContext, useContext, useState } from 'react';

const GameContext = createContext();

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};

// Datos de ejemplo para los objetos a encontrar
const INITIAL_OBJECTS = [
  { id: 1, name: 'Gafas', image: 'lentes.png', found: false },
  { id: 2, name: 'Reloj', image: 'reloj.png', found: false },
  { id: 3, name: 'Campana', image: 'campana.png', found: false },
  { id: 4, name: 'Billar 8', image: 'billar8.png', found: false },
  { id: 5, name: 'Taza', image: 'taza.png', found: false },
  { id: 6, name: 'Dados', image: 'dados.png', found: false },
];

// Datos de ejemplo para la tabla de clasificación
const INITIAL_LEADERBOARD = [
  { id: 1, name: 'Jugador 1', score: 100 },
  { id: 2, name: 'Jugador 2', score: 95 },
  { id: 3, name: 'Jugador 3', score: 90 },
  { id: 4, name: 'Jugador 4', score: 85 },
];

export const GameProvider = ({ children }) => {
  const [objects, setObjects] = useState(INITIAL_OBJECTS);
  const [currentObject, setCurrentObject] = useState(null);
  const [score, setScore] = useState(0);
  const [leaderboard, setLeaderboard] = useState(INITIAL_LEADERBOARD);
  const [capturedImage, setCapturedImage] = useState(null);

  const resetGame = () => {
    setObjects(INITIAL_OBJECTS);
    setCurrentObject(null);
    setScore(0);
    setCapturedImage(null);
  };

  const markObjectAsFound = (objectId) => {
    setObjects(prev => 
      prev.map(obj => 
        obj.id === objectId ? { ...obj, found: true } : obj
      )
    );
    setScore(prev => prev + 10);
  };

  const addToLeaderboard = (playerName, playerScore) => {
    const newEntry = {
      id: Date.now(),
      name: playerName,
      score: playerScore
    };
    setLeaderboard(prev => 
      [...prev, newEntry].sort((a, b) => b.score - a.score).slice(0, 10)
    );
  };

  const isGameComplete = () => {
    return objects.every(obj => obj.found);
  };

  const value = {
    objects,
    currentObject,
    score,
    leaderboard,
    capturedImage,
    setCurrentObject,
    setCapturedImage,
    resetGame,
    markObjectAsFound,
    addToLeaderboard,
    isGameComplete,
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
};