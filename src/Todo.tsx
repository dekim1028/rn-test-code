import React, {useState, useCallback} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  FlatList,
  Switch,
  Button,
} from 'react-native';

import {ITodoItem} from './types/todo.type';

import globalStyles from './styles/globle.style';

import TodoItem from './TodoItem';

const Todo = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false); // 라이트모드 : false, 다크모드 : true
  const [todoTitle, setTodoTitle] = useState<string>(''); // todo 입력 값
  const [todoList, setTodoList] = useState<ITodoItem[]>([]); // todo 리스트

  // 다크모드 변경
  const toggleModeSwitch = () => setIsDarkMode(prevState => !prevState);

  // todo 입력 값 변경
  const onChangeTodoTitle = (text: string) => {
    setTodoTitle(text);
  };

  // todo 추가
  const addTodo = useCallback(() => {
    setTodoList(prevState => [
      {id: Date.now().toString(), title: todoTitle},
      ...prevState,
    ]);
    setTodoTitle('');
  }, [todoTitle]);

  // todo 제거
  const removeTodo = useCallback((target: ITodoItem['id']) => {
    setTodoList(prevState => prevState.filter(item => item.id !== target));
  }, []);

  // 모든 todo 제거
  const removeAllTodo = useCallback(() => {
    setTodoList([]);
  }, []);

  return (
    <View
      testID="wrapper-id"
      style={[
        styles.wrapper,
        isDarkMode ? styles.darkWrapper : styles.lightWrapper,
      ]}>
      <View style={[globalStyles.row, globalStyles.mb10]}>
        <Switch
          testID="mode-switch-id"
          onValueChange={toggleModeSwitch}
          value={isDarkMode}
          style={globalStyles.mr10}
        />
        <Button
          testID="remove-button-id"
          title="Remove All"
          onPress={removeAllTodo}
        />
      </View>
      <View style={[globalStyles.row, globalStyles.mb10]}>
        <TextInput
          testID="input-id"
          value={todoTitle}
          style={[styles.input, globalStyles.mr10]}
          onChangeText={onChangeTodoTitle}
        />
        <Button
          testID="add-button-id"
          title="Add"
          onPress={addTodo}
          disabled={todoTitle === ''}
        />
      </View>
      <FlatList
        style={styles.todoList}
        data={todoList}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <TodoItem item={item} removeTodo={removeTodo} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    padding: 10,
  },
  darkWrapper: {
    backgroundColor: '#888',
  },
  lightWrapper: {
    backgroundColor: '#fff',
  },
  disabledButton: {
    opacity: 0.5,
  },
  input: {
    height: 30,
    borderWidth: 1,
    padding: 10,
    borderRadius: 4,
  },
  todoList: {
    flex: 1,
  },
});

export default Todo;
