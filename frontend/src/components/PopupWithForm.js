function PopupWithForm({
  name,
  title,
  children,
  isOpen,
  onClose,
  onSabmit,
  textSabmitBtn,
}) {
  function closePopupOnOverlay(event) {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }

  return (
    <div className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}>
      <div
        className="popup__container"
        onClick={(event) => closePopupOnOverlay(event)}
      >
        <form
          className="form popup__form"
          name={`${name}-form`}
          action="#"
          onSubmit={onSabmit}
        >
          <button
            className={`popup__close-btn popup__close-btn_type_${name} opacity`}
            type="button"
            onClick={onClose}
          ></button>
          <h3 className="popup__title">{title}</h3>
          {children}
          <button className="popup__save-btn" type="submit" name="Сохранить">
            {textSabmitBtn}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
