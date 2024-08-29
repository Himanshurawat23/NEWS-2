const API_KEY = '93d05a39a1a744ac9895bda08e208f04';
const newsContainer = document.getElementById('news-container');
const searchButton = document.getElementById('search-button');
const queryInput = document.getElementById('query');

function fetchNews(query) {
    axios.get(`https://newsapi.org/v2/everything?q=${query}&apiKey=${API_KEY}`)
        .then(function(resp) {
            const articles = resp.data.articles;
            newsContainer.innerHTML = ''; // Clear previous articles

            articles.forEach(article => {
                const newsCard = document.createElement('div');
                newsCard.className = 'news-card';

                const newsImage = article.urlToImage ? `<img src="${article.urlToImage}" class="news-image" alt="${article.title}">` : '';
                const newsContent = `
                    ${newsImage}
                    <div class="news-content">
                        <h2 class="news-title">${article.title}</h2>
                        <p class="news-description">${article.description || ''}</p>
                        <p class="news-author">Author: ${article.author || 'Unknown'}</p>
                        <p class="news-source">Source: ${article.source.name || 'N/A'}</p>
                        <p class="news-date">Published At: ${new Date(article.publishedAt).toLocaleDateString()}</p>
                        <a href="${article.url}" class="news-link" target="_blank">Read more</a>
                    </div>
                `;

                newsCard.innerHTML = newsContent;
                newsContainer.appendChild(newsCard);
            });
        })
        .catch(function(err) {
            console.log(err);
        });
}

// Initial fetch for news articles
fetchNews('India');

// Add event listener for search button
searchButton.addEventListener('click', () => {
    const query = queryInput.value.trim();
    if (query) {
        fetchNews(query);
    }
});
