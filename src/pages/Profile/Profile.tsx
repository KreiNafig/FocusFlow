import { ButtonElem } from "../../components/ui/ButtonElem";
import { useGetProfileUserQuery } from "../../store/api/RandomProfile/randomProfile"


export const Profile = () => {
  const { data, error, refetch } = useGetProfileUserQuery("");
  const user = data && data.results[0];

  console.log(user)

  return (
    <section className="user">
    <section className="profile-user">
      <div className="osnova-user">
          <img src={user?.picture.large} />
        <div className="name-user">
          <h2>{`${user?.name.title}.${user?.name.first} ${user?.name.last}`}</h2>
        </div>
      <div className="dob-info">
        <div>Country: {user?.location.country}</div>
        <div className="location-user">
          <div>City: {user?.location.city}</div>
          <div>{user?.location.country}</div>
        </div>
      </div>
      </div>
    </section>

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
    <div onClick={() => refetch()} className="update-user">
      <ButtonElem 
          color="var(--aside)" 
          butColor="var(--text-aside)" 
          widthElem="250px" 
          heightElem="50px">Обновить Пользователя</ButtonElem>
    </div>
    </section>
  )
}
