import dayjs from 'dayjs';
import '../styles.css';

const Todo = ({ title, description, date, fileName, isComplete, removeTodo, downloadFile }) => {
  return (
    <div className={`todo ${isComplete ? 'complete' : ''}`}>
      <div className='todo-info'>
        <div className='todo-title'>{title}</div>
        <div className='todo-description'>{description}</div>
        {date && <div className='todo-date'>Выполнить до {dayjs(date).format('DD-MM-YYYY')}</div>}
        {fileName && (
          <div className='todo-file' onClick={downloadFile}>
            {fileName}
          </div>
        )}
      </div>
      <div className='todo-buttons'>
        <input type='checkbox' title='Отметить выполнение' />
        <button>Редактировать</button>
        <button onClick={removeTodo}>Удалить</button>
      </div>
    </div>
  );
};

export default Todo;
