import { useState, useEffect } from "react";
import { getArticles } from "./Api";
import { Card, Button } from "react-bootstrap";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { Link } from "react-router-dom";

const ArticleList = ({ topic_name }) => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getArticles(topic_name).then((res) => {
      setArticles(res);
      setIsLoading(false);
    });
  }, [topic_name]);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      <ul>
        {articles.map((article) => {
          return (
            <li key={article.article_id} className="article-container">
              <Card
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "50rem",
                  marginBottom: "1rem",
                  border: "1px solid black",
                }}
              >
                <div style={{ padding: "1rem" }}>
                  <Button variant="dark" style={{ marginBottom: "0.5rem" }}>
                    <FaArrowUp />
                  </Button>
                  <Card.Title
                    style={{ marginLeft: "0.9rem", fontWeight: "bold" }}
                  >
                    {article.votes}
                  </Card.Title>
                  <Button variant="dark">
                    <FaArrowDown />
                  </Button>
                </div>
                <Card.Body>
                  <Link
                    className="link"
                    to={`/api/articles/${article.article_id}`}
                  >
                    <Card.Title>{article.title}</Card.Title>
                  </Link>
                  <hr />
                  <Link
                    className="link"
                    to={`/api/articles/${article.article_id}`}
                  >
                    <Card.Img
                      src={article.article_img_url}
                      style={{ maxHeight: "100%", maxWidth: "auto" }}
                    />
                  </Link>
                  <Card.Text className="anchor-text-list">
                    <hr />
                    <Link
                      className="link"
                      to={`/api/articles/${article.article_id}`}
                    >
                      {article.comment_count} comments
                    </Link>{" "}
                    | Posted by {article.author} | Created at{" "}
                    {new Date(article.created_at).toLocaleDateString("en-GB")} |{" "}
                    {article.topic}
                  </Card.Text>
                </Card.Body>
              </Card>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default ArticleList;
