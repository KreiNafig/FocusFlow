import { ButtonElem } from "../../components/ui/ButtonElem";
import { useGetProfileUserQuery } from "../../store/api/RandomProfile/randomProfile"
import { AboutUser } from "./components/AboutUser/AboutUser";
import { ProfileUser } from "./components/ProfileUser/ProfileUser";


export const Profile = () => {
  const { data, refetch } = useGetProfileUserQuery("");
  const user = data && data.results[0];

  return (
    <section className="user">
    <ProfileUser user={user} />
    <AboutUser user={user} />
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
