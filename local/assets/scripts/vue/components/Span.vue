<template>
    <span class="demo-app tt">
        0000
    </span>
</template>

<script>
  export default {
	name: 'Span',
	data() {
	  return {
		hello: 'Hello',
	  };
	},
	props: ['initial']
  };
</script>

<style lang="stylus">
    .tt
        background #b4cc1b
</style>