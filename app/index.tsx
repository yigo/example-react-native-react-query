import { StatusBar } from 'expo-status-bar';
import { Text } from 'react-native';
import TodoList from '../domains/todos/components/TodoList';
import { useEffect } from 'react';
import { posthog } from '../infra/posthog';
import NPSSurvey from '../domains/user/components/NPSSurvey';


export default function App() {
  useEffect(() => {
    posthog?.capture("load_todo_list", { hello: "it's me you're looking for" });
  },[]);

  return (
    <>
      <NPSSurvey />
      {/* <TodoList /> */}
      <StatusBar style="auto" />
    </>
  );
}