document.getElementById('url-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const longUrl = document.getElementById('long-url').value;
    const shortUrl = `${window.location.href}${Math.random().toString(36).substring(7)}`;

    const urls = JSON.parse(localStorage.getItem('urls')) || {};
    urls[shortUrl] = longUrl;
    localStorage.setItem('urls', JSON.stringify(urls));

    document.getElementById('short-url').innerHTML = `<a href="${shortUrl}" class="text-red-600 hover:underline">${shortUrl}</a>`;
});

window.onload = function() {
    const urlPath = window.location.pathname.substring(1);
    const urls = JSON.parse(localStorage.getItem('urls')) || {};

    if (urls[window.location.href]) {
        window.location.href = urls[window.location.href];
    }
};
