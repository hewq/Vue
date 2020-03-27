<template>
    <div class="order_detail_page">
        <head-top head-title="订单详情" go-back="true"></head-top>
    </div>
</template>

<script>
    import headTop from '@/components/header/Head'

    export default {
        components: {
            headTop
        }
    }
</script>

<style lang="scss" scoped>
    @import '@/assets/style/mixin';
	.page{
        display: inline-block;
        .rem_time{
            @include sc(.55rem, orange);
            padding: .1rem .2rem;
            border-radius: .15rem;
        }
    }
</style>
