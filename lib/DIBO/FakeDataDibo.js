const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
__path = process.cwd();

function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
    }

    return result;
}

const FakeKtpData = (nik, name, ttl, jk, jl, rtrw, lurah, camat, prov, kabu, agama, nikah, kerja, warga, until, img) => {
    const apiUrl = `https://tools.revesery.com/ktp/revesery.php?nik=${nik}&name=${name}&ttl=${ttl}&jk=${jk}&jl=${jl}&rtrw=${rtrw}&lurah=${lurah}&camat=${camat}&prov=${prov}&kabu=${kabu}&agama=${agama}&nikah=${nikah}&kerja=${kerja}&warga=${warga}&until=${until}&img=${img}`;

    return new Promise((resolve, reject) => {
        axios.get(apiUrl, {
                responseType: 'arraybuffer'
            })
            .then(response => {
                const $ = cheerio.load(response.data);
                
                const imgSrc = $('img').attr('src');
                const imgBuffer = Buffer.from(imgSrc.split(",")[1], 'base64');
                const randomString = generateRandomString(10);
                // Save the image to a file (optional)
                const imagePath = __path + `/${randomString}ktp.png`
                fs.writeFileSync(imagePath, imgBuffer);

                resolve(imagePath);
            
            })
            .catch(error => {
                reject(`Error fetching KTP data: ${error}`);
            });
    });
}

function FakeKtpData2(nik, name, ttl, jk, jl, rtrw, lurah, camat, prov, kabu, agama, nikah, kerja, util, img) {
    const apiUrl = `https://api.yanzbotz.my.id/api/maker/ktp?nik=${nik}&name=${name}&ttl=${ttl}&jk=${jk}&jl=${jl}&rtrw=${rtrw}&lurah=${lurah}&camat=${camat}&prov=${prov}&kabu=${kabu}&agama=${agama}&nikah=${nikah}&kerja=${kerja}&util=${util}&img=${img}`;

    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.get(apiUrl, {
                responseType: 'arraybuffer'
            });
            const randomString = generateRandomString(10);
            // Save image to a file
            const filePath = __path + `/${randomString}ktp2.png`; // You can change the file name and path
            fs.writeFileSync(filePath, response.data);

            resolve(filePath);
        } catch (error) {
            reject(`Error fetching or saving KTP data: ${error}`);
        }
    });
}

module.exports = {
    FakeKtpData,
    FakeKtpData2
}
