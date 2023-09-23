import React from 'react';
import {Text, TouchableOpacity} from 'react-native';

import {ITodoItem} from './types/todo.type';

import globalStyles from './styles/globle.style';

const TodoItem = React.memo(
  ({
    item,
    removeTodo,
  }: {
    item: ITodoItem;
    removeTodo: (_: ITodoItem['id']) => void;
  }) => {
    return (
      <TouchableOpacity
        testID={`todo-${item.title.replace(/ /g, '-').toLowerCase()}`}
        style={[globalStyles.asFlexStart, globalStyles.mb5]}
        onPress={() => removeTodo(item.id)}>
        <Text style={globalStyles.asFlexStart}>{item.title}</Text>
      </TouchableOpacity>
    );
  },
);

export default TodoItem;
