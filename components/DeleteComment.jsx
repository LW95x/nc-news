import { useContext, useState } from "react";
import { usernameContext } from "../src/context/User";
import { deleteComment } from "./Api";
import { Button } from "react-bootstrap";

const DeleteComment = ({
  comment_id,
  setComments,
  comment_author,
  setSuccess,
  setErr,
}) => {
  const { currentUser, setCurrentUser } = useContext(usernameContext);
  const [deleting, setDeleting] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (currentUser.user.username === comment_author) {
      setDeleting(true);
      deleteComment(comment_id)
        .then((res) => {
          setSuccess("Comment was succesfully deleted!");
          setDeleting(false);
          setErr(null);
          setComments((currComments) => {
            const updatedCommentsList = currComments.filter((comment) => {
              return comment.comment_id !== comment_id;
            });
            return updatedCommentsList;
          });
        })
        .catch((err) => {
          setErr("Error: Something went wrong! Please try reloading the page.");
          setSuccess(null);
          setDeleting(false);
        });
    } else {
      setErr("Error: Only the current user can delete this comment.");
      setSuccess(null);
    }
  };

  if (deleting) {
    return <h5 style={{ margin: "1rem" }}>Deleting..</h5>;
  }

  return (
      <div className="delete-button">
        {currentUser.user.username === comment_author ? (
      <Button
        variant="dark"
        style={{ margin: "0.5rem" }}
        onClick={handleSubmit}
      >
        Delete
      </Button>
      ) : null}
    </div>
  );
};

export default DeleteComment;
