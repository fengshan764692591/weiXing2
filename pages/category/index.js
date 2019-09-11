//Page Object
import {request} from "../../request/index.js";
import {getStorageCate,setStorageCate} from "../../utils/storage.js"
Page({
  data: {
    // 左侧的菜单
    leftMenuList:[],
    // 右侧的商品数据
    rightGoodsList:[],
    currentIndex:0,
    scrollTop:0,
  },
  // 接口数据返回值
  Cates:[],
  onLoad(){
    // 获取缓存数据
    // const cates = wx.getStorageSync("cates");
    const cates = getStorageCate();
    if(!cates){
      this.getCategoryList();
    }else{
      // 有缓存数据，判断有没有过期 10s
      if(Date.now()-cates.time>1000*10){
        //  过期了
        this.getCategoryList();
      }else{
        // 获取缓存数据
        const catesData = cates.data;
        this.Cates = catesData;
        const leftMenuList = this.Cates.map(v=>({cat_id:v.cat_id,cat_name:v.cat_name}));
        const rightGoodsList = this.Cates[0].children;
        // console.log(result);
        this.setData({
          leftMenuList,
          rightGoodsList
        });
      }
    }
  },
  // 获取分类数据
  getCategoryList(){
    request({url:'/categories'})
    .then((result) => {
      // 把接口数据赋值全局变量
      this.Cates = result;
      // 把值存到本地
      // wx.setStorageSync("cates",{time:Date.now(),data:this.Cates});
      setStorageCate({time:Date.now(),data:this.Cates});
        
      const leftMenuList = this.Cates.map(v=>({cat_id:v.cat_id,cat_name:v.cat_name}));
      const rightGoodsList = this.Cates[0].children;
      // console.log(result);
      this.setData({
        leftMenuList,
        rightGoodsList
      });
    });
  },
  // 获取被点击的索引
  handlMenuchange(e){
    const {index} = e.currentTarget.dataset;
    // 点击之后从新赋值
    const rightGoodsList = this.Cates[index].children;
    // 3.点击在最上面的位置

    this.setData({
      currentIndex:index,
      rightGoodsList,
      scrollTop:0,
    }); 
  }
});
  