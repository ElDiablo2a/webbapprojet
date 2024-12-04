const tweetForm = document.getElementById('tweetForm');
const tweetInput = document.getElementById('tweetInput');
const tweetsContainer = document.getElementById('tweets');

// Fetch existing tweets from the server
async function fetchTweets() {
  const response = await fetch('/api/tweets');
  const tweets = await response.json();
  renderTweets(tweets);
}

// Display tweets on the page
function renderTweets(tweets) {
  tweetsContainer.innerHTML = '';
  tweets.forEach(tweet => {
    const div = document.createElement('div');
    div.className = 'tweet';
    div.textContent = tweet.content;
    tweetsContainer.appendChild(div);
  });
}

// Submit new tweet
tweetForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const content = tweetInput.value.trim();
  if (content) {
    await fetch('/api/tweets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content })
    });
    tweetInput.value = '';
    fetchTweets();
  }
});

// Initial fetch
fetchTweets();
