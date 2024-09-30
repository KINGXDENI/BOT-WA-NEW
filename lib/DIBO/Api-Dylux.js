const dy = require('api-dylux');

const dyStickerSearch = (text) => {
    return new Promise((resolve, reject) => {
        dy.StickerSearch(text).then((result) => {
            resolve(result.sticker_url);
        }).catch((error) => {
            reject(error);
        });
    });
};

module.exports = {
    dyStickerSearch
}