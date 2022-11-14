const Notification = ({ notification }) => {
  console.log();
  const success = {
    color: "green",
    background: "light",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  const error = {
    color: "red",
    background: "light",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  if (!notification) {
    return;
  }

  return notification.type === "error" ? (
    <div style={error}>
      <h2>{notification.message}</h2>
    </div>
  ) : (
    <div style={success}>
      <h2>{notification.message}</h2>
    </div>
  );
};

export default Notification;
