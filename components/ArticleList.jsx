import { useState, useEffect } from "react";
import { getArticles } from "./Api";
import { Card, Button, Navbar, Form } from "react-bootstrap";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { Link } from "react-router-dom";
import sortArticles from "./SortArticles";

const ArticleList = ({ topic_name }) => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [input, setInput] = useState("");

  useEffect(() => {
    getArticles(topic_name).then((res) => {
      setArticles(res);
      setIsLoading(false);
    });
  }, [topic_name]);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  function capFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const handleChange = (event) => {
    const newInput = event.target.value;
    setInput(newInput);
    sortArticles(newInput, articles, setArticles);
  };

  return (
    <>
      <div>
        <Navbar
          bg="dark"
          data-bs-theme="dark"
          style={{ marginBottom: "2rem", padding: "1rem", display: "flex" }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <Form.Select
              onChange={handleChange}
              style={{ width: "18rem", margin: "1rem" }}
            >
              <option disabled selected>Sort by:</option>
              <option value="date-asc">Date (Newest)</option>
              <option value="date-desc">Date (Oldest)</option>
              <option value="comment-count-high">
                Comment Count (Highest)
              </option>
              <option value="comment-count-low">Comment Count (Lowest)</option>
              <option value="votes-high">Votes (Highest)</option>
              <option value="votes-low">Votes (Lowest)</option>
            </Form.Select>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flex: 1,
              marginRight: "20rem",
            }}
          >
            <Navbar.Brand>
              {topic_name ? capFirstLetter(topic_name) : "All Topics"}
            </Navbar.Brand>
          </div>
        </Navbar>
      </div>

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
                  <hr />
                  <Card.Text className="anchor-text-list">
                    <Link
                      className="link"
                      to={`/api/articles/${article.article_id}`}
                    >
                      {article.comment_count} comments
                    </Link>{" "}
                    | Posted by {article.author} | Created at{" "}
                    {new Date(article.created_at).toLocaleDateString("en-GB")} |{" "}
                    <Link className="link" to={`/api/topics/${article.topic}`}>
                      {article.topic}
                    </Link>
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
