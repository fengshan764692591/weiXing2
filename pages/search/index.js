// pages/search/index.js
import {request} from "../../request/index.js";
Page({

  /**
   * 1. 给页面绑定input事件
   * 2.获取输入框的值
   * 3.简单的做一些验证
   * 4.不通过就返回，通过就发请求
   * 5 使用防抖技术。定时器。
   * 取消
   * 1. 列表清空
   * 2.输入框的数据清空
   * 3.取消按钮隐藏
   */
  data: {
     goods:[],
     inputValue:'',
     isFcous:false,
  },
  // 定时器id
  TimeId:-1,
  handleSearchInput(e){
    // console.log(e)
  const {value} = e.detail;
   if(!value.trim()){
    this.setData({
      goods:[],
      inputValue:'',
      isFcous:false,
    });
     return;
   }
   this.setData({isFcous:true});
  //  4 正常
  clearTimeout(this.TimeId);
  this.TimeId = setTimeout(()=>{
    this.getSearch(value);
  },1000)
  },
  
  // 搜索关键子的请求
  getSearch(query){
    request({url:"/goods/qsearch",data:{query}})
    .then(res =>{
      console.log(res)
      this.setData({
        goods:res
      });
    })
  },
  // 取消搜索
  handleCancel(){
    this.setData({
      goods:[],
      inputValue:'',
      isFcous:false,
    });
  }
})
