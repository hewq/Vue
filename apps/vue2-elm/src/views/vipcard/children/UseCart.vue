<template>
    <div class="page_container">
        <head-top head-title="兑换会员" go-back="true"></head-top>
        <p class="buy_for">成功兑换后将关联当前账号：<span>{{userInfo.username}}</span></p>
        <form class="form_style">
            <input type="text" name="cartNumber" maxlength="10" v-model="cartNumber" placeholder="请输入10位卡号">
            <input type="text" name="passWord" maxlength="">
        </form>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>
    @import '@/assets/style/mixin';
  
    .page_container{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #f5f5f5;
        z-index: 202;
        padding-top: 1.95rem;
        p, span, input{
            font-family: Helvetica Neue,Tahoma,Arial;
        }
    }
    .buy_for{
        @include sc(.6rem, #666);
        line-height: 2rem;
        padding-left: 0.7rem;
        span{
            font-weight: bold;
        }
    }
    .form_style{
    	display: flex;
    	flex-direction: column;
    	input{
    		border-bottom: 1px solid #f5f5f5;
    		height: 2rem;
    		@include sc(.65rem, #999);
    		padding-left: .7rem;
    	}
    }
    .determine{
        background-color: #ccc;
        @include sc(.7rem, #fff);
        text-align: center;
        margin: 0 .7rem;
        line-height: 1.8rem;
        border-radius: 0.2rem;
        margin-top: 0.7rem;
        font-weight: bold;
    }
    .could_pay{
    	background-color: #4cd964;
    }
    .Binding{
    	margin-top: 1rem;
    	h3{
    		text-align: center;
    		font-weight: normal;
    		@include sc(.65rem, #aaa);
    		margin-bottom: .6rem;
    	}
    	p, b{
    		@include sc(.5rem, #aaa);
    		line-height: .8rem;
    	}
    	p{
    		padding-left: 2rem;
    	}
    }
</style>
