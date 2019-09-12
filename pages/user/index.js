import {getStorageUserInfo,setStorageUserInfo} from "../../utils/storage.js"
Page({

  /**
   * 页面的初始数据
   * 页面被打开的时候判断一下有没有缓存的用户信息
   * 1. 没有，调到login页面。
   * 2.在跳回来
   * 
   */
  data: {
    userInfo:''
  },
  onShow(){
    // 1. 获取用户信息，判断一下
    const userInfo = getStorageUserInfo();
    if(!userInfo){
      wx.navigateTo({
        url: '/pages/login/index',
      });
      return;
    }
    this.setData({
      userInfo
    });
  }
})