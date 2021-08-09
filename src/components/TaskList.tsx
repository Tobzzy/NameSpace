import React from "react";
import TaskProvider from "../contexts/TaskProvider";

export const TaskList = () => {
  const { tasks } = TaskProvider.useContainer();

  /*
  Just a component to render task list "nothing fancy"
   */

  if (!tasks) {
    return null;
  }

  return (
    <div>
      <h1>TaskList</h1>
      <div style={{ maxHeight: "400px", overflow: "auto" }}>
        {tasks.map(({ address }) => (
          <ul>
            <li>{address.formatted_address}</li>
          </ul>
        ))}
      </div>
    </div>
  );
};
