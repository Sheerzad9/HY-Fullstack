import { useState, useImperativeHandle, forwardRef } from "react";

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const changeVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => {
    return { changeVisibility };
  });

  return (
    <>
      {visible ? (
        <div>{props.children}</div>
      ) : (
        <div>
          <button onClick={changeVisibility}>{props.buttonLabel}</button>
        </div>
      )}
    </>
  );
});

export default Togglable;
