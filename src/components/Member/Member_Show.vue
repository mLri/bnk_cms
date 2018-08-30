<template>
    <div id="member_show">
        <div class="mian_member_show">

            <div @click="goto('MemberAdd')" class="add">+</div>

            <h1>Member Menagement</h1>

            <div class="list">
                <!-- {{ profiles }} -->
                <div class="list_head">
                    <div class="list_head_img">Name</div>
                    <div class="list_head_detail">Province</div>
                    <div class="list_head_custom">Custom</div>
                </div>

                <div v-for="(profile, index) in profiles"
                    :key="index"
                    class="list_item">
                    <!-- {{ profile }} -->
                    <div class="list_name">
                        {{ profile.firstName.en }} {{ profile.lastName.en }}
                        <!-- <img 
                            :src="`http://localhost:3100/api/member/img/${profile.avatar.name}`"
                            class="list_item_img"> -->
                    </div>
                    <div class="list_detail">
                        {{ profile.province }}
                    </div>
                    <div class="list_custom">
                        <span class="edit"><router-link :to="`/member/update/${profile._id}`">edit</router-link></span>
                        <span @click="showModal(`${profile._id}`, `${profile.firstName.en}`)" class="del">delete</span>
                    </div>
                </div>
                
            </div>
        </div>

        <div v-if="modal" class="modal">
            <div class="modal_window">
                <div class="modal_detail">
                    are you sure to delete {{ modalSelectedName }}?
                </div>
                <div class="modal_custom">
                    <button @click="removeMember" class="modal_delete">Delete</button>
                    <button @click="cancelRemoveMember" class="modal_cancel">cancel</button>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data(){
        return {
            profiles: [],
            modal: false,
            modalSelectedId: null,
            modalSelectedName: null
        }
    },
    created() {
        this.fetchMemberAll()
    },
    // mounted() {
    //     this.fetchMemberAll()
    // },
    methods: {
        goto(name){
            this.$router.push({ name: name } )
        },
        showModal(id, name){
            this.modalSelectedId = id
            this.modalSelectedName = name
            this.modal = true
        },
        cancelRemoveMember(){
            this.modalSelectedId = null
            this.modalSelectedName = null
            this.modal = false
        },
        removeMember(){
            console.log('remove id => ', this.modalSelectedId)
            const _this = this
            const _id = this.modalSelectedId
            axios.delete('http://localhost:3100/api/member/delete/' + _id, {
                headers: {
                    'Authorization': localStorage.getItem('access_token')
                }
            })
            .then(function (response) {
                console.log('delete success ...');
                _this.fetchMemberAll()
                _this.cancelRemoveMember()
                // _this.profiles.push(response.data.data)
            })
            .catch(function (error) {
                console.log('[removeMember] error ::: => ',error);
            });
        },
        fetchMemberAll() {
            console.log('fetchMemberall ...')
            
            const _this = this

            axios.get('http://localhost:3100/api/member/', {
                headers: {
                    'Authorization': localStorage.getItem('access_token')
                }
            })
            .then(function (response) {
                console.log(response);
                _this.profiles = response.data.data
            })
            .catch(function (error) {
                console.log('[fetchMemberAll] error ::: => ', error);
            });
        }
        
    }
}
</script>

<style scoped>
    .mian_member_show {
        width: 60%;
        height: auto;
        margin: 0 auto;
        background-color: #fff;
        padding: 1em;
        margin-top: 20px;
    }

    .list {
        border-top: 1px solid #000;
    }

    .list_head {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        text-align: center;
        border-bottom: 1px solid #000;
        padding: 1em 0;
    }

    .list_item {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        padding: .5em 0;
    }

    .list_item:nth-child(even) {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        padding: .5em 0;
        background-color: #0211;
    }

    .list_item_img {
        width: 100px;
        height: 100px;
    }

    .list_item img {
        margin: 0 auto;
        display: block;
    }

    .list_name {
        text-align: center;
    }

    .list_detail {
        text-align: center;
    }

    .list_custom {
        text-align: center;
    }

    span.edit {
        border: 1px solid #007bff;
        border-radius: 5px;
        padding: 5px 10px;
        background-color: #007bff;
    }

    span.edit a {
        text-decoration: none;
        color: #fff;
    }

    span.edit:hover,
    .add:hover {
        background-color: #0069d9;
        border-color: #0069d9;
    }

    span.del:hover {
        background-color: #c82333;
        border-color: #c82333
    }

    span.del {
        border: 1px solid #dc3545;
        border-radius: 5px;
        padding: 5px 10px;
        background-color: #dc3545;
        color: #fff;
        cursor: pointer;
    }

    .add {
        font-size: 32px;
        border: 1px solid #007bff;
        background-color: #007bff;
        color: #fff;
        display: inline-block;
        border-radius: 30px;
        padding: 0 10px;
        cursor: pointer;
    }

    /* modal */
    .modal {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background: rgba(0, 0, 0, .5);
    }

    .modal_window {
        position: absolute;
        top: 50%;
        left: 50%;
        transition: .5s;
        width: 100%;
        min-width: 400px;
        max-width: 600px;
        background: white;
        box-shadow: 0 0 10px rgba(0, 0, 0, .5);
        transform: translate(-50%, -50%);
        padding: 1em;
        color: black;
        text-align: center;
    }

    .modal_detail {
        font-size: 24px;
        margin: 2em 0 1.5em 0;
    }

    .modal_custom {
        float: right;
        margin-top: 1em;    
    }

    .modal_delete {
        border: 1px solid transparent;
        background-color: #dc3545;
        color: #fff;
        padding: 5px 10px;
        font-size: 16px;
    }

    .modal_cancel {
        border: 1px solid transparent;
        background-color: darkcyan;
        color: #fff;
        padding: 5px 10px;
        font-size: 16px;
    }
    

</style>
