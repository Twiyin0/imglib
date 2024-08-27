// const axios = require('axios');

// async function getRandomElement() {
//     try {
//         // 获取JSON数组
//         const response = await axios.get('https://cdn.jsdelivr.net/gh/Twiyin0/imglib/pixiv/result_acc.json');
        
//         // 解析返回的JSON数组
//         const dataArray = response.data;
        
//         // 随机选择一个元素
//         const randomIndex = Math.floor(Math.random() * dataArray.length);
//         const randomElement = dataArray[randomIndex];
        
//         // 输出随机选择的元素
//         console.log(randomElement);
//     } catch (error) {
//         console.error('Error fetching data:', error);
//     }
// }

// // 调用函数
// getRandomElement();


// 原生nodejs

const https = require('https');

function fetchJson(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let data = '';

            // 监听数据接收
            res.on('data', (chunk) => {
                data += chunk;
            });

            // 数据接收完毕
            res.on('end', () => {
                try {
                    // 解析JSON字符串
                    const jsonData = JSON.parse(data);
                    resolve(jsonData);
                } catch (error) {
                    reject('Error parsing JSON: ' + error.message);
                }
            });
        }).on('error', (error) => {
            reject('Error fetching data: ' + error.message);
        });
    });
}

async function getRandomElementFromUrl(url) {
    try {
        // 等待JSON数据获取
        const dataArray = await fetchJson(url);

        // 从数组中随机选择一个元素
        const randomIndex = Math.floor(Math.random() * dataArray.length);
        const randomElement = dataArray[randomIndex];

        // 输出随机选择的元素
        console.log(randomElement);
    } catch (error) {
        console.error(error);
    }
}

// 调用函数并传入URL
getRandomElementFromUrl('https://cdn.jsdelivr.net/gh/Twiyin0/imglib/pixiv/result_acc.json');

