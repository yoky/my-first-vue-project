<template>
	<div class="ratingselect">
		<div class="rating-type border-1px" >
			<span class="block positive" :class="{'active':selectType==2}" @click="select(2,$event)">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
			<span class="block positive" :class="{'active':selectType==0}" @click="select(0,$event)">{{desc.positive}}<span class="count">{{positives.length}}</span></span>
			<span class="block negative" :class="{'active':selectType==1}" @click="select(1,$event)">{{desc.negative}}<span class="count">{{negatives.length}}</span></span>
		</div>
		<div class="switch" @click="toggleContent" :class="{'on':onlyContent}">
			<i class="icon-check_circle"></i>
			<span class="text">只看有内容的评价</span>
		</div>
	</div>
</template>

<style type="text/css" lang="stylus" refs="stylesheet/stylus">
@import "../../common/stylus/mixin"
	.ratingselect
		.rating-type
			padding:18px 0
			margin:0 18px
			border-1px(rgba(7, 17, 27, .1))
			font-size:0
			.block
				display: inline-block
				padding:8px 12px
				border-radius:1px
				margin-right:8px
				color:rgb(77, 85, 93)
				font-size:12px
				line-height:16px
				&.active
					color:white
				.count
					font-size:8px
					margin-left:2px
				&.positive
					background-color:rgba(0, 160, 220,.2)
					&.active
						background-color:rgb(0, 160, 220)
				&.negative
					background-color:rgba(77, 85, 93, .2)
					&.active
						background-color:rgb(77, 85, 93)
		.switch
			padding:12px 18px
			line-height:24px
			font-size:0
			border-1px(rgba(7, 17, 27, .1))
			color:rgb(147, 153, 159)
			.icon-check_circle
				margin-right:4px
				font-size:24px
				vertical-align:middle
			.text
				font-size:12px
				display:inline-block
				vertical-align:top
				vertical-align:middle
			&.on
				color:rgb(0, 160, 220)
				
</style>

<script type="text/ecmascript-6">
// import Vue from 'vue'
const POSITIVE = 0
const NEGATIVE = 1
// const ALL = 2
export default {
  props: {
    ratings: {
      type: Array,
      default () {
        return []
      }
    },
    selectType: {
      type: Number
    },
    onlyContent: {
      type: Boolean
    },
    desc: {
      type: Object,
      default () {
        return {
          all: '全部',
          positive: '满意',
          negative: '不满意'
        }
      }
    }
  },
  methods: {
    select (type, event) {
      if (!event._constructed) {
        return
      }
      console.log(this.selectType)
      console.log(type)
      this.$emit('ratingtype.select', type)
    },
    toggleContent () {
      if (!event._constructed) {
        return
      }
      console.log(this.onlyContent)
      this.$emit('content.toogle')
    }
  },
  computed: {
    positives () {
      return this.ratings.filter((rating) => {
        return rating.rateType === POSITIVE
      })
    },
    negatives () {
      return this.ratings.filter((rating) => {
        return rating.rateType === NEGATIVE
      })
    }
  }
}
</script>