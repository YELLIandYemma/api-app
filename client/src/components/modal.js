import React, { useState, useEffect, useRef } from "react";

const Modal = ({ show, onClose, children }) => {
  const modalRef = useRef();

  useEffect(() => {
    if (show) {
      modalRef.current.focus();
    }
  }, [show]);

  return (
    <div className={`modal ${show ? "is-active" : ""}`}>
      <div
        className="modal-background"
        onClick={onClose}
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            onClose();
          }
        }}
        tabIndex="-1"
        ref={modalRef}
      ></div>
      <div className="modal-content" tabIndex="0">
        {children}
      </div>
      <button
        className="modal-close is-large"
        aria-label="close"
        onClick={onClose}
      ></button>
    </div>
  );
};

export default Modal;
