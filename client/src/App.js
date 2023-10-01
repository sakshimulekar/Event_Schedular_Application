import logo from './logo.svg';
import './App.css';
import MainRoutes from './component/MainRoutes';
import  Toast  from '../src/component/Toast';
import MyCalendar from './component/calendar/MyCalendar';

function App() {
  return (
    <div className="App">
      <MainRoutes/>
      <Toast/>
      <MyCalendar/>
    </div>
  );
}

export default App;
