<template>
	<div class="food" v-show="showFlag" ref=food>
		<div>
			<div class="food-content">
				<div class="image-header">
				  <img :src="food.image">
				  <div class="back" @click="hide">
				  	<div><i class="icon-arrow_lift"></i></div>
				  </div>
				</div>
				<div class="content">
					<h1 class="title">{{food.name}}</h1>
					<div class="detail">
						<span class="sell-count">月售{{food.sellCount}}份</span>
						<span class="rating">好评率{{food.rating}}%</span>
					</div>
					<div class="price">
						<span class="now">￥{{food.price}}</span>
						<span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
					</div>
				</div>
				<div class="cartcontrol-wrapper">
					<cartcontrol :food="food"></cartcontrol>
				</div>
				<div class="buy" @click="addFirst($event)" v-show="!food.count || food.count===0">加入购物车</div>
			</div>
			<split v-show="food.info"></split>
			<div class="info" v-show="food.info">
				<div class="title">商品信息</div>
				<p class="text">{{food.info}}</p>
			</div>
			<split></split>
			<div class="rating">
				<h1 class="title">商品评价</h1>
				<ratingselect :selectType="selectType" 
				:onlyContent="onlyContent" :desc="desc" :ratings="food.ratings"
				@changeType="setType" @toogleContent="setOnlycontent"></ratingselect>
				<div class="rating-wrapper">
					<ul v-show="food.ratings && food.ratings.length>0">
						<li class="rating-item" v-for="rating in food.ratings" v-show="needShow(rating.rateType,rating.text)">
							<div class="user">
								<span class="name">{{rating.username}}</span>
								<img class="avatar" width="12" height="12" :src="rating.avatar"></img>
							</div>
							<div class="time">{{rating.rateTime | formatDate}}</div>
							<p class="text">
								<i :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></i>{{rating.text}}
							</p>
						</li>
					</ul>
					<div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style type="text/css" lang="stylus" refs="stylesheet/stylus">
@import "../../common/stylus/mixin"
	.food
		position:fixed
		left:0
		top:0
		bottom:48px
		z-index:30
		width:100%
		background-color:white
		.food-content
			position:relative
			.image-header
				position:relative
				width:100%
				height:0
				padding-top:100%
				img
					position:absolute
					width:100%
					height:100%
					left:0
					top:0
				.back
					position:absolute
					top:10px
					left:0
					.icon-arrow_lift
						display:block
						padding:10px
						font-size:20px
						color:white
			.content
				padding:18px
				.title
					margin-bottom:8px
					font-size:14px
					line-height:14px
					font-weight:700
					color:rgb(7, 17, 27)
				.detail
					font-size:10px
					line-height:10px
					color:rgb(147, 153, 159)
					.sell-count
						margin-right:12px
				.price
					margin-top:18px
					font-weight:700
					line-height:24px
					.now
						font-size:14px
						color:rgb(240, 20, 20)
					.old
						font-size:10px
						line-height:10px
						color:rgb(147, 153, 159)
						text-decoration:line-through
			.cartcontrol-wrapper
				position:absolute
				right:12px
				bottom:12px
			.buy
				position:absolute
				right:18px
				bottom:18px
				z-index:10
				line-height:24px
				border-radius:12px
				height:24px
				padding:0 12px
				box-sizing:border-box
				font-size:10px
				color:white
				background-color:rgb(0, 160, 220)
		.info
			padding:18px
			.title
				font-size:14px
				line-height:14px
				color:rgb(7, 17, 27)
			.text
				padding:6px 8px 0 8px
				font-size:12px
				line-height:24px
				color:rgb(77, 85, 93)
        .rating
			padding-top:18px
			.title
				font-size:14px
				line-height:14px
				color:rgb(7, 17, 27)
				margin-left:18px 
			.rating-wrapper
				padding:0 18px
				.rating-item
					position:relative
					padding:16px 0
					border-1px(rgba(7, 17, 27, .1))
					.user
						position:absolute
						right:0
						top:16px
						font-size:0
						line-height:12px
						.name
							font-size:10px
							display:inline-block
							vertical-align:top
							color:rgb(147, 153, 159)
							margin-right:6px
						.avatar
							border-radius:50%
					.time
						line-height:12px
						font-size:10px
						color:rgb(77, 85, 93)
						margin-bottom:6px
					.text
						line-height:16px
						font-size:12px
						color:rgb(7, 17, 27)
						.icon-thumb_up,.icon-thumb_down
							line-height:16px
							margin-right:4px
							font-size:12px
						.icon-thumb_up
							color:rgb(0, 160, 220)
						.icon-thumb_down
							color:rgb(147, 153, 159)
				.no-rating
					padding:16px 0
					font-size:12px
					color:rgb(147, 153, 159)
			  
</style>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll'
import Vue from 'vue'
import cartcontrol from '../../components/cartcontrol/cartcontrol'
import split from '../../components/split/split'
import ratingselect from '../../components/ratingselect/ratingselect'
import {formatDate} from '../../common/js/date'

// const POSITIVE = 0
// const NEGATIVE = 1
const ALL = 2

export default {
  props: {
    food: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  components: {
    cartcontrol,
    split,
    ratingselect
  },
  data () {
    return {
      showFlag: false,
      selectType: ALL,
      onlyContent: false,
      desc: {
        all: '全部',
        positive: '推荐',
        negative: '吐槽'
      }
    }
  },
  methods: {
    show () {
      this.showFlag = true
      this.selectType = ALL
      this.onlyContent = true
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.food, {click: true})
        } else {
          this.scroll.refresh()
        }
      })
    },
    hide () {
      this.showFlag = false
    },
    addFirst (event) {
      if (!event._constructed) {
        return
      }
      Vue.set(this.food, 'count', 1)
    },
    setType (type) {
      this.selectType = type
      this.$nextTick(() => {
        this.scroll.refresh()
      })
    },
    setOnlycontent () {
      this.onlyContent = !this.onlyContent
      this.$nextTick(() => {
        this.scroll.refresh()
      })
    },
    needShow (type, text) {
      if (this.onlyContent && !text) {
        return false
      }
      if (this.selectType === ALL) {
        return true
      } else {
        return type === this.selectType
      }
    }
  },
  filters: {
    formatDate (time) {
      let date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm')
    }
  }
}
</script>