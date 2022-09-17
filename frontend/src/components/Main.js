import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { CardContext } from "../contexts/CurrentUserContext";

import Card from "./Card";

function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardDelete,
  onCardLike,
  onCardClick,
  textSabmitBtn,
}) {
  const currentUser = useContext(CurrentUserContext);
  const cards = useContext(CardContext);

  return (
    <main className="main">
      <section className="profile">
        <img className="profile__avatar" src={currentUser.avatar} alt="фото" />
        <button
          className="profile__avatar-btn"
          type="button"
          onClick={onEditAvatar}
        ></button>
        <div className="profile__group">
          <div className="profile__info">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              className="profile__edit-btn opacity"
              type="button"
              onClick={onEditProfile}
            ></button>
          </div>
          <p className="profile__profession">{currentUser.about}</p>
        </div>
        <button
          className="profile__add-btn opacity"
          type="button"
          onClick={onAddPlace}
        ></button>
      </section>
      <section className="elements">
        {cards.map((item) => {
          return (
            <Card
              key={item._id}
              card={item}
              name={item.name}
              link={item.link}
              count={item.likes.length}
              onCardClick={onCardClick}
              textSabmitBtn={textSabmitBtn}
              onCardDelete={onCardDelete}
              onCardLike={onCardLike}
            />
          );
        })}
      </section>
    </main>
  );
}

export default Main;
