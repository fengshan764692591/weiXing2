// pages/cart/index.js
Page({

  /**
   *1 给按钮添加一个点击事件
    判断3种情况
    1.scope是undefined，用户没点过（收货地址按钮）
    2.scope是ture ，用户点击的确定，直接获取收货地址
    3 scope是false，用户点击的是取消，打开用户界面让用户自己去授权，再去获取收货信息
   注意：address空对象返回ture
   计算总价格，根据data中的cart对象来计算总价 ,全选，购买数量，总价格
   先求出全选状态的值
     修改3个值的状态
       1. 给商品绑定一个change事件，传递商品的id过去
       2. 获取到要修改的商品的id
       3. 获取data中的购物车cart对象，
       4.cart[id].checked = !cart[id].checked;取反
      5. 从新的cart设置为data中
        
   */

  data: {
    cart:{},
    address: {},
    // 全选状态
    isAllChecked:false,
    // 总价格
    totalPrice:0,
    // 总数量
    totalNum:0,
  },
  
  // 赋值给address，让按钮隐藏
  onShow(){
    const cart = wx.getStorageSync("cart") || {};
    const address = wx.getStorageSync("address") || {};
    this.setData({cart,address});
    this.setCart(cart);
  },
  // 添加收货地址
  handleChooseAddress() {
    // 1. 获取用户对该应用的授权信息
    wx.getSetting({
      success: (result1) => {
        //  console.log(result)
        // 1. 获取用户状态
        const scopeAdddress = result1.authSetting["scope.address"];
        // 1.3获取用户的收货地址
        if (scopeAdddress === undefined || scopeAdddress === true) {
          this.addStorage();
        } else {
          // 1.4 打开授权界面
          wx.openSetting({
            success: (result3) => {
              this.addStorage();
            }
          });
        }
      }
    });
  },
  // 收货地址本地存储
  addStorage() {
    wx.chooseAddress({
      success: (result) => {
        console.log(result)
        const address = result;
        address.all = result.provinceName + result.cityName + result.countyName + result.detailInfo;
        wx.setStorageSync("address", address);
      }
    });
  },
  // 根据cart对象来计算总价格
  // 1.先获取全选状态
  setCart(cart){
    // 0. 把对象转化为数组，
    let cartArr = Object.values(cart);
    // console.log(cartArr)
    // every 循环数组，返回ture
    // 1. 全选状态
    // let isAllChecked = cartArr.every(v=>v.checked);
    let isAllChecked = true;
    // 2. 计算总价格
    let totalPrice = 0;
    // 3 计算总的数量
    let totalNum = 0;
    cartArr.forEach(v => {
      if(v.checked){
        // 选中了
        totalPrice += v.num * v.goods_price;
        totalNum += v.num;
      }else{
         isAllChecked = false;
      }
    });
    this.setData({
      isAllChecked,
      totalPrice,
      totalNum,
    });
   
  },
  // 取消选中商品
  handleCartCheck(e){
  //  console.log(e.currentTarget.dataset)
  const {id} = e.currentTarget.dataset;
  // 2. 获取购物车对象
  let {cart} = this.data;
  // 3. 选中状态的取反
  cart[id].checked=!cart[id].checked;
   this.setData({cart});
    // 5. 重新计算价格
    wx.setStorageSync("cart", cart);
  this.setCart(cart);
  }

});