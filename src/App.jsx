import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import SingleArticle from '../pages/Article';
import Header from '../components/Header';
import Topics from '../pages/Topics';
import ArticlesByTopic from '../pages/ArticlesByTopic';
import Error from '../pages/Error';

function App() {

  return (
    <div>
      <Header/>
      <Routes>
        <Route path="*" element={<Error />}/>
        <Route path="/" element={<Home />}/>
        <Route path="/api/articles/:article_id" element={<SingleArticle />}/>
        <Route path="/api/topics" element={<Topics />}/>
        <Route path="/api/topics/:topic_name" element={<ArticlesByTopic />}/>
      </Routes>
    </div>
  )
}

export default App
