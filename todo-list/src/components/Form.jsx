import { useState } from 'react';
import { INPUT_LABELS } from '../utils/constants';
import '../styles.css';

const FormState = {
  title: '',
  description: '',
  date: '',
  file: '',
};

const Form = () => {
  const [todo, setTodo] = useState(FormState);

  const changeTodoHandler = (event, key) => {
    const { value } = event.target;

    setTodo({
      ...todo,
      [key]: value,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();

    setTodo(FormState);
  };

  return (
    <form className='form' onSubmit={onSubmit}>
      <label htmlFor={INPUT_LABELS.title}>
        Заголовок
        <input
          type='text'
          name={INPUT_LABELS.title}
          value={todo.title}
          onChange={(event) => changeTodoHandler(event, INPUT_LABELS.title)}
        />
      </label>
      <label htmlFor={INPUT_LABELS.description}>
        Описание
        <input
          type='text'
          name={INPUT_LABELS.description}
          value={todo.description}
          onChange={(event) => changeTodoHandler(event, INPUT_LABELS.description)}
        />
      </label>
      <label htmlFor={INPUT_LABELS.date}>
        Выполнить до
        <input
          type='date'
          name={INPUT_LABELS.date}
          value={todo.date}
          onChange={(event) => changeTodoHandler(event, INPUT_LABELS.date)}
        />
      </label>
      <label htmlFor={INPUT_LABELS.file}>
        Файл
        <input
          type='file'
          name={INPUT_LABELS.file}
          value={todo.file}
          onChange={(event) => changeTodoHandler(event, INPUT_LABELS.file)}
        />
      </label>
      <button className='submit-button' type='submit' disabled={!(todo.title && todo.description)}>
        Добавить
      </button>
    </form>
  );
};

export default Form;