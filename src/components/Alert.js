import React from "react";
import './Alert.css';

const AlertComponent = () => (
    <div className="alert" role="alert">
      <span className="close-btn">&times;</span>
      <strong>Danger!</strong> Alert for dangerous or potentially harmful consequences.
    </div>
  );

export default AlertComponent;