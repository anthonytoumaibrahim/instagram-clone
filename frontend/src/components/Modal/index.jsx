import { forwardRef } from "react";

// Styles
import "./styles.css";

// Icons
import { LiaTimesSolid } from "react-icons/lia";

const Modal = forwardRef((props, ref) => {
  return (
    <div className="modal">
      <LiaTimesSolid
        size={32}
        className="close-icon"
        onClick={props.handleClose}
      />
      <div className="overlay" onClick={props.handleClose}></div>
      <div className="body" style={{ width: props.width ?? null }}>
        {props.title && <div className="title">{props.title}</div>}
        <div
          className={`content ${props.className ? props.className : ""}`}
          onDragOver={props.onDragOver}
          onDragLeave={props.onDragLeave}
          onDrop={props.onDrop}
          ref={ref}
        >
          {props.children}
        </div>
      </div>
    </div>
  );
});

export default Modal;
