import { Slot } from 'expo-router';
import { SafeAreaView, View } from 'react-native';
import QueryClientSetup from '../infra/react-query';


export default function AppLayout() {
  return (
    <SafeAreaView>
      <QueryClientSetup>
        <View>
          <Slot />
        </View>
      </QueryClientSetup>
    </SafeAreaView>
  )
}