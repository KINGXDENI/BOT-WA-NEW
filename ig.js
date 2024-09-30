const fetch = require('node-fetch');
function getUserByNomor(nomorKontak) {
    return new Promise((resolve, reject) => {
        const url = `http://localhost:3000/users/nomor/${nomorKontak}`; // Endpoint for getting user by nomor

        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': '123Deni' // Include your API key here if needed
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            return response.json(); // Parse the JSON from the response
        })
        .then(data => {
            resolve(data); // Resolve with the user data
        })
        .catch(error => {
            reject(`Error: ${error.message}`); // Catch and reject with error message
        });
    });
}
let nomor = '082144323683'; // Ensure nomorKontak is a string
getUserByNomor(nomor)
    .then(saldo => {
        console.log(saldo);
    })
    .catch(error => {
        console.error(error);
    });
