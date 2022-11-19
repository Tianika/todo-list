import Todo from './Todo';

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
