import { useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {
  const avatarRef = useRef();
  const buttonText = `${isLoading ? "Сохранение..." : "Сохранить"}`;

  useEffect(() => {
    avatarRef.current.value = "";
  }, [onClose]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({ avatar: avatarRef.current.value });
  }
  return (
    <PopupWithForm
      title="Обновить аватар"
      name="avatar"
      isOpen={isOpen}
      onClose={onClose}
      textSabmitBtn={buttonText}
      onSabmit={handleSubmit}
    >
      <label className="form__field">
        <input
          id="link-avatar-input"
          className="popup__text popup__text_input_avatar form__input"
          type="url"
          name="link"
          placeholder="Ссылка на аватар"
          required
          ref={avatarRef}
        />
        <span id="link-avatar-input-error" className="form__input-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
