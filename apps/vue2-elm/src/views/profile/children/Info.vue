<template>
    <div class="rating_page">
        <head-top head-title="账号信息" go-back="true"></head-top>
        <section class="profile-info">
            <section class="headportrait">
                <input ref="upload" type="file" class="profileinfopanel-upload" @change="uploadAvatar">
                <h2>头像</h2>
                <div class="headportrait-div">
                    <img :src="imgBaseUrl + userInfo.avatar" v-if="userInfo" class="headportrait-div-top" >
                    <span class="headportrait-div-bottom">
                        <svg fill="#d8d8d8" viewBox="0 0 1024 1024" id="arrow-right" class="icon"><path d="M716.298 417.341l-.01.01L307.702 7.23l-94.295 94.649 408.591 410.117-408.591 410.137 94.295 94.639 502.891-504.76z" class="selected"></path></svg>
                    </span>
                </div>
            </section>
            <router-link to="/profile/info/setusername" class="info-router">
                <section class="headportrait headportraitwo">
                    <h2>用户名</h2>
                    <div class="headportrait-div">
                        <p>{{username}}</p>
                        <span class="headportrait-div-bottom">
                            <svg fill="#d8d8d8" viewBox="0 0 1024 1024" id="arrow-right" class="icon"><path d="M716.298 417.341l-.01.01L307.702 7.23l-94.295 94.649 408.591 410.117-408.591 410.137 94.295 94.639 502.891-504.76z" class="selected"></path></svg>
                        </span>
                    </div>
                </section>
            </router-link>
            <router-link to="/profile/info/address" class="info-router">
                <section class="headportrait headportraittwo headportraithree">
                    <h2>收货地址</h2>
                    <div class="headportrait-div">
                        <span class="headportrait-div-bottom">
                            <svg fill="#d8d8d8" viewBox="0 0 1024 1024" id="arrow-right" class="icon"><path d="M716.298 417.341l-.01.01L307.702 7.23l-94.295 94.649 408.591 410.117-408.591 410.137 94.295 94.639 502.891-504.76z" class="selected"></path></svg>
                        </span>
                    </div>
                </section>
            </router-link>
            <section class="bind-phone">
                账号绑定
            </section>
            <section class="info-router" @click="changePhone">
                <section class="headportrait headportraitwo headportraithree">
                    <h2>
                        <img src="@/assets/images/bindphone.png" style="display:inline-block;margin-right: .4rem;">手机
                    </h2>
                    <div class="headportrait-div">
                        <p>{{infotel}}</p>
                        <span class="headportrait-div-bottom">
                            <svg fill="#d8d8d8" viewBox="0 0 1024 1024" id="arrow-right" class="icon"><path d="M716.298 417.341l-.01.01L307.702 7.23l-94.295 94.649 408.591 410.117-408.591 410.137 94.295 94.639 502.891-504.76z" class="selected"></path></svg>
                        </span>
                    </div>
                </section>
            </section>
            <section class="bind-phone">
                安全设置
            </section>
            <router-link to="/forget" class="info-router">
                <section class="headportrait headportraitwo headportraithree">
                    <h2>登录密码</h2>
                    <div class="headportrait-div">
                        <p>修改</p>
                        <span class="headportrait-div-bottom">
                            <svg fill="#d8d8d8" viewBox="0 0 1024 1024" id="arrow-right" class="icon"><path d="M716.298 417.341l-.01.01L307.702 7.23l-94.295 94.649 408.591 410.117-408.591 410.137 94.295 94.639 502.891-504.76z" class="selected"></path></svg>
                        </span>
                    </div>
                </section>
            </router-link>
            <section class="exitlogin" @click="exitlogin">退出登录</section>
        </section>

        <section class="coverpart" v-if="show">
            <section class="cover-background"></section>
            <section class="cover-content" :class="{'cover-animate': isEnter, 'cover-animate-leave': isLeave}">
                <div class="sa-icon">
                    <span class="sa-body"></span>
                    <span class="sa-dot"></span>
                </div>
                <h2>是否退出登录</h2>
                <div class="sa-botton">
                    <button class="waiting" @click="waitingThing">再等等</button>
                    <div style="display:inline-block;">
                        <button class="quitlogin" @click="outLogin">退出登录</button>
                    </div>
                </div>
            </section>
        </section>
        <alert-tip v-if="showAlert" @closeTip="showAlert=false" :alertText="alertText"></alert-tip>
        <transition name="router-slid" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    import headTop from '@/components/header/Head'
    import {mapState, mapMutations} from 'vuex'
    import alertTip from '@/components/common/AlertTip'
    import {setHeadImg, signout} from '@/assets/scripts/getData'
    import {removeStore} from '@/assets/scripts/utils'

    export default {
        data() {
            return {
                imgBaseUrl: '//elm.cangdu.org/img/',
                username:'',    //用户名
                resetname:'', //重置用户名
                infotel:'',     //用户手机
                avatar:'',      //用户头像
                show:false,     //显示提示框
                isEnter:true,  //是否登录
                isLeave:false, //是否退出
                showAlert: false,
                alertText: null,
            }
        },
        components: {
            headTop,
            alertTip
        },
        computed: {
            ...mapState([
                'userInfo'
            ])
        },        
        beforeDestroy(){
            clearTimeout(this.timer)
        },
        methods: {
            ...mapMutations([
                'OUT_LOGIN', 'SAVE_AVANDER'
            ]),
            exitlogin() {
                this.show = true
                this.isEnter = true
                this.isLeave = false
            },
            waitingThing() {
                clearTimeout(this.timer)
                this.isEnter = false
                this.isLeave = true
                this.timer = setTimeout(() => {
                    clearTimeout(this.timer)
                    this.show = false
                }, 200)
            },
            async uploadAvatar() {
                // 上传头像
                if (this.userInfo) {
                    let input = this.$refs.upload
                    let data = new FormData()
                    data.append('file', input.files[0])
                    try {
                       let response = await setHeadImg(this.userInfo.user_id, data) 
                       let res = JSON.stringify(response)
                       if (res.status == 1) {
                           this.userInfo.avatar = res.image_path
                       }
                    } catch (error) {
                        this.showAlert = true
                        this.alertText = '上传失败'
                        throw new Error(error)
                    }
                }
            },
            changePhone() {
                this.showAlert = true
                this.alertText = '请在手机APP中设置'
            },
            async outLogin() {
                this.OUT_LOGIN()
                this.waitingThing()
                this.$router.go(-1)
                removeStore('user_id')
                await signout()
            }
        },
        watch: {
            userInfo: function (value) {
                if (value && value.user_id) {
                    this.username = value.username
                    this.infotel = value.mobile
                    this.avatar = value.avatar
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '@/assets/style/mixin.scss';

    [v-cloak] { display: none }
    
    .rating_page{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #f2f2f2;
        z-index: 202;
        padding-top: 1.95rem;
        p, span{
            font-family: Helvetica Neue,Tahoma,Arial;
        }
    }
    .profile-info{
        @include wh(100%,3.1rem);
        .profileinfopanel-upload{
            display: block;
            position: absolute;
            opacity: 0;
            top: 2.35rem;
            left: 0;
            @include wh(100%,3.1rem);
        }
        .headportrait{
            margin-top:.4rem;
            padding:.5rem .4rem;
            @include fj(space-between);
            align-items:center;
            border-top:1px solid #ddd;
            background:#fff;

            h2{
                @include sc(.6rem,#333);
                font-weight:500;
                display:flex;
                align-items:center;
            }
            .headportrait-div{
                span{
                    display:inline-block;

                    svg{
                        @include wh(100%,100%);
                    }
                }
                .headportrait-div-top{
                    @include wh(2rem,2rem);
                    @include borderRadius(50%);
                    vertical-align:middle;
                }
                .headportrait-div-bottom{
                    @include wh(.66667rem,1.4rem);
                    position:relative;
                    top:0.44rem;
                }
            }
        }
        .headportraitwo{
            margin-top:0;
            padding:.3rem .4rem;
            .headportrait-div{
                @include fj(left);
                p{
                    text-align:left;
                    line-height:1.39rem;
                    @include sc(.7rem,#999);
                    margin-right:.2rem;
                    font-weight:100;
                    font-family:Arial;
                }
                .headportrait-div-bottom{
                    top:0;
                }
            }
        }
        .headportraithree{
            border-bottom:1px solid #ddd;
        }
        .bind-phone{
            padding:.4rem .4rem;
            @include sc(.5rem,#666);
        }
        .exitlogin{
            width:96%;
            margin:1.3rem auto 0;
            line-height:1.5rem;
            @include borderRadius(5px);
            text-align:center;
            background:#d8584a;
            @include sc(.6rem,#fff);

        }
        .exitlogin:active{
            opacity:.8;
            background:#C1C1C1;
        }
    }
    .info-router{
        display:block;
    }
    .coverpart{
        @include wh(100%,100%);
        @include allcover;
        .cover-background{
            @include wh(100%,100%);
            @include allcover;
            background:#000;
            z-index:100;
            opacity:.2;
        }
        .cover-content{
            width:94%;
            background:$fc;
            padding:17px;
            position:absolute;
            top:20%;
            left:3%;
            z-index:1000;
            @include borderRadius(5px);
            .sa-icon{
                @include wh(90px,90px);
                border:4px solid #f8bb86;
                @include borderRadius(50%);
                margin:20px auto;
                position:relative;
                .sa-body{
                    @include wh(5px,47px);
                    @include borderRadius(2px);
                    background:#f8bb86;
                    @include cl;
                    top:10px;
                }
                .sa-dot{
                    @include wh(7px,7px);
                    @include borderRadius(50%);
                    background:#f8bb86;
                    @include cl;
                    bottom:10px;
                }
            }
            h2{
                width:100%;
                text-align:center;
                @include sc(30px,#575757);
                font-weight:500;
                margin:25px 0;
            }
            .sa-botton{
                width:100%;
                text-align:center;

                button{
                    display:inline-block;
                    padding:.4rem 1rem;
                    @include borderRadius(5px);
                    @include sc(.6rem,$fc);
                    letter-spacing:1px;
                    margin-top:26px;
                }
                .waiting{
                    background:#C1C1C1;
                    margin-right:.4rem;
                }
                .quitlogin{
                    background:rgb(221, 107, 85);
                }
            }

        }
    }
    @-webkit-keyframes bounceIn {
  from, 20%, 40%, 60%, 80%, 100% {
    -webkit-animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
    animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
  }

  0% {
    opacity: 0;
    -webkit-transform: scale3d(.3, .3, .3);
    transform: scale3d(.3, .3, .3);
  }

  20% {
    -webkit-transform: scale3d(1.1, 1.1, 1.1);
    transform: scale3d(1.1, 1.1, 1.1);
  }

  40% {
    -webkit-transform: scale3d(.9, .9, .9);
    transform: scale3d(.9, .9, .9);
  }

  60% {
    opacity: 1;
    -webkit-transform: scale3d(1.03, 1.03, 1.03);
    transform: scale3d(1.03, 1.03, 1.03);
  }

  80% {
    -webkit-transform: scale3d(.97, .97, .97);
    transform: scale3d(.97, .97, .97);
  }

  100% {
    opacity: 1;
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }
}

@keyframes bounceIn {
  from, 20%, 40%, 60%, 80%, 100% {
    -webkit-animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
    animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
  }

  0% {
    opacity: 0;
    -webkit-transform: scale3d(.3, .3, .3);
    transform: scale3d(.3, .3, .3);
  }

  20% {
    -webkit-transform: scale3d(1.1, 1.1, 1.1);
    transform: scale3d(1.1, 1.1, 1.1);
  }

  40% {
    -webkit-transform: scale3d(.9, .9, .9);
    transform: scale3d(.9, .9, .9);
  }

  60% {
    opacity: 1;
    -webkit-transform: scale3d(1.03, 1.03, 1.03);
    transform: scale3d(1.03, 1.03, 1.03);
  }

  80% {
    -webkit-transform: scale3d(.97, .97, .97);
    transform: scale3d(.97, .97, .97);
  }

  100% {
    opacity: 1;
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }
}
@-webkit-keyframes zoomOut {
  from {
    opacity: 1;
  }

  50% {
    opacity: 0;
    -webkit-transform: scale3d(.3, .3, .3);
    transform: scale3d(.3, .3, .3);
  }

  100% {
    opacity: 0;
  }
}

@keyframes zoomOut {
  from {
    opacity: 1;
  }

  50% {
    opacity: 0;
    -webkit-transform: scale3d(.3, .3, .3);
    transform: scale3d(.3, .3, .3);
  }

  100% {
    opacity: 0;
  }
}
body .coverpart .cover-animate{
    transition:all 1s;
    animation:bounceIn .6s;
}
body .coverpart .cover-animate-leave{
    animation:zoomOut .4s;
}
.router-slid-enter-active, .router-slid-leave-active {
    transition: all .4s;
}
.router-slid-enter, .router-slid-leave-active {
    transform: translate3d(2rem, 0, 0);
    opacity: 0;
}
</style>
