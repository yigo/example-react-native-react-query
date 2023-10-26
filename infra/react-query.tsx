import NetInfo from '@react-native-community/netinfo'
import { onlineManager, QueryClient, QueryClientProvider , focusManager} from '@tanstack/react-query'
import { useEffect } from "react"
import { AppState, Platform } from 'react-native'
import type { AppStateStatus } from "react-native"

// Updates online status when network status changes
// onlineManager.setEventListener(setOnline => {
//   return NetInfo.addEventListener(state => {
//     setOnline(!!state.isConnected)
//   })
// });

// Refetch on App focus
// function onAppStateChange(status: AppStateStatus) {
//   if (Platform.OS !== 'web') {
//     focusManager.setFocused(status === 'active')
//   }
// }

// TODO: Refresh on Screen focus


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

export default function QueryClientSetup({ children }: { children: React.ReactNode }) {
  // useEffect(() => {
  //   const event = AppState.addEventListener('change', onAppStateChange);
  //   return () => {
  //     event.remove();
  //   }
  // }, []);
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}