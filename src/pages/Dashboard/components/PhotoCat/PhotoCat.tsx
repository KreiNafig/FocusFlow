import { useGetPhotoCatQuery } from "../../../../store/api/RandomPhoto/randomPhoto";


export const PhotoCat = () => {
    const { data: randomPhoto } = useGetPhotoCatQuery('');

  return (
    <div style={{width: "20vw"}} className="dashboard-card cat">
        <header style={{marginBottom: "2.4vh"}}>
            <h3>Фотография кота</h3>
        </header>
        <img style={{width: "100%", height: "88%", borderRadius: "10px", border: "1px solid #CAB18E"}} src={randomPhoto ? randomPhoto[0]?.url : ``} />
    </div>
  )
}
