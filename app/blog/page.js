const getGenQuote = async () => {
  const response = await fetch("https://zenquotes.io/api/random", { cache: 'no-store' });
  const data = await response.json();
  // setQuote(quote=>data[0])
  return data[0]
}
const quote = await getGenQuote();
export default async function Home() {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col flex-1 items-center justify-center text-2xl">
        <div className="text-right">
          <p>&ldquo;{quote.q}&rdquo;</p>
          <p>&ndash; {quote.a}</p>
        </div>
      </div>
      <div className="flex-none flex mb-5 items-center justify-center">
        <p> quotes provided by  <a href="https://zenquotes.io/" target="_blank">ZenQuotes API</a></p>
      </div>
    </div>
  );
}