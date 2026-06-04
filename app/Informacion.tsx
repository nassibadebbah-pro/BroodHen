import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import styles from '../scripts/styles';


const birds = [
  {
    id: 1,
    name: 'Pavo Real',
    image: require('../assets/images/Pavo_Real.jpg'),
    info: `Plumaje brillante: Cola larga adornada con colores vivos (azul, verde, dorado).
Gran tamaño: La cola puede medir hasta 1.5 metros.
Comportamiento: Tranquilo, pero emite sonidos fuertes.
Alimentación: Granos, semillas, frutas e insectos.
Adaptabilidad: Necesita espacios amplios y vive en diversos entornos.
Uso: Para decoración y exhibiciones de aves.
Longevidad: Vive entre 15 y 20 años.`,
  },
  {
    id: 2,
    name: 'Pollo sedosos',
    image: require('../assets/images/pol_sel.jpg'),
    info: `Apariencia única: Plumaje suave similar al algodón o seda, con piel negra.
Tamaño pequeño: Es una raza pequeña, adecuada para espacios limitados.
Carácter tranquilo: Comportamiento amigable, dócil y tranquilo.
Producción: Huevos pequeños, conocido por ser buen incubador.
Adaptabilidad: Soporta climas moderados y necesita cuidados especiales en clima frío.
Uso: Criado principalmente para decoración y cría doméstica.
Longevidad: Vive alrededor de 6-8 años.`,
  },
  {
    id: 3,
    name: 'Pollo sussex moteado',
    image: require('../assets/images/sussex_moteado.jpg'),
    info: `Apariencia atractiva: Plumaje decorado con colores que parecen flores.
Tamaño pequeño: Es una raza bantam, adecuada para espacios pequeños.
Carácter tranquilo: Comportamiento amigable y dócil.
Producción: Huevos pequeños, ideal para incubación.
Adaptabilidad: Soporta clima moderado y frío, sensible al calor.
Uso: Criado para decoración y exhibiciones de aves.
Longevidad: 5-8 años.`,
  },
  {
    id: 4,
    name: 'Avestruz',
    image: require('../assets/images/Avestruz.jpg'),
    info: `Tamaño gigante: El avestruz es el ave más grande del mundo.
Adaptabilidad: Resistente a climas cálidos y secos, ideal para áreas abiertas.
Comportamiento: Es una especie solitaria y territorial.
Alimentación: Se alimenta de plantas y algunos insectos.
Reproducción: Pone grandes huevos que son incubados por ambos padres.
Velocidad: Puede correr a velocidades de hasta 70 km/h.
Longevidad: Vive entre 40 y 50 años en cautiverio.`
},
{
    id: 5,
    name: 'Patos',
    image: require('../assets/images/Patos.jpg'),
    info: `Tamaño variable: Los patos pueden ser de tamaño pequeño a mediano.
Hábitat: Se encuentran en cuerpos de agua dulce como lagos y estanques.
Alimentación: Se alimentan de plantas acuáticas, insectos y pequeños peces.
Comportamiento: Son aves sociales que viven en grupos.
Reproducción: Las hembras ponen huevos en nidos construidos cerca del agua.
Adaptabilidad: Se adaptan bien tanto a climas fríos como cálidos.
Longevidad: Vive entre 5 y 10 años, dependiendo de las condiciones.`
},
{
    id: 6,
    name: 'Gansos',
    image: require('../assets/images/Gansos.jpg'),
    info: `Tamaño grande: Los gansos tienen un tamaño considerable, a menudo más grandes que los patos.
Comportamiento: Son aves sociales que migran en grandes bandadas.
Reproducción: Las hembras ponen varios huevos y cuidan de ellos con dedicación.
Alimentación: Se alimentan principalmente de hierba, aunque también pueden comer pequeños insectos.
Adaptabilidad: Son capaces de sobrevivir en una variedad de climas, desde fríos hasta templados.
Migración: Realizan migraciones largas durante las estaciones frías.
Longevidad: Su esperanza de vida es de 10 a 20 años.`
}
];

const InformacionScreen = () => {
  
  const router = useRouter() as any;

  const handlePress = (bird: typeof birds[0]) => {
    router.push({
      pathname: '/InfPollo',
      params: { 
        name: bird.name, 
        info: bird.info, 
        image: bird.image 
      }
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {birds.map((bird) => (
        <View key={bird.id} style={styles.item}>
          <Image source={bird.image} style={styles.image} />
          <TouchableOpacity
            style={styles.buton}
            onPress={() => handlePress(bird)}
          >
            <Text style={styles.butonText}>{bird.name}</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
};

export default InformacionScreen;