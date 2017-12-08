<template>
  <div class="page-index">
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px">
      <div class="tab-item"><router-link to="/goods">商品</router-link></div>
      <div class="tab-item"><router-link to="/ratings">评论</router-link></div>
      <div class="tab-item"><router-link to="/seller">商家</router-link></div>
    </div>
    <keep-alive>
      <router-view :seller="seller" keep-alive></router-view>
    </keep-alive>
  </div>
</template>

<script type="text/ecmascript-6">
import header from './components/header/header.vue'
import {urlParse} from './common/js/util'

export default {
  data () {
    return {
      seller: {
        id: (() => {
          let queryParam = urlParse()
          return queryParam.id
        })()
      }
    }
  },
  created () {
    this.$http.get('/api/seller?id=' + this.seller.id).then((response) => {
      response = response.body
      if (response.errno === 0) {
        // this.seller = response.data
        // 为this.seller扩展属性 保留id属性
        this.seller = Object.assign({}, this.seller, response.data)
        console.log(this.seller.id)
      }
    })
  },
  components: {
    'v-header': header
  }
}
</script>

<style type="text/css" lang="stylus" refs="stylesheet/stylus">
  @import "./common/stylus/mixin"
  .page-index
    .tab
      display:flex
      width:100%
      height:40px
      line-height:40px
      border-bottom:1px solid rgba(7,17,27,0.1)
      .tab-item
        flex:1
        text-align:center
        & > a 
         display:block
         text-decoration:none
         font-size:14px
         color:rgb(77,85,93)
         &.router-link-active
          color:rgb(240,20,20)
</style>
