<template>
	<div class="header">
		<div class="content-wrapper">
			<div class="avatar">
				<img width="64" height="64" :src="seller.avatar">
			</div>
			<div class="content">
				<div class="title">
					<span class="brand"></span>
					<span class="name">{{seller.name}}</span>
				</div>
				<div class="description">
					{{seller.description}}/{{seller.diliveryTime}}分钟送达
				</div>
				<div class="support" v-if="seller.supports">
					<span class="icon" :class="classMap[seller.supports[0].type]"></span>
					<span class="text">{{seller.supports[0].description}}</span>
				</div>
			</div>
			<div v-if="seller.supports" class="support-count">
				<span class="count">{{seller.supports.length}}</span>
				<i class="icon-keyboard_arrow_right"></i>
			</div>
		</div>
		<div class="bulletin-wraper">
			<span class="bulletin-title"></span><span 
			class="bulletin-text">{{seller.bulletin}}</span>
			<i class="icon-keyboard_arrow_right"></i>
		</div>
	</div>
</template>

<style type="text/css" lang="stylus" refs="stylesheet/stylus">
@import "../../common/stylus/mixin"

	.header
		color:#fff
		.content-wrapper
			background-color:rgba(0, 0, 0,0.5)
			font-size:0
			position:relative
			.avatar
				margin:24px 16px 18px 24px
				display:inline-block
				img
					border-radius:2px
			.content
				display:inline-block
				vertical-align:top
				.title
					margin-top:26px
					.brand
						width:30px
						height:18px
						display:inline-block
						vertical-align:top
						margin-right:6px
						bg-image('brand')
						background-repeat:no-repeat
						background-size:30px 18px
					.name
						font-size:16px
						font-weight:bold
						line-height:18px
				.description
					font-size:12px
					line-height:12px
					margin-top:8px
				.support
					margin-top:10px
					.icon
						display:inline-block
						vertical-align:top
						width:12px
						height:12px
						margin-right:4px
						background-size:12px 12px
						background-repeat:no-repeat
						&.decrease
							bg-image('decrease_1')
						&.discount
							bg-image('discount_1')
						&.guarantee
							bg-image('guarantee_1')
						&.invoice
							bg-image('invoice_1')
						&.special
							bg-image('special_1')
					.text
						font-size:10px
						line-height:12px
			.support-count
				position:absolute
				background-color:rgba(0,0,0,0.2)
				height:24px
				line-height:24px
				right:12px
				bottom:18px
				padding:0 8px
				border-radius:14px
				text-align:center
				.count
					font-size:10px
					vertical-align:top
				.icon-keyboard_arrow_right
					font-size:10px
					line-height:24px
					margin-left:2px
		.bulletin-wraper
			background-color:rgba(7, 17, 27, 0.2)
			height:28px
			padding:0 22px 0 12px
			line-height:28px
			white-space:nowrap
			text-overflow: ellipsis
			overflow:hidden
			position:relative
			.bulletin-title
				display:inline-block
				width:22px
				height:12px
				bg-image('bulletin')
				background-repeat:no-repeat
				background-size:100%
				vertical-align:top
				margin-top:7px
			.bulletin-text
				font-size:10px
				margin-left:4px
				vertical-align:top
			.icon-keyboard_arrow_right
				position:absolute
				font-size:10px
				right:12px
				top:8px
			
				

</style>

<script type="text/ecmascript-6">
export default {
  props: {
    seller: {
      type: Object
    }
  },
  created () {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
  }
}
</script>