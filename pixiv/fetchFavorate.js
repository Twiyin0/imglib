const axios = require('axios');

const apiurl = ``;

async function fetchPixivIllust(url) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

async function mainModule() {
  try {
    let storeID = [];
    let illust = await fetchPixivIllust(apiurl);
    let nextUrl = illust.next_url ? apiurl + "&max_bookmark_id=" + illust.next_url.replace("https://app-api.pixiv.net/v1/user/bookmarks/illust?user_id=75690835&restrict=public&max_bookmark_id=", '') : null;

    // 将第一次请求的数据中的id存入storeID数组
    storeID.push(...illust.illusts.map(array => array.id));

    // 循环请求nextUrl直到没有nextUrl
    while (nextUrl) {
      const nextIllust = await fetchPixivIllust(nextUrl);
      storeID.push(...nextIllust.illusts.map(array => array.id));
      nextUrl = nextIllust.next_url ? (apiurl + "&max_bookmark_id=" + nextIllust.next_url.replace("https://app-api.pixiv.net/v1/user/bookmarks/illust?user_id=75690835&restrict=public&max_bookmark_id=", '')) : null;
    }

    // 输出ID，20个一组
    for (let i = 0; i < storeID.length; i += 20) {
      const idGroup = storeID.slice(i, i + 20).join(',');
      console.log(idGroup);
    }
  } catch (error) {
    console.error('Error in mainModule:', error);
  }
}

mainModule();

