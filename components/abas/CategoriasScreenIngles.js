import React from 'react';
import { TouchableOpacity, Image, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; 
import VoltarScreen from './VoltarScreen';
import * as Animatable from 'react-native-animatable';
import AnimaisScreen from './AnimaisScreen'; // Importe a tela de animais

const CategoriasScreen = ({ navigation }) => {
  const categorias = [
    { name: 'Animais', image: require('../../assets/imagens/animais.png'), screen: AnimaisScreen }, // Adicione a tela de animais aqui
    { name: 'Letras', image: require('../../assets/imagens/ABC.png') },
    { name: 'Números', image: require('../../assets/imagens/numeros.png') },
    { name: 'Parte do Corpo', image: require('../../assets/imagens/PDC.png') },
    { name: 'Letras', image: require('../../assets/imagens/alimentos.png') },
    { name: 'Alimentos', image: require('../../assets/imagens/cores.png') },
  ];

  const handleCategoriaPress = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <LinearGradient 
      colors={['#E9971D', '#F6F89A', '#E9971D']} 
      style={styles.container}>
      <VoltarScreen />
      
      <View style={styles.categoriasContainer}>
        {categorias.map((categoria, index) => (
          <Animatable.View 
            key={index}
            animation="rubberBand"
            direction="normal"
            easing="ease-out"
            duration={2500}
            delay={index * 500} 
            useNativeDriver
            style={styles.categoriaButtonAnimacao}>
            <TouchableOpacity
              key={index}
              style={styles.categoriaButton}
              onPress={() => handleCategoriaPress(categoria.screen)}>
              <Image
                style={styles.categoriaIcon}
                source={categoria.image}
              />
            </TouchableOpacity>
          </Animatable.View>
        ))}
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
  categoriasContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around', // Alinhar as categorias no centro horizontalmente
    marginTop: 30,
  },
  categoriaButton: {
    width: 160,
    height: 160,
    borderRadius: 90,
    marginVertical: 25,
    borderWidth: 3,
    marginHorizontal: 5, 
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'dashed',
  },
  categoriaButtonAnimacao: {
    alignItems: 'center',
  },
  categoriaIcon: {
    width: 135, 
    height: 135,
    borderRadius: 90,
    resizeMode: 'contain',
  },
});

export default CategoriasScreen;
