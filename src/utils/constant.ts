import host from './getHost';
const tokenMsg = {
  "TokenExpiredError": 404,
  "JsonWebTokenError": 500
};

// 静态图片路径
const imageHost = `http://${host}:5000/image/`;
const settingImageHost = `http://${host}:5000/setting/image/`;
const lifeImageHost = `http://${host}:5000/life/image/`
export {tokenMsg, imageHost,settingImageHost, host, lifeImageHost}