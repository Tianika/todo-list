//@ts-check

import React, { useState } from 'react';
import { INPUT_LABELS } from '../utils/constants';
import '../styles.css';

/**
 * Компонент для редактирования задачи
 * @component
 * @param { Object } props
 * @param { string } props.id
 * @param { string } props.title
 * @param { string } props.description
 * @param { string } props.date
 * @param { string } props.fileName
 * @param { string } props.isComplete
 * @param { string } props.url
 * @param { function } props.updateTodo
 * @param { function } props.setIsEdit
 * @returns { JSX.Element }
 */

const EditTodo = ({
  id,
  title,
  description,
  date,
  fileName,
  isComplete,
  url,
  updateTodo,
  setIsEdit,
}) => {
  const [editableValue, setEditableValue] = useState({
    title,
    description,
    date,
  });

  /**
   * Изменение значений состояния элемента
   * @param { import('react').ChangeEvent<HTMLInputElement> } event
   * @param { string } key
   */

  const changeTodoHandler = (event, key) => {
    const { value } = event.target;

    setEditableValue({
      ...editableValue,
      [key]: value,
    });
  };

  /**
   * Функция для отправки изменений задачи на сервер
   * @param { import('react').FormEvent<HTMLFormElement>  } event
   */

  const onSubmit = (event) => {
    event.preventDefault();

    updateTodo({
      id,
      title: editableValue.title,
      description: editableValue.description,
      date: editableValue.date,
      fileName,
      isComplete,
      url,
    });
    setIsEdit(false);
  };

  return (
    <div className='edit-form-container'>
      <form className='edit-form' onSubmit={onSubmit}>
        <label htmlFor={INPUT_LABELS.title}>
          Заголовок
          <input
            type='text'
            id={INPUT_LABELS.title}
            value={editableValue.title}
            required
            onChange={(event) => changeTodoHandler(event, INPUT_LABELS.title)}
          />
        </label>
        <label htmlFor={INPUT_LABELS.description}>
          Описание
          <input
            type='text'
            id={INPUT_LABELS.description}
            value={editableValue.description}
            required
            onChange={(event) => changeTodoHandler(event, INPUT_LABELS.description)}
          />
        </label>
        <label htmlFor={INPUT_LABELS.date}>
          Выполнить до
          <input
            type='date'
            id={INPUT_LABELS.date}
            value={editableValue.date}
            onChange={(event) => changeTodoHandler(event, INPUT_LABELS.date)}
          />
        </label>
        <button className='edit-button' type='submit'>
          Обновить
        </button>
        <button className='remove-button' type='button' onClick={() => setIsEdit(false)}>
          Отменить
        </button>
      </form>
    </div>
  );
};

export default EditTodo;
