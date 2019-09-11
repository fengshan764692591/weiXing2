// pages/auth/index.js
import {request} from "../../request/index.js";
Page({

  /**
   * 页面的初始数据
   * 获取用户授权信息
   */
  data: {
    code:"",
    
  },
  onLoad(){
    this.userLogin();
  },

  // 获取用户信息
  handleUserInfo(e){
  //  console.log(e)
  // const {encryptedData,iv,rawData,signature} = e.detail;
  // const {code} = this.data;
  // // 2.3 封装成一个对象
  // const postParams = {encryptedData,iv,rawData,signature,code};
  //   request({url:"/users/wxlogin",method:"post",data:postParams})
  //   .then(res => {
  //     console.log(res);
  //   });
  let token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjkxLCJpYXQiOjE1NjQ5NzMwNTAsImV4cCI6MTAwMTU2NDk3MzA0OX0.ECLmdkgfzmGsNgIscSBDbJ8iKB6zlTzl4FsDBR8wsnM";
  wx.setStorageSync("token", token);
    
  },
  userLogin(){
  return  wx.login({
      timeout:10000,
      success: (result) => {
        this.setData({
          code:result.code
        });
      },
    });
  },



})