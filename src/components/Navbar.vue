<template>
    <div id="navbar">

        <div class="sub_navbar">
            <div class="logo">
                <div class="inlint-block">
                    <span class="boder">BNK48</span>
                    <span class="home_logo">
                        <img src="https://reddingdesigns.com/images/icons/nav-home.png"
                        width="30px"
                        height="30px">
                    </span>
                </div>
            </div>
            <div class="manage_user">
                <span 
                class="info"
                v-if="loggedIn" >
                    User: {{ userInfo.firstName }} {{ userInfo.lastName }} |
                </span>
                <span 
                    class="login"
                    v-if="!loggedIn">
                    Login
                </span>
                <span 
                    v-if="loggedIn" 
                    class="logout"
                    @click="logout">
                    Logout
                </span>
            </div>
        </div>
        
    </div>
</template>

<script>
export default {
    data(){
        return {
            userInfo: {},
            a : true
        }
    },
    computed: {
        loggedIn(){
            let status = this.$store.getters.loggedIn
            if(!status){
                status = localStorage.getItem('access_token') !== null
                if(status){
                    this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
                }
            } else {
                this.userInfo = this.$store.getters.userInfo
            }
            console.log('status => ', status)
            console.log('userInfo => ', this.userInfo)
            return status
        }
    },
    methods: {
        logout(){
            //remove localStorage
            localStorage.removeItem('userInfo')
            localStorage.removeItem('access_token')
            this.clearData()
            this.$store.dispatch('logout')

            this.$router.push({ name: 'Login'} )
        },
        clearData(){
            this.userInfo = {}
        }
    }
}
</script>

<style scoped>
    #navbar {
        width: 100%;
        height: 60px;
        line-height: 60px;
        background-color: #24292e;
    }

    .sub_navbar {
        width: 90%;
        height: auto;
        margin: 0 auto;
        color: #fff;
    }

    .logo {
        float: left;
    }

    .inline-block {
        display: inline-block;
    }

    .boder {
        border: 1px solid #fff;
        padding: 5px;
        border-radius: 5px;
    }

    .logout {
        float: right;
        display: block;
        
    }

    .logout:hover {
        cursor: pointer;
        color: #BFBFBF;
    }

    .manage_user {
        float: right;
    }

    .login {
        /* float: right; */
        display: block;
    }

    .info {
        /* float: right; */
        margin-right: 5px;
    }
</style>
