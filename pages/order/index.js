// pages/order/index.js
import {request} from "../../request/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {id:0,title:"全部",isActive:true},
      {id:1,title:"待付款",isActive:false},
      {id:2,title:"待发货",isActive:false},
      {id:3,title:"退款/退货",isActive:false},
    ],
  },
  // 获取页面参数
  onShow(){
  //  判断一下有没有token
  const token = wx.getStorageSync("token");
  if(!token){
    wx.navigateTo({
      url: '/pages/auth/index',
    });
      return;
  }
   let pageList = getCurrentPages();
  //  获取当前页面
     let currentPage=pageList[pageList.length-1];
    //  console.log(currentPage);
    const {type} = currentPage.options;
    this.getOrderList(type);
  },

  // 监听子组件的事件
  handleItemChange(e){
    // console.log(e.detail)
    const {index} = e.detail;
    let {tabs} = this.data;
    // 循环数组
    tabs.forEach((v,i) => i === index ? v.isActive = true : v.isActive = false);
    this.setData({
      tabs
    });
  },
  // 获取历史数据
  getOrderList(type){
    let header = {
      Authorization: wx.getStorageSync("token")
    }
    request({url:"/my/orders/all",data:{type},header:header})
    .then(res => {
      console.log(res);
    });
  }

})