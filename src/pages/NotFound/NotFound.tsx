import { Link } from "react-router-dom";
import { ButtonElem } from "../../components/ui/ButtonElem";

export const NotFound = () => {
  return (
    <div className="not-found">
      <section className="not-found__card">
        <p className="not-found__code">404</p>
        <h2 className="not-found__title">Страница не найдена</h2>
        <p className="not-found__text">
          Такой страницы не существует или она была удалена.
          Вы можете вернуться на главную панель или к заметкам.
        </p>
        <div className="not-found__actions">
          <Link to="/dashboard">
            <ButtonElem widthElem="170px" heightElem="40px">
              На главную
            </ButtonElem>
          </Link>
          <Link to="/notes">
            <ButtonElem widthElem="170px" heightElem="40px">
              К заметкам
            </ButtonElem>
          </Link>
        </div>
      </section>
    </div>
  );
};


