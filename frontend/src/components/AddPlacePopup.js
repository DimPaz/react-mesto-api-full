import { useEffect } from "react";
import { useForm } from "../hooks/useForm";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {
  const buttonText = `${isLoading ? "Создние..." : "Создать"}`;

  const { values, handleChange, setValues } = useForm({});

  useEffect(() => {
    setValues({});
  }, [isOpen, setValues]);

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: values.name,
      link: values.link,
    });
  }

  return (
    <PopupWithForm
      title="Новое место"
      name="card"
      isOpen={isOpen}
      onClose={onClose}
      textSabmitBtn={buttonText}
      onSabmit={handleSubmit}
    >
      <label className="form__field">
        <input
          id="signature-input"
          className="popup__text popup__text_input_signature form__input"
          type="text"
          name="name"
          placeholder="Название"
          minLength="2"
          maxLength="30"
          required
          value={values.name || ""}
          onChange={handleChange}
        />
        <span id="signature-input-error" className="form__input-error"></span>
      </label>
      <label className="form__field">
        <input
          id="link-image-input"
          className="popup__text popup__text_input_image form__input"
          type="url"
          name="link"
          placeholder="Ссылка на картинку"
          required
          value={values.link || ""}
          onChange={handleChange}
        />
        <span id="link-image-input-error" className="form__input-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
