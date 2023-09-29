import logo from './logo.svg';
import './App.css';
import MainRoutes from './component/MainRoutes';
import  Toast  from '../src/component/Toast';

function App() {
  return (
    <div className="App">
      <MainRoutes/>
      <Toast/>
    </div>
  );
}

export default App;
