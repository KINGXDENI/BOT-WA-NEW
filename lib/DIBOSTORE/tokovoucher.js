const fetch = require('node-fetch');
const crypto = require('crypto');

async function createTokovoucherTransaction(produk, tujuan) {
    const secret = 'f5c561c28ff16c71c4b0a0a9d893b2ed442ae485117cc021de99f58d99a3cd5e';
    const memberCode = 'M240528BTKL2707OH';
    const refId = `DIBO${Math.floor(1000 + Math.random() * 9000)}`;
    const url = `https://api.tokovoucher.id/v1/transaksi?ref_id=${refId}&produk=${produk}&tujuan=${tujuan}&secret=${secret}&member_code=${memberCode}&server_id=$}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data; // Resolve dengan data respons
    } catch (error) {
        console.error('Error creating Tokovoucher transaction:', error);
        throw error; // Reject dengan error
    }
}

async function checkTransactionStatus(refId, retryCount = 0) {
    const maxRetries = 10;

    const memberCode = 'M240528BTKL2707OH';
    const secret = 'f5c561c28ff16c71c4b0a0a9d893b2ed442ae485117cc021de99f58d99a3cd5e';
    const signature = crypto.createHash('md5').update(`${memberCode}:${secret}:${refId}`).digest('hex');
    const url = `https://api.tokovoucher.id/v1/transaksi/status?ref_id=${refId}&member_code=${memberCode}&signature=${signature}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        if (data.status === "pending" && retryCount < maxRetries) {
            await new Promise(resolve => setTimeout(resolve, 2000));
            return await checkTransactionStatus(refId, retryCount + 1); // Tambahkan await
        } else {
            return data;
        }
    } catch (error) {
        console.error('Error checking transaction status:', error);
        if (retryCount < maxRetries) {
            await new Promise(resolve => setTimeout(resolve, 2000));
            return await checkTransactionStatus(refId, retryCount + 1); // Tambahkan await
        } else {
            throw error;
        }
    }
}

function getTokovoucherSaldo() {
    const memberCode = 'M240528BTKL2707OH';
    const signature = '3eb4b38183163f3f3d0adde606132003';
    const apiUrl = `https://api.tokovoucher.id/member?member_code=${memberCode}&signature=${signature}`;

    return fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`API request failed with status ${response.status}`);
            }
            return response.json(); // Mengubah respons menjadi JSON
        })
        .then(data => {
            // Mengambil data member dari objek respons
            const memberData = data.data;
            return memberData; // Mengembalikan hanya data member
        })
        .catch(error => {
            console.error("Error fetching data:", error);
            throw error;
        });
}

module.exports = {
    createTokovoucherTransaction,
    checkTransactionStatus,
    getTokovoucherSaldo
}