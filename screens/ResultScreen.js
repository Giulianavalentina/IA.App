import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
} from 'react-native';
import { useGame } from '../context/GameContext';

export default function ResultScreen({ navigation }) {
  const {
    currentObject,
    capturedImage,
    markObjectAsFound,
    setCapturedImage,
    setCurrentObject
  } = useGame();

  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simular evaluación de IA
    const evaluateImage = () => {
      setTimeout(() => {
        // Simulamos un resultado aleatorio (70% de probabilidad de éxito)
        const isCorrect = Math.random() > 0.3;
        setResult(isCorrect);
        setIsLoading(false);
      }, 2000);
    };

    evaluateImage();
  }, []);

  const handleNext = () => {
    if (result) {
      markObjectAsFound(currentObject.id);
    }
    setCapturedImage(null);
    setCurrentObject(null);
    navigation.navigate('MainGame');
  };

  const handleRetry = () => {
    setCapturedImage(null);
    navigation.navigate('Camera');
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Evaluando...</Text>
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>🔄</Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Resultado de la IA</Text>

        {capturedImage && (
          <View style={styles.imageContainer}>
            <Image source={{ uri: capturedImage }} style={styles.capturedImage} />
          </View>
        )}

        <View style={styles.resultContainer}>
          <Text style={[
            styles.resultText,
            result ? styles.correctText : styles.incorrectText
          ]}>
            {result ? '✅ ¡Correcto!' : '❌ Incorrecto'}
          </Text>

          <Text style={styles.objectText}>
            Objeto buscado: {currentObject?.name} {currentObject?.icon}
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          {!result && (
            <TouchableOpacity
              style={styles.retryButton}
              onPress={handleRetry}
            >
              <Text style={styles.buttonText}>Reintentar</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={styles.nextButton}
            onPress={handleNext}
          >
            <Text style={styles.buttonText}>
              {result ? 'Siguiente' : 'Continuar'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.pagination}>
        <View style={styles.dot} />
        <View style={styles.dot} />
        <View style={styles.dot} />
        <View style={[styles.dot, styles.activeDot]} />
        <View style={styles.dot} />
        <View style={styles.dot} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A9A9A9', // Fondo gris aplicado
    margin: 20,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 24,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 48,
    animation: 'spin 1s linear infinite',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  capturedImage: {
    width: 200,
    height: 200,
    borderRadius: 12,
    backgroundColor: '#d9d9d9',
  },
  resultContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  resultText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  correctText: {
    color: '#4caf50',
  },
  incorrectText: {
    color: '#f44336',
  },
  objectText: {
    fontSize: 16,
    color: '#312b2b',
    textAlign: 'center',
  },
  buttonContainer: {
    gap: 12,
  },
  retryButton: {
    backgroundColor: '#f44336',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  nextButton: {
    backgroundColor: '#312b2b',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 24,
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#d9d9d9',
  },
  activeDot: {
    backgroundColor: '#000000',
  },
});