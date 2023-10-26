import { StatusBar } from 'expo-status-bar';
import { Text } from 'react-native';
import TodoList from '../domains/todos/components/TodoList';

export default function App() {
  return (
    <>
      <Text>Your todo list</Text>
      <TodoList />
      <StatusBar style="auto" />
    </>
  );
}