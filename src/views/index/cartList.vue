<template>
  <div class="bodys">
    <div class="list">
      <div class="detail" v-for="item in products" :key="item.id">
        <img :src="item.coverUrl">
        <div class="desc">
          <span class="text-desc">{{item.desc}}</span>
          <div class="dis">
            <span v-if="item.discount">{{item.price*discount/100}}元</span>
            <span v-else>{{item.price}}元</span>
          </div>
          <div class="origin">
            <span v-if="item.discount">原价:{{item.price}}元</span>
            <span v-else>此商品不参与优惠</span>
          </div>
          <div class="label">
            <p class="buy_num">购买数量:</p>
            <button class="btn_minute" @click="sub(item)">-</button>
            <input type="text" value="0" size="1" v-model="item.total">
            <button class="btn_add" @click="add(item)">+</button>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="total">
        <span class="money">总计:{{money}} 元</span>
        <span class="sub">已减:{{subMoney}} 元</span>
      </div>
      <div class="pay" @click="pay">去付款</div>
    </div>
  </div>
</template>

<script>
const discountFilter = [100, 95, 80]
export default {
  name: 'CartList',
  data () {
    return {
      discount: discountFilter[this.$store.getters.userInfo.vipLevel],
      products:[],
      count: 0,
      money: 0,
      subMoney: 0
    }
  },
  created () {
    this.products = this.$store.getters.cartInfo
    let sub = 0
    this.products.filter(v => {
      sub += v.price*v.total
      if(v.discount) {
        this.money = (parseFloat(this.money) + parseFloat(v.price*v.total*this.discount/100)).toFixed(2)
      }else {
        this.money = (parseFloat(this.money) + parseFloat(v.price*v.total)).toFixed(2)
      }
    })
    this.subMoney = (sub - this.money).toFixed(2)
  },
  methods: {
    pay() {
      console.log('付款成功')
      alert('付款成功')
    },
    sub(value) {
      if(value.discount) {
        this.money = (this.money - value.price*this.discount/100).toFixed(2)
        var sub = (value.price - value.price*this.discount/100).toFixed(2)
        this.subMoney = (parseFloat(this.subMoney)-parseFloat(sub)).toFixed(2)
      }else {
        this.money = (this.money - value.price).toFixed(2)
      }
      var cartArr = this.$store.state.products.cartInfo
      cartArr.filter((cart, key) => {
        if (cart.id === value.id) {
          if (value.total > 1) {
            cart.total -= 1
          }else {
            console.log('这个商品不买了...')
            cartArr.splice(key, 1)
          }
        }
      })
    },
    add(value) {
      if(value.discount) {
        this.money = (parseFloat(this.money) + parseFloat(value.price*this.discount/100)).toFixed(2)
        var sub = (parseFloat(value.price) - parseFloat(value.price*this.discount/100)).toFixed(2)
        this.subMoney = (parseFloat(this.subMoney)+parseFloat(sub)).toFixed(2)
      }else {
        this.money = (parseFloat(this.money) + parseFloat(value.price)).toFixed(2)
      }
      this.$store.state.products.cartInfo.filter(cart => {
        if (cart.id === value.id) {
          cart.total += 1
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.bodys
  height 100%
  background-color #d9d9d9
  .detail
    min-height 100px
    width 90%
    margin-left 5%
    margin-bottom 10px
    background-color white
    border-radius 5%
    display flex
    flex-direction row
    img
      margin 5px
      height 100px
    .desc
      font-size 15px
      .text-desc
        overflow hidden
        -webkit-line-clamp 2
        text-overflow ellipsis
        display -webkit-box
        -webkit-box-orient vertical
      .dis
        display inline-block
        color red
        margin-top 10px
        margin-left 10px
        font-size 16px
      .origin
        display inline-block
        color grey
        margin-top 10px
        margin-left 10px
        font-size 13px
       .label
        margin-top 5px
        margin-left 5px
        .buy_num
          display inline
          margin-right 5px
        .btn_minute
          border-radius 10px 0 0 10px
          padding 2px
        input
          font-size 12px
          padding 2px 2px
          background #f5f5f5
          text-align center
        .btn_add
          border-radius 0 10px 10px 0
          padding 2px
  .footer
    position fixed
    height 80px
    bottom 0
    left 0
    right 0
    z-index 1
    text-align center
    background-color white
    .total
      display inline-block
      color red
      font-size 18px
      width 60%
      height 100%
      padding-top 15px
      border-right 1px solid red
      .money
        display block
      .sub
        display block
        color black
        font-size 15px
    .pay
      display inline-block
      font-size 18px
      background-color red
      color white
      width 39%
      height 100%
      vertical-align top
      padding-top 25px
</style>