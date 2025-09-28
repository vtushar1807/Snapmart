import Alert from 'react-bootstrap/Alert';

function AlertFn(props) {
  const isSuccess = props.msg==="Login Successful" || props.msg==="Sign Up successful";
  const variant = isSuccess?"success" : "danger";
  const alertClassName = isSuccess ? 'text-success alert-fade-in' : 'text-danger alert-fade-in';

  return (
    <Alert 
      style={{ border: "none" }} 
      className={`text-center bg-white m-0 pt-2 ${alertClassName}`}
      variant={variant}
    >
      {props.msg}
    </Alert>
  );
}

export default AlertFn;