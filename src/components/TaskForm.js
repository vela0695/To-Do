import React, { useContext, useState, useEffect } from "react";
import { TaskListContext } from "../context/TaskListContext";

const TaskForm = () => {
  const { addTask, clearList, editItem, editTask } = useContext(
    TaskListContext
  );
  const [taskTitle, setTitle] = useState("");
  const handleChange = e => {
    setTitle(e.target.value);
  };
  //   Used for saving a new task
  const handleSubmit = e => {
    e.preventDefault();
    if (editItem === null) {
      addTask(taskTitle);
      setTitle("");
    } else {
      editTask(taskTitle, editItem.id);
    }
  };

  useEffect(() => {
    if (editItem !== null) {
      setTitle(editItem.taskTitle);
    } else setTitle("");
  }, [editItem]);

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        onChange={handleChange}
        value={taskTitle}
        type="text"
        className="task-input"
        placeholder="Add new task..."
        required
      />
      <div className="buttons">
        <button className="btn add-task-btn" type="submit">
          {editItem ? "Edit Task" : "Add Task"}
        </button>
        <button className="btn clear-btn" onClick={() => clearList()}>
          Clear
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
