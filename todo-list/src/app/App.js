import Form from '../components/Form';
import Todos from '../components/Todos';
import '../styles.css';

function App() {
  return (
    <div className='app'>
      <div className='wrapper'>
        <h1 className='header'>Список дел</h1>
        <Form />
        <Todos />
      </div>
    </div>
  );
}

export default App;
