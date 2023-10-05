export async function queryApi(path, queries) {
  let urlToFetch = `/api/${path}?`;
  let aux0 = [];
  for (let query in queries) {
    let aux1 = {};
    aux1[query] = queries[query];
    aux0.push(aux1);
  }
  for (let queryObject of aux0) {
    for (let property in queryObject)
      urlToFetch += `${property}=${queryObject[property]}&`;
  }
  urlToFetch = urlToFetch.slice(0, -1);
  const data = await fetch(urlToFetch);
  return await data.json();
}
