import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import SingleArticle from '../pages/Article';
import Header from '../components/Header';

function App() {

  return (
    <div>
      <Header/>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/api/articles/:article_id" element={<SingleArticle />}/>
      </Routes>
    </div>
  )
}

export default App
