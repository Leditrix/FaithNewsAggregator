const quoteImagePairs = [
  {
    quote: '“Love your neighbor as yourself.” – Matthew 22:39',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Notre-Dame_de_Paris_2013-07-24.jpg/640px-Notre-Dame_de_Paris_2013-07-24.jpg'
  },
  {
    quote: '“Blessed is the one who gives.” – Quran 57:18',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Sheikh_Zayed_Mosque.jpg/640px-Sheikh_Zayed_Mosque.jpg'
  }
];
  {
    quote: '“Blessed is the one who gives.” – Quran 57:18',
    image: 'https://upload.wikimedia.org/wikipedia/commons/0/00/Sheikh_Zayed_Mosque.jpg' // Islam
  },
  {
    quote: '“All that we are is the result of what we have thought.” – Buddha',
    image: 'https://upload.wikimedia.org/wikipedia/commons/d/d1/Boudhanath_stupa_nepal.jpg' // Buddhism
  },
  {
    quote: '“Let your aim be the good of all beings.” – Bhagavad Gita',
    image: 'https://upload.wikimedia.org/wikipedia/commons/6/68/Meenakshi_Amman_Temple_in_Madurai.jpg' // Hinduism
  },
  {
    quote: '“Justice, justice shall you pursue.” – Deuteronomy 16:20',
    image: 'https://upload.wikimedia.org/wikipedia/commons/3/36/Western_Wall_Plaza.jpg' // Judaism
  },
  {
    quote: '“If ye are prepared ye shall not fear.” – Doctrine & Covenants 38:30',
    image: 'https://upload.wikimedia.org/wikipedia/commons/4/4c/Salt_Lake_Temple_by_night.jpg' // Latter-day Saints
  },
  {
    quote: '“The earth is but one country, and mankind its citizens.” – Baháʼu’lláh',
    image: 'https://upload.wikimedia.org/wikipedia/commons/3/37/Sydney_Bahai_Temple.jpg' // Baháʼí
  }
];

function loadQuoteAndImage() {
  const pair = quoteImagePairs[Math.floor(Math.random() * quoteImagePairs.length)];
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
  loadQuoteAndImage();
  loadFeeds();
  showDateTime();
};
