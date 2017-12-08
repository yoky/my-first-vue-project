<template>
	<div class="cartcontrol">
		<transition>
			<div class="cart-decrease" v-show="food.count>0" @click.stop.prevent="decreaseCart">
				<span class="icon-remove_circle_outline inner inner1"></span>
			</div>
		</transition>
		<div class="cart-count" v-show="food.count>0">{{food.count}}</div>
		<div class="cart-add icon-add_circle" @click.stop.prevent="addCart"></div>
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
			.inner
				display: inline-block
				line-height: 24px
				font-size: 24px
				color: rgb(0, 160, 220)
				transition: all 0.4s linear
			&.v-enter-active, &.v-leave-active
				transition: all 0.4s linear
			&.v-enter, &.v-leave-active   //刚进入和离开后的状态
				opacity: 0
				transform: translateX(24px)
				.inner1
					transform: rotate(180deg)
		.cart-count
			display:inline-block
			font-size:10px
			line-height:24px
			color:rgb(147, 153, 159)
			vertical-align:top
			text-align:center
			width:12px
			padding-top:6px

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