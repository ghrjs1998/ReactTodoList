// 할 일에 대한 정보가 들어있는 todos 배열을 내장함수 map을 사용해 여러개의 TodoItem컴포넌트를 렌더링해주는 컴포넌트
import React from "react";
import styled from "styled-components";
import { useTodoState } from "../TodoContext";
import TodoItem from "./TodoItem";

const TodoListBlock = styled.div`
  flex: 1;
  padding: 20px 32px;
  padding-bottom: 48px;
  overflow-y: auto;
`;

// TodoList에선 state를 조회하고 이를 렌더링함
function TodoList() {
  const todos = useTodoState();
  return (
    <TodoListBlock>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          id={todo.id}
          text={todo.text}
          done={todo.done}
        />
      ))}
    </TodoListBlock>
  );
}

export default TodoList;
