const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

app.get('/getNews', async (req, res) => {
  try {
    const apiKey = process.env.NEWS_API_KEY;
    const response = await fetch(`https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=${apiKey}`);
    const data = await response.json();

    if (data.articles) {
      res.json(data.articles);
    } else {
      res.status(500).json({ error: 'Failed to fetch news data' });
    }
  } catch (error) {
    console.error('Error fetching news data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
