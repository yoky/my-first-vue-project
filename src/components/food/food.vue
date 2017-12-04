<template>
	<div class="food" v-show="showFlag">
		2332
	</div>
</template>

<style type="text/css" lang="stylus" refs="stylesheet/stylus">
	.food
		position:fixed
		left:0
		top:0
		bottom:48px
		z-index:30
		width:100%
		background-color:white

</style>

<script type="text/ecmascript-6">
export default {
  props: {
    food: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      showFlag: false
    }
  },
  methods: {
    show () {
      this.showFlag = true
    }
  }
}
</script>