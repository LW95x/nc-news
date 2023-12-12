import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Button, Card } from 'react-bootstrap';

function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />}/>
      </Routes>
    </div>
  )
}

export default App
