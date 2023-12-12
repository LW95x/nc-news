import { useEffect, useState } from "react";
import { getCommentsByArticle, getUsers } from "./Api";
import { Card, Button } from "react-bootstrap";
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { useParams } from "react-router-dom";

const CommentList = () => {
  const [comments, setComments] = useState([]);
  let { article_id } = useParams();

  useEffect(() => {
    getCommentsByArticle(article_id).then((res) => {
      setComments(res);
    });
  }, []);

  return (
    <>
      <ul className="ul-comments">
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
                  <Card.Text>{comment.author} | {new Date(comment.created_at).toLocaleDateString("en-GB")}</Card.Text>
                  <hr />
                  <Card.Text>
                    {comment.body}
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

export default CommentList;