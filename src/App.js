import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const tasks = [
    {
      id: "1",
      taskName: "Test1"
    },
    {
      id: "2",
      taskName: "Test2"
    },
    {
      id: "3",
      taskName: "Test3"
    },
    {
      id: "4",
      taskName: "Test4"
    }
  ];

  const [state, setState] = useState(tasks);

  const onDragStart = (event, id) => {
    //когда начинается перемещение, срабатывает onDragStart
    event.dataTransfer.setData("id", id); //в память записывается id, c ключем "id", что-бы
    //потом можно было по этому ключу вытащить сам id
  };

  const onDragOver = event => {
    //просто видимо нужно для работы onDrop
    event.preventDefault();
  };

  const onDrop = (event, typeId, dropId) => {
    //после наведения перемещаемого элемента(когда курсор мыши заходит за границу элемента, на который мы хотим переместить)
    //на конечный элемент и отпускания кнопки мыши, срабатывает onDrop
    const dragId = event.dataTransfer.getData(typeId); //вытаскиваем id из onDragStart по типу "id"
    let tasks = [...state];
    //находим index элемента массива, в котором есть перемещаемый элемент и конечный элемент
    const indexDrag = state.findIndex(t => t.id === dragId);
    const indexDrop = state.findIndex(t => t.id === dropId);
    //меняем местами два элемента массива и обновляем state:
    const elementDrop = { ...state[indexDrop] };

    tasks[indexDrop] = state[indexDrag];
    tasks[indexDrag] = elementDrop;
    setState(tasks);
  };

  return (
    <div className="App">
      <h2> To Do List Drag & Drop</h2>

      <div className="box">
        {state.map(task => (
          <div
            key={task.id}
            onDragStart={event => onDragStart(event, task.id)}
            onDragOver={event => onDragOver(event)}
            onDrop={event => onDrop(event, "id", task.id)}
            draggable
            className="Items"
          >
            {task.taskName}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
