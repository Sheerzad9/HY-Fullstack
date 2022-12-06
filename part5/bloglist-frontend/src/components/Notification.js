const Notification = ({ notification }) => {
  console.log("Hello from notification, ", notification);
  if (!notification) return;

  if (notification.type === "error") {
    return <div className="error">{notification.message}</div>;
  }

  // Else it's success at the momemnt..
  return <div className="success">{notification.message}</div>;
};

export default Notification;
