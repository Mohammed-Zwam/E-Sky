import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import ProductsProvider from '../context/ProductsProvider';
import { Stack } from 'expo-router';
import 'react-native-reanimated';


export default function RootLayout() {
  return (
    <ProductsProvider>
      <ThemeProvider value={DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </ThemeProvider>
    </ProductsProvider>
  );
}
