import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  let [state, setState] = useState({
    tasks: [
      {
        id: "1",
        taskName: "Read book",
        type: "inProgress",
        backgroundColor: "red"
      },
      {
        id: "2",
        taskName: "Pay bills",
        type: "inProgress",
        backgroundColor: "green"
      },
      {
        id: "3",
        taskName: "Go to the gym",
        type: "Done",
        backgroundColor: "blue"
      },
      {
        id: "4",
        taskName: "Play baseball",
        type: "Done",
        backgroundColor: "green"
      }
    ]
  });

  let onDragStart = (event, taskName) => {
    event.dataTransfer.setData("taskName", taskName);
  };

  let onDragOver = event => {
    event.preventDefault();
  };

  let onDrop = (event, cat) => {
    let taskName = event.dataTransfer.getData("taskName");

    let tasks = state.tasks.filter(task => {
      if (task.taskName == taskName) {
        task.type = cat;
      }
      return task;
    });
    setState({ ...state, tasks });
  };

  let tasks = {
    inProgress: [],
    Done: []
  };
  state.tasks.forEach(task => {
    tasks[task.type].push(
      <div
        key={task.id}
        onDragStart={event => onDragStart(event, task.taskName)}
        draggable
        className="draggable"
      >
        {task.taskName}
      </div>
    );
  });
  return (
    <div className="App">
      <h2> To Do List Drag & Drop</h2>
      
      <div
        className="inProgress"
        onDragOver={event => onDragOver(event)}
        onDrop={event => onDrop(event, "inProgress")}
      >inProgress
        {tasks.inProgress}
      </div>
      
      <div
        className="Done"
        onDragOver={event => onDragOver(event)}
        onDrop={event => onDrop(event, "Done")}
      >Done
        {tasks.Done}
      </div>
    </div>
  );
}

export default App;
