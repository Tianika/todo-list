import { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref as databaseRef, push, child, get, remove } from 'firebase/database';
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  deleteObject,
  getDownloadURL,
} from 'firebase/storage';
import Form from '../components/Form';
import Todos from '../components/Todos';
import '../styles.css';
import { DATABASE_NAME } from '../utils/constants';

const firebaseConfig = {
  databaseURL: 'https://todo-list-6d707-default-rtdb.firebaseio.com',
  storageBucket: 'gs://todo-list-6d707.appspot.com',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database, Cloud Storage and get a reference to the service
// getDatabase(app);
// getStorage(app);

function App() {
  const [todos, setTodos] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const dbRef = databaseRef(getDatabase());
  const db = getDatabase();

  const storage = getStorage();

  const getTodos = () => {
    setIsLoading(true);

    get(child(dbRef, `${DATABASE_NAME}/`))
      .then((snapshot) => {
        setTodos(snapshot.exists() ? snapshot.val() : null);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const addTodo = (title, description, date, fileName, isComplete, url) => {
    push(databaseRef(db, `${DATABASE_NAME}/`), {
      title,
      description,
      date,
      fileName,
      url,
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

  const removeTodo = (id, url) => {
    const promises = [
      remove(databaseRef(db, `${DATABASE_NAME}/` + id)),
      deleteObject(storageRef(storage, url)),
    ];

    Promise.all(promises)
      .then(() => {
        getTodos();
      })
      .catch((error) => {
        setError(error);
      });
  };

  const uploadFile = (name, file) => {
    const fileRef = storageRef(storage, name);

    return uploadBytes(fileRef, file);
  };

  const downloadFile = (name) => {
    getDownloadURL(storageRef(storage, name))
      .then((url) => {
        console.log(url);
        // This can be downloaded directly:
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = (event) => {
          const blob = xhr.response;
        };
        xhr.open('GET', url);
        xhr.send();
      })
      .catch((error) => {
        setError(error);
      });
  };

  useEffect(() => {
    getTodos();
  }, [dbRef]);

  return (
    <div className='app'>
      <div className='wrapper'>
        <h1 className='header'>Список дел</h1>
        <Form addTodo={addTodo} uploadFile={uploadFile} />
        {isLoading && <div>Загрузка...</div>}
        {error && <div>Ошибка получения данных: {error}</div>}
        <Todos todos={todos} error={error} removeTodo={removeTodo} downloadFile={downloadFile} />
      </div>
    </div>
  );
}

export default App;
