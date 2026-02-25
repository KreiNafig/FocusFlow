import type { ProfileUserProps } from "../.."


export const ProfileUser = ({ user }: ProfileUserProps) => {
  return (
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

  )
}
