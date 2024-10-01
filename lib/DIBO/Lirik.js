const axios = require('axios');
const cheerio = require('cheerio');
const {
    find
} = require('llyrics');

function ScrapeLirikWebkapanlagi(namaArtis, judulLagu) {
    return new Promise((resolve, reject) => {
        const url = `https://lirik.kapanlagi.com/artis/${encodeURIComponent(namaArtis)}/${encodeURIComponent(judulLagu)}/`;

        axios.get(url)
            .then(response => {
                const html = response.data;
                const $ = cheerio.load(html);
                const iframeSrc = $('div.video-contentwatch-container iframe').attr('src');

                // Mendapatkan ID video dari URL iframe
                const videoId = iframeSrc.split('/').pop();

                // Membuat URL video YouTube
                const youtubeUrl = 'https://www.youtube.com/watch?v=' + videoId;

                // Mengambil semua elemen dengan kelas 'lirik_line'
                const lirikElements = $('.lirik_line');

                // Membuat array untuk menyimpan lirik beserta \n jika ada <br> di atas atau di bawahnya
                const lirikLines = [];

                // Melakukan iterasi pada setiap elemen lirik
                lirikElements.each((index, element) => {
                    // Mendapatkan teks dari elemen lirik
                    let lirik = $(element).text().trim();
                    lirik = lirik.charAt(0).toUpperCase() + lirik.slice(1);
                    // Mengecek apakah ada <br> di atas elemen lirik
                    // const prevElement = $(element).prev();
                    // if (prevElement.is('br')) {
                    // 	lirik = '\n' + lirik; // Menambahkan \n jika ada <br> di atasnya
                    // }

                    // Mengecek apakah ada <br> di bawah elemen lirik
                    const nextElement = $(element).next();
                    if (nextElement.is('br')) {
                        lirik += '\n'; // Menambahkan \n jika ada <br> di bawahnya
                    }

                    // Menambahkan lirik ke dalam array lirikLines
                    lirikLines.push(lirik);
                });

                // Menggabungkan seluruh lirik menjadi satu string
                const lirikMerged = lirikLines.join('\n');

                // Mengembalikan hasil dalam bentuk objek
                const result = {
                    namaArtis: $('h5').text().split('-')[1].trim(),
                    judulLagu: $('h5').text().split(' - ')[0].replace('Lirik Lagu', '').trim(),
                    lirik: lirikMerged,
                    urlLagu: youtubeUrl
                };

                resolve(result);
            })
            .catch(error => {
                reject(error);
            });
    });
}
function diboLyrics(songName, artistName = "", engine = "musixmatch") {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await find({
                song: songName,
                artist: artistName, // Add artist parameter
                engine,
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
module.exports = {
    ScrapeLirikWebkapanlagi,
    diboLyrics
}
