/**  发起订单支付
 * @param {pay}  pay 对象
 */
export const requestPayment = (pay) =>{
  return new Promise((resolve,reject) =>{
    wx.requestPayment({
      ...pay,
      success: (result) => {
        resolve(resolve);
      },
      fail: (err) => {
         reject(err);
      },
    });
  });
}