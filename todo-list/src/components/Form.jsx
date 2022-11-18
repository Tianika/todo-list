import { useState } from 'react';
import { INPUT_LABELS } from '../utils/constants';
import '../styles.css';

const InitialState = {
  title: '',
  description: '',
  date: '',
  file: '',
};
const isComplete = false;

const Form = ({ addTodo }) => {
  const [todo, setTodo] = useState(InitialState);

  const changeTodoHandler = (event, key) => {
    const { value } = event.target;

    setTodo({
      ...todo,
      [key]: value,
    });
  };

  const addFile = (event) => {
    console.log(event.target.files[0]);
    const formData = new FormData();
    formData.append('file', event.target.files[0]);

    setTodo({
      ...todo,
      file: formData,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();

    const { title, description, date, file } = todo;

    addTodo(title, description, date, file, isComplete);
    setTodo(InitialState);
  };

  return (
    <form className='form' onSubmit={onSubmit}>
      <label htmlFor={INPUT_LABELS.title}>
        Заголовок
        <input
          type='text'
          id={INPUT_LABELS.title}
          value={todo.title}
          onChange={(event) => changeTodoHandler(event, INPUT_LABELS.title)}
        />
      </label>
      <label htmlFor={INPUT_LABELS.description}>
        Описание
        <input
          type='text'
          id={INPUT_LABELS.description}
          value={todo.description}
          onChange={(event) => changeTodoHandler(event, INPUT_LABELS.description)}
        />
      </label>
      <label htmlFor={INPUT_LABELS.date}>
        Выполнить до
        <input
          type='date'
          id={INPUT_LABELS.date}
          value={todo.date}
          onChange={(event) => changeTodoHandler(event, INPUT_LABELS.date)}
        />
      </label>
      <label className='add-file' htmlFor={INPUT_LABELS.file}>
        Прикрепить файл
        <input type='file' id={INPUT_LABELS.file} onChange={addFile} />
      </label>
      <button className='submit-button' type='submit' disabled={!(todo.title && todo.description)}>
        Добавить в список
      </button>
    </form>
  );
};

export default Form;
