const quoteImagePairs = [
  {
    quote: '“Love your neighbor as yourself.” – Matthew 22:39',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Notre-Dame_de_Paris_2013-07-24.jpg/640px-Notre-Dame_de_Paris_2013-07-24.jpg'
  }
];

function loadQuoteAndImage() {
  const pair = quoteImagePairs[0];
  document.getElementById('dailyQuote').textContent = pair.quote;
  document.getElementById('faithImage').src = pair.image;
}

function showDateTime() {
  const dt = new Date();
  const localeTime = dt.toLocaleString(undefined, {
    dateStyle: 'full',
    timeStyle: 'short'
  });

  const timeEl = document.createElement('div');
  timeEl.id = 'datetime';
  timeEl.style.fontWeight = 'bold';
  timeEl.style.borderTop = '1px solid #ccc';
  timeEl.style.borderBottom = '1px solid #ccc';
  timeEl.style.padding = '0.5rem 0';
  timeEl.textContent = localeTime;

  document.querySelector('.subhead').insertAdjacentElement('afterend', timeEl);
}

async function loadFeeds() {
  const feeds = {
    "Religion & Ethics": ["https://www.abc.net.au/news/feed/51120/rss.xml"],
    "General Religion": ["https://religionnews.com/feed/"],
    "Latter-day Saints": ["https://newsroom.churchofjesuschrist.org/rss"],
    "Judaism": ["https://www.jta.org/feed"],
    "Islam": ["https://aboutislam.net/blog/feed"],
    "Buddhism": ["https://tricycle.org/feed/"],
    "Catholicism": ["https://www.vaticannews.va/en.rss.xml"]
  };

  for (const [religion, urls] of Object.entries(feeds)) {
    const articles = [];

    for (const url of urls) {
      const api = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(url)}`;
      try {
        const res = await fetch(api);
        const data = await res.json();
        if (data.items && data.items.length > 0) {
          articles.push(...data.items.slice(0, 5));
        }
      } catch (error) {
        console.error(`Error loading ${religion} feed:`, error);
      }
    }

    const section = document.createElement('section');
    section.classList.add('news-block');
    section.innerHTML = `<h2>${religion}</h2>`;

    if (religion === "Religion & Ethics") {
      section.querySelector('h2').style.color = 'red';
    }

    if (articles.length > 0) {
      section.innerHTML += articles
        .map(item => `<p><a href="${item.link}" target="_blank">${item.title}</a></p>`)
        .join('');
    } else {
      section.innerHTML += `<p style="color:red;">(Feed failed to load)</p>`;
    }

    document.getElementById('feedContainer').appendChild(section);
  }
}

window.onload = () => {
  loadQuoteAndImage();
  loadFeeds();
  showDateTime();
};
