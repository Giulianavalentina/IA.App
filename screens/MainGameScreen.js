import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
} from 'react-native';
import { useGame } from '../context/GameContext';
import billar8Image from '../imag/billar8.png';
import campanaImage1 from '../imag/campana.png';
import dadosImage from '../imag/dados.png';
import lentesImage from '../imag/lentes.png';
import tazaImage from '../imag/taza.png';
import relojImage from '../imag/reloj.png';

const imageMap = {
  'billar8.png': billar8Image,
  'campana.png': campanaImage1,
  'dados.png': dadosImage,
  'lentes.png': lentesImage,
  'taza.png': tazaImage,
  'reloj.png': relojImage,
};

export default function MainGameScreen({ navigation }) {
  const { objects, setCurrentObject, score, isGameComplete } = useGame();

  React.useEffect(() => {
    if (isGameComplete()) {
      navigation.navigate('GameOver');
    }
  }, [objects, navigation, isGameComplete]);

  const handleObjectPress = (object) => {
    if (!object.found) {
      setCurrentObject(object);
      navigation.navigate('Camera');
    }
  };

  const renderRowObjects = (rowObjects) => (
    <View key={rowObjects[0]?.id || 'row'} style={{ flexDirection: 'row', justifyContent: 'space-around', width: '100%' }}>
      {rowObjects.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={[
            styles.objectCard,
            item.found && styles.foundObjectCard
          ]}
          onPress={() => handleObjectPress(item)}
          disabled={item.found}
        >
          <Image source={imageMap[item.image]} style={styles.objectImage} resizeMode="contain" />
          <Text style={styles.objectName}>{item.name}</Text>
          {item.found && (
            <View style={styles.foundIndicator}>
              <Text style={styles.foundIcon}>👁️</Text>
            </View>
          )}
        </TouchableOpacity>
      ))}
      {rowObjects.length === 1 && <View style={{ width: '45%' }} />} {/* Placeholder for even spacing */}
    </View>
  );

  const pairs = objects.reduce((acc, curr, index, array) => {
    if (index % 2 === 0) {
      acc.push(array.slice(index, index + 2));
    }
    return acc;
  }, []);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: '#A9A9A9' }]}>
      <View style={styles.header}>
        <Text style={styles.title}>Encuentra los objetos</Text>
        <Text style={styles.score}>Puntos: {score}</Text>
      </View>

      <View style={styles.content}>
        {pairs.map(renderRowObjects)}
      </View>

      <View style={styles.pagination}>
        {/* ... pagination dots ... */}
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
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    color: '#000000',
    marginBottom: 8,
  },
  score: {
    fontSize: 16,
    color: '#000000',
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 10,
    marginTop: 10,
    gap: 10, // Espacio entre filas
    alignItems: 'center',
  },
  objectCard: {
    width: '45%',
    aspectRatio: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    borderWidth: 1,
    borderColor: '#000000',
  },
  foundObjectCard: {
    backgroundColor: 'rgba(144, 238, 144, 0.5)',
  },
  objectName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000000',
    textAlign: 'center',
    marginTop: 5,
  },
  foundIndicator: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'transparent',
  },
  foundIcon: {
    fontSize: 16,
    color: '#2E7D32',
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
  objectImage: {
    width: '70%',
    height: '70%',
    resizeMode: 'contain',
    marginBottom: 5,
  },
});