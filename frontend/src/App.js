import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import List from './components/List';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<List/>}/>
      </Routes>
     hello
    </div>
  );
}

export default App;
