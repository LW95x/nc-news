import { useState } from "react";
import { getAllArticles } from "./Api";
import { Card, Button } from "react-bootstrap";
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { Link } from "react-router-dom";

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  getAllArticles().then((res) => {
    setArticles(res);
    setIsLoading(false);
  });

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
    <ul>
      {articles.map((article) => {
        return (
          <li key={article.article_id}>
          <div className="article-container">
            <Card
              key={article.article_id}
              style={{
                display: "flex",
                flexDirection: "row",
                width: "40rem",
                height: "30rem",
                marginBottom: "1rem",
              }}
            >
              <div style={{ padding: "1rem" }}>
                <Button variant="dark" style={{marginBottom: "0.5rem"}}><FaArrowUp /></Button>
                <Card.Title style={{marginLeft: "0.9rem", fontWeight: "bold"}}>0</Card.Title>
                <Button variant="dark"><FaArrowDown /></Button>
              </div>
              <Card.Body>
                <Link className="link" to={`/api/articles/${article.article_id}`}><Card.Title>{article.title}</Card.Title></Link>
                <Link className="link" to={`/api/articles/${article.article_id}`}><Card.Img src={article.article_img_url} style={{marginBottom: "1rem"}}/></Link>
                <Card.Text>
                <Link className="link" to={`/api/articles/${article.article_id}`}>{article.comment_count} comments</Link> | Posted by {article.author}{" "}
                  | Created at {new Date(article.created_at).toLocaleDateString('en-GB')} | {article.topic}
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
          </li>
        );
      })}
      </ul>
    </>
  );
};

export default ArticleList;
