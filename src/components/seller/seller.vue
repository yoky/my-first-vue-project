<template>
	<div class="seller" ref=seller>
		<div class="seller-content">
			<div class="overview">
				<h1 class="title">{{seller.name}}</h1>
				<div class="desc border-1px">
					<star :size=36 :score="seller.score"></star>
					<span class="text">({{seller.ratingCount}})</span>
					<span class="text">月售{{seller.sellCount}}单</span>
				</div>
				<div class="collect" @click="toogleSeller($event)">
					<i class="icon-favorite" :class="{'active':favorate}"></i>
					<div class="text">{{favorateText}}</div>
				</div>
				<ul class="remark">
					<li class="block">
						<h2>起送价</h2>
						<div class="content">
							<span class="stress">{{seller.minPrice}}</span>
						</div>
					</li>
					<li class="block">
						<h2>商家配送</h2>
						<div class="content">
							<span class="stress">{{seller.deliveryPrice}}</span>元
						</div>
					</li>
					<li class="block">
						<h2>平均配送时间</h2>
						<div class="content">
							<span class="stress">{{seller.deliveryTime}}</span>分钟
						</div>
					</li>
				</ul>
			</div>
			<split></split>
			<div class="bulletin">
				<h1 class="title">公告与活动</h1>
				<div class="content-wrapper border-1px">
					<p class="content">{{seller.bulletin}}</p>
				</div>
				<ul v-if="seller.supports" class="supports">
					<li class="support-item border-1px" v-for="item in seller.supports">
						<span class="icon" :class="classMap[item.type]"></span>
						<span class="text">{{item.description}}</span>
					</li>
				</ul>
			</div>
			<split></split>
			<div class="pics">
				<h1 class="title">商家实景</h1>
				<div class="pic-wrapper" ref=picWrapper>
					<ul class="pic-list" ref=picList>
						<li class="pic-item" v-for="pic in seller.pics">
							<img :src="pic" width="120" height="90">
						</li>
					</ul>
				</div>
			</div>
			<split></split>
			<div class="info">
				<h1 class="title border-1px">商家信息</h1>
				<ul>
					<li class="info-item border-1px" v-for="info in seller.infos">{{info}}
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<style type="text/css" lang="stylus" refs="stylesheet/stylus">
@import "../../common/stylus/mixin"
	.seller
		position:absolute
		top:174px
		bottom:0
		left:0
		width:100%
		overflow:hidden
		.seller-content
			.overview
				padding:18px
				position:relative
				.title
					font-size:14px
					color:rgb(7, 17, 27)
					line-height:14px
				.desc
					margin-top:8px
					border-1px(rgba(7, 17, 27,.1))
					font-size:0
					padding-bottom:18px
					.star
						line-height:18px
						display:inline-block
						vertical-align:top
						margin-right:8px
					.text
						font-size:10px
						color:rgb(77, 85, 93)
						line-height:18px
						display:inline-block
						vertical-align:top
						margin-right:12px
				.collect
					position:absolute
					top:18px
					right:18px
					.icon-favorite
						display:block
						font-size:24px
						color:#d4d6d9
						line-height:24px
						text-align:center
						&.active
							color:rgb(240, 20, 20)
					.text
						margin-top:4px
						font-size:10px
						color:rgb(77, 85, 93)
						line-height:10px
				.remark
					display:flex
					.block
						flex:1
						padding:18px 0
						border-right:1px solid rgba(7, 17, 27, .1)
						text-align:center
						&:last-child
							border-right:none
						h2
							font-size:10px
							color:rgb(147, 153, 159)
							line-height:10px
						.content
							margin-top:4px
							line-height:24px
							font-size:10px
							color:rgb(147, 153, 159)
							.stress
								font-size:24px
								color:rgb(7, 17, 27)
			.bulletin
				margin:0 18px
				padding-top:18px
				.title
					font-size:14px
					color:rgb(7, 17, 27)
					line-height:14px
				.content-wrapper
					padding:0 12px 16px 12px
					border-1px(rgba(7, 17, 27,.1))
					.content
						margin-top:8px
						font-size:12px
						color:rgb(240, 20, 20)
						line-height:24px
				.supports
					.support-item
						padding:16px 12px
						border-1px(rgba(7, 17, 27,.1))
						font-size:0
						&:last-child
							border-none()
						.text
							font-size:12px
							line-height:16px
							color:rgb(7, 17, 27)
						.icon
							display:inline-block
							vertical-align:top
							width:16px
							height:16px
							margin-right:6px
							background-size:16px 16px
							background-repeat:no-repeat
							&.decrease
								bg-image('decrease_4')
							&.discount
								bg-image('discount_4')
							&.guarantee
								bg-image('guarantee_4')
							&.invoice
								bg-image('invoice_4')
							&.special
								bg-image('special_4')
			.pics
				margin:0 18px
				padding-bottom:18px
				.title
					padding:18px 0 12px 0	
					font-size:14px
					color:rgb(7, 17, 27)
					line-height:14px
				.pic-wrapper
					overflow:hidden
					white-space:nowrap
					width:100%
					.pic-list
						font-size:0
						.pic-item
							display:inline-block
							margin-right:6px
							width:120px
							height:90px
							&:last-child
								margin:0
			.info
				margin:0 18px
				.title
					padding:18px 0 12px 0	
					font-size:14px
					color:rgb(7, 17, 27)
					line-height:14px
					border-1px(rgba(7, 17, 27,.1))
				ul
					.info-item
						padding:16px 12px
						font-size:12px
						color:rgb(7, 17, 27)
						line-height:16px
						border-1px(rgba(7, 17, 27,.1))
						&:last-child
							border-none()
</style>

<script type="text/ecmascript-6">
import star from '../../components/star/star'
import split from '../split/split'
import BScroll from 'better-scroll'
import {saveToLocal, loadFromLocal} from '../../common/js/store'
export default{
  data () {
    return {
      favorate: (() => {
        return loadFromLocal(this.seller.id, 'favorate', false)
      })()
    }
  },
  props: {
    seller: {
      type: Object
    }
  },
  computed: {
    favorateText () {
      return this.favorate ? '已收藏' : '未收藏'
    }
  },
  components: {
    star,
    split
  },
  mounted () {
    this.scroll = new BScroll(this.$refs.seller, {click: true})
    this._initPics()
  },
  created () {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
  },
  // watch: {
  //   'seller' () {
  //     this.initPics()
  //   }
  // },
  methods: {
    _initPics () {
      if (this.seller.pics) {
        let picWidth = 120
        let margin = 6
        let width = (picWidth + margin) * this.seller.pics.length - margin
        this.$refs.picList.style.width = width + 'px'
        if (!this.picscroll) {
          this.$nextTick(() => {
            this.picscroll = new BScroll(this.$refs.picWrapper, {click: true, scrollX: true, eventPassthrough: 'vertical'})
          })
        } else {
          this.picScroll.refresh()
        }
      }
    },
    toogleSeller (event) {
      if (!event._constructed) {
        return
      }
      this.favorate = !this.favorate
      saveToLocal(this.seller.id, 'favorate', this.favorate)
    }
  }
}
</script>