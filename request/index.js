// 发送请求的次数
  let ajaxTimes = 0;
export const request = (params) => {
  ajaxTimes++;
  // 请求图标
  wx.showLoading({
    title: '加载中',
  });
  const baseUrl = "https://api.zbztb.cn/api/public/v1";
  return new Promise((resolve,reject)=>{
    var reqTask = wx.request({
      ...params,
      url:baseUrl+params.url,
      success: (result) => {
        resolve(result.data.message);
      
      },
      fail: (err) => {
        reject(err);
      },
      complete:()=>{
        // 关闭请求图标
        ajaxTimes--;
        if(ajaxTimes === 0){
          wx.hideLoading();
        }
      }
    });
      
  });
}

