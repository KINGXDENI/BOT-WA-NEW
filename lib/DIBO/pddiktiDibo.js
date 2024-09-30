const axios = require('axios');

function getMahasiswaData(nama) {
    const apiUrl = `https://api-frontend.kemdikbud.go.id/hit_mhs/${encodeURIComponent(nama)}`;

    return new Promise((resolve, reject) => {
        axios.get(apiUrl)
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(`Error fetching Mahasiswa data: ${error}`);
            });
    });
}

function getDetailMahasiswaByKodeDetail(kodeDetail) {
    const apiUrl = `https://api-frontend.kemdikbud.go.id/detail_mhs/${kodeDetail}`;

    return new Promise((resolve, reject) => {
        axios.get(apiUrl)
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(`Error fetching detail mahasiswa: ${error}`);
            });
    });
}

module.exports = {
    getMahasiswaData,
    getDetailMahasiswaByKodeDetail
}
