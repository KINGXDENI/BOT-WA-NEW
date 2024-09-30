const fs = require("fs");
const fetch = require("node-fetch");

module.exports = function WhisperHug(filename) {
    return new Promise((resolve, reject) => {
        // Baca file
        fs.readFile(filename, (err, data) => {
            if (err) {
                return reject(err);
            }

            // Fetch data dari API
            fetch("https://api-inference.huggingface.co/models/openai/whisper-large-v3", {
                    headers: {
                        Authorization: "Bearer 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"
                    },
                    method: "POST",
                    body: data,
                })
                .then(response => response.json())
                .then(async result => {
                    console.log(result);
                    // Proses hasil untuk menghapus tanda kutip
                    let res = result.text.replace(/["']/g, "").trim(); // Hapus tanda kutip
                    resolve(res);
                    await fs.unlinkSync(filename);
                })
                .catch(err => reject(err));
        });
    });
}