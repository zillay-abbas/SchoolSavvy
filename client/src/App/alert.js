import { useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/esm/Button";
import { render } from "react-dom";

function ShowAlert({ isShow, alertType, alertHead, alertDesc }) {
  const [show, setShow] = useState(true);

  if (show) {
    return (
      <Alert variant={alertType} onClose={() => setShow(false)}>
        <Alert.Heading>{alertHead}</Alert.Heading>
        <p>
          {alertDesc}
        </p>
      </Alert>
    );
  }
  return <Button onClick={() => setShow(true)}>Show Alert</Button>;
}

render(<ShowAlert />);
