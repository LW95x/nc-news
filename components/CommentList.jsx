import { useEffect, useState } from "react";
import { getCommentsByArticle } from "./Api";
import { Card, Button, Alert } from "react-bootstrap";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { useParams } from "react-router-dom";
import DeleteComment from "./DeleteComment";

const CommentList = ({ comments, setComments }) => {
  let { article_id } = useParams();
  const [success, setSuccess] = useState(null);
  const [err, setErr] = useState(null);
  const [ApiErr, setApiErr] = useState(null);

  const handleSuccess = (message) => {
    setSuccess(message);
  };

  const handleErr = (message) => {
    setErr(message);
  };

  useEffect(() => {
    getCommentsByArticle(article_id).then((res) => {
      setComments(res);
    })
    .catch( (err) => {
      setApiErr(err);
    })
  }, []);

  if (ApiErr) {
    return (
      <Alert variant="danger" style={{ textAlign: "center" }}>{ApiErr}</Alert>
    )
  }


  return (
    <>
      <ul className="ul-comments">
        {err ? (
          <Alert
            id="alert-fixed"
            variant="danger"
            style={{ textAlign: "center" }}
            dismissible
            onClose={() => setErr(null)}
          >
            {err}
          </Alert>
        ) : null}
        {success ? (
          <Alert
            id="alert-fixed"
            variant="success"
            style={{ textAlign: "center" }}
            dismissible
            onClose={() => setSuccess(null)}
          >
            {success}
          </Alert>
        ) : null}
        {comments.map((comment) => {
          return (
            <li key={comment.comment_id} className="comment-container">
              <Card
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "40rem",
                  height: "15rem",
                  marginBottom: "1rem",
                  border: "1px solid black",
                  wordWrap: "break-word",
                }}
              >
                <div style={{ padding: "1rem" }}>
                  <Button variant="dark" style={{ marginBottom: "0.5rem" }}>
                    <FaArrowUp />
                  </Button>
                  <Card.Title
                    style={{ marginLeft: "0.9rem", fontWeight: "bold" }}
                  >
                    {comment.votes}
                  </Card.Title>
                  <Button variant="dark">
                    <FaArrowDown />
                  </Button>
                </div>
                <Card.Body>
                  <Card.Text>
                    {comment.author} |{" "}
                    {new Date(comment.created_at).toLocaleDateString("en-GB")}
                  </Card.Text>
                  <hr />
                  <Card.Text style={{ overflowWrap: "anywhere" }}>
                    {comment.body}
                  </Card.Text>
                </Card.Body>
                <DeleteComment
                  comment_id={comment.comment_id}
                  setComments={setComments}
                  comment_author={comment.author}
                  setSuccess={handleSuccess}
                  setErr={handleErr}
                />
              </Card>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default CommentList;
