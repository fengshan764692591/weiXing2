import {request} from "../../request/index.js"
Page({

  /**
   * 页面的初始数据
   * 图片的放大效果，
   * 1 先绑定一个事件
   * 2. 调用微信内部的方法
   */
  data: {
     goodsInfo:{}
  },

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
      // console.log(result);
      this.setData({
        goodsInfo:{
          goods_name:result.goods_name,
          goods_price:result.goods_price,
          pics:result.pics,
          goods_introduce:result.goods_introduce
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
  }
});