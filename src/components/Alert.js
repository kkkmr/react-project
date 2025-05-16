import React from "react";
import './Alert.css';

const AlertComponent = () => {
  return (
    <div class="alert" role="alert">
      <span class="close-btn">&times;</span>
      <strong>Danger!</strong> Alert for dangerous or potentially harmful consequences.
    </div>
  );
}

export default AlertComponent;