import dayjs from 'dayjs';
import '../styles.css';

const Todo = ({ title, description, date, file }) => {
  return (
    <div className='todo'>
      <div className='todo-info'>
        <div className='todo-title'>{title}</div>
        <div className='todo-description'>{description}</div>
        {date && <div className='todo-date'>Выполнить до {dayjs(date).format('DD-MM-YYYY')}</div>}
        {file && <div className='todo-file'>{file}</div>}
      </div>
      <div className='todo-buttons'>
        <input type='checkbox' title='Отметить выполнение' />
        <button>Редактировать</button>
        <button>Удалить</button>
      </div>
    </div>
  );
};

export default Todo;
