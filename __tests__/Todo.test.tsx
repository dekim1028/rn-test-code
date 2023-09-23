/**
 * @format
 */

import React from 'react';
import {StyleSheet} from 'react-native';
import {it, describe, expect} from '@jest/globals';

import {fireEvent, render, act, waitFor} from '@testing-library/react-native';

import Todo from '../src/Todo';

describe('<Todo/>', () => {
  it('스위치 off인 경우 라이트 모드', () => {
    const {getByTestId} = render(<Todo />);
    const wrapper = getByTestId('wrapper-id');
    const modeSwitch = getByTestId('mode-switch-id');

    // switch의 경우 onValueChange를 사용하면 toggle 형태로 동작
    fireEvent(modeSwitch, 'onValueChange');
    fireEvent(modeSwitch, 'onValueChange');

    expect(StyleSheet.flatten(wrapper.props.style).backgroundColor).toEqual(
      '#fff',
    );
  });

  it('스위치 on인 경우 다크모드', () => {
    const {getByTestId} = render(<Todo />);
    const wrapper = getByTestId('wrapper-id');
    const modeSwitch = getByTestId('mode-switch-id');

    fireEvent(modeSwitch, 'onValueChange', true);

    expect(StyleSheet.flatten(wrapper.props.style).backgroundColor).toEqual(
      '#888',
    );
  });

  it('REMOVE ALL 버튼 클릭 시 전체 TODO 제거', () => {
    const {getByTestId, queryAllByTestId} = render(<Todo />);
    const removeButton = getByTestId('remove-button-id');

    fireEvent.press(removeButton);

    const todoItem = queryAllByTestId(/^todo-/);
    expect(todoItem).toHaveLength(0);
  });

  it('TODO 입력 없이 Add 버튼 클릭 시, 추가 안됨', () => {
    const {getByTestId, queryAllByTestId} = render(<Todo />);
    const input = getByTestId('input-id');
    const addButton = getByTestId('add-button-id');
    const beforeTodoItemLength = queryAllByTestId(/^todo-/).length;

    fireEvent.changeText(input, '');
    fireEvent.press(addButton);

    const afterTodoItemLength = queryAllByTestId(/^todo-/).length;
    expect(afterTodoItemLength).toEqual(beforeTodoItemLength);
  });

  it('TODO 입력 후 Add 버튼 클릭 시, 추가 됨', async () => {
    const {getByTestId} = render(<Todo />);
    const input = getByTestId('input-id');
    const addButton = getByTestId('add-button-id');

    await act(async () => {
      await fireEvent.changeText(input, 'Test Todo');
      await fireEvent.press(addButton);
    });

    await waitFor(() => {
      const todoItem = getByTestId('todo-test-todo');
      expect(todoItem).toBeTruthy();
    });
  });

  it('등록된 TODO 클릭 시, 삭제 됨', async () => {
    const {getByTestId, queryByTestId} = render(<Todo />);
    const input = getByTestId('input-id');
    const addButton = getByTestId('add-button-id');

    await act(async () => {
      await fireEvent.changeText(input, 'Test Todo');
      await fireEvent.press(addButton);
    });

    await waitFor(() => {
      const todoItem = getByTestId('todo-test-todo');
      expect(todoItem).toBeTruthy();
    });

    await act(() => {
      const todoItem = getByTestId('todo-test-todo');
      fireEvent.press(todoItem);
    });

    await waitFor(() => {
      const removedTodoItem = queryByTestId('todo-test-todo');
      expect(removedTodoItem).toBeNull();
    });
  });
});
