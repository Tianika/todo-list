import React, { useState } from 'react';
import dayjs from 'dayjs';
import '../styles.css';
import EditTodo from '../components/EditTodo';
import { BUTTON_TEXTS } from '../utils/locales';

/**
 * Компонент для отображения задачи
 * @component
 * @param { Object } props
 * @param { string } props.id
 * @param { string } props.title
 * @param { string } props.description
 * @param { string } props.date
 * @param { string } props.fileName
 * @param { string } props.isComplete
 * @param { string } props.url
 * @param { function } props.removeTodo
 * @param { function } props.downloadFile
 * @param { function } props.updateTodo
 * @returns { JSX.Element }
 */

const Todo = ({
  id,
  title,
  description,
  date,
  fileName,
  isComplete,
  url,
  removeTodo,
  downloadFile,
  updateTodo,
}) => {
  let todoStyle = '';
  const checkboxId = title + Math.random();
  const [isEdit, setIsEdit] = useState(false);

  if (isComplete) {
    todoStyle = 'complete';
  } else if (new Date() > new Date(date)) {
    todoStyle = 'overdue';
  }

  return (
    <>
      <div className={`todo ${todoStyle}`}>
        <div className='todo-info'>
          <div className='todo-title'>{title}</div>
          <div className='todo-description'>{description}</div>
          {date && <div className='todo-date'>Выполнить до {dayjs(date).format('DD-MM-YYYY')}</div>}
          {fileName && (
            <div className='todo-file' onClick={() => downloadFile(url)}>
              Скачать файл: {fileName}
            </div>
          )}
        </div>
        <div className='todo-buttons'>
          <input
            className='complete-button'
            type='checkbox'
            title='Отметить выполнение'
            id={checkboxId}
            defaultChecked={isComplete}
            onClick={() =>
              updateTodo({ id, title, description, date, fileName, isComplete: !isComplete, url })
            }
          />
          <label htmlFor={checkboxId} />
          <button className='edit-button' onClick={() => setIsEdit(true)}>
            {BUTTON_TEXTS.edit}
          </button>
          <button className='remove-button' onClick={() => removeTodo({ id, url })}>
            {BUTTON_TEXTS.delete}
          </button>
        </div>
      </div>
      {isEdit && (
        <EditTodo
          id={id}
          title={title}
          description={description}
          date={date}
          fileName={fileName}
          isComplete={isComplete}
          url={url}
          updateTodo={updateTodo}
          setIsEdit={setIsEdit}
        />
      )}
    </>
  );
};

export default Todo;
