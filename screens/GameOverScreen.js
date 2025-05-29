import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Alert,
} from 'react-native';
import { useGame } from '../context/GameContext';

export default function GameOverScreen({ navigation }) {
  const { score, resetGame, addToLeaderboard } = useGame();
  const [playerName, setPlayerName] = useState('');
  const [nameSubmitted, setNameSubmitted] = useState(false);

  const handleSubmitScore = () => {
    if (playerName.trim()) {
      addToLeaderboard(playerName.trim(), score);
      setNameSubmitted(true);
    } else {
      Alert.alert('Error', 'Por favor ingresa tu nombre');
    }
  };

  const handlePlayAgain = () => {
    resetGame();
    navigation.navigate('MainGame');
  };

  const handleGoHome = () => {
    resetGame();
    navigation.navigate('Home');
  };

  const handleViewLeaderboard = () => {
    navigation.navigate('Leaderboard');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>¡Partida Terminada!</Text>

        <View style={styles.scoreContainer}>
          <Text style={styles.scoreLabel}>Puntuación Final:</Text>
          <Text style={styles.scoreValue}>{score} puntos</Text>
        </View>

        {!nameSubmitted ? (
          <View style={styles.nameInputContainer}>
            <Text style={styles.nameLabel}>Ingresa tu nombre:</Text>
            <TextInput
              style={styles.nameInput}
              value={playerName}
              onChangeText={setPlayerName}
              placeholder="Tu nombre"
              maxLength={20}
            />
            <TouchableOpacity
              style={[styles.submitButton, { backgroundColor: '#008080' }]}
              onPress={handleSubmitScore}
            >
              <Text style={styles.buttonText}>Guardar Puntuación</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.successContainer}>
            <Text style={styles.successText}>
              ¡Puntuación guardada exitosamente!
            </Text>
          </View>
        )}

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.playAgainButton, { backgroundColor: '#A8BFA5' }]}
            onPress={handlePlayAgain}
          >
            <Text style={styles.buttonText}>Volver a Jugar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.leaderboardButton, { backgroundColor: '#8FBC8F' }]}
            onPress={handleViewLeaderboard}
          >
            <Text style={styles.buttonText}>Ver Tabla de Clasificación</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.homeButton, { backgroundColor: '#E27D60' }]}
            onPress={handleGoHome}
          >
            <Text style={styles.buttonText}>Volver al Inicio</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.pagination}>
        <View style={styles.dot} />
        <View style={styles.dot} />
        <View style={styles.dot} />
        <View style={styles.dot} />
        <View style={[styles.dot, styles.activeDot]} />
        <View style={styles.dot} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    backgroundColor: '#A9A9A9', // Fondo gris aplicado
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 20,
    textAlign: 'center',
  },
  scoreContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  scoreLabel: {
    fontSize: 20,
    color: '#333333',
    marginBottom: 8,
  },
  scoreValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'green',
    marginBottom: 32,
  },
  nameInputContainer: {
    width: '80%',
    marginBottom: 32,
  },
  nameLabel: {
    fontSize: 16,
    color: '#333333',
    marginBottom: 8,
    textAlign: 'center',
  },
  nameInput: {
    width: '100%',
    padding: 15,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    fontSize: 16,
    backgroundColor: '#ffffff',
  },
  submitButton: {
    width: '100%',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#008080', // Color del botón "Guardar" del antiguo
    marginBottom: 12,
  },
  successContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  successText: {
    fontSize: 16,
    color: 'green',
    textAlign: 'center',
  },
  buttonContainer: {
    width: '80%',
    gap: 12,
  },
  playAgainButton: {
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#A8BFA5', // Color del botón "Volver a Jugar" del antiguo
  },
  leaderboardButton: {
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#8FBC8F', // Color del botón "Ver Tabla de Clasificación" del antiguo
  },
  homeButton: {
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#E27D60', // Color del botón "Volver al Inicio" del antiguo
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  pagination: {
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#d9d9d9',
  },
  activeDot: {
    backgroundColor: '#000000',
  },
});