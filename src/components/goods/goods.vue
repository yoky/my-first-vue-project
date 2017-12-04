<template>
	<div class="goods">
		<div class="menu-wrapper" ref=menuWrapper>
			<ul>
				<li v-for="(item,index) in goods" class="menu-item" :class="{'current':currentIndex===index}" @click="selectMenu(index,$event)">
					<span class="text border-1px">
						<span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
					</span>
				</li>
			</ul>
		</div>
		<div class="foods-wrapper" ref=foodsWrapper>
			<ul>
				<li v-for="item in goods" class="food-list food-list-hook">
					<h1 class="title">{{item.name}}</h1>
					<ul>
						<li v-for="food in item.foods" class="food-item border-1px" @click="toDetail(food,$event)">
							<div class="icon">
								<img :src="food.icon">
							</div>
							<div class="content">
								<h2 class="name">{{food.name}}</h2>
								<p class="desc">{{food.description}}</p>
								<div class="extra">
									<span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
								</div>
								<div class="price">
									<span class="now">￥{{food.price}}</span>
									<span class="old" v-show="food.oldPrice"></span>
								</div>
								<div class="cartcontrol-wrapper">
								    <cartcontrol :food="food"></cartcontrol>
								</div>
							</div>
						</li>
					</ul>
				</li>
			</ul>
		</div>
		<shopcart :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shopcart>
		<food :food="selectedFood" ref="food"></food>
	</div>
</template>

<style type="text/css" lang="stylus" refs="stylesheet/stylus">
@import "../../common/stylus/mixin"
	.goods
		position:absolute
		width:100%
		top:174px
		bottom:46px
		display:flex
		overflow:hidden
		.menu-wrapper
			flex:0 0 80px
			width:80px
			background-color:#f3f5f7
			.menu-item
				height:54px
				width:56px
				display:table
				line-height:14px
				padding:0 12px
				&.current
					// position:absolute
					margin-top:-1px
					// z-index:10
					background-color:white
					font-weight:700
					.text
						border-none()
				.icon
					display:inline-block
					vertical-align:top
					width:12px
					height:12px
					margin-right:2px
					background-size:12px 12px
					background-repeat:no-repeat
					&.decrease
						bg-image('decrease_3')
					&.discount
						bg-image('discount_3')
					&.guarantee
						bg-image('guarantee_3')
					&.invoice
						bg-image('invoice_3')
					&.special
						bg-image('special_3')
				.text
					font-size:12px
					border-1px(rgba(7, 17, 27, .1))
					display:table-cell
					vertical-align:middle
				
		.foods-wrapper
			flex:1
			.food-list
				.title
					border-left:2px solid #d9dde1
					font-size:12px
					color:rgb(147, 153, 159)
					line-height:26px
					background-color:#f3f5f7
					padding-left:14px
					height:26px
				.food-item
					display:flex
					border-1px(rgba(7, 17, 27, .1))
					margin:18px 18px 0 18px
					padding-bottom:18px
					&:last-child
						border-none()
					.icon
						width:57px
						height:57px
						flex:0 0 57px
						margin-right:10px
						img
							width:100%
					.content
						flex:1
						margin-top:2px
						// position:relative
						.name
							font-size:14px
							color:rgb(7, 17, 27)
							line-height:14px
						.desc
							font-size:10px
							line-height:12px
							color:rgb(147, 153, 159)
							margin-top:8px
						.extra
							margin-top:8px
							font-size:10px
							line-height:10px
							color:rgb(147, 153, 159)
							span:first-child
								margin-right:12px
						.price
							margin-top:8px
							font-weight:700
							line-height:24px
							color:rgb(147, 153, 159)
							.now
								color:rgb(240, 20, 20)
								margin-right:8px
								font-size:14px
							.old
								font-size:10px
								text-decoration:line-through
						.cartcontrol-wrapper
							position:absolute
							right:0
							bottom:12px
							
</style>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll'
import shopcart from '../../components/shopcart/shopcart'
import cartcontrol from '../../components/cartcontrol/cartcontrol'
import food from '../../components/food/food'
const ERR_OK = 0
export default {
  data () {
    return {
      goods: [],
      listHeight: [],
      scrollY: 0,
      selectedFood: {}
    }
  },
  props: ['seller'],
  components: {
    shopcart,
    cartcontrol,
    food
  },
  computed: {
    currentIndex () {
      for (let i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[i]
        let height2 = this.listHeight[i + 1]
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          return i
        }
      }
      return 0
    },
    selectFoods () {
      let foods = []
      this.goods.forEach((good) => {
        good.foods.forEach((food) => {
          if (food.count) {
            foods.push(food)
          }
        })
      })
      return foods
    }
  },
  created () {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    this.$http.get('/api/goods').then((response) => {
      response = response.body
      if (response.errno === ERR_OK) {
        this.goods = response.data
        this.$nextTick(() => {
          this._initScroll()
          this._calculateHeight()
        })
      }
    })
  },
  methods: {
    _initScroll () {
      this.menuScroll = new BScroll(this.$refs.menuWrapper, {click: true})
      this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {probeType: 3, click: true})
      this.foodsScroll.on('scroll', (pos) => {
        this.scrollY = Math.abs(Math.round(pos.y))
      })
    },
    _calculateHeight () {
      let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
      let height = 0
      this.listHeight.push(height)
      for (let i = 0; i < foodList.length; i++) {
        let item = foodList[i]
        height += item.clientHeight
        this.listHeight.push(height)
      }
    },
    selectMenu (index, event) {
      if (!event._constructed) {
        return
      }
      let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
      let el = foodList[index]
      this.foodsScroll.scrollToElement(el, 300)
    },
    toDetail (food, event) {
      if (!event._constructed) {
        return
      }
      this.selectedFood = food
      this.$refs.food.show()
    }
  }
}
</script>