import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({
  card,
  name,
  link,
  count,
  onCardDelete,
  onCardLike,
  onCardClick,
}) {
  const currentUser = useContext(CurrentUserContext);

  // отображение корзинки
  const isOwn = card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = `element__trash ${
    isOwn ? "element__trash_visible" : ""
  }`;

  // отображение лайка
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `element__like ${
    isLiked ? "element__like_active" : ""
  }`;

  function handleClickDelete() {
    onCardDelete(card);
  }

  function handleClickLike() {
    onCardLike(card);
  }

  function handleClick() {
    {
      onCardClick(card);
    }
  }

  return (
    <article className="element">
      <img
        className="element__picture"
        src={link}
        alt={name}
        onClick={handleClick}
      />
      <div className="element__group">
        <button
          className={`element__trash ${cardDeleteButtonClassName}`}
          type="button"
          aria-label="Убрать в корзину"
          onClick={handleClickDelete}
        ></button>
        <h2 className="element__text">{name}</h2>
        <div className="element__like-parts">
          <button
            className={`element__like ${cardLikeButtonClassName}`}
            type="button"
            aria-label="Нравится"
            onClick={handleClickLike}
          ></button>
          <span className="element__count">{count}</span>
        </div>
      </div>
    </article>
  );
}

export default Card;
