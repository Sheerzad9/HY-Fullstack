import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector(({ notification }) => notification);

  if (notification?.message) {
    return notification.type === "error" ? (
      <div className="error">{notification.message}</div>
    ) : (
      <div className="success">{notification.message}</div>
    );
  }
};

export default Notification;
