<template>
	<div class="ratings" ref=ratings>
		<div class="ratings-content">
			<div class="overview">
				<div class="overview-left">
					<div class="score">{{seller.score}}</div>
					<div class="title">综合评分</div>
					<div class="rank">高于周边商家{{seller.rankRate}}</div>
				</div>
				<div class="overview-right">
					<div class="score-wrapper">
						<span class="title">服务态度</span>
						<star :size="36" :score="seller.serviceScore"></star>
						<span class="score">{{seller.serviceScore}}</span>
					</div>
					<div class="score-wrapper">
						<span class="title">商品评分</span>
						<star :size="36" :score="seller.foodScore"></star>
						<span class="score">{{seller.foodScore}}</span>
					</div>
					<div class="deliver-wrapper">
						<span class="title">送达时间</span>
						<span class="time">{{seller.deliveryTime}}分钟</span>
					</div>
				</div>
			</div>
			<split></split>
			<ratingselect :selectType="selectType" 
				:onlyContent="onlyContent" :desc="desc" :ratings="ratings"
				@changeType="setType" @toogleContent="setOnlycontent"></ratingselect>
			<div class="rating-wrapper">
				<ul>
					<li v-for="rating in ratings" class="rating-item" v-show="needShow(rating.rateType, rating.text)">
						<div class="avatar">
							<img :src="rating.avatar" width="28" height="28">
						</div>
						<div class="content">
							<h1 class="name">{{rating.username}}</h1>
							<div class="time">{{rating.rateTime | formatDate}}</div>
							<div class="star-wrapper">
								<star :size="24" :score="rating.score"></star>
								<span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
							</div>
							<p class="text">{{rating.text}}</p>
							<div class="recommand" v-show="rating.recommend && rating.recommend.length>0">
								<i class="icon-thumb_up" v-show="rating.rateType===0"></i>
								<i class="icon-thumb_down" v-show="rating.rateType===1"></i>
								<span v-for="item in rating.recommend" class="item">{{item}}</span>
							</div>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<style type="text/css" lang="stylus" refs="stylesheet/stylus">
@import "../../common/stylus/mixin"
	.ratings
		position:absolute
		top:174px
		width:100%
		bottom:0
		left:0
		overflow:hidden
		.overview
			display:flex
			padding:18px 0
			.overview-left
				flex:0 0 137px
				width:137px
				border-right:1px solid rgba(7, 17, 27,.1)
				text-align:center
				@media only screen and (max-width:320px)
					max-width:120px
					flex:0 0 120px
				.score
					font-size:24px
					color:rgb(255, 153, 0)
					line-height:28px
				.title
					margin-top:6px
					margin-bottom:8px
					font-size:12px
					color:rgb(7, 17, 27)
					line-height:12px
				.rank
					font-size:10px
					color:rgb(147, 153, 159)
					line-height:20px
					margin-bottom:6px
			.overview-right
				flex:1
				padding-left:24px
				@media only screen and (max-width:320px)
					padding-left:6px
				.score-wrapper
					margin-bottom:8px
					font-size:0
					.title
						display:inline-block
						vertical-align:top
						font-size:12px
						line-height:18px
						color:rgb(7, 17, 27)
					.star
						display:inline-block
						vertical-align:top
						// line-height:18px
						margin:0 12px
					.score
						display:inline-block
						vertical-align:top
						font-size:12px
						line-height:18px
						color:rgb(255, 153, 0)
				.deliver-wrapper
					font-size:0
					.title
						font-size:12px
						color:rgb(7, 17, 27)
						display:inline-block
						vertical-align:top
					.time
						font-size:12px
						line-height:18px
						color:rgb(147, 153, 159)
						display:inline-block
						vertical-align:top
						margin-left:12px
		.rating-wrapper
			.rating-item
				display:flex
				padding:18px
				border-1px(rgba(7, 17, 27,.1))
				.avatar
					display:inline-block
					margin-right:12px
					width:28px
					flex:0 0 28px
					img
						border-radius:50%
				.content
					flex:1
					position:relative
					.name
						font-size:10px
						color:rgb(7, 17, 27)
						line-height:12px
					.time
						position:absolute
						top:0
						right:0
						font-size:10px
						line-height:12px
						color:rgb(147, 153, 159)
					.star-wrapper
						margin:4px 0px 6px 0
						font-size:0
						.star
							display:inline-block
							vertical-align:top
							margin-right:6px
						.delivery
							display:inline-block
							vertical-align:top
							font-size:10px
							line-height:12px
							color:rgb(147, 153, 159)
					.text
						font-size:12px
						color:rgb(7, 17, 27)
						line-height:18px
						margin-bottom:8px
					.recommand
						line-height:16px
						font-size:0
						.icon-thumb_up,.item
							display:inline-block
							font-size:9px
							margin:0 8px 4px 0
						.icon-thumb_down
							color:rgb(183, 187, 191)
							font-size:12px
							line-height:16px
							margin-right:8px
						.icon-thumb_up
							color:rgb(0, 160, 220)
						.item
							padding:0 6px
							border:1px solid rgba(7, 17, 27, .1)
							border-radius:1px
							margin-right:8px
							font-size:9px
							color:rgb(147, 153, 159)
							background-color:white
						
</style>

<script type="text/ecmascript-6">
import star from '../star/star'
import split from '../split/split'
import ratingselect from '../../components/ratingselect/ratingselect'
import {formatDate} from '../../common/js/date'
import BScroll from 'better-scroll'
// const POSITIVE = 0
// const NEGATIVE = 1
const ALL = 2
const ERR_OK = 0

export default{
  props: {
    seller: {
      type: Object
    }
  },
  components: {
    star,
    split,
    ratingselect
  },
  data () {
    return {
      ratings: [],
      selectType: ALL,
      onlyContent: true,
      desc: {
        all: '全部',
        positive: '推荐',
        negative: '吐槽'
      }
    }
  },
  filters: {
    formatDate (time) {
      let date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm')
    }
  },
  created () {
    this.$http.get('/api/ratings').then((response) => {
      response = response.body
      if (response.errno === ERR_OK) {
        this.ratings = response.data
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.ratings, {click: true})
          } else {
            this.scroll.refresh()
          }
        })
      }
    })
  },
  methods: {
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
  }
}
</script>