import { useState } from "react";
import { getTopics } from "../components/Api";
import { Alert, Button} from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Topics() {
  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  getTopics().then((res) => {
    setTopics(res);
    setIsLoading(false);
  });

  if (isLoading) {
    return (
      <>
      <Alert variant="secondary" style={{ textAlign: "center" }}>Loading...</Alert>
      </>
    )
  }

  function capFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <>
    <ul className="topic-container">
        {topics.map((topic) => {
            return (
                <li key={topic.slug} className="topic-button">
                    <Link className="link" to={`/api/topics/${topic.slug}`}><Button variant="light" style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "18rem",
                  height: "4rem",
                  margin: "1rem",
                  border: "1px solid black",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "120%"
                }}>{capFirstLetter(topic.slug)}</Button></Link>
                </li>
            )
        })}
    </ul>
    </>
  )
}
