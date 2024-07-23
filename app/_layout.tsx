import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect,useState } from 'react';
import 'react-native-reanimated';


import { useColorScheme } from '@/hooks/useColorScheme';


// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [isReady, setIsReady] = useState(false);
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="Details/DetailsScreen" options={{ title: 'Details' }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
   
  );
}
// const onLayoutRootView = useCallback(async () => {
//   if (loaded) {
//     await SplashScreen.hideAsync(); 
//     setIsReady(true); 
//   }
// }, [loaded]);


// useEffect(() => {
//   onLayoutRootView(); 
// }, [loaded]);

// if (!isReady) {
//   return <Splash/>; 
// }

// return (
//   <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
//     <Stack>
//       <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
//       <Stack.Screen name="+not-found" />
//     </Stack>
//   </ThemeProvider>
// );
// }
