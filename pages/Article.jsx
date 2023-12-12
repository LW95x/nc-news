import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getSingleArticle } from "../components/Api";
import { Card, Button } from "react-bootstrap";
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

export default function SingleArticle() {
  const [article, setArticle] = useState({});
  let { article_id } = useParams();

  useEffect(() => {
    getSingleArticle(article_id).then((res) => {
      setArticle(res);
    });
  }, []);

  return (
    <div className="article-container">
      <Card
        key={article.article_id}
        style={{
          display: "flex",
          flexDirection: "row",
          width: "50rem",
          height: "50rem",
          marginBottom: "1rem",
          overflow: "hidden"
        }}
      >
        <div style={{ padding: "1rem" }}>
          <Button variant="dark" style={{ marginBottom: "0.5rem" }}>
            <FaArrowUp />
          </Button>
          <Card.Title style={{ marginLeft: "0.9rem", fontWeight: "bold" }}>
            0
          </Card.Title>
          <Button variant="dark">
            <FaArrowDown />
          </Button>
        </div>
        <Card.Body style={{overflowY: "auto", maxHeight: "100%"}}>
          <Card.Title>{article.title}</Card.Title>
          <Card.Img
            src={article.article_img_url}
            style={{ maxWidth: "100%", height: "auto", marginBottom: "1rem" }}
          />
          <Card.Text style={{textAlign: "justify", padding: "1rem"}}>{article.body}</Card.Text>
          <Card.Text>
            {article.comment_count} comments | Posted by {article.author} |
            Created at{" "}
            {new Date(article.created_at).toLocaleDateString("en-GB")} |{" "}
            {article.topic}
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}
