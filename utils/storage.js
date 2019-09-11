
/*
 封装本地存储的数据
*/
/*
  获取本地存储中的数据
  key:键
*/
export const getStorageCart= (key) => {
  return  wx.getStorageSync(key);
}

/**
 * @param {object}  obj 要填充的数据
 * key : 键
 */
export const setStorageCart = (key,obj) => {
  wx.setStorageSync(key, obj);
}

/*
  获取本地存储中的数据分类商品数据
  key:键
*/
export const getStorageCate = () => {
  return  wx.getStorageSync("cate");
}

/**
 * @param {object}  obj 要填充的数据
 * key : 键
 */
export const setStorageCate = (obj) => {
  wx.setStorageSync("cate", obj);
}