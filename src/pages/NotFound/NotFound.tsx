import { Link } from "react-router-dom"


export const NotFound = () => {
  return (
    <div>
        <h1>404</h1>
        <p>Данной страницы не существует</p>
        <Link to="/"><button>Вернуться домой</button></Link>
    </div>
  )
}
