import { useGetQuoteJokesQuery } from "../../../../store/api/RandomQuote/randomQuote";


export const RandomQuote = () => {
    const { data: quoteData } = useGetQuoteJokesQuery('');
    const quote = quoteData ? quoteData?.setup : "Загрузка цитаты...";

  return (
    <article className="dashboard-quote">
        <header>
            <h2>Рандомная цитата:</h2>
            <p>{quote}</p>
        </header>
    </article>
  )
}
