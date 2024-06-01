import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { useLanguage } from '../context/LanguageContext'; // Importe o hook de idioma
import VoltarScreen from './VoltarScreen';

const CategoriasScreen = ({ navigation }) => {
  const { language } = useLanguage(); // Obtém o idioma atual do contexto

  // Defina as categorias por idioma
  const categoriasPorIdioma = {
    Português: [
      { name: 'AlimentosP', image: require('../../assets/imagens/alimentos/alimentos.png'), screen: 'AlimentosP' },
      { name: 'AnimaisP', image: require('../../assets/imagens/animais/animais.png'), screen: 'AnimaisP' },
      { name: 'CoresP', image: require('../../assets/imagens/cores/cores.png'), screen: 'CoresP' },
      { name: 'LetrasP', image: require('../../assets/imagens/letras/ABC.png'), screen: 'LetrasP' },
      { name: 'NúmerosP', image: require('../../assets/imagens/numeros/numeros.png'), screen: 'NumerosP' },
      { name: 'Parte do Corpo P', image: require('../../assets/imagens/partes_do_corpo/PDC.png'), screen: 'ParteDoCorpoP' },
    ],
    Inglês: [
      { name: 'AlimentosI', image: require('../../assets/imagens/alimentos/alimentos.png'), screen: 'AlimentosI' },
      { name: 'AnimaisI', image: require('../../assets/imagens/animais/animais.png'), screen: 'AnimaisI' },
      { name: 'CoresI', image: require('../../assets/imagens/cores/cores.png'), screen: 'CoresI' },
      { name: 'LetrasI', image: require('../../assets/imagens/letras/ABC.png'), screen: 'LetrasI' },
      { name: 'NúmerosI', image: require('../../assets/imagens/numeros/numeros.png'), screen: 'NumerosI' },
      { name: 'Parte do Corpo I', image: require('../../assets/imagens/partes_do_corpo/PDC.png'), screen: 'ParteDoCorpoI' },
    ],
    Espanhol: [
      { name: 'AlimentosE', image: require('../../assets/imagens/alimentos/alimentos.png'), screen: 'AlimentosE' },
      { name: 'AnimaisE', image: require('../../assets/imagens/animais/animais.png'), screen: 'AnimaisE' },
      { name: 'CoresE', image: require('../../assets/imagens/cores/cores.png'), screen: 'CoresE' },
      { name: 'LetrasE', image: require('../../assets/imagens/letras/ABC.png'), screen: 'LetrasE' },
      { name: 'NúmerosE', image: require('../../assets/imagens/numeros/numeros.png'), screen: 'NumerosE' },
      { name: 'Parte do Corpo E', image: require('../../assets/imagens/partes_do_corpo/PDC.png'), screen: 'ParteDoCorpoE' },
    ],
  };

  // Obtém as categorias correspondentes ao idioma atual
  const categorias = categoriasPorIdioma[language] || [];

  const categoriaPress = (screen) => {
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
              style={styles.categoriaButton}
              onPress={() => categoriaPress(categoria.screen)}>
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
    justifyContent: 'space-around',
    marginTop: 30,
  },
  categoriaButton: {
    width: 160,
    height: 160,
    borderRadius: 80,
    marginVertical: 20,
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
    width: 120,
    height: 120,
    borderRadius: 60,
    resizeMode: 'contain',
  },
});

export default CategoriasScreen;
