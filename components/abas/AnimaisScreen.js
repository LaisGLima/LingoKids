import React, { useState } from 'react';
import { TouchableOpacity, Image, StyleSheet, View, Text, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import VoltarScreen from './VoltarScreen';
import * as Animatable from 'react-native-animatable';
import { Audio } from 'expo-av';
import { useLanguage } from '../context/LanguageContext'; // Verifique o caminho

const AnimaisScreen = ({ navigation }) => {
  const { language, audios } = useLanguage();

  const animais = [
    { id: 1, name: 'Cachorro', image: require('../../assets/imagens/animais/cachorro.png') },
    { id: 2, name: 'Gato', image: require('../../assets/imagens/animais/gato.png') },
    { id: 3, name: 'Porco', image: require('../../assets/imagens/animais/porco.png') },
    { id: 4, name: 'Elefante', image: require('../../assets/imagens/animais/elefante.png') },
    { id: 5, name: 'Macaco', image: require('../../assets/imagens/animais/macaco.png') },
    { id: 6, name: 'Pássaro', image: require('../../assets/imagens/animais/passaro.png') },
    { id: 7, name: 'Abelha', image: require('../../assets/imagens/animais/abelha.png') },
    { id: 8, name: 'Leão', image: require('../../assets/imagens/animais/leao.png') },
    { id: 9, name: 'Cavalo', image: require('../../assets/imagens/animais/cavalo.png') },
    { id: 10, name: 'Vaca', image: require('../../assets/imagens/animais/vaca.png') },
    { id: 11, name: 'Golfinho', image: require('../../assets/imagens/animais/golfinho.png') },
    { id: 12, name: 'Borboleta', image: require('../../assets/imagens/animais/borboleta.png') },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const animaisPorPagina = 6;
  const totalPages = Math.ceil(animais.length / animaisPorPagina);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const startIndex = (currentPage - 1) * animaisPorPagina;
  const endIndex = Math.min(startIndex + animaisPorPagina, animais.length);
  const animaisPaginados = animais.slice(startIndex, endIndex);

  const playAudio = async (animalName) => {
    const soundObject = new Audio.Sound();
    setLoading(true);
    try {
      await soundObject.loadAsync(audios[language][animalName]);
      await soundObject.playAsync();
    } catch (error) {
      console.error('Erro ao reproduzir áudio:', error);
      Alert.alert('Erro', 'Não foi possível reproduzir o áudio.');
    } finally {
      setLoading(false);
    }
  };

  const animalPress = (id) => {
    console.log('Animal pressionado:', id);
    // Adicione aqui qualquer outra lógica que você deseja executar quando um animal for pressionado
  };

  return (
    <LinearGradient 
      colors={['#E9971D', '#F6F89A', '#E9971D']} 
      style={styles.container}>
      <VoltarScreen />
      <ScrollView>
        <View style={styles.animaisContainer}>
          {animaisPaginados.map((animal) => (
            <Animatable.View 
              key={animal.id}
              animation="rubberBand"
              direction="normal"
              easing="ease-out"
              duration={2500}
              useNativeDriver
              style={styles.animalButtonAnimacao}>
              <TouchableOpacity
                style={styles.animalButton}
                onPress={() => {
                  playAudio(animal.name);
                  animalPress(animal.id);
                }}
                accessibilityLabel={`Botão de ${animal.name}`}
                accessibilityHint={`Pressione para ouvir o som de ${animal.name}`}>
                <View style={styles.cardContainer}>
                  <Image
                    style={styles.cardImage}
                    source={require('../../assets/imagens/cardPrincipal.png')}
                  />
                  <Image
                    style={styles.animalIcon}
                    source={animal.image}
                  />
                  <Text style={styles.animalName}>{animal.name}</Text>
                </View>
              </TouchableOpacity>
            </Animatable.View>
          ))}
        </View>
      </ScrollView>
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FFF" />
        </View>
      )}
      <View style={styles.paginationContainer}>
        <TouchableOpacity onPress={handlePrevPage} accessibilityLabel="Página anterior">
          <Image source={require('../../assets/imagens/setaesquerda.png')} style={styles.paginationImage} />
        </TouchableOpacity>
        <Text style={styles.paginationText}>{currentPage}/{totalPages}</Text>
        <TouchableOpacity onPress={handleNextPage} accessibilityLabel="Próxima página">
          <Image source={require('../../assets/imagens/setadireita.png')} style={styles.paginationImage} />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animaisContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginTop: 125,
  },
  animalButton: {
    alignItems: 'center',
  },
  animalButtonAnimacao: {
    alignItems: 'center',
    marginBottom: 15,
  },
  cardContainer: {
    width: 160,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardImage: {
    width: 170,
    height: 170,
    resizeMode: 'contain',
    position: 'absolute',
    zIndex: -1,
  },
  animalIcon: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    position: 'center',
    top: 60,
  },
  animalName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 110,
    textShadowColor: 'black', 
    textShadowOffset: { width: -1, height: 1 }, 
    textShadowRadius: 2, 
  },
  loadingContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -25,
    marginTop: -25,
    zIndex: 1,
  },
  paginationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  paginationImage: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    marginHorizontal: 10,
  },
  paginationText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginHorizontal: 10,
  },
});

export default AnimaisScreen;
