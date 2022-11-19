import { useState } from 'react';
import { INPUT_LABELS } from '../utils/constants';
import '../styles.css';

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

  const changeTodoHandler = (event, key) => {
    const { value } = event.target;

    setEditableValue({
      ...editableValue,
      [key]: value,
    });
  };

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
