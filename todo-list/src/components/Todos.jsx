import Todo from './Todo';

const Todos = ({ todos, isLoading, error, removeTodo }) => {
  const displayTodos = () => {
    if (isLoading) {
      return <div>Загрузка...</div>;
    }

    if (!todos) {
      return <div>Здесь пока ничего нет.</div>;
    }

    if (error) {
      return <div>Ошибка получения данных: {error}</div>;
    }

    return Object.keys(todos).map((id) => {
      const { title, description, date, file } = todos[id];
      console.log(file);

      return (
        <Todo
          key={id}
          title={title}
          description={description}
          date={date}
          file={file}
          removeTodo={() => removeTodo(id)}
        />
      );
    });
  };

  return <div>{displayTodos()}</div>;
};

export default Todos;
