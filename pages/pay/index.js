// pages/cart/index.js
/**
 *只渲染勾选的商品
 */
Page({


  data: {
    cart: {},
    address: {},

    // 总价格
    totalPrice: 0,
    // 总数量
    totalNum: 0,

  },

  // 赋值给address，让按钮隐藏
  onShow() {
    const cart = wx.getStorageSync("cart") || {};
    const address = wx.getStorageSync("address") || {};

    let cartArr = Object.values(cart);
    let totalPrice = 0;
    // 3 计算总的数量
    let totalNum = 0;
    cartArr.forEach(v => {
      if (v.checked) {
        // 选中了
        totalPrice += v.num * v.goods_price;
        totalNum += v.num;
      }
    });
    // 判读一下有没有数据
    this.setData({
      cart,
      totalPrice,
      totalNum,
      address,
    });
  },

});