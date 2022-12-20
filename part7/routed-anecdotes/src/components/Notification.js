const Notification = ({ notification }) => {
  const style = { border: "solid 1px", color: "green" };

  if (notification) {
    return (
      <div style={style}>
        <h4>{notification.message}</h4>
      </div>
    );
  }
};

export default Notification;
