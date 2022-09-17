function InfoTooltip({ isOpen, onClose, notify }) {
  function closePopupOnOverlay(event) {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }

  return (
    <div className={`popup ${isOpen ? "popup_opened" : ""}`}>
      <div
        className="popup__container"
        onClick={(event) => closePopupOnOverlay(event)}
      >
        <div className="popup__form popup__form_info-tooltip">
          <button
            className={`popup__close-btn opacity`}
            type="button"
            onClick={onClose}
          ></button>
          <img
            className="popup__info-img"
            src={notify.infoImg}
            alt="галочка"
          ></img>
          <h3 className="popup__title popup__title_info-tooltip">
            {notify.infoText}
          </h3>
        </div>
      </div>
    </div>
  );
}

export default InfoTooltip;
