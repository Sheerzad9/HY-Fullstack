import { connect } from "react-redux";

const Notification = (props) => {
  const errorStyle = {
    border: "solid red",
    padding: 10,
    borderWidth: 1,
    color: "red",
  };

  const successStyle = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };
  if (props.notification.message)
    return (
      <div
        style={props.notification.type === "error" ? errorStyle : successStyle}
      >
        {props.notification.message}
      </div>
    );
};

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
  };
};

export default connect(mapStateToProps)(Notification);
