import {request} from "../../request/index.js"
import {getStorageCart,setStorageCart} from "../../utils/storage.js"
Page({

  /**
   * 页面的初始数据
   * 图片的放大效果，
   * 1 先绑定一个事件
   * 2. 调用微信内部的方法
   * 加入购物车
   * 1 购物车的数据存储在本地，格式
   * ｛
   *  华为商品id:华为商品信息，
   * 小米商品id:小米商品信息
   * ｝
   */
  data: {
     goodsInfo:{}
  },
  // 全局商品对象
 GoodsObj:{},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(option){
  //  console.log(option)
  this.getGoodsDetail(option.goods_id);
  },
  // 获取商品详情
  getGoodsDetail(goods_id){
    request({url:"/goods/detail",data:{goods_id}})
    .then((result)=>{
      this.GoodsObj = result;
      // console.log(result);
      this.setData({
        goodsInfo:{
          goods_name:result.goods_name,
          goods_price:result.goods_price,
          pics:result.pics,
          // 改图片格式

          goods_introduce:result.goods_introduce.replace(/\.webp/g,'.jpg')
        }
      });
    });
  },
  // 图片的放大效果
  handlePreviewImage(e){
  console.log(e)
   const {index} = e.currentTarget.dataset;
   const urls = this.data.goodsInfo.pics.map(v=>v.pics_big);
   const current =urls[index];
   wx.previewImage({
     current,
     urls,
   });   
  },
  // 加入购物车
  handleCartAdd(){
    // 1.获取购物车数据
  //  let cart =  wx.getStorageSync("cart") || {};
   let cart = getStorageCart("cart") || {};
   if(cart[this.GoodsObj.goods_id]){
    // 2.1存在旧数据 
    cart[this.GoodsObj.goods_id].num++;
   }else{
    //  2.2没有数据，需要添加
    cart[this.GoodsObj.goods_id] = this.GoodsObj;
    cart[this.GoodsObj.goods_id].num=1;
    cart[this.GoodsObj.goods_id].checked=true;
   }
  //  3. 把数据存到本地
  // wx.setStorageSync("cart", cart);
  setStorageCart("cart",cart);
    // 4.弹出提示框
    wx.showToast({
      title: '购买成功',
      icon: 'success',
      mask: true,
    });
  }
});

