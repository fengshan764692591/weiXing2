// pages/login/index.js
import { setStorageUserInfo } from "../../utils/storage.js"
Page({

  handleUserInfo(e) {
    // console.log(e);
    setStorageUserInfo(e.detail.userInfo);
    wx.navigateBack({
      delta: 1
    });
  }
})