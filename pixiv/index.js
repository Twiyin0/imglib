// 使用示例
const accImg = require("./result_acc.json")
const verImg = require("./result_acc.json")
const otherImg = require("./result_acc.json")

// 获取图片数据 0:所有 1:横屏 2:竖屏 3:其他
const allImage = [(accImg+verImg+otherImg), accImg, verImg, otherImg];

function getImgData(imgType) {
    let imgSel = imgType? allImage[imgType]:allImage[0];
    let randomIndex = Math.floor(Math.random() * imgSel.length);
    return imgSel[randomIndex];
}

// 随机获取一张图片
console.log(getImgData(0));
