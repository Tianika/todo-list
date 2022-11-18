import { useState, useRef } from 'react';
import { INPUT_LABELS } from '../utils/constants';
import '../styles.css';

const InitialState = {
  title: '',
  description: '',
  date: '',
  fileName: '',
};
const isComplete = false;

const Form = ({ addTodo, uploadFile }) => {
  const [todo, setTodo] = useState(InitialState);
  const ref = useRef();

  const changeTodoHandler = (event, key) => {
    const { value } = event.target;

    setTodo({
      ...todo,
      [key]: value,
    });
  };

  const addFile = (event) => {
    const fileData = event.target.files[0];

    setTodo({
      ...todo,
      fileName: fileData.name,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const { title, description, date, fileName } = todo;

    console.log('ref ', ref.current.files[0]);

    uploadFile(todo.fileName, ref.current.files[0]).then((snapshot) => {
      console.log('Uploaded a blob or file! ', snapshot);

      const url = snapshot.metadata.fullPath;

      addTodo(title, description, date, fileName, isComplete, url);
      setTodo(InitialState);
    });
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
        {todo.fileName || 'Прикрепить файл'}
        <input type='file' id={INPUT_LABELS.file} onChange={addFile} ref={ref} />
      </label>
      <button className='submit-button' type='submit' disabled={!(todo.title && todo.description)}>
        Добавить в список
      </button>
    </form>
  );
};

export default Form;
