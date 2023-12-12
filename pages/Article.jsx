import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getSingleArticle, patchArticle } from "../components/Api";
import { Card, Button } from "react-bootstrap";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import CommentList from "../components/Comments";

export default function SingleArticle() {
  const [article, setArticle] = useState({});
  const [votes, setVotes] = useState(article.votes);
  const [isLoading, setIsLoading] = useState(true);
  let { article_id } = useParams();

  useEffect(() => {
    getSingleArticle(article_id).then((res) => {
      setArticle(res);
      setVotes(res.votes);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  const upVote = () => {
    setVotes((currentVotes) => currentVotes + 1);

    patchArticle(article_id, 1).then((updatedArticle) => {
      setVotes(updatedArticle.votes);
    });
  };

  const downVote = () => {
    setVotes((currentVotes) => currentVotes - 1);

    patchArticle(article_id, -1).then((updatedArticle) => {
      setVotes(updatedArticle.votes);
    });
  };

  return (
    <div>
      <div className="article-container">
        <Card
          key={article.article_id}
          style={{
            display: "flex",
            flexDirection: "row",
            width: "50rem",
            height: "50rem",
            marginBottom: "1rem",
            overflow: "hidden",
          }}
        >
          <div style={{ padding: "1rem" }}>
            <Button
              onClick={upVote}
              variant="dark"
              style={{ marginBottom: "0.5rem" }}
            >
              <FaArrowUp />
            </Button>
            <Card.Title style={{ marginLeft: "0.9rem", fontWeight: "bold" }}>
              {votes}
            </Card.Title>
            <Button onClick={downVote} variant="dark">
              <FaArrowDown />
            </Button>
          </div>
          <Card.Body style={{ overflowY: "auto", maxHeight: "100%" }}>
            <Card.Title style={{ marginBottom: "1rem" }}>
              {article.title}
            </Card.Title>
            <hr />
            <Card.Img
              src={article.article_img_url}
              style={{
                maxWidth: "auto",
                maxHeight: "90%",
                marginBottom: "1rem",
              }}
            />
            <Card.Text style={{ textAlign: "justify" }}>
              {article.body}
            </Card.Text>
            <Card.Text className="anchor-text-article">
              {article.comment_count} comments | Posted by {article.author} |
              Created at{" "}
              {new Date(article.created_at).toLocaleDateString("en-GB")} |{" "}
              {article.topic}
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
      <CommentList />
    </div>
  );
}
