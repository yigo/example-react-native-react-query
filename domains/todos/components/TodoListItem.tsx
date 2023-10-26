import { Text, StyleSheet, View } from "react-native";
import { memo } from "react";
import CheckBox from "expo-checkbox";
import { Todo } from "../models/Todo";
import { useMutateTodo } from "../queries";

function TodoListItem({ id, title, completed }: Todo) {
  const { mutate } = useMutateTodo();
  
  const handleCheck = () => {
    mutate({
      id,
      completed: !completed,
    },{
      onSuccess: (data) => {
        // here we could notify the user
        if(data.completed) {
          console.log('task completed');
        } else {
          console.log('task not completed');
        }
      }
    })
  }
  return (
    <View style={styles.container}>
      <CheckBox value={completed} onValueChange={() => handleCheck()}/>
      <Text style={[styles.title, completed && styles.completed]}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
    marginHorizontal: 8,
    marginVertical: 8,
  },
  title: {
    flex:1,
  },
  completed: {
    textDecorationLine: 'line-through',
  },
});

export default memo(TodoListItem);