import Result from "./Result";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>


export default async function Page(props: {
    searchParams: SearchParams
  }) {
    const searchParams = await props.searchParams; 
    const search_query = JSON.stringify(searchParams.search_query) || 'No search query';

    const clean_search_query = search_query.replace(/^"(.*)"$/, "$1");
    // console.log(search_query.replace(/^"(.*)"$/, "$1"));

    const res = await fetch(`http://localhost:3000/api/result?search_query=${clean_search_query}`, {
      method: "GET",
    });

    const data = await res.json();

    // console.log(data);

    return (
      <div>
        <Result data={data} search_query={clean_search_query} />
      </div>
    );
  }