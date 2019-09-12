import {request} from "../../request/index.js";
import {requestPayment} from "../../request/resPay.js"
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
  // 点击支付
  handlePay(){
    const cart = this.data.cart;
    // 1. 获取本地存储的token
    const token = wx.getStorageSync("token");
    // 2. 判断有没有token
    if(!token){
      // 2.1 跳转授权页面
      wx.navigateTo({
        url: '/pages/auth/index',
      });        
    }else{
      // 3. 准备订单参数
      let header={Authorization:token};
      let order_price = this.data.totalPrice;
      let consignee_addr = this.data.address.all;
      // 订单的商品数组
      let goods = [];
      for (const key in cart) {
        if (cart.hasOwnProperty(key)) {
         if(cart[key].checked){
           goods.push({
            goods_id:cart[key].goods_id,
            goods_number:cart[key].num,
            goods_price:cart[key].goods_price
           });
         }
          
        }
      }
      // 把订单的参数封装
      let orderParams = {order_price,consignee_addr,goods}
      // 3.3发送请求
      request({url:"/my/orders/create",data:orderParams,method:"post",header:header})
      .then(res =>{
      // 　console.log(res)
      const {order_number} = res;
      // 4 获取支付参数
      request({url:"/my/orders/req_unifiedorder",data:{order_number},method:"post",header:header})
      .then(res =>{
       console.log(res);
       const {pay} = res;
       requestPayment(pay)
       .then(res =>{
　　　　　console.log(res);　　
       })
       .catch(err =>{
         console.log(err)
       })
      });
      });
    }
  }
});
