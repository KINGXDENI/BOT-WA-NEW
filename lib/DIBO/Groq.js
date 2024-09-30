const Groq = require('groq-sdk');
const fs = require('fs');
const path = require('path');

const groq = new Groq({
    apiKey: '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'
});

module.exports = async function Groqs(phoneNumber, text) {
    if (!phoneNumber || !text) {
        throw new Error("Parameter 'phoneNumber' dan 'text' diperlukan.");
    }

    return new Promise(async (resolve, reject) => {
        try {
            const chatCompletion = await groq.chat.completions.create({
                messages: [
                    { role: "system", content: "Kamu adalah seorang Bot pintar bernama DIBO yang bertujuan untuk menjawab pertanyaan saya" },
                    { role: "user", content: text },
                ],
                model: "llama3-8b-8192",
                temperature: 0.5,
                max_tokens: 1024,
                top_p: 1,
                stop: null,
                stream: false,
            });

            const response = chatCompletion.choices[0]?.message?.content || "";

            // Simpan pesan ke file JSON
            const folderPath = path.join(__dirname, 'messages', phoneNumber); // Folder berdasarkan nomor HP
            const filePath = path.join(folderPath, 'chat_history.json');

            // Pastikan folder ada
            if (!fs.existsSync(folderPath)) {
                fs.mkdirSync(folderPath, { recursive: true });
            }

            // Baca riwayat chat yang sudah ada (jika ada)
            let chatHistory = [];
            if (fs.existsSync(filePath)) {
                chatHistory = JSON.parse(fs.readFileSync(filePath));
            }

            // Tambahkan pesan baru ke riwayat
            chatHistory.push({ role: "user", content: text });
            chatHistory.push({ role: "assistant", content: response });

            fs.writeFileSync(filePath, JSON.stringify(chatHistory, null, 2));
            console.log(`Pesan disimpan ke ${filePath}`);

            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
}


