// // getItems returns a promise that resolves to an array
// // of article data. You can render this array on the
// // /saved-news route.
// export function getItems() {
//   return new Promise((resolve, reject) =>
//     resolve([
//       {
//         // I just generated this at random from a mongodb id
//         // generator website.
//         _id: "65f7368dfb74bd6a92114c85",
//         title: "Some news article",
//         url: "put some actual article URL here",
//         // ...etc, whatever properties it's supposed to have
//       },
//       // ...etc, more article objects, as many as you want
//     ])
//   );
// }

// // saveArticle accepts an article object as an argument and
// // pretends to save it to the DB. It returns a promise that
// // resolves to the "saved" article, and an _id field to it.
// // Add this article to your array of saved news items.
// export function saveArticle(article) {
//   // article is a search result from the NewsAPI
//   return new Promise((resolve, reject) => {
//     resolve({
//       _id: "65f7371e7bce9e7d331b11a0", // another one made up from the generator
//       url: article,
//       url, // Use the properties the newsAPI gives you, I just made these up
//       title: article.title,
//       imageUrl: article.imagUrl,
//       // whatever other properties from the newsAPI-given article object you saved to the database
//     });
//   });
// }

const baseUrl =
  import.meta.env.DEV
    ? "http://localhost:8888/.netlify/functions/news"
    : "/.netlify/functions/news";

export function searchArticles(q) {
  return fetch(`${baseUrl}?q=${encodeURIComponent(q)}`)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Error: ${res.statusText}`);
      }
      return res.json();
    })
    .then((data) => data)
    .catch((err) => {
      console.error(err);
    });
}