//Page Object
import {request} from "../../request/index.js";
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
   this.getCategoryList();
  },
  // 获取分类数据
  getCategoryList(){
    request({url:'/categories'})
    .then((result) => {
      // 把接口数据赋值全局变量
      this.Cates = result;
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
  