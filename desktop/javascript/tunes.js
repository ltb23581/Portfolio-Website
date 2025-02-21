let resultsDiv = document.querySelector('#results');
let juke = document.querySelector('#juke');

function searchMusic() {
    let query = document.getElementById('searchInput').value;
    let url = `https://itunes.apple.com/search?term=${encodeURIComponent(query)}&entity=song&limit=10`;  // iTunes API

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayResults(data.results);
        })
        .catch(error => console.error('Error fetching data:', error));
}

function displayResults(tracks) {
    resultsDiv.innerHTML = ''; 

    tracks.forEach(track => {
        let trackDiv = document.createElement('div');
        trackDiv.className = 'track';
        trackDiv.innerHTML = `
            <strong>${track.trackName}</strong><br>
            <small>${track.artistName}</small><br>
            <img src="${track.artworkUrl100}" alt="${track.trackName}" width="50">
        `;

        trackDiv.onclick = () => player(track.previewUrl);

        resultsDiv.appendChild(trackDiv);
    });
}

function player(tune) {
    juke.innerHTML = `<audio controls autoplay src="${tune}" type='audio/m4a'></audio>`;
}