import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => {
    console.log("state notification: ", state.notification);
    return state.notification;
  });

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
  if (notification.message)
    return (
      <div style={notification.type === "error" ? errorStyle : successStyle}>
        {notification.message}
      </div>
    );
};

export default Notification;
