import { useParams } from "react-router-dom";
import ArticleList from "../components/ArticleList";

export default function ArticlesByTopic() {
  let { topic_name } = useParams();

  return (
    <>
      <ArticleList topic_name={topic_name}/>
    </>
  );
}
