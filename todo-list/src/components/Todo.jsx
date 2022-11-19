import dayjs from 'dayjs';
import '../styles.css';

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

  if (isComplete) {
    todoStyle = 'complete';
  } else if (new Date() > new Date(date)) {
    todoStyle = 'overdue';
  }

  return (
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
        <button>Редактировать</button>
        <button onClick={() => removeTodo({ id, url })}>Удалить</button>
      </div>
    </div>
  );
};

export default Todo;
