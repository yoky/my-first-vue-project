<template>
	<div>
		<div class="shopcart">
			<div class="content" @click="toggleList">
				<div class="content-left">
					<div class="logo-wrapper">
						<div class="logo" :class="{'highlight':totalCount>0}">
							<i class="icon-shopping_cart" :class="{'highlight':totalCount>0}"></i>
						</div>
						<div class="num" v-show="totalCount>0">{{totalCount}}</div>
					</div>
					<div class="price" :class="{'highlight':totalPrice>0}">￥{{totalPrice}}</div>
					<div class="desc">另需配送费{{deliveryPrice}}元</div>
				</div>
				<div class="content-right" @click.stop.prevent="pay">
					<div class="pay" :class="payClass">{{payDesc}}</div>
				</div>
			</div>
			<transition name="fold">
				<div class="shopcart-list" v-show="listShow">
					<div class="list-header">
						<h1 class="title">购物车</h1>
						<span class="empty" @click="empty">清空</span>
					</div>
					<div class="list-content" ref=listContent>
						<ul>
							<li class="food" v-for="food in selectFoods">
								<span class="name">{{food.name}}</span>
								<div class="price">￥{{food.price*food.count}}</div>
								<div class="cartcontrol-wrapper">
									<cartcontrol :food="food"></cartcontrol>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</transition>
		</div>
		<div class="list-mask" v-show="listShow" @click="hideList"></div>
	</div>
</template>

<style type="text/css" lang="stylus" refs="stylesheet/stylus">
    @import "../../common/stylus/mixin"
	.shopcart
		position:fixed
		left:0
		bottom:0
		z-index:50
		width:100%
		height:48px
		// background-color:black
		.content
			display:flex
			background-color:#141d27
			color:rgba(255, 255, 255, .4)
			.content-left
				flex:1
				font-size:0
				.logo-wrapper
					display:inline-block
					vertical-align:top
					position:relative
					top:-10px
					margin:0 12px
					padding:6px
					width:56px
					height:56px
					box-sizing:border-box
					border-radius:50%
					background-color:#141d27
					.logo
						width:100%
						height:100%
						border-radius:50%
						background-color:#2b343c
						text-align:center
						.icon-shopping_cart
							font-size:24px
							color:#80858a
							line-height:44px
							&.highlight
								color:white
						&.highlight
							background-color:rgb(0, 160, 220)
					.num
						width:24px
						height:16px
						line-height:16px
						font-size:9px
						font-weight:700
						border-radius:16px
						background-color:rgb(240, 20, 20)
						color:white
						position:absolute
						top:0
						right:0
						box-shadow:0 4px 8px 0 rgba(0, 0, 0, .4)
						text-align:center
				.price
					display:inline-block
					font-size:16px
					line-height:24px
					vertical-align:top
					line-height:24px
					margin-top:12px
					box-sizing:border-box
					padding-right:12px
					border-right:1px solid rgba(255, 255, 255, .1)
					font-weight:700
					&.highlight
						color:white
				.desc
					display:inline-block
					vertical-align:top
					font-size:10px
					line-height:24px
					margin:12px 0 0 12px
			.content-right
				flex:0 0 105px
				width:105px
				.pay
					line-height:48px
					font-size:12px
					font-weight:700
					text-align:center
					height:48px
					&.not-enough
						background-color:#2b333b
					&.enough
						background-color:#00b43c
						color:white
		.shopcart-list
			position:absolute
			padding-bottom:48px
			bottom:0
			width:100%
			left:0
			z-index:-1
			transition:all .4s
			&.fold-enter
				transform:translate3D(0,0,0)
				transition:all .4s
			&.fold-leave
				transform:translate3D(0,100%,0)
				transition:all .4s
			.list-header
				height:40px
				line-height:40px
				background-color:#f3f5f7
				padding:0 18px
				border-bottom:1px solid rgba(7, 17, 27, .1)
				.title
					float:left
					font-size:14px
					color:rgb(7, 17, 27)
				.empty
					float:right
					line-height:40px
					font-size:12px
					color:rgb(0, 160, 220)
			.list-content
				background-color:white
				padding:0 18px
				max-height:217px
				overflow:hidden
				padding:0 18px
				.food
					position:relative
					padding:12px 0
					box-sizing:border-box
					border-1px(rgba(7, 17, 17, .1))
					.name
						line-height:24px
						font-size:14px
						color:rgb(7, 17, 27)
					.price
						position:absolute
						right:90px
						bottom:12px
						line-height:24px
						font-size:14px
						color:rgb(240, 20, 20)
						font-weight:700
					.cartcontrol-wrapper
						position:absolute
						right:0
						bottom:6px
	.list-mask
		position:fixed
		top:0
		left:0
		width:100%
		height:100%
		z-index:40
		background-color:rgba(7, 17, 27, .6)
		backdrop-filter:blur(10px)				
			  
</style>

<script type="text/ecmascript-6">
import cartcontrol from '../../components/cartcontrol/cartcontrol'
import BScroll from 'better-scroll'
export default{
  props: {
    deliveryPrice: Number,
    minPrice: Number,
    selectFoods: {
      type: Array,
      default () {
        return [
          {
            price: 10,
            count: 1
          }
        ]
      }
    }
  },
  data () {
    return {
      fold: true
    }
  },
  components: {cartcontrol},
  computed: {
    totalPrice () {
      let total = 0
      this.selectFoods.forEach((food) => {
        total += food.price * food.count
      })
      return total
    },
    totalCount () {
      let count = 0
      this.selectFoods.forEach((food) => {
        count += food.count
      })
      return count
    },
    payDesc () {
      if (this.totalPrice === 0) {
        return `￥${this.minPrice}元起送`
      } else if (this.totalPrice < this.minPrice) {
        let diff = this.minPrice - this.totalPrice
        return `还差${diff}元起送`
      } else {
        return '去结算'
      }
    },
    payClass () {
      if (this.totalPrice < this.minPrice) {
        return 'not-enough'
      } else {
        return 'enough'
      }
    },
    listShow () {
      if (!this.totalCount) {
        this.fold = true
        return false
      }
      let show = !this.fold
      if (show) {
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.listContent, {click: true})
          } else {
            this.scroll.refresh()
          }
        })
      }
      return show
    }
  },
  methods: {
    toggleList () {
      if (!this.totalCount) {
        return
      }
      this.fold = !this.fold
    },
    empty () {
      this.selectFoods.forEach((food) => {
        food.count = 0
      })
    },
    hideList () {
      this.fold = true
    },
    pay () {
      if (this.totalPrice < this.minPrice) {
        return false
      } else {
        window.alert('支付')
      }
    }
  }
}
</script>