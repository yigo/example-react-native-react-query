import { StatusBar } from 'expo-status-bar';
import { Text, FlatList } from 'react-native';
import { useInvalidatedQueryTodos, useQueryTodos } from '../queries';
import { Todo } from '../models/Todo';
import { useCallback } from 'react';
import TodoListItem from './TodoListItem';

export default function TodoList() {
  const { status, data, isRefetching } = useQueryTodos();
  const invalidateTodo = useInvalidatedQueryTodos();
  const renderItem = useCallback(({ item }: { item: Todo }) => <TodoListItem {...item} />, []);
  return (
    <>
      {status === 'pending' && <Text>Loading...</Text>}
      {status === 'error' && <Text>Error!</Text>}
      {status === 'success' && (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => `${item.id}`}
          onRefresh={() => { invalidateTodo() }}
          refreshing={isRefetching}
        />
      )}
      <StatusBar style="auto" />
    </>
  );
}