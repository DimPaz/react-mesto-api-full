function ImagePopup({ isOpen, onClose, selectedCard }) {
  return (
    <div className={`popup popup_type_image ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <div className="popup__form-image">
          <button
            className="popup__close-btn popup__close-btn_type_image opacity"
            type="button"
            onClick={onClose}
          ></button>
          <img
            className="popup__card-image"
            src={selectedCard.link}
            alt={selectedCard.name}
          />
          <p className="popup__card-name">{selectedCard.name}</p>
        </div>
      </div>
    </div>
  );
}

export default ImagePopup;
