// import { View, Text ,SafeAreaView,Image, StyleSheet,StatusBar} from 'react-native';
// import { useEffect } from 'react';
// const Splash = () => {
//   return (
//     <SafeAreaView style={styles.container}>
//     <StatusBar backgroundColor={'transparent'} hidden />
//     <View style={styles.imageContainer}>
//       <Image
//         source={require('../../assets/images/splashscreen.jpg')} // Update the path to your image file
//         style={styles.image}
//         resizeMode="contain" // Adjust as needed
//       />
//       <View style={styles.overlay} />
//     </View>

//   </SafeAreaView>
//   )
// }
// export default Splash


// const styles= StyleSheet.create({
//     container:{
//         backgroundColor:'black',
//         flex:1,
//         justifyContent:'center',
//         alignItems:'center',
//     },
//     imageContainer: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         width: '100%',
//         height: '100%',
//       },
//       image: {
//         // width: 200, // Adjust width as needed
//         // height: 200, // Adjust height as needed
//         // opacity:0.5,
//       },
//       overlay: {
//         position: 'absolute',
//         top: 0,
//         left: 0,
//         right: 0,
//         bottom: 0,
//         backgroundColor: 'rgba(0, 0, 0, 0.5)', 
//       },
// })

import { View, Text } from 'react-native'
const Splash = () => {
  return (
    <View>
      <Text>Splash</Text>
    </View>
  )
}
export default Splash