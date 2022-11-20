//@ts-check

import React, { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import {
  getDatabase,
  ref as databaseRef,
  push,
  child,
  get,
  remove,
  update,
} from 'firebase/database';
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

/**
 *  Конфигурация для инициализации firebase database и storage
 */

const firebaseConfig = {
  databaseURL: 'https://todo-list-6d707-default-rtdb.firebaseio.com',
  storageBucket: 'gs://todo-list-6d707.appspot.com',
};

/**
 * Инициализируем Firebase
 */
const app = initializeApp(firebaseConfig);

/**
 * Основной компонент приложения, содержит функции для взаимодействия с компонентами
 * @component
 * @returns { JSX.Element }
 */

const App = () => {
  const [todos, setTodos] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const dbRef = databaseRef(getDatabase());
  const db = getDatabase();
  const storage = getStorage();

  /**
   * Функция получения списка todos с сервера.
   */

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

  /**
   * Функция добавления новой todo на сервер.
   * @param { Object } props
   * @param { string } props.title
   * @param { string } props.description
   * @param { string } props.date
   * @param { string } props.fileName
   * @param { string } props.isComplete
   * @param { string } props.url
   */

  const addTodo = ({ title, description, date, fileName, isComplete, url }) => {
    setIsLoading(true);

    const newTodo = {
      title,
      description,
      date,
      fileName,
      url: url || '',
      isComplete,
    };

    push(databaseRef(db, `${DATABASE_NAME}/`), newTodo)
      .then(() => {
        getTodos();
      })
      .catch((error) => {
        setError(error);
      });

    getTodos();
  };

  /**
   * Функция удаления todo с сервера.
   * @param { Object } props
   * @param { string } props.id
   * @param { string } props.url
   */

  const removeTodo = ({ id, url }) => {
    setIsLoading(true);
    const promises = [remove(databaseRef(db, `${DATABASE_NAME}/` + id))];

    if (url) {
      promises.push(deleteObject(storageRef(storage, url)));
    }

    Promise.all(promises)
      .then(() => {
        getTodos();
      })
      .catch((error) => {
        setError(error);
      });
  };

  /**
   * Функция добавления обновления todo на сервере.
   * @param { Object } props
   * @param { string } props.id
   * @param { string } props.title
   * @param { string } props.description
   * @param { string } props.date
   * @param { string } props.fileName
   * @param { string } props.isComplete
   * @param { string } props.url
   */

  const updateTodo = ({ id, title, description, date, fileName, isComplete, url }) => {
    const todoData = {
      title,
      description,
      date,
      fileName,
      isComplete,
      url,
    };

    setIsLoading(true);

    update(databaseRef(db), {
      [`${DATABASE_NAME}/${id}`]: todoData,
    });
    getTodos();
  };

  /**
   * Функция загрузки файла на сервер.
   * @param { string } name
   * @param { Blob } file
   * @return { Promise }
   */

  const uploadFile = (name, file) => {
    setIsLoading(true);
    const fileRef = storageRef(storage, name);

    return uploadBytes(fileRef, file);
  };

  /**
   * Функция получения файла с сервера.
   * @param { string } name
   */

  const downloadFile = (name) => {
    getDownloadURL(storageRef(storage, name))
      .then((url) => {
        let link_url = document.createElement('a');

        link_url.download = url.substring(url.lastIndexOf('/') + 1, url.length);
        link_url.href = url;
        document.body.appendChild(link_url);
        link_url.click();
        document.body.removeChild(link_url);
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
        {isLoading && <div className='loader'>Загрузка...</div>}
        {error && <div>Ошибка получения данных: {error}</div>}
        <Todos
          todos={todos}
          removeTodo={removeTodo}
          downloadFile={downloadFile}
          updateTodo={updateTodo}
        />
      </div>
    </div>
  );
};

export default App;
