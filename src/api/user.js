/*
 * @Descripttion: 
 * @Author: lhw
 * @Date: 2020-04-06 09:10:56
 * @LastEditTime: 2020-04-06 16:51:01
 */
const token = "vuex-shopping-cart"
const userInfo = {
  'name': 'Lee',
  'vipLevel': 0, //vip等级 0-普通会员 1-铂金会员 2-钻石会员
  'avatar': ''
}

export function login(data) {
  if (data.phone === '15812345678') {
    userInfo.vipLevel = 1
  }
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve ({
        code: 200,
        data: userInfo,
        token: token
      })
    }, 1000);
  })
}

export function logout() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve ({
        code: 200,
        msg: 'success'
      })
    }, 1000);
  })
}