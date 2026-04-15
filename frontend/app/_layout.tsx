import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

export default function RootLayout() {
  return (
    <>
      <Stack
        screenOptions={{
          contentStyle: { backgroundColor: '#0f172a' },
          headerStyle: { backgroundColor: '#0f172a' },
          headerTintColor: '#f8fafc',
          headerShadowVisible: false,
        }}>
        <Stack.Screen name="index" options={{ title: 'Exercises' }} />
        <Stack.Screen name="exercises/[id]" options={{ title: 'Exercise' }} />
      </Stack>
      <StatusBar style="light" />
    </>
  );
}
