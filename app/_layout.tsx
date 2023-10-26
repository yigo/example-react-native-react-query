import { Slot } from 'expo-router';
import { SafeAreaView, View } from 'react-native';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: true,
      retry: 3,
    },
  },
})

export default function AppLayout() {
  return (
    <SafeAreaView>
      <QueryClientProvider client={queryClient}>
        <View>
          <Slot />
        </View>
      </QueryClientProvider>
    </SafeAreaView>
  )
}