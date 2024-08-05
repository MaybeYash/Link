document.getElementById('url-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const longUrl = document.getElementById('long-url').value;
    const shortUrlKey = Math.random().toString(36).substring(7);
    const shortUrl = `${window.location.href}${shortUrlKey}`;

    let urls = JSON.parse(localStorage.getItem('urls')) || {};
    urls[shortUrlKey] = longUrl;
    localStorage.setItem('urls', JSON.stringify(urls));

    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    });

    const shortId = Object.keys(urls).length;

    document.getElementById('short-url-link').innerHTML = `<a href="${shortUrl}" class="text-red-600 hover:underline">${shortUrl}</a>`;
    document.getElementById('create-date').innerText = formattedDate;
    document.getElementById('shortn-id').innerText = shortId;

    function copyToClipboard() {
        const text = shortUrl;
        const tempInput = document.createElement('input');
        tempInput.value = text;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        alert('URL copied to clipboard');
    }
});

window.onload = function() {
    const urlPath = window.location.pathname.substring(1);
    let urls = JSON.parse(localStorage.getItem('urls')) || {};

    if (urls[urlPath]) {
        window.location.href = urls[urlPath];
    }
};
