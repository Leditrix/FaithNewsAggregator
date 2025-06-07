const feeds = {
  "Religion & Ethics": ["https://www.abc.net.au/news/feed/51120/rss.xml"],
  "General Religion": ["https://religionnews.com/feed/"],
  "Baháʼí Faith": ["https://www.bahaiblog.net/feed/"],
  "Buddhism": ["https://tricycle.org/feed/"],
  "Catholicism": ["https://www.vaticannews.va/en.rss.xml"],
  "Hinduism": [
    "https://www.hinduhumanrights.info/feed/",
    "https://timesofindia.indiatimes.com/rssfeeds/-2128936835.cms"
  ],
  "Islam": ["https://aboutislam.net/blog/feed"],
  "Judaism": ["https://www.jta.org/feed"],
  "Latter-day Saints": ["https://newsroom.churchofjesuschrist.org/rss"],
  "Mainstream Christianity": [
    "https://christiantoday.com/rss.xml",
    "https://www.christianpost.com/rss/news.xml"
  ],
  "Orthodox Christianity": [
    "https://www.oca.org/news/feed",
    "https://orthochristian.com/rss.xml"
  ],
  "Progressive Theology": ["http://www.progressivetheology.org/rss.xml"],
  "Sikhism": ["https://www.sikh24.com/feed/"],
  "Sojourners (Christian)": ["https://sojo.net/rss.xml"]
};

const quotes = [
  '“Love your neighbor as yourself.” – Matthew 22:39',
  '“Blessed is the one who gives.” – Quran 57:18',
  '“All that we are is the result of what we have thought.” – Buddha',
  '“Let your aim be the good of all beings.” – Bhagavad Gita',
  '“Justice, justice shall you pursue.” – Deuteronomy 16:20',
  '“If ye are prepared ye shall not fear.” – Doctrine & Covenants 38:30',
  '“Treat not others in ways that you yourself would find hurtful.” – The Buddha (Udana-Varga 5:18)',
  '“Speak the truth, even if it is bitter.” – Prophet Muhammad (Hadith)',
  '“We are all members of one another.” – Ephesians 4:25',
  '“The earth is but one country, and mankind its citizens.” – Baháʼu’lláh',
  '“Where there is charity and wisdom, there is neither fear nor ignorance.” – St. Francis of Assisi',
  '“The best among you are those who bring greatest benefit to others.” – Prophet Muhammad',
  '“Blessed are the peacemakers, for they shall be called children of God.” – Matthew 5:9',
  '“One who performs their duty without attachment, surrendering the results to God, is unaffected by sin.” – Bhagavad Gita 5.10',
  '“He who sees all beings in the Self, and the Self in all beings, never turns away from it.” – Isha Upanishad',
  '“To serve is beautiful, but only if it is done with joy and a whole heart.” – Pearl S. Buck'
];

function loadQuote() {
  const quote = quotes[Math.floor(Math.random() * quotes.length)];
  document.getElementById('dailyQuote').textContent = quote;
}

function showDateTime() {
  const dt = new Date();
  const localeTime = dt.toLocaleString(undefined, {
    dateStyle: 'full',
    timeStyle: 'short'
  });

  const timeEl = document.createElement('div');
  timeEl.id = 'datetime';
  timeEl.textContent = localeTime;

  document.querySelector('.subhead').insertAdjacentElement('afterend', timeEl);
}

async function loadFeeds() {
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
        console.error(`❌ Error loading ${religion} (${url}):`, error);
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
        .slice(0, 6)
        .map(item => `<p><a href="${item.link}" target="_blank">${item.title}</a></p>`)
        .join('');
    } else {
      section.innerHTML += `<p style="color:red;">(Feed failed to load)</p>`;
    }

    document.getElementById('feedContainer').appendChild(section);
  }
}

window.onload = () => {
  loadQuote();
  loadFeeds();
  showDateTime();
};
