import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import ProductsProvider from '../context/ProductsProvider';
import { Stack } from 'expo-router';
import 'react-native-reanimated';
import { StripeProvider } from '@stripe/stripe-react-native';


export default function RootLayout() {
  const publishableKey = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY
  return (
    <StripeProvider
      publishableKey={publishableKey as string}
      urlScheme="e-sky"
    >
      <ProductsProvider>
        <ThemeProvider value={DefaultTheme}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
        </ThemeProvider>
      </ProductsProvider>
    </StripeProvider>
  );
}
