// 오늘의 날짜와 요일을 보여주고, 앞으로 해야 할 일이 몇개 남았는지 done값이 false인 항목들의 개수를 보여주는 컴포넌트

import React from "react";
import styled from "styled-components";
import { useTodoState } from "../TodoContext";

const TodoTemplateBlock = styled.div`
  padding-top: 48px;
  padding-left: 32px;
  padding-right: 32px;
  padding-bottom: 24px;
  border-bottom: 1px solid #e9ecef;
  h1 {
    margin: 0;
    font-size: 36px;
    color: #343a40;
  }
  .day {
    margin-top: 4px;
    color: #868e96;
    font-size: 21px;
  }
  .tasks-left {
    color: #20c997;
    font-size: 18px;
    margin-top: 40px;
    font-weight: bold;
  }
`;

function TodoHead() {
  const todos = useTodoState();
  // done값이 false인 항목들의 개수
  const undoneTasks = todos.filter((todo) => !todo.done);

  // 날짜가 보여지는 부분
  const today = new Date();
  const dateString = today.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const dayName = today.toLocaleTimeString("ko-KR", { weekday: "long" });
  return (
    <TodoTemplateBlock>
      <h1>{dateString}</h1>
      <div className="day">{dayName}</div>
      <div className="tasks-left">할 일 {undoneTasks.length}개 남음</div>
    </TodoTemplateBlock>
  );
}

export default TodoHead;
