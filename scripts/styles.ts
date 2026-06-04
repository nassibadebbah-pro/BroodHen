import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

 ///////////////***********Login***SignUp***********/////////////////////////

 container: {
  flex: 1,
  backgroundColor: 'rgba(233, 241, 251, 0.5)',
  justifyContent: 'center',
  padding: 20,
},
containerNv: {
  flex: 1,
  backgroundColor: '#D6EAF8', 
  justifyContent: 'center',
  padding: 20,
},

containerLog:{
  flex: 1,
  backgroundColor: 'rgba(233, 241, 251, 0.5)', 
  justifyContent: 'center',
  padding: 20,
  alignItems: 'center',
},
logo: {
  width: 100,
  height: 100,
  marginBottom: 20,
},
input: {
  width: '90%',
  height: 50,
  backgroundColor: '#FFFFFF',
  borderRadius: 10,
  paddingHorizontal: 15,
  marginVertical: 10,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 5,
  marginBottom: 15,
  borderWidth: 2, 
  borderColor: '#AAB7B8', 
},

button: {
  width: '90%',
  height: 50,
  backgroundColor: '#3498DB',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 10,
  marginTop: 10,
},
buttonText: {
  color: 'white',
  fontSize: 16,
  fontWeight: 'bold',
},
forgotPassword: {
  color: '#5D6D7E',
  marginTop: 10,
  textDecorationLine: 'underline',
},
newUser: {
  marginTop: 20,
  color: '#5D6D7E',
},
link: {
  color: '#3498DB',
  fontWeight: 'bold',
},
error: {
  color: 'red',
  fontSize: 12,
  alignSelf: 'flex-start',
  marginLeft: '5%',
},

passwordContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  position: 'relative',
},
showPasswordButton: {
  position: 'absolute',
  right: 10,

},
showPasswordText: {
  color: '#007bff',
},



title: {
  fontSize: 24,
  fontWeight: 'bold',
  color: 'black',
  marginBottom: 20,
  textAlign: 'center', 
},

 
  footer: {
    marginTop: 20,
    alignItems: 'center',
  },
  footerText: {
    color: '#5D6D7E',
  },


 ///////////////***********Home***********/////////////////////////


   topSection: { 
     flexDirection: 'row', 
     justifyContent: 'space-between', 
     alignItems: 'center' 
   },
   indicator: { 
     alignItems: 'center' 
   },
   icon: { 
     width: 50, 
     height: 50 
   },
   value: { 
     marginTop: 10, 
     fontSize: 18, 
     fontWeight: 'bold' 
   },
   eggContainer: { 
     position: 'relative', 
     width: 180, 
     height: 180, 
     alignItems: 'center', 
     justifyContent: 'center', 
     marginBottom: 20 
   },
   eggImageContainer: { 
     position: 'relative', 
     justifyContent: 'center', 
     alignItems: 'center' 
   },
   eggImage: { 
     width: '100%', 
     height: '100%', 
     resizeMode: 'contain' 
   },
   eggTurningIcon: { 
    position: 'absolute', 
    width: 40, 
    height: 40, 
    resizeMode: 'contain', 
    top: -180, 
  },
  
   remainingDays: { 
     position: 'absolute', 
     bottom: 10, 
     fontSize: 36, 
     fontWeight: 'bold', 
     color: '#007BFF' 
   },
   modalContainer: { 
     flex: 1, 
     justifyContent: 'center', 
     alignItems: 'center', 
     backgroundColor: 'rgba(0,0,0,0.5)' 
   },
   modalContent: { 
     backgroundColor: 'white', 
     padding: 20, 
     borderRadius: 8, 
     width: '80%' 
   },



   iconButtonContainer: { 
     flexDirection: 'row', 
     justifyContent: 'space-between', 
     alignItems: 'center', 
     marginTop: 20 
   },
   iconButton: { 
     width: 50, 
     height: 50 
   },
   huevosButton: { 
     backgroundColor: '#007BFF', 
     paddingVertical: 10, 
     paddingHorizontal: 20, 
     borderRadius: 5 
   },
   huevosButtonText: { 
     color: '#FFFFFF', 
     fontSize: 16, 
     fontWeight: 'bold' 
   },
   buttonContainer: { 
     flexDirection: 'row', 
     justifyContent: 'space-between', 
     marginTop: 20, 
     width: '100%' 
   },


  modalImage: {
    width: 300, 
    height: 300, 
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#d9534f', 
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
   


 ///////////////***********Informacion***********/////////////////////////


 containerInf: {
  flexGrow: 1,
  padding: 20,
  backgroundColor: '#f5f5f5',
},
item: {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 20,
  backgroundColor: '#fff',
  padding: 10,
  borderRadius: 8,
  shadowColor: '#000',
  shadowOpacity: 0.1,
  shadowOffset: { width: 0, height: 2 },
  elevation: 2,
},
image: {
  width: 60,
  height: 60,
  marginRight: 15,
  borderRadius: 8,
},
buton: {
  backgroundColor: '#007BFF',
  padding: 10,
  borderRadius: 8,
  flex: 1,
  justifyContent: 'center',
},
butonText: {
  color: '#fff',
  textAlign: 'center',
  fontWeight: 'bold',
  fontSize: 16,
},

  ///////////////***********Tienda***********/////////////////////////


  containerTien: {
    flex: 1,
    padding: 10,
  },
  saleItem: {
    flex: 1,
    margin: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#DCE7F3',  
},

  imageTiend: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  textLeft: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  textRight: {
    fontSize: 16,
    color: '#007ACC',
  },
  addButton: {
    backgroundColor: '#007ACC',
    padding: 10,
    borderRadius: 50, 
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addIcon: {
    width: 40, 
    height: 40, 
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#777',
  },

 ///////////////***********Venta***********/////////////////////////

 
  uploadButton: {
    backgroundColor: '#3498DB',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  uploadText: {
    color: '#FFF',
    fontSize: 16,
  },
  imagePreview: {
    width: 100,
    height: 100,
    marginVertical: 10,
    borderRadius: 10,
  },
  
  cancelButton: {
    flex: 1,
    backgroundColor: '#E74C3C',
    padding: 15,
    borderRadius: 10,
    marginRight: 10,
    alignItems: 'center',
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#2ECC71',
    padding: 15,
    borderRadius: 10,
    marginLeft: 10,
    alignItems: 'center',
  },
  

   ///////////////***********Nueva_Ecl***********/////////////////////////


   
  
  label: {
    fontSize: 16,
    color: '#003366',
    marginBottom: 5,
  },
  
  datePickerButton: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007ACC',
    borderRadius: 5,
    marginBottom: 15,
  },
  dateText: {
    color: '#FFFFFF',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },

  
  
 


 ///////////////***********Archivo***********/////////////////////////


header: {
  fontSize: 24,
  fontWeight: 'bold',
  marginBottom: 20,
  textAlign: 'center',
  color: '#003366',
},
logItem: {
  backgroundColor: 'rgba(233, 241, 251, 0.5)',
  padding: 15,
  borderRadius: 10,
  marginBottom: 10,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 3,
  elevation: 3,
},

detail: {
  fontSize: 14,
  color: 'rgba(2, 29, 62, 0.5)',
  marginTop: 5,
},
loadingContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
},
loadingText: {
  marginTop: 10,
  fontSize: 16,
  color: '#003366',
},

 ///////////////***********InfPollo***********/////////////////////////



imageInf: {
  width: '100%',
  height: 300,
  borderRadius: 10,
  marginBottom: 20,
},

info: {
  fontSize: 16,
  color: '#555',
  lineHeight: 22,
},
buttonsContainer: {
  marginTop: 20,
  flexDirection: 'row',
  justifyContent: 'space-around',
},



 ///////////////***********Ajustes***********/////////////////////////


option: {
  backgroundColor: '#ffffff',
  padding: 15,
  marginBottom: 15,
  borderRadius: 10,
  shadowColor: '#ccc',
  shadowOpacity: 0.3,
  shadowOffset: { width: 0, height: 3 },
  elevation: 5,
},
optionContent: {
  flexDirection: 'row',
  alignItems: 'center',
},
optionText: {
  fontSize: 18,
  marginLeft: 15,
},
logoutButton: {
  backgroundColor: '#007BFF',
  padding: 15,
  borderRadius: 10,
  marginTop: 30,
  shadowColor: '#ccc',
  shadowOpacity: 0.3,
  shadowOffset: { width: 0, height: 3 },
  elevation: 5,
},
logoutText: {
  fontSize: 18,
  color: '#fff',
  marginLeft: 15,
},


///////////////***********Heider***********/////////////////////////


  headerH: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#6200EE',
  },
  menuIcon: {
    width: 24,
    height: 24,
    tintColor: '#fff',
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  rightSpace: {
    width: 24,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    alignItems: 'center',
  },
  menuItem: {
    padding: 10,
    marginVertical: 5,
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 5,
  },
  menuText: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIconSmall: {
    width: 24,
    height: 24,
    marginRight: 10, 
  },



///////////////***********HatchPercentageScreen***********/////////////////////////


    

    subtitle: {
      fontSize: 18,
      marginVertical: 10,
    },
    marginBottom: {
      fontSize: 18,
      marginBottom: 20,
    },
    chartTitle: {
      fontSize: 18,
      marginVertical: 10,
    },
  
    
   /////////*****InfPollo */////////////
  

      
      imageP: {
        width: 300,
        height: 300,
        marginBottom: 20,
        borderRadius: 10, 
      },
      
      
    
  



});

export default styles;