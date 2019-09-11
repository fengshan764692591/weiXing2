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
    全选，复选框
    1. 绑定选中事件
    2.获取data中的值  isAllChecked
    3. 取反 
    4。获取data中的购物车对象。循环对象，修改每一项的值
    5.把修改后的cart对象传入到data中
   商品数量
     1. 绑定事件
     商品结算
     1 判断有没有收货地址，
     2. 判断有没有商品
   */

  data: {
    cart: {},
    address: {},
    // 全选状态
    isAllChecked: false,
    // 总价格
    totalPrice: 0,
    // 总数量
    totalNum: 0,
    hasGoods:false,
  },

  // 赋值给address，让按钮隐藏
  onShow() {
    const cart = wx.getStorageSync("cart") || {};
    const address = wx.getStorageSync("address") || {};
    this.setData({ cart, address });
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
  setCart(cart) {
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
      if (v.checked) {
        // 选中了
        totalPrice += v.num * v.goods_price;
        totalNum += v.num;
      } else {
        isAllChecked = false;
      }
    });
    // 判读一下有没有数据
    isAllChecked = cartArr.length === 0 ? false : isAllChecked;
    const hasGoods = cartArr.length > 0 ? true : false;
    this.setData({
      cart,
      isAllChecked,
      totalPrice,
      totalNum,
      hasGoods,
    });
    wx.setStorageSync("cart", cart);
  },
  // 取消选中商品
  handleCartCheck(e) {
    //  console.log(e.currentTarget.dataset)
    const { id } = e.currentTarget.dataset;
    // 2. 获取购物车对象
    let { cart } = this.data;
    // 3. 选中状态的取反
    cart[id].checked = !cart[id].checked;

    // 5. 重新计算价格

    this.setCart(cart);
  },
  // 全选和反选
  handleCartAllCheck() {
    // 1. 获取data中的数据
    let { isAllChecked, cart } = this.data;
    // 2. 给全选按钮取反
    isAllChecked = !isAllChecked;
    // 3. 拿购物车对象循环
    for (const key in cart) {
      if (cart.hasOwnProperty(key)) {
        cart[key].checked = isAllChecked;
      }
    }
    // 把cart传递
    this.setCart(cart)
  },
  // 商品数量的加减
  handleCartNum(e){
    const {id,operation} = e.currentTarget.dataset;
    // console.log(id,operation)
    // 获取data中购物车的数据
    let {cart} = this.data;
    // 3. 直接更改购物车的数量,判断一下
    if(cart[id].num === 1 && operation === -1){
      var _this = this;
      wx.showModal({
        title: '提示',
        content: "确定删除吗？",
        success (res) {
          if (res.confirm) {
            delete cart[id];
            _this.setCart(cart);
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      });
    }else{
      cart[id].num += operation;
      // 4. 重新调用方法计算
      this.setCart(cart);
    }
  },
  // 商品结算
  handlePay(){
    // 1. 获取data中的地址
    const {address,cart} = this.data;
    let caetArr = Object.values(cart);
    // some 只要有一个为true ,整个some就为true
    let hasChecked = caetArr.some(v=>v.checked);
    if(!address.all){
      // 没有手地址
      wx.showToast({
        title: '请选择收货地址',
        icon: 'none',
        duration: 2000
      });
    }else if(!hasChecked){
      //不满足
      wx.showToast({
        title: '请选择商品数量',
        icon: 'none',
        duration: 2000
      });
    }else{
     wx.navigateTo({
       url: '/pages/pay/index'
     });      
    }
  }
});