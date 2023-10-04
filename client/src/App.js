import logo from './logo.svg';
import './App.css';
import MainRoutes from './component/MainRoutes';
import  Toast  from '../src/component/Toast';

import Navbar from './component/Home/Navbar';

function App() {
  return (
    <div className="App">
      
      <Navbar/>
      <MainRoutes/>
      <Toast/>
      

    </div>
  );
}

export default App;
