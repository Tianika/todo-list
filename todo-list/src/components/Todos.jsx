import { useEffect, useState } from 'react';
import { getDatabase, ref, child, get } from 'firebase/database';
import Todo from './Todo';

const Todos = () => {
  const [todos, setTodos] = useState(null);
  const [error, setError] = useState(null);

  const dbRef = ref(getDatabase());

  useEffect(() => {
    get(child(dbRef, `todos/`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setTodos(snapshot.val());
        }
      })
      .catch((error) => {
        setError(error);
      });
  }, [dbRef]);

  if (!todos) {
    return <div>Здесь пока ничего нет</div>;
  }

  if (error) {
    return <div>Ошибка получения данных: {error}</div>;
  }

  console.log(todos);

  return (
    <div>
      {todos &&
        Object.keys(todos).map((id) => {
          const { title, description, date, file } = todos[id];

          return <Todo key={id} title={title} description={description} date={date} file={file} />;
        })}
    </div>
  );
};

export default Todos;
