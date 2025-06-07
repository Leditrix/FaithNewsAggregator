const feeds = {
  "Catholicism": "https://www.vaticannews.va/en.rss.xml",
  "Orthodox Christianity": "https://www.oca.org/news/rss",
  "Latter-day Saints": "https://newsroom.churchofjesuschrist.org/rss",
  "Judaism": "https://www.jta.org/feed",
  "Islam": "https://aboutislam.net/blog/feed",
  "Hinduism": "https://www.hinduismtoday.com/blogs-news/news/",
  "Buddhism": "https://tricycle.org/feed/",
  "Evangelical": "https://aleteia.org/feed/",
  "Progressive Christian": "https://progressivechristianity.org/feed/",
  "Sikhism": "https://www.sikhnet.com/rss/articles",
  "General Religion": "https://religionnews.com/feed/",
  "Religion & Ethics": "https://www.abc.net.au/news/feed/51120/rss.xml"
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

      if (!data.items || data.items.length === 0) throw new Error('No items returned');

      const section = document.createElement('section');
      section.classList.add('news-block');
      section.innerHTML = `<h2>${religion}</h2>` + data.items.slice(0, 5).map(item =>
        `<p><a href="${item.link}" target="_blank">${item.title}</a></p>`).join('');
      document.getElementById('feedContainer').appendChild(section);
    } catch (error) {
      const fallback = document.createElement('section');
      fallback.classList.add('news-block');
      fallback.innerHTML = `<h2>${religion}</h2><p style="color:red;">(Feed failed to load)</p>`;
      document.getElementById('feedContainer').appendChild(fallback);
      console.error(`❌ Error loading ${religion}:`, error);
    }
  }
}

window.onload = () => {
  loadQuote();
  loadFeeds();
};
