import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getArticlesByTopic } from "../components/Api";
import { Button, Card } from "react-bootstrap";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";

export default function ArticlesByTopic() {
  const [topic, setTopic] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  let { topic_name } = useParams();

  useEffect(() => {
    getArticlesByTopic(topic_name).then((res) => {
      setTopic(res);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <h2 id="loading">Loading...</h2>;
  }

  return (
    <>
      <ul>
        {topic.map((article) => {
          return (
            <li key={article.article_id} className="article-container">
              <Card
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "50rem",
                  marginBottom: "1rem",
                  border: "1px solid black"
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
                      style={{ maxHeight: "90%", maxWidth: "auto" }}
                    />
                  </Link>
                  <Card.Text className="anchor-text-list">
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
}
