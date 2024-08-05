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
        <button class="copy-button" onclick="copyToClipboard('${shortUrl}')">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16h12M8 12h12M8 8h12M5 16h.01M5 12h.01M5 8h.01" />
            </svg>
            COPY
        </button>
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
