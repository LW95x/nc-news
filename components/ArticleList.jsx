import { useState } from "react";
import { getAllArticles } from "./Api";
import { Card, Button } from "react-bootstrap";
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

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
      {articles.map((article) => {
        return (
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
                <Card.Title>{article.title}</Card.Title>
                <Card.Img src={article.article_img_url} style={{marginBottom: "1rem"}}/>
                <Card.Text>
                  {article.comment_count} comments | Posted by {article.author}{" "}
                  | Created at {new Date(article.created_at).toLocaleDateString('en-GB')} | {article.topic}
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        );
      })}
    </>
  );
};

export default ArticleList;
