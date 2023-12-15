import { useContext, useState } from "react";
import { Alert, Button, Card, Form } from "react-bootstrap";
import { usernameContext } from "../src/context/User";
import { postComment } from "./Api";

const AddComment = ({ article_id, setComments }) => {
  const [input, setInput] = useState("");
  const [err, setErr] = useState(null);
  const [success, setSuccess] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const { currentUser, setCurrentUser } = useContext(usernameContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (input) {
      setSubmitting(true);
      postComment(article_id, currentUser.user.username, input)
        .then((res) => {
          setInput("");
          setSuccess("Post successful!");
          setSubmitting(false);
          setErr(null);
          setComments((currComments) => {
            return [res, ...currComments];
          });
        })
        .catch((err) => {
          setErr("Error: Something went wrong! Please try reloading the page.");
          setSuccess(null);
        });
    } else {
      setErr("Error: Please enter a valid comment");
      setSuccess(null);
    }
  };

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  return (
    <div>
      {err ? (
        <Alert
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
          variant="success"
          style={{ textAlign: "center" }}
          dismissible
          onClose={() => setSuccess(null)}
        >
          {success}
        </Alert>
      ) : null}
      <div className="post-container">
        <Card
          style={{
            display: "flex",
            flexDirection: "row",
            width: "40rem",
            height: "20rem",
            marginBottom: "1rem",
            border: "1px solid black",
          }}
        >
          <Form
            id="comment-form" onSubmit={handleSubmit}
            style={{ width: "100%", height: "auto", padding: "1rem" }}
          >
            <Form.Group className="mb-3">
              <Form.Label>Send a comment:
              <Form.Control name="comment-input" className="comment-input"
                as="textarea"
                placeholder="Enter comment here..."
                onChange={handleChange}
                value={input}
                style={{ height: "12rem", width: "38rem", resize: "none", marginTop: "0.5rem" }}
              />
              </Form.Label>
            </Form.Group>
            <div className="submit-button">
            <Button variant="dark" type="submit" disabled={submitting}>
              {submitting ? "Submitting..." : "Submit"}
            </Button>
            </div>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default AddComment;
