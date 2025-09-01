import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import ProductsProvider from '../context/ProductsProvider';
import { Stack } from 'expo-router';
import 'react-native-reanimated';
import { StripeProvider } from '@stripe/stripe-react-native';
import { useEffect, useState } from 'react';


export default function RootLayout() {
  const [publishableKey, setPublishableKey] = useState('');

  const fetchPublishableKey = async () => {
    const res = await fetch('https://e-sky-server.vercel.app/api/payment/api_key').then((res) => res.json()).catch((err) => {
      console.log(err)
    });
    setPublishableKey(res.api_key);
  };

  useEffect(() => {
    fetchPublishableKey();
  }, []);

  return (
    <StripeProvider
      publishableKey={publishableKey}
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
