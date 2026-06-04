import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  Pressable,
} from 'react-native';
import { Link } from 'expo-router';
import styles from '../scripts/styles'; 

const Header = () => {
  const [menuVisible, setMenuVisible] = useState(false); 

  const toggleMenu = () => {
    setMenuVisible(!menuVisible); 
  };

  return (
    <View>
      {/* الشريط العلوي للهيدر */}
      <View style={styles.headerH}> 
        <TouchableOpacity onPress={toggleMenu}>
          <Image
            source={require('../assets/images/icon-menu.png')} 
            style={styles.menuIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>BroodHen</Text>
        <View style={styles.rightSpace}></View> 
      </View>

      {/* القائمة الجانبية المنبثقة */}
      <Modal
        visible={menuVisible}
        transparent
        animationType="fade"
        onRequestClose={toggleMenu}
      >
        <Pressable style={styles.modalBackground} onPress={toggleMenu}>
          <View style={styles.menuContainer}>
            
            {/* رابط: Nueva eclosión */}
            <Link href="/Nueva_ecl" asChild>
              <TouchableOpacity style={styles.menuItem} onPress={toggleMenu}>
                <View style={styles.menuRow}>
                  <Image
                    source={require('../assets/images/mas.png')}
                    style={styles.menuIconSmall} // ✅ استخدام الكلاس الصحيح الصغير لمنع الطيران خلف النص
                  />
                  <Text style={styles.menuText}>Nueva eclosión</Text>
                </View>
              </TouchableOpacity>
            </Link>

            {/* رابط: Archivo */}
            <Link href="/Archivos" asChild>
              <TouchableOpacity style={styles.menuItem} onPress={toggleMenu}>
                <View style={styles.menuRow}>
                  <Image
                    source={require('../assets/images/archivo.png')}
                    style={styles.menuIconSmall}
                  />
                  <Text style={styles.menuText}>Archivo</Text>
                </View>
              </TouchableOpacity>
            </Link>

            {/* رابط: Tienda */}
            <Link href="/Tienda" asChild>
              <TouchableOpacity style={styles.menuItem} onPress={toggleMenu}>
                <View style={styles.menuRow}>
                  <Image
                    source={require('../assets/images/tienda.png')}
                    style={styles.menuIconSmall}
                  />
                  <Text style={styles.menuText}>Tienda</Text>
                </View>
              </TouchableOpacity>
            </Link>

            {/* رابط: Información */}
            <Link href="/Informacion" asChild>
              <TouchableOpacity style={styles.menuItem} onPress={toggleMenu}>
                <View style={styles.menuRow}>
                  <Image
                    source={require('../assets/images/info.png')}
                    style={styles.menuIconSmall}
                  />
                  <Text style={styles.menuText}>Información</Text>
                </View>
              </TouchableOpacity>
            </Link>

            {/* رابط: Ajustes */}
            <Link href="/Ajustes" asChild>
              <TouchableOpacity style={styles.menuItem} onPress={toggleMenu}>
                <View style={styles.menuRow}>
                  <Image
                    source={require('../assets/images/ajustes.png')}
                    style={styles.menuIconSmall}
                  />
                  <Text style={styles.menuText}>Ajustes</Text>
                </View>
              </TouchableOpacity>
            </Link>

            {/* زر إغلاق القائمة */}
            <TouchableOpacity style={styles.closeButton} onPress={toggleMenu}>
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>

          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

export default Header;