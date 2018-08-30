<template>
    <div id="login">
        <div id="main">

            <h1>Sign in</h1>

            <label>Username</label>
            <input 
                type="text" 
                class="from-control" 
                name="username" 
                id="username"
                v-model="username">

            <label>Password</label>
            <input 
                type="password" 
                class="from-control" 
                name="password" 
                id="password"
                v-model="password">

            <button class="btn" @click="login">Login</button>

        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
    data(){
        return {
            username: '',
            password: ''
        }
    },
    methods: {
        ...mapMutations(['SET_INFO']),
        ...mapActions(['set_info']),
        
        login(){
            const _data = {
                'email': this.username,
                'pass': this.password
            }
            let a = this.callSignIn(_data).then(res => {
                this.$router.push({ name: 'Dash'} )
            })
            
        },
        callSignIn(data){
            let _this = this
            return new Promise((resolve, reject) => {
                axios.post( 'http://localhost:3100/api/user/signin',
                data,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
                ).then(function(respon){
                    console.log(respon.data);
                    _this.setInfo(respon.data)
                    resolve(respon)
                    // resolve(respon)
                    // this.$router.push({ name: 'Home' })
                    // this.$route.router.go('/api/member/')
                    // this.props.history.push("/");
                    // window.location = "http://localhost:3001/"

                })
                .catch(function(err){
                    console.log('FAILURE!!');
                    reject(err)
                    // reject('error')
                });
            })
        },
        setInfo(data){
            this.set_info(data)
        }
    }
}
</script>

<style scoped>

    h1 {
        text-align: center;
        margin: 0;
        /* padding: 1em 0; */
    }

    #login {
        width: 50%;
        height: auto;
        margin: 0 auto;
        background-color: #fff;
        border: 1px solid #d8dee2;
        border-radius: 5px;
        margin-top: 60px;
    }

    #main {
        padding: 4em 2em;
        
    }

    #main label {
        text-align: left;
        font-weight: 700;
        margin-top: 20px;
        margin-bottom: 10px;
        display: block;
        /* margin: 1em 0; */
    }

    #main input {
        display: block;
        width: 100%;
    }

    .from-control {
        min-height: 34px;
        padding: 6px 8px;
        font-size: 16px;
        line-height: 20px;
        color: #24292e;
        /* vertical-align: middle; */
        /* background-color: #fff; */
        /* background-repeat: no-repeat; */
        /* background-position: right 8px center; */
        border: 1px solid #d1d5da;
        border-radius: 3px;
        outline: none;
        /* box-shadow: inset 0 1px 2px rgba(27,31,35,0.075); */
    }

    .btn {
        width: 100%;
        margin-top: 40px;
        padding: 1em;
        background-color: #28a745;
        color: #fff;
        border: 1px solid rgba(27,31,35,0.2);
        border-radius: 0.25em;
        font-size: 1em;
    }

    .btn:hover {
        cursor: pointer;
        background-color: #039222;
    }

</style>
