import { Alert } from "react-bootstrap";

export default function Error() {

  return (
    <Alert variant="danger" style={{ textAlign: "center" }}>That page was not found. The page you requested doesn't exist.</Alert>
  )
}
