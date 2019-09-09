import {request} from "../../request/index.js";
Page({

  /**
   * 页面的初始数据
   * 触底加载下一页，
   * 1.求出总的页数，
   * 2。有下一页pagenum++
   * 3.数据回来后对数组进行拼接
   * 上拉刷新
   * 1. 重置页码
   * 2.重置商品数组，data中的商品数组进行重置
   * 3.重新发请求
   * 
   */
  data: {
    tabs:[
      {id:0,title:"综合",isActive:true},
      {id:1,title:"销量",isActive:false},
      {id:2,title:"价格",isActive:false},
    ],
      goodsList:[]
  },
  // 接口用的参数
  QuerParams: {
    query:"",
    cid: "",
    pagenum: 1,
    pagesize: 10,
  },
  // 总页数
  TotalPages:1,
  onLoad(option){
  this.QuerParams.cid = option.cid;
  this.getGoodsList();
  },
  // 获取商品数据
  getGoodsList(){
   request({url:"/goods/search",data:this.QuerParams})
   .then(result =>{
　　console.log(result)
this.TotalPages=Math.ceil(result.total/this.QuerParams.pagesize);
    this.setData({
      // 拼接数组[旧，新]
      goodsList:[...this.data.goodsList,...result.goods]
    });
    // 关闭刷新
    wx.stopPullDownRefresh();
   })
  },
  // tab栏
  handleTabs(e){
    // console.log(e);
    const {index} = e.detail;
    let {tabs} = this.data;
    tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);
    this.setData({
      tabs
    });
  },
//  页面上拉触地事件
onReachBottom(){
 if(this.QuerParams.pagenum>=this.TotalPages){
   wx.showToast({
     title: '没有下一页了',
     icon:"none"
   }); 
 }else{
   this.QuerParams.pagenum++;
   this.getGoodsList();
 }
},
// 页面上拉刷新
onPullDownRefresh(){
 this.QuerParams.pagenum=1;
 this.setData({
   goodsList:[]
 });
 this.getGoodsList();
}
});