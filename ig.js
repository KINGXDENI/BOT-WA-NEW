const {
    find
} = require('llyrics');

// Function to fetch lyrics using a Promise
function diboLyrics(songName, artistName = "") {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await find({
                song: songName,
                artist: artistName, // Add artist parameter
                engine: 'musixmatch',
                forceSearch: true,
            });

            // Check if lyrics are found
            if (response && response.lyrics) {
                resolve(response.lyrics);
            } else {
                reject(new Error('Lyrics not found'));
            }
        } catch (error) {
            reject(error);
        }
    });
}

// Example usage
diboLyrics('Terima kasih', 'Hal') // Added artist parameter
    .then(lyrics => {
        console.log('Lyrics found:');
        console.log(lyrics);
    })
    .catch(err => {
        console.error('Error fetching lyrics:', err.message);
    });
