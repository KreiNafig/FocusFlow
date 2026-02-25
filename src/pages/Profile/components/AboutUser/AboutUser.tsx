import type { IUser } from "../.."


export const AboutUser = ({user}: IUser) => {
  return (
    <section className="about-user">
      <article>
        <h2>Доп. информация: </h2>
        <div className="about-info">
          <div><p>Пол:</p> {user?.gender}</div>
          <div><p>Возраст:</p> {user?.dob.age} лет</div>
          <div><p>Телефон:</p> {user?.phone}</div>
        </div>
      </article>
      <article>
        <h2>Инфо о регистрации:</h2>
        <div className="about-info">
          <div><p>Дата регистрации:</p> {user?.registered.date.slice(0, 10)}</div>
          <div><p>Лет регистрации:</p> {user?.registered.age}</div>
          <div><p>Логин:</p> {user?.login.username}</div>
        </div>
      </article>
    </section>
  )
}
