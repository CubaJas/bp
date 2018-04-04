<template>
    <button>{{ buttonText }}</button>
</template>

<script>
    export default {
        data() {
            return {
                hello: 'Hello Turok',
            };
        },
	    props: {
          buttonText: {
            type: String,
            default: "Отправить"
          }
        },
        mounted() {

        }
    };
</script>

<style lang="stylus">
    .gg
        background #ffff00
</style>