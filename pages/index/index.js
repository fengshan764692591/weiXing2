//Page Object
  import {request} from "../../request/index.js"
Page({
  data: {
    swiperList:[],
    navCateList: [],
    floorList: [],
  },
//  获取轮播图数据
onLoad(){
  this.getswiperList();
  this.getnavCateList();
  this.getfloorList();
},
getswiperList(){   
  request({url: '/home/swiperdata'})
  .then((result)=>{
      this.setData({
      swiperList:result
      });
  });
},
//  获取分类数据
getnavCateList(){  
  request({url: '/home/catitems'})
  .then((result)=>{
      this.setData({
        navCateList: result
      });
  });
},
// 获取楼层数据
getfloorList(){ 
  request({url: '/home/floordata'})
  .then((result)=>{
      this.setData({
        floorList: result
      });
  });
}
});
  
  