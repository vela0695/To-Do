import React, { createContext, useState, useEffect } from "react";
import uuid from "uuid";

export const TaskListContext = createContext();

const TaskListContextProvider = props => {
  const initialState = JSON.parse(localStorage.getItem("tasks")) || [];
  const [tasks, setTasks] = useState(initialState);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const [editItem, setEditItem] = useState(null);

  const addTask = title => {
    console.log("This is what Im adding ", title);
    setTasks([...tasks, { taskTitle: title, id: uuid() }]);
  };

  const removeTask = id => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const clearList = () => {
    setTasks([]);
  };

  const findItem = id => {
    const item = tasks.find(task => task.id === id);

    setEditItem(item);
  };

  const editTask = (taskTitle, id) => {
    const newTasks = tasks.map(task =>
      task.id === id ? { taskTitle, id } : task
    );

    setTasks(newTasks);
    setEditItem(null);
  };

  return (
    <TaskListContext.Provider
      value={{
        tasks,
        addTask,
        removeTask,
        clearList,
        findItem,
        editTask,
        editItem
      }}
    >
      {props.children}
    </TaskListContext.Provider>
  );
};

export default TaskListContextProvider;
