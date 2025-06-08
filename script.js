const quoteImagePairs = [
  {
    quote: '“The earth is but one country, and mankind its citizens.” – Baháʼuʼlláh',
    image: 'https://raw.githubusercontent.com/Leditrix/FaithNewsAggregator/main/Baháʼí%20–%20Sydney%20House%20of%20Worship%20-%20Bahaitemplesydney.JPG'
  },
  {
    quote: '“All that we are is the result of what we have thought.” – Buddha',
    image: 'https://raw.githubusercontent.com/Leditrix/FaithNewsAggregator/main/Buddhism%20-%20Tian_Tan_Buddha%20-%20Hong%20Kong.jpg'
  },
  {
    quote: '“Blessed are the peacemakers.” – Matthew 5:9',
    image: 'https://raw.githubusercontent.com/Leditrix/FaithNewsAggregator/main/Catholic%20-%20North_rose_window_of_Notre-Dame_de_Paris,_Dec._2024.jpg'
  },
  {
    quote: '“Love one another as I have loved you.” – John 13:34',
    image: 'https://raw.githubusercontent.com/Leditrix/FaithNewsAggregator/main/Christian%20-%20The_Pietà_by_Michelangelo_(48135182552).jpg'
  },
  {
    quote: '“Let your aim be the good of all beings.” – Bhagavad Gita',
    image: 'https://raw.githubusercontent.com/Leditrix/FaithNewsAggregator/main/Hinduism%20–%20Madurai_Meenakshi_temple_prayer.jpg'
  },
  {
    quote: '“Blessed is the one who gives.” – Quran 57:18',
    image: 'https://raw.githubusercontent.com/Leditrix/FaithNewsAggregator/main/Islam%20–%20Sheikh%20Zayed%20Grand%20Mosque%20-%20Tilework_Inside_The_Sher_Dor_Madrasa.jpeg'
  },
  {
    quote: '“Justice, justice shall you pursue.” – Deuteronomy 16:20',
    image: 'https://raw.githubusercontent.com/Leditrix/FaithNewsAggregator/main/Judaism%20–%20Western%20Wall,%20Jerusalem%20-%20Westen_(Wailing)_Wall,_Jerusalem,_2007.jpg'
  },
  {
    quote: '“If ye are prepared ye shall not fear.” – Doctrine & Covenants 38:30',
    image: 'https://raw.githubusercontent.com/Leditrix/FaithNewsAggregator/main/Latter-day%20Saint%20-%20Nauvoo_Illinois_Temple_Southwest_Night_Perspective.jpg'
  }
];

function loadQuoteAndImage() {
  const pair = quoteImagePairs[Math.floor(Math.random() * quoteImagePairs.length)];
  document.getElementById('dailyQuote').textContent = pair.quote;
  document.getElementById('faithImage').src = pair.image;
  document.getElementById('faithImage').alt = pair.quote;
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
  "Religion & Ethics": [
    "https://www.abc.net.au/news/feed/51120/rss.xml",
    "https://www.npr.org/rss/rss.php?id=1004"
  ],
  "General Religion": [
    "https://religionnews.com/feed/",
    "https://www.patheos.com/blogs/futureofthefaith/feed/",
    "https://www.beliefnet.com/feeds/rss.aspx"
  ],
  "Baháʼí Faith": [
    "https://www.bahaiblog.net/feed/",
    "https://news.bahai.org/feed/"
  ],
  "Buddhism": [
    "https://tricycle.org/feed/",
    "https://buddhaweekly.com/feed/",
    "https://plumvillage.org/feed/"
  ],
  "Catholicism": ["https://www.vaticannews.va/en.rss.xml"],
  "Hinduism": [
    "https://www.hinduismtoday.com/feed",
    "https://feeds.feedburner.com/HinduDevotionalBlog"
  ],
  "Islam": [
    "https://aboutislam.net/blog/feed",
    "https://muslimmatters.org/feed/"
  ],
  "Judaism": [
    "https://www.jta.org/feed",
    "https://www.ritualwell.org/blog/rss",
    "https://www.theyeshivaworld.com/rss"
  ],
  "Latter-day Saints": [
    "https://newsroom.churchofjesuschrist.org/rss",
    "https://latterdaysaintmag.com/feed",
    "https://bycommonconsent.com/feed/",
    "https://www.fairlatterdaysaints.org/blog/feed"
  ],
  "Mainstream Christianity": [
    "https://christiantoday.com/rss.xml",
    "https://www.christianpost.com/rss/news.xml",
    "https://www.christianitytoday.com/ct/rss.xml"
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
        console.error(`Error loading ${religion} feed:`, error);
      }
    }

    const section = document.createElement('section');
    section.classList.add('news-block');
    section.innerHTML = `<h2>${religion.toUpperCase()}</h2>`;

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
