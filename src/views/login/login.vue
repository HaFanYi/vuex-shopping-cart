<template>
  <div class="item-container">
    <div class="item-title">
      <span>登录</span>
    </div>
    <form>
      <div class="item-login">
        <div class="login-phone">
          <span class="icon">手机号:</span>
          <input class="item-ipt" v-model="formData.phone" ref="phone" placeholder="请输入手机号" type="text" maxlength="11" autocomplete="on">
        </div>
        <div class="login-pwd">
          <span class="icon">密码:</span>
          <input class="item-ipt" v-model="formData.password" ref="password" placeholder="请输入6~16密码" type="password" minlength="6" maxlength="16" autocomplete="on">
        </div>
        <button @click="login" class="item-submit">登录</button>
      </div>
    </form>
  </div>
</template>

<script>
import { validPhone } from '../../utils/validate'
import ElementUI, { MessageBox } from 'element-ui'
export default {
  name: 'login',
  data () {
    return {
      formData: {
        phone: '',
        password: ''
      }
    }
  },
  methods: {
    login () {
      if (!validPhone(this.formData.phone)) {
        this.$refs.phone.focus()
        alert('手机号错误')
        return
      }
      this.$store.dispatch('user/login', this.formData).then(response => {
        this.$router.push({path: '/'})
      }).catch(error => {
        alert(error)
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.item-container
  min-height 100%
  width 100%
  overflow hidden
  background-image linear-gradient(#fff, #d9d9d9)
  .item-title
    margin-top 100px
    font-size 22px
    text-align center
  .item-login
    margin-top 50px
    font-size 18px
    text-align center
    .login-phone, .login-pwd
      margin-bottom 20px
      line-height 40px
      .icon
        margin-left -35px
        padding 6px 5px 0 5px
        text-align right
        width 100px
        display inline-block
      .item-ipt
        line-height 25px
        margin-left 5px
        font-size 18px
        width 50%
        border none
        outline none
        background-color rgba(0, 0, 0, 0)
        border-bottom 1px solid grey
    .item-submit
      margin-top 30px
      background-color green
      width 50%
      min-height 50px
      font-size 18px
      border-radius 25px
      border none
      outline none
</style>