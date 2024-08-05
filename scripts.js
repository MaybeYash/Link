document.getElementById('url-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const longUrl = document.getElementById('long-url').value;
    const shortUrlKey = Math.random().toString(36).substring(7);
    const shortUrl = `${window.location.href}${shortUrlKey}`;

    let urls = JSON.parse(localStorage.getItem('urls')) || {};
    urls[shortUrlKey] = longUrl;
    localStorage.setItem('urls', JSON.stringify(urls));

    document.getElementById('short-url').innerHTML = `
        <a href="${shortUrl}" class="text-red-600 hover:underline" id="short-url-link">${shortUrl}</a>
        <button class="copy-button" onclick="copyToClipboard('${shortUrl}')">Copy</button>
    `;
});

function copyToClipboard(text) {
    const tempInput = document.createElement('input');
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    alert('URL copied to clipboard');
}

window.onload = function() {
    const urlPath = window.location.pathname.substring(1);
    let urls = JSON.parse(localStorage.getItem('urls')) || {};

    if (urls[urlPath]) {
        window.location.href = urls[urlPath];
    }
};
