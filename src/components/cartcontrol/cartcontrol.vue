<template>
	<div class="cartcontrol">
		<transition name="move">
			<div class="cart-decrease icon-remove_circle_outline" v-show="food.count>0" @click="decreaseCart"></div>
		</transition>
		<div class="cart-count" v-show="food.count>0">{{food.count}}</div>
		<div class="cart-add icon-add_circle" @click="addCart"></div>
	</div>
</template>

<style type="text/css" lang="stylus" refs="stylesheet/stylus">
	.cartcontrol
		font-size:0
		.cart-decrease,.cart-add
			display:inline-block
			padding:6px
			font-size:24px
			line-height:24px
			color:rgb(0, 160, 220)
		.cart-decrease
			transition:all 0.2s linear
			transform:translate3D(0,0,0)
			transform:rotate(0)
			&.move-enter
				opocity:0
				
				transform:translate3D(48px,0,0)
				// transform:rotate(180deg)
				transition:all 0.2s linear
			&.move-leave
				opocity:1
				transform:translate3D(48px,0,0)
		.cart-count
			display:inline-block
			font-size:10px
			line-height:24px
			color:rgb(147, 153, 159)
			vertical-align:top
			text-align:center
			width:12px
			padding-top:6px
		// .cart-add			

</style>

<script type="text/ecmascript-6">
import Vue from 'vue'
export default{
  props: {
    food: {
      type: Object
    }
  },
  created () {
  },
  methods: {
    addCart (event) {
      if (!event._constructed) {
        return
      }
      if (!this.food.count) {
        Vue.set(this.food, 'count', 1)
      } else {
        this.food.count ++
      }
    },
    decreaseCart () {
      if (!event._constructed) {
        return
      }
      if (this.food.count > 0) {
        this.food.count --
      }
    }
  }
}
</script>