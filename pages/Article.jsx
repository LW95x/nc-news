import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getSingleArticle, patchArticle } from "../components/Api";
import { Card, Button, Alert } from "react-bootstrap";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

import CommentList from "../components/Comments";
import AddComment from "../components/AddComment";

export default function SingleArticle() {
  const [article, setArticle] = useState({});
  const [votes, setVotes] = useState(article.votes);
  const [comments, setComments] = useState([]);
  const [err, setErr] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [voted, setVoted] = useState(false);
  let { article_id } = useParams();

  useEffect(() => {
    getSingleArticle(article_id).then((res) => {
      setArticle(res);
      setVotes(res.votes);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <h2 id="loading">Loading...</h2>;
  }

  const upVote = () => {
    if (voted) {
      setSuccess(null);
      setErr("You have already voted!");
      return;
    }

    setVotes((currentVotes) => currentVotes + 1);

    patchArticle(article_id, 1)
      .then((updatedArticle) => {
        setVotes(updatedArticle.votes);
        setVoted(true);
        setErr(null);
        setSuccess("Thank you for voting!");
      })
      .catch((err) => {
        setVotes((currentVotes) => currentVotes - 1);
        setErr("Something went wrong, please try again.");
      });
  };

  const downVote = () => {
    setVotes((currentVotes) => currentVotes - 1);

    patchArticle(article_id, -1)
      .then((updatedArticle) => {
        setVotes(updatedArticle.votes);
        setErr(null);
        setSuccess("Thank you for voting!");
      })
      .catch((err) => {
        setVotes((currentVotes) => currentVotes + 1);
        setErr("Something went wrong, please try again.");
      });
  };

  return (
    <div>
      {err ? (
        <Alert variant="danger" style={{ textAlign: "center" }} dismissible
        onClose={() => setErr(null)}>
          {err}
        </Alert>
      ) : null}
      {success ? (
        <Alert variant="success" style={{ textAlign: "center" }} dismissible
        onClose={() => setSuccess(null)}>
          {success}
        </Alert>
      ) : null}
      <div className="article-container">
        <Card
          key={article.article_id}
          style={{
            display: "flex",
            flexDirection: "row",
            width: "50rem",
            marginBottom: "1rem",
            overflow: "hidden",
            border: "1px solid black",
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
          <Card.Body>
            <Card.Title style={{ marginBottom: "1rem" }}>
              {article.title}
            </Card.Title>
            <hr />
            <Card.Img
              src={article.article_img_url}
              style={{
                maxWidth: "auto",
                maxHeight: "100%",
                marginBottom: "1rem",
              }}
            />
            <hr/>
            <Card.Text style={{ textAlign: "justify", marginRight: "1rem" }}>
              {article.body}
            </Card.Text>
            <Card.Text className="anchor-text-article">
            <hr/>
              {article.comment_count} comments | Posted by {article.author} |
              Created at{" "}
              {new Date(article.created_at).toLocaleDateString("en-GB")} |{" "}
              {article.topic}
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
      <AddComment article_id={article_id} setComments={setComments} />
      <CommentList comments={comments} setComments={setComments} />
    </div>
  );
}
