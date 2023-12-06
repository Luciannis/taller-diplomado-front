import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';

const DynamicAlert = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertContent, setAlertContent] = useState('');
  const [alertVariant, setAlertVariant] = useState('info');

  const showAlertMessage = (message, variant = 'info') => {
    setAlertContent(message);
    setAlertVariant(variant);
    setShowAlert(true);

    setTimeout(() => {
      setShowAlert(false);
    }, 2000);
  };

  return (
    <div>
      {showAlert && (
        <Alert variant={alertVariant} onClose={() => setShowAlert(false)} dismissible>
          {alertContent}
        </Alert>
      )}

      <button onClick={() => showAlertMessage('This is a dynamic alert!', 'success')}>
        Show Alert
      </button>
    </div>
  );
};

export default DynamicAlert;
