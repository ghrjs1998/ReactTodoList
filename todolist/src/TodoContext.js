// 상태 관리하는 TodoProvider컴포넌트 만들기

import React, { createContext, useContext, useReducer, useRef } from "react";

const initialTodos = [
  {
    id: 1,
    text: "프로젝트 생성하기",
    done: true,
  },
  {
    id: 2,
    text: "컴포넌트 스타일링하기",
    done: true,
  },
  {
    id: 3,
    text: "Context 만들기",
    done: false,
  },
  {
    id: 4,
    text: "기능 구현하기",
    done: false,
  },
];

// state와 dispatch, nextid를 Context 통해 다른 컴포넌트에서 바로 사용하게 할 것
// 하나의 Context를 만들어서 state와 dispatch를 함께 넣어주는 대신 두 개의 Context를 만들어서 따로 넣어줄 것 => 이렇게 하면 dispatch만 필요한 컴포넌트에서 불필요한 렌더링을 방지 할 수 o, 추가적으로 사용하게 되는 과정에서 더욱 편리
const TodoStateContext = createContext();
const TodoDispatchContext = createContext();
// nextId가 의미하는 값 => 새로운 항목을 추가 할 때 고유 ID
const TodoNextIdContext = createContext();

function todoReducer(state, action) {
  switch (action.type) {
    case "CREATE":
      return state.concat(action.todo);
    case "TOGGLE":
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, done: !todo.done } : todo
      );
    case "REMOVE":
      return state.filter((todo) => todo.id !== action.id);
    default:
      throw new Error(`unhandled action type: ${action.type}`);
  }
}

export function TodoProvider({ children }) {
  const [state, dispatch] = useReducer(todoReducer, initialTodos);
  const nextId = useRef(5);
  return (
    // Context에서 사용할 값을 지정할 때는 Provider 컴포넌트를 렌더링하고 value를 설정해주면 된다.
    // props로 받아온 children값을 내부에 렌더링
    <TodoStateContext.Provider value={state}>
      <TodoDispatchContext.Provider value={dispatch}>
        <TodoNextIdContext.Provider value={nextId}>
          {children}
        </TodoNextIdContext.Provider>
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  );
}

// 컴포넌트에서 useContext를 직접 사용하는 대신, useContext를 사용하는 커스텀 Hook 만들기
export function useTodoState() {
  return useContext(TodoStateContext);
}

export function useTodoDispatch() {
  return useContext(TodoDispatchContext);
}

// TodoProvider로 감싸져있지 않다면 에러를 발생시키도록 커스텀 Hook을 수정
export function useTodoNextId() {
  const context = useContext(TodoNextIdContext);
  if (!context) {
    throw new Error("Cannot find TodoProvider");
  }
  return context;
}
