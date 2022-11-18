import Todo from './Todo';

const Todos = ({ todos, removeTodo, downloadFile }) => {
  if (!todos) {
    return <div>Здесь пока ничего нет.</div>;
  }

  return (
    <div>
      {todos &&
        Object.keys(todos).map((id) => {
          const { title, description, date, fileName, url } = todos[id];

          return (
            <Todo
              key={id}
              title={title}
              description={description}
              date={date}
              fileName={fileName}
              removeTodo={() => removeTodo(id, url)}
              downloadFile={() => downloadFile(url)}
            />
          );
        })}
    </div>
  );
};

export default Todos;
