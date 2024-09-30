const Tiktok = require('@tobyg74/tiktok-api-dl');
const {
    igdl,
    fbdown,
    twitter
} = require('btch-downloader')

const Tiktokdown = async (url) => {
    return new Promise(async (resolve, reject) => {
        if (!url) {
            reject('No Link');
            return;
        }
        const tiktok_url = url;

        try {
            const result = await Tiktok.Downloader(tiktok_url, {
                version: "v3" // version: "v1" | "v2" | "v3"
            });

            const data = result.result;
            resolve(data);
        } catch (e) {
            reject("Tiktok download error");
        }
    });
};

const IGDown = async (url) => {
    return new Promise(async (resolve, reject) => {
        if (!url) {
            reject('No Link');
            return;
        }

        try {
            igdl(url).then((result) => {
                const data = result[0];
                resolve(data);
            })

        } catch (e) {
            reject("Ig download error");
        }
    });
};

const FBDown = async (url) => {
    return new Promise(async (resolve, reject) => {
        if (!url) {
            reject('No Link');
            return;
        }

        try {
            fbdown(url).then((result) => {
                const data = result;
                resolve(data);
            })

        } catch (e) {
            reject("FB download error");
        }
    });
};

module.exports = {
    Tiktokdown,
    IGDown,
    FBDown
}