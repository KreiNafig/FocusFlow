import { useGetPhotoCatQuery } from "../../../../store/api/RandomPhoto/randomPhoto";


export const PhotoCat = () => {
    const { data: randomPhoto } = useGetPhotoCatQuery('');

  return (
    <div style={{width: "20vw"}} className="dashboard-card cat">
        <header style={{marginBottom: "2.4vh"}}>
            <h3>Фотография кота</h3>
        </header>
        <img className="img-cat" src={randomPhoto && randomPhoto[0]?.url} alt="cat" />
    </div>
  )
}
