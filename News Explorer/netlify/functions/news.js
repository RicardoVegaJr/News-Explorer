export async function handler(event, context) {
  const API_KEY = process.env.NEWS_API_KEY; // from Netlify env vars
  const { q } = event.queryStringParameters;

  try {
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=${encodeURIComponent(q)}&apiKey=${API_KEY}`
    );

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: `News API error: ${response.statusText}` }),
      };
    }

    const data = await response.json();
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*", // allow frontend access
      },
      body: JSON.stringify(data),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
}