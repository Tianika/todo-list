import { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push, child, get, remove } from 'firebase/database';
import Form from '../components/Form';
import Todos from '../components/Todos';
import '../styles.css';
import { DATABASE_NAME } from '../utils/constants';

const firebaseConfig = {
  databaseURL: 'https://todo-list-6d707-default-rtdb.firebaseio.com',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
getDatabase(app);

function App() {
  const [todos, setTodos] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const dbRef = ref(getDatabase());
  const db = getDatabase();

  const getTodos = () => {
    get(child(dbRef, `${DATABASE_NAME}/`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setTodos(snapshot.val());
        }
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const addTodo = (title, description, date, file, isComplete) => {
    push(ref(db, `${DATABASE_NAME}/`), {
      title,
      description,
      date,
      file,
      isComplete,
    })
      .then(() => {
        getTodos();
      })
      .catch((error) => {
        setError(error);
      });

    getTodos();
  };

  const removeTodo = (id) => {
    remove(ref(db, `${DATABASE_NAME}/` + id))
      .then(() => {
        getTodos();
      })
      .catch((error) => {
        setError(error);
      });
  };

  useEffect(() => {
    setIsLoading(true);
    getTodos();
  }, [dbRef]);

  return (
    <div className='app'>
      <div className='wrapper'>
        <h1 className='header'>Список дел</h1>
        <Form addTodo={addTodo} />
        <Todos todos={todos} isLoading={isLoading} error={error} removeTodo={removeTodo} />
      </div>
    </div>
  );
}

export default App;
