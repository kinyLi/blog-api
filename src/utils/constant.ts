import host from './getHost';
const tokenMsg = {
  "TokenExpiredError": 404,
  "JsonWebTokenError": 500
};

// 静态图片路径
const imageHost = `http://${host}:5000/image/`;
export {tokenMsg, imageHost, host}