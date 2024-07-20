document.addEventListener('DOMContentLoaded', function() {
    const developerToken = 'YOUR_DEVELOPER_TOKEN_HERE'; // Replace with your Apple Music developer token

    MusicKit.configure({
        developerToken: developerToken,
        app: {
            name: 'Music Streaming App',
            build: '1.0.0'
        }
    });

    const music = MusicKit.getInstance();

    document.getElementById('search-btn').addEventListener('click', function() {
        const query = document.getElementById('search').value;
        searchMusic(query);
    });

    function searchMusic(query) {
        music.api.search(query, { limit: 10, types: ['songs'] }).then(response => {
            const tracksContainer = document.getElementById('tracks');
            tracksContainer.innerHTML = '';

            const songs = response.songs.data;
            songs.forEach(song => {
                const trackElement = document.createElement('div');
                trackElement.classList.add('track');

                const artworkUrl = song.attributes.artwork.url.replace('{w}', '50').replace('{h}', '50');
                trackElement.innerHTML = `
                    <img src="${artworkUrl}" alt="${song.attributes.name}">
                    <div class="track-info">
                        <h4>${song.attributes.name}</h4>
                        <p>${song.attributes.artistName}</p>
                    </div>
                    <button class="play-btn" data-song-id="${song.id}">Play</button>
                `;

                tracksContainer.appendChild(trackElement);
            });

            document.querySelectorAll('.play-btn').forEach(button => {
                button.addEventListener('click', function() {
                    const songId = this.getAttribute('data-song-id');
                    playSong(songId);
                });
            });
        });
    }

    function playSong(songId) {
        music.setQueue({ song: songId }).then(queue => {
            music.play();
        });
    }
});