import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

import AppRouter from './navigation/AppRouter';

import { AuthProvider } from './context/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <View style={{ flex: 1 }}>
        <StatusBar style="auto" />
        <AppRouter />
      </View>
    </AuthProvider>
  );
}
