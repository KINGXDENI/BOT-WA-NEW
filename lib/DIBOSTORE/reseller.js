const fetch = require('node-fetch');
const baseURL = 'http://localhost:3000';

function cekSaldoByNomor(nomorKontak) {
    return new Promise((resolve, reject) => {
        const url = `${baseURL}/users/cek-saldo`; // Endpoint for checking saldo
        const bodys = { nomor: nomorKontak }; // Prepare the body with the nomorKontak

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': '123Deni' // Add the x-api-key header
            },
            body: JSON.stringify(bodys)
        })
        .then(response => {
           
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); 
        })
        .then(data => {
          resolve(data.saldo)
        })
        .catch(error => {
            reject(`Error: ${error.message}`); // Catch and reject with error message
        });
    });
}

function addSaldoByNomor(nomorKontak, amount) {
    return new Promise((resolve, reject) => {
        const url = `${baseURL}/users/add-saldo`; // Endpoint for adding saldo
        const bodys = { nomor: nomorKontak, amount }; // Prepare the body with nomorKontak and amount

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': '123Deni' // Add the x-api-key header
            },
            body: JSON.stringify(bodys)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // Parse the JSON from the response
        })
        .then(data => {
           resolve(data.newSaldo);
        })
        .catch(error => {
            reject(`Error: ${error.message}`); // Catch and reject with error message
        });
    });
}

function hapusSaldoByNomor(nomorKontak, amount) {
    return new Promise((resolve, reject) => {
        const url = `${baseURL}/users/delete-saldo`; // Endpoint for deleting saldo
        const bodys = { nomor: nomorKontak, amount }; // Prepare the body with nomorKontak and amount

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': '123Deni' // Add the x-api-key header
            },
            body: JSON.stringify(bodys)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // Parse the JSON from the response
        })
        .then(data => {
           resolve(data.newSaldo);
        })
        .catch(error => {
            reject(`Error: ${error.message}`); // Catch and reject with error message
        });
    });
}

function sendNomorToPulsa(nomorKontak) {
    return new Promise((resolve, reject) => {
        const url = `http://localhost:3000/pulsa`; // Endpoint for sending nomor
        const bodys = { nomor: nomorKontak }; // Prepare the body with the nomorKontak

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': '123Deni' // Include your API key here if needed
            },
            body: JSON.stringify(bodys)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            return response.json(); // Parse the JSON from the response
        })
        .then(data => {
          
            resolve(data); // Resolve with the response data
        })
        .catch(error => {
            reject(`Error: ${error.message}`); // Catch and reject with error message
        });
    });
}

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
function TransaksiPulsa(nomorReseller, produk, tujuan, m_key) {
    return new Promise((resolve, reject) => {
        // Get the memberId using nomorReseller
        getUserByNomor(nomorReseller)
            .then(user => {
                const memberId = user.member_id; // Assuming member_id is a field in the user object
                const from = 'Bot'
                // Prepare the transaction payload
                const transactionData = {
                    produk,
                    tujuan,
                    memberId,
                    from,
                    m_key
                };

                const url = 'http://localhost:3000/pulsa/transaksi'; // Endpoint for performing the transaction

                // Send the transaction request
                fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-api-key': '123Deni' // Include your API key here if needed
                    },
                    body: JSON.stringify(transactionData) // Stringify the transaction data
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Network response was not ok: ${response.statusText}`);
                    }
                    return response.json(); // Parse the JSON from the response
                })
                .then(data => {
                    resolve(data); // Resolve with the transaction response
                })
                .catch(error => {
                    reject(`Error: ${error.message}`); // Catch and reject with error message
                });
            })
            .catch(error => {
                reject(`Error fetching user by nomor: ${error}`); // Handle error from getUserByNomor
            });
    });
}
module.exports = {
    cekSaldoByNomor,
    addSaldoByNomor,
    hapusSaldoByNomor,
    sendNomorToPulsa,
    getUserByNomor,
    TransaksiPulsa
};
