<template>
  <div class="home">
    <div class="vipInfo">
      <div>
        <span>您好,尊敬的{{vipLevel}}</span>
        <span v-if="discount < 100">,所有商品可享<label style="color:red">{{discount}}折</label></span>
      </div>
    </div>
    <div v-for="item in productsList" :key="item.id" class="product">
      <img :src="item.coverUrl" width="40%">
      <div class="product-detail">
        <div class="desc"><span>{{item.desc}}</span></div>
        <div class="price-name">
          <span>{{item.name}}</span>
          <span class="price">{{item.price}}元</span>
        </div>
        <div class="sold">
          <span v-if="item.discount" class="discount">会员优惠</span>
          <span :class="item.discount ? 'right' : 'left'">已成交{{item.soldNum}}笔</span>
        </div>
        <div class="buy">
          <button class="add" @click="addCart(item)">添加购物车</button>
          <button class="buyit" @click="buy(item)">立即购买</button>
      </div>
      </div>
    </div>
    <div class="footer">
      <button @click="buyVip">购买会员</button>
      <button @click="settleAccount">购物车<span style="color:red" v-if="cartNum > 0">({{cartNum}})</span></button>
      <button @click="logout">退出</button>
    </div>
  </div>
</template>

<script>
const vip = ['普通会员', '铂金会员', '钻石会员']
const discountFilter = [100, 95, 80]
export default {
  name: 'Home',
  data () {
    return {
      productsList: [],
      vipLevel: 0,
      discount:'',
      cartNum: 0
    }
  },
  created () {
    const userInfo =  this.$store.getters.userInfo
    if (userInfo.name) {
      this.getProducts()
      this.vipLevel = vip[userInfo.vipLevel]
      this.discount = discountFilter[userInfo.vipLevel]
      var total = this.$store.getters.cartInfo
      this.cartNum = total.length
    }else {
      this.$router.push({path: '/login'})
    }
  },
  methods: {
    //获取商品
    getProducts () {
      this.$store.dispatch('products/getProducts').then(response => {
        this.productsList = this.$store.state.products.list
      })
    },
    //购买vip
    buyVip () {
      this.$router.push({path: '/vip'})
    },
    //添加购物车
    addCart (item) {
      var cart = this.$store.getters.cartInfo
      if (cart.length == 0) {
        this.cartNum++
        item.total = 1
        cart.push(item)
      }else {
        var hasIds = []
        cart.map((v)=>{
          hasIds.push(v.id)
        })
        if (hasIds.indexOf(item.id) !== -1) {
          cart.filter(v=>{
            if(v.id === item.id) {
              v.total += 1
            }
          })  
        }else {
          item.total = 1
          this.cartNum++
          cart.push(item)
        }

      }
      this.$store.dispatch('products/cartInfo', cart)
    },
    //去结算
    settleAccount () {
      this.$router.push({ path: '/cartList' })
    },
    //立即购买
    buy (item) {
      console.log('立即购买商品id='+item.id)
    },
    logout () {
      this.$store.dispatch('user/logout').then(() => {
        this.$store.commit('products/SET_PRODUCTS', [])
        this.$store.commit('products/SET_CARTINFO', [])
        this.$router.push({path: '/login'})
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.vipInfo
  margin-top 15px
  margin-bottom 20px
  text-align center
.product
  display flex
  flex-direction row
  width 90%
  margin-left 5%
  font-size 15px
  border-bottom 1px solid grey
  .product-detail
    margin-left 10px
    text-align left
    .desc
      font-size 14px
      color grey
      margin-bottom 5px
    .price-name > .price
      color red
      padding-left 50px
    .discount
      font-size 8px
    .sold
      .right
        text-align right
      .discount
        padding-right 50px
        color red
    .buy
      margin-top 10px
      .add, .buyit
        color white
        border none
      .add
        background-color #ff9900
      .buyit
        background-color #ff0000
.footer
  position fixed
  height 50px
  bottom 0
  left 0
  right 0
  z-index 1
  background-color grey
  button:nth-child(1),button:nth-child(2)
    width 33%
    height 100%
    border none
    border-right 1px solid grey
  button:nth-child(3)
    width 33%
    height 100%
    border none
        
</style>
