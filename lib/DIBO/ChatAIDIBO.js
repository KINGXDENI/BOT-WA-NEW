__path = process.cwd();
// const {
//     OpenAI
// } = require('openai');
const {
    Hercai
} = require('hercai');

const axios = require('axios');
const translate = require('@saipulanuar/google-translate-api');
const fs = require('fs');
require("dotenv").config()
const FormData = require('form-data');


// const openai = new OpenAI({
//     apiKey: process.env['OPENAI_API_KEY'],
// });
const userChats = {};

// const chatAI1 = (text, userId) => {
//     return new Promise((resolve, reject) => {
//         const userMessage = text;

//         // Periksa apakah userId sudah ada dalam objek userChats
//         if (!userChats[userId]) {
//             // Jika tidak ada, inisialisasikan dengan pesan dari asisten
//             userChats[userId] = {
//                 userId,
//                 messages: [{
//                     role: 'system',
//                     content: 'Kamu adalah seorang Babu bernama Dicoding Bot yang bertujuan untuk menjawab pertanyaan saya',
//                 }],
//             };
//         }

//         // Tambahkan pesan pengguna ke dalam riwayat obrolan pengguna
//         userChats[userId].messages.push({
//             role: 'user',
//             content: userMessage,
//         });

//         // Kirim pesan ke OpenAI
//         const messages = userChats[userId].messages;

//         axios.post('https://api.openai.com/v1/chat/completions', {
//                 model: 'gpt-3.5-turbo',
//                 messages,
//                 stream: true,
//             }, {
//                 headers: {
//                     'Content-Type': 'application/json',
//                     Authorization: `Bearer ${process.env['OPENAI_API_KEY']}`,
//                 },
//                 responseType: 'stream',
//             })
//             .then(response => {
//                 const readableStream = response.data;
//                 let responseData = '';

//                 readableStream.on('data', (chunk) => {
//                     responseData += chunk.toString();
//                 });

//                 readableStream.on('end', () => {
//                     const dataStrings = responseData.split('\n');
//                     const contentArray = [];
//                     dataStrings.forEach((dataString) => {
//                         if (dataString && dataString !== 'data: [DONE]') {
//                             try {
//                                 const data = JSON.parse(dataString.substring('data: '.length));
//                                 const content = data.choices[0].delta.content || '';
//                                 contentArray.push(content);

//                             } catch (error) {
//                                 console.error('Error parsing JSON:', error.message);
//                                 reject('Error parsing JSON');
//                             }
//                         }
//                     });

//                     // Gabungkan konten menjadi satu respons JSON
//                     const mergedContent = contentArray.join('');
//                     userChats[userId].messages.push({
//                         role: 'assistant',
//                         content: mergedContent,
//                     });
//                     console.log(userChats);
//                     // Kirim respons JSON dengan konten tergabung
//                     resolve(mergedContent);
//                 });
//             })
//             .catch(error => {
//                 console.error('Error:', error.message);
//                 reject('Internal Server Error');
//             });
//     });
// };



// const chatAI2 = (text, userId, previousResponse) => {
//     return new Promise((resolve, reject) => {
//         const userMessage = text;

//         if (!userChats[userId]) {
//             userChats[userId] = {
//                 userId,
//                 messages: [{
//                     role: 'system',
//                     content: 'Kamu adalah seorang Babu bernama Dicoding Bot yang bertujuan untuk menjawab pertanyaan saya',
//                 }],
//             };
//         }

//         userChats[userId].messages.push({
//             role: 'user',
//             content: userMessage,
//         });

//         if (previousResponse) {
//             userChats[userId].messages.push({
//                 role: 'assistant',
//                 content: previousResponse,
//             });
//         }

//         const messages = userChats[userId].messages;

//         axios.post('https://api.openai.com/v1/chat/completions', {
//                 model: 'gpt-3.5-turbo',
//                 messages,
//                 stream: true,
//             }, {
//                 headers: {
//                     'Content-Type': 'application/json',
//                     Authorization: `Bearer ${process.env['OPENAI_API_KEY']}`,
//                 },
//                 responseType: 'stream',
//             })
//             .then(response => {
//                 const readableStream = response.data;
//                 let responseData = '';

//                 readableStream.on('data', (chunk) => {
//                     responseData += chunk.toString();
//                 });

//                 readableStream.on('end', () => {
//                     const dataStrings = responseData.split('\n');
//                     const contentArray = [];
//                     dataStrings.forEach((dataString) => {
//                         if (dataString && dataString !== 'data: [DONE]') {
//                             try {
//                                 const data = JSON.parse(dataString.substring('data: '.length));
//                                 const content = data.choices[0].delta.content || '';
//                                 contentArray.push(content);

//                             } catch (error) {
//                                 console.error('Error parsing JSON:', error.message);
//                                 reject('Error parsing JSON');
//                             }
//                         }
//                     });

//                     const mergedContent = contentArray.join('');
//                     userChats[userId].messages.push({
//                         role: 'assistant',
//                         content: mergedContent,
//                     });

//                     console.log(userChats);

//                     resolve(mergedContent);
//                 });
//             })
//             .catch(error => {
//                 console.error('Error:', error.message);
//                 reject('Internal Server Error');
//             });
//     });
// };



// const chatAI3 = (text) => {
//     return new Promise((resolve, reject) => {
//         try {
//             openai.completions.create({
//                     model: "text-davinci-003",
//                     prompt: `${text}`,
//                     temperature: 0.1,
//                     max_tokens: 3000,
//                     top_p: 1,
//                     frequency_penalty: 0,
//                     presence_penalty: 0,
//                 })
//                 .then(response => {
//                     resolve(response.choices[0].text.trim());
//                 })
//                 .catch(error => {
//                     console.error(error);
//                     reject({
//                         error: error
//                     });
//                 });
//         } catch (error) {
//             console.error(error);
//             reject({
//                 error: error
//             });
//         }
//     });
// };



const heraAI = (text) => {
    return new Promise((resolve, reject) => {
        try {
            const herc = new Hercai();
            setTimeout(() => {
                herc.question({
                    model: "v3",
                    content: text
                }).then(response => {
                    resolve(response.reply);
                }).catch(error => {
                    reject(error);
                });
            }, 1000);
        } catch (error) {
            console.error(error);
            reject({
                error: error
            });
        }
    });
};


const TransAI = (text, too) => {
    return new Promise((resolve, reject) => {
        try {
            translate(text, {
                to: too
            }).then(res => {
                resolve(res.text);
            }).catch(error => {
                reject(error);
            });
        } catch (error) {
            console.error(error);
            reject({
                error: error
            });
        }
    });
};


const WhisperAI = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const formData = new FormData();
            formData.append('file', fs.createReadStream(__path + '/audio.mp3'), {
                contentType: 'audio/mpeg',
                filename: 'audio.mp3'
            });
            formData.append('action', 'transcriptions');

            const response = await axios.post('https://api.itsrose.rest/chatGPT/whisper', formData, {
                headers: {
                    ...formData.getHeaders(),
                    'accept': 'application/json',
                    'Authorization': 'Rk-DeniBibo-TUYwHeWtk4iq6LEdCB8NWUHLceHY0HipxHCfTJlGRjtBiscLrhV38ALOUqngAy4G'
                }
            });

            resolve(response.data.result.transcriptions);
            await fs.unlinkSync(__path + '/audio.mp3');
        } catch (error) {
            console.error(error);
            reject({
                error: error
            });
        }
    });
};


const openaiCompletion = (text, model = "gpt-3.5-turbo-instruct") => {
    return new Promise((resolve, reject) => {
        openai.completions.create({
                model: model,
                prompt: text,
                temperature: 1,
                top_p: 1,
                frequency_penalty: 0,
                presence_penalty: 0,
            })
            .then(response => {
                resolve(response.choices[0].text);
            })
            .catch(error => {
                reject(error);
            });
    });
}


const openaiChatCompletions = (messages, model = "gpt-3.5-turbo") => {
    return new Promise((resolve, reject) => {
        openai.chat.completions.create({
                model: model,
                messages: messages,
                temperature: 1,
                top_p: 1,
                frequency_penalty: 0,
                presence_penalty: 0,
            })
            .then(response => {
                resolve(response);
            })
            .catch(error => {
                reject(error);
            });
    });
}

function RosechatGPTFunction(prompt, model = "websearch", timeOut = 15000, langCode = 'id') {
    return new Promise((resolve, reject) => {
        const apiUrl = 'https://api.itsrose.rest/chatGPT/_function_chat';
        const apiKey = 'Rk-DeniBibo-TUYwHeWtk4iq6LEdCB8NWUHLceHY0HipxHCfTJlGRjtBiscLrhV38ALOUqngAy4G';

        const requestData = {
            prompt,
            model,
            time_out: timeOut,
            lang_code: langCode // Tambahkan lang_code ke dalam requestData
        };

        axios.post(apiUrl, requestData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': apiKey,
                    'accept': 'application/json'
                }
            })
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}


const RosechatGPTCompletions = (prompt) => {
    return new Promise((resolve, reject) => {
        const apiUrl = 'https://api.itsrose.rest/chatGPT/completions';
        const apiKey = 'Rk-DeniBibo-TUYwHeWtk4iq6LEdCB8NWUHLceHY0HipxHCfTJlGRjtBiscLrhV38ALOUqngAy4G';

        const requestData = {
            prompt
        };

        axios.post(apiUrl, requestData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': apiKey,
                    'accept': 'application/json'
                }
            })
            .then(response => {
                resolve(response.data.message);
            })
            .catch(error => {
                reject(error);
            });
    });
}

function RoseGPT4Request(content, model = 'gpt-4-1106-preview', apiKey = 'Rk-DeniBibo-TUYwHeWtk4iq6LEdCB8NWUHLceHY0HipxHCfTJlGRjtBiscLrhV38ALOUqngAy4G') {
    return new Promise((resolve, reject) => {
        const apiUrl = 'https://api.itsrose.rest/chatGPT/turbo';

        const requestData = {
            model,
            messages: [{
                role: 'system',
                content: 'Kamu adalah seorang Babu bernama Dicoding Bot yang bertujuan untuk menjawab pertanyaan saya',
            }, {
                role: 'user',
                content
            }]
        };

        axios.post(apiUrl, requestData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': apiKey,
                    'accept': 'application/json'
                }
            })
            .then(response => {
                resolve(response.data.message);
            })
            .catch(error => {
                reject(error);
            });
    });
}



function RoseRealesrgan(initImage, serverName = 'frieren', scale = 2, modelId = 'RealESRNet_x4plus') {
    const apiUrl = 'https://api.itsrose.rest/image/real_esrgan';
    const apiKey = 'Rk-DeniBibo-TUYwHeWtk4iq6LEdCB8NWUHLceHY0HipxHCfTJlGRjtBiscLrhV38ALOUqngAy4G';

    const headers = {
        'accept': 'application/json',
        'Authorization': apiKey,
        'Content-Type': 'application/json',
    };

    const requestData = {
        server_name: serverName,
        init_image: initImage,
        scale: scale,
        model_id: modelId,
    };

    return new Promise((resolve, reject) => {
        axios.post(apiUrl, requestData, {
                headers
            })
            .then(response => {
                resolve(response.data.result.images); // Assuming the API returns the processed image or relevant data
            })
            .catch(error => {
                reject(`Error proccessing image: ${error}`);
            });
    });
}

function esrganRequest(initImage) {
    const apiUrl = 'https://api.itsrose.rest/image/esrgan';
    const authToken = 'Rk-DeniBibo-TUYwHeWtk4iq6LEdCB8NWUHLceHY0HipxHCfTJlGRjtBiscLrhV38ALOUqngAy4G';

    const requestData = {
        init_image: initImage,
        json: true,
        algo: 'esrgan'
    };

    const config = {
        headers: {
            'Accept': 'application/json',
            'Authorization': authToken,
            'Content-Type': 'application/json'
        }
    };

    return new Promise((resolve, reject) => {
        axios.post(apiUrl, requestData, config)
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error.response.data);
            });
    });
}


function RoseBingChatAPI({
    prompt,
    image = "",
    tone = "Balanced",
    stripMarkdown = true
}) {
    return new Promise((resolve, reject) => {
        axios.post('https://api.itsrose.rest/chatGPT/bing_chat', {
                prompt,
                init_image: image,
                time_zone: 'Asia/Jakarta',
                tone,
                strip_markdown: stripMarkdown
            }, {
                headers: {
                    'accept': 'application/json',
                    'Authorization': 'Rk-DeniBibo-TUYwHeWtk4iq6LEdCB8NWUHLceHY0HipxHCfTJlGRjtBiscLrhV38ALOUqngAy4G',
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

function RoseBardAPI(prompt) {
    return new Promise((resolve, reject) => {
        axios.post('https://api.itsrose.rest/chatGPT/_bard', {
                prompt
            }, {
                headers: {
                    'accept': '*/*',
                    'Authorization': 'Rk-DeniBibo-TUYwHeWtk4iq6LEdCB8NWUHLceHY0HipxHCfTJlGRjtBiscLrhV38ALOUqngAy4G',
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                resolve(response.data.result.messages.content);
            })
            .catch(error => {
                reject(error);
            });
    });
}
async function RoseCoverAI({
    url,
    voiceId
}) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.post(
                'https://api.itsrose.rest/audio/cover_ai', {
                    source_url: url,
                    voice_id: voiceId,
                    format: 'audio'
                }, {
                    headers: {
                        'accept': 'application/json',
                        'Authorization': 'Rk-DeniBibo-TUYwHeWtk4iq6LEdCB8NWUHLceHY0HipxHCfTJlGRjtBiscLrhV38ALOUqngAy4G',
                        'Content-Type': 'application/json'
                    }
                }
            );

            const data = response.data.result;
            console.log(data);
            if ((data.status === 'proccessing' || data.status === 'converting')) {
                console.log('Audio sedang diproses atau dikonversi, menunggu', data.eta, 'detik...');
                const timeout = data.eta !== 0 ? data.eta : 30; // Jika data.eta tidak 0, gunakan data.eta sebagai timeout, jika tidak gunakan 30 detik
                await new Promise(resolve => setTimeout(resolve, timeout * 1000)); // Convert detik ke milidetik
                resolve(await RoseCoverAIQuery(data.id));
            } else {
                console.log(data);
                resolve(data);
            }
        } catch (error) {
            reject('Failed to fetch audio: ' + error.message);
        }
    });
}


async function RoseCoverAIQuery(id) {
    try {
        const response = await axios.get(
            `https://api.itsrose.rest/audio/cover_ai/query?id=${id}`, {
                headers: {
                    'accept': 'application/json',
                    'Authorization': 'Rk-DeniBibo-TUYwHeWtk4iq6LEdCB8NWUHLceHY0HipxHCfTJlGRjtBiscLrhV38ALOUqngAy4G'
                }
            }
        );

        const data = response.data.result;
        console.log(data);
        if (data.status === 'proccessing' || data.status === 'converting') {
            console.log('Audio sedang diproses atau dikonversi, menunggu', data.eta, 'detik...');
            const timeout = data.eta !== 0 ? data.eta : 30; // Jika data.eta tidak 0, gunakan data.eta sebagai timeout, jika tidak gunakan 30 detik
            await new Promise(resolve => setTimeout(resolve, timeout * 1000)); // Convert detik ke milidetik
            return await RoseCoverAIQuery(id); // Panggil fungsi rekursif lagi
        } else {
            return data;
        }
    } catch (error) {
        throw new Error('Failed to query audio: ' + error.message);
    }
}

function RoseCoverAIVoices() {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.get(
                'https://api.itsrose.rest/audio/cover_ai/voices', {
                    headers: {
                        'accept': 'application/json',
                        'Authorization': 'Rk-DeniBibo-TUYwHeWtk4iq6LEdCB8NWUHLceHY0HipxHCfTJlGRjtBiscLrhV38ALOUqngAy4G'
                    }
                }
            );

            const voices = response.data.result.voices;
          
            resolve(voices);
        } catch (error) {
            reject('Failed to fetch voices: ' + error.message);
        }
    });
}

function RoseMusicAI({prompt, gender, mood, genre, nuance}) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.post(
                'https://api.itsrose.rest/audio/music_ai', {
                    prompt: prompt,
                    gender: gender,
                    mood: mood,
                    genre: genre,
                    nuance: nuance
                }, {
                    headers: {
                        'accept': 'application/json',
                        'Authorization': 'Rk-DeniBibo-TUYwHeWtk4iq6LEdCB8NWUHLceHY0HipxHCfTJlGRjtBiscLrhV38ALOUqngAy4G',
                        'Content-Type': 'application/json'
                    }
                }
            );
            const data = response.data.result;
            console.log(data);
            if ((data.status === 'starting' || data.status === 'processing')) {
                console.log('Audio sedang diproses atau dikonversi, menunggu', '30 detik...');
                await new Promise(resolve => setTimeout(resolve, 30000));
                resolve(await RoseMusicAIQuery(data.id));
            } else {
                console.log(data);
                resolve(data);
            }

        } catch (error) {
            reject('Failed to POST music AI request: ' + error.message);
        }
    });
}

// Promise dan resolve untuk GET request
function RoseMusicAIQuery(id) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.get(
                `https://api.itsrose.rest/audio/music_ai/query?id=${id}`, {
                    headers: {
                        'accept': 'application/json',
                        'Authorization': 'Rk-DeniBibo-TUYwHeWtk4iq6LEdCB8NWUHLceHY0HipxHCfTJlGRjtBiscLrhV38ALOUqngAy4G'
                    }
                }
            );
            const data = response.data.result;
            console.log(data);
            if ((data.status === 'starting' || data.status === 'processing')) {
                console.log('Audio sedang diproses atau dikonversi, menunggu', '30 detik...');
                await new Promise(resolve => setTimeout(resolve, 30000));
                resolve(await RoseMusicAIQuery(id));
            } else {
                console.log(data);
                resolve(data);
            }
        } catch (error) {
            reject('Failed to GET music AI query: ' + error.message);
        }
    });
}

function GptFree(text) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.post("https://deepenglish.com/wp-json/ai-chatbot/v1/chat", {
                messages: [{
                        role: "system",
                        content: `content: 'Kamu adalah seorang Bot pintar bernama DIBO yang bertujuan untuk menjawab pertanyaan saya',`
                    },
                    {
                        role: "user",
                        content: text
                    }
                ]
            });

            const hasil = response.data.answer;
            resolve(hasil);
        } catch (error) {
            reject('Failed to send chat message: ' + error.message);
        }
    });
}


module.exports = {
    // chatAI1,
    // chatAI2,
    // chatAI3,
    heraAI,
    TransAI,
    WhisperAI,
    openaiChatCompletions,
    openaiCompletion,
    RosechatGPTFunction,
    RosechatGPTCompletions,
    RoseGPT4Request,
    RoseBingChatAPI,
    RoseBardAPI,
    RoseRealesrgan,
    esrganRequest,
    RoseCoverAI,
    RoseCoverAIVoices,
    RoseMusicAI,
    GptFree

}