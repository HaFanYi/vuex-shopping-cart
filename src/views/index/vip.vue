<template>
  <div class="list">
    <div class="item">
      <label class="level">铂金会员</label>
      <label class="desc">可享受95折</label>
      <button @click="buyVip(1)">购买</button>
    </div>
    <div class="item">
      <label class="level">钻石会员</label>
      <label class="desc">可享受8折</label>
      <button @click="buyVip(2)">购买</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Vip',
  data () {
    return {
      currentLevel: ''
    }
  },
  created () {
    this.currentLevel = this.$store.getters.userInfo.vipLevel
  },
  methods: {
    buyVip(level) {
      if (this.currentLevel > level) {
        alert('您的当前等级高于要购买等级')
        console.log('您的当前等级高于要购买等级')
      }else if (this.currentLevel == level) {
        alert('您已经是该等级了')
        console.log('您已经是该等级了')
      }else {
        this.$store.getters.userInfo.vipLevel = level
        alert('购买成功')
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.list
  margin-top 50px
  border-top 1px solid grey
  .item
    margin-top 20px
    font-size 18px
    border-bottom 1px solid grey
    .level
      text-align left
      padding-left 10px
    .desc
      padding-left 15px
      font-size 14px
      color red
    button
      margin-left 20px
      border none
      color white
      background-color #ff0000
</style>