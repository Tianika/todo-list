//@ts-check

import React, { useState, useRef } from 'react';
import { INPUT_LABELS } from '../utils/constants';
import '../styles.css';
import { BUTTON_TEXTS, LABELS } from '../utils/locales';

/**
 * Начальное состояние для формы
 */

const InitialState = {
  title: '',
  description: '',
  date: '',
  fileName: '',
};
const isComplete = false;

/**
 * Компонент формы для создания новой задачи
 * @component
 * @param { Object } props
 * @param { function } props.addTodo
 * @param { function } props.uploadFile
 * @returns { JSX.Element }
 */

const Form = ({ addTodo, uploadFile }) => {
  const [todo, setTodo] = useState(InitialState);
  /**
   * @type {import('react').MutableRefObject<*> }
   */
  let ref = useRef();

  /**
   * Изменение значений состояния элемента
   * @param { import('react').ChangeEvent<HTMLInputElement> } event
   * @param { string } key
   */
  const changeTodoHandler = (event, key) => {
    const { value } = event.target;

    setTodo({
      ...todo,
      [key]: value,
    });
  };

  /**
   * Изменение имени файла в состоянии элемента
   * @param { * } event
   */
  const addFile = (event) => {
    const fileData = event.target.files[0];

    setTodo({
      ...todo,
      fileName: fileData.name,
    });
  };

  /**
   * Функция для отправки данных новой задачи на сервер
   * @param { import('react').FormEvent<HTMLFormElement> } event
   */
  const onSubmit = (event) => {
    event.preventDefault();
    const { title, description, date, fileName } = todo;
    let url = '';

    /**
     * Проверка выбран ли файл пользователем
     */

    if (ref.current.files[0]) {
      uploadFile(todo.fileName, ref.current.files[0]).then((snapshot) => {
        url = snapshot.metadata.fullPath;

        ref.current.value = '';
        addTodo({ title, description, date, fileName, isComplete, url });
        setTodo(InitialState);
      });
    } else {
      addTodo({ title, description, date, fileName: '', isComplete, url: '' });
      setTodo(InitialState);
    }
  };

  return (
    <form className='form' onSubmit={onSubmit}>
      <label htmlFor={INPUT_LABELS.title}>
        {LABELS.title}
        <input
          type='text'
          id={INPUT_LABELS.title}
          value={todo.title}
          onChange={(event) => changeTodoHandler(event, INPUT_LABELS.title)}
        />
      </label>
      <label htmlFor={INPUT_LABELS.description}>
        {LABELS.description}
        <input
          type='text'
          id={INPUT_LABELS.description}
          value={todo.description}
          onChange={(event) => changeTodoHandler(event, INPUT_LABELS.description)}
        />
      </label>
      <label htmlFor={INPUT_LABELS.date}>
        {LABELS.date}
        <input
          type='date'
          id={INPUT_LABELS.date}
          value={todo.date}
          onChange={(event) => changeTodoHandler(event, INPUT_LABELS.date)}
        />
      </label>
      <label className='add-file' htmlFor={INPUT_LABELS.file}>
        {todo.fileName || 'Прикрепить файл'}
        <input type='file' id={INPUT_LABELS.file} onChange={addFile} ref={ref} />
      </label>
      <button className='submit-button' type='submit' disabled={!(todo.title && todo.description)}>
        {BUTTON_TEXTS.add}
      </button>
    </form>
  );
};

export default Form;
