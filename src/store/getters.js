/*
 * @Desc:
 * @Author: lhw
 * @Date: 2020-04-03 15:46:52
 * @LastEditTime: 2020-04-11 14:51:55
 */
const getters = {
  token:state => state.user.token,
  userInfo:state => state.user.userInfo,
  productList:state => state.products.list,
  cartInfo:state => state.products.cartInfo
}

export default getters
