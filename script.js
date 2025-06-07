const feeds = {
  Christianity: 'https://www.christianitytoday.com/ct/rss.xml',
  Judaism: 'https://www.jta.org/feed',
  Islam: 'https://www.soundvision.com/rss/articles',
  Buddhism: 'https://tricycle.org/feed/',
  Hinduism: 'https://www.hinduismtoday.com/blogs-news/news/',
  LDS: 'https://newsroom.churchofjesuschrist.org/rss'
};

const quotes = [
  '“Love your neighbor as yourself.” – Matthew 22:39',
  '“Blessed is the one who gives.” – Quran 57:18',
  '“All that we are is the result of what we have thought.” – Buddha',
  '“Let your aim be the good of all beings.” – Bhagavad Gita',
  '“Justice, justice shall you pursue.” – Deuteronomy 16:20',
  '“If ye are prepared ye shall not fear.” – Doctrine & Covenants 38:30'
];

function loadQuote() {
  const quote = quotes[Math.floor(Math.random() * quotes.length)];
  document.getElementById('dailyQuote').textContent = quote;
}

async function loadFeeds() {
  for (const [religion, url] of Object.entries(feeds)) {
    const api = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(url)}`;
    try {
      const res = await fetch(api);
      const data = await res.json();
      const section = document.createElement('section');
      section.classList.add('news-block');
      section.innerHTML = `<h2>${religion}</h2>` + data.items.slice(0, 5).map(item =>
        `<p><a href="${item.link}" target="_blank">${item.title}</a></p>`).join('');
      document.getElementById('feedContainer').appendChild(section);
    } catch (error) {
      console.error(`Error fetching ${religion}:`, error);
    }
  }
}

window.onload = () => {
  loadQuote();
  loadFeeds();
};
