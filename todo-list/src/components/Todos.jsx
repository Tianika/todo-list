//@ts-check

import React from 'react';
import Todo from './Todo';

/**
 * Компонент для отображения todos
 * @component
 * @param { Object } props
 * @param { ( Object[] | null ) } props.todos
 * @param { Object } props.todos
 * @param { string } props.todos[].title
 * @param { string } props.todos[].description
 * @param { string } props.todos[].date
 * @param { string } props.todos[].fileName
 * @param { string } props.todos[].isComplete
 * @param { string } props.todos[].url
 * @param { function } props.removeTodo
 * @param { function } props.downloadFile
 * @param { function } props.updateTodo
 * @returns { JSX.Element }
 */

const Todos = ({ todos, removeTodo, downloadFile, updateTodo }) => {
  if (!todos) {
    return <div>Здесь пока ничего нет.</div>;
  }

  return (
    <div>
      {todos &&
        Object.keys(todos).map((id) => {
          const { title, description, date, fileName, isComplete, url } = todos[id];

          return (
            <Todo
              key={id}
              id={id}
              title={title}
              description={description}
              date={date}
              fileName={fileName}
              isComplete={isComplete}
              url={url}
              removeTodo={removeTodo}
              downloadFile={downloadFile}
              updateTodo={updateTodo}
            />
          );
        })}
    </div>
  );
};

export default Todos;
