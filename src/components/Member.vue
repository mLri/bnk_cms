<template>
    <div id="member">
        <div class="mian_member">
            <h1>Member Menagement</h1>
            <div class="from">

                <div class="input_img"
                    v-for="(file, index) in files" 
                    :key="index" :name="`file[${index}]`">

                    <div class="img_upload">
                        <img 
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSRIClFu3SxX37I0PdX79m6SpETlfgKcOHIXpHA7539vDIlDeS" 
                            :id="`preview[${index}]`">
                    </div>
                    
                    <div class="btn_upload">

                        <label id="#bb"> Enter Your File
                            <input 
                                type="file" id="file" 
                                ref="file" 
                                v-on:change="selectImg($event, index)"/>
                        </label> 
                            
                    </div>
                </div>

                <label>first name (EN)</label>
                <input v-model="profile.firstName.en" type="text" class="input" name="firstNameEN">

                <label>last name (EN)</label>
                <input v-model="profile.lastName.en" type="text" class="input" name="lastNameEN">

                <label>first name (TH)</label>
                <input v-model="profile.firstName.th" type="text" class="input" name="firstNameTH">

                <label>last name (TH)</label>
                <input v-model="profile.lastName.th" type="text" class="input" name="lastNameTH">

                <label>birthday</label>
                <input v-model="profile.birth" type="text" class="input" name="birthDay">

                

                <div class="btn">
                    <div class="right">
                        <input @click="uploadFile" type="submit" class="save" value="Save">
                        <input type="submit" class="cancel" value="Cancel">
                    </div>
                </div>
                
            </div>
        </div>
        
    </div>
</template>

<script>
import axios from 'axios'
import Upload from '@/components/Upload'

export default {
    components: {
        Upload
    },
    data(){
        return {
            uploadImg: [],
            files: [''],
            countInput: 1,
            // profile: {
            //     firstName: {
            //         th: '',
            //         en: ''
            //     },
            //     lastName: {
            //         th: '',
            //         en: ''
            //     },
            //     birth: ''
            // }
            profile: {
                "firstName": {
                    "th": "สวิชญา",
                    "en": "SAWITCHAYA"
                },
                "lastName": {
                    "th": "ขจรรุ่งศิลป์",
                    "en": "KAJONRUNGSILP"
                },
                "birth": "13 Dec 2003",
                "height": "150",
                "province": "Bankok",
                "like": "my melody",
                "hobby":"ฟังเพลง",
                "avatar": {
                    "name": "456.jpeg",
                    "path": "uploads/456.jpeg",
                    "size": "20117"
                },
                "gen": "1",
                "blood": "A",
                "nickName": "SATCHAN"
            }
        }
    },
    methods: {

        selectImg(event, index){

            this.uploadImg.push(event.target.files[0])

            // preview image
            if(event.target.files[0]){

                var reader = new FileReader();

                reader.readAsDataURL(event.target.files[0]);
                reader.onload = function(e) {
                    console.log('onload reader ------')
                    document.getElementById(`preview[${index}]`).src = e.target.result;
                }
                
            }

            console.log('uploadImg => ', this.uploadImg)
        },
        uploadFile(){
            
            const _this = this
            let formData = new FormData();

            for (var i=0; i < this.uploadImg.length; i++) {
                console.log(this.uploadImg[i])
                var f = this.uploadImg[i];
                formData.append(`file[${i}]`, f, f.name);
            }

            // pass body to req
            formData.append(`profile`, JSON.stringify(this.profile));

            console.log(formData)

            axios.post( 'http://localhost:3100/api/member/add',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            ).then(function(respon){
                console.log('respon data =>', respon.data);
                _this.files = ['']
                _this.uploadImg = []
            })
            .catch(function(err){
                console.log('FAILURE!!', err);
            });
        }

    }
}
</script>

<style scoped>
    .mian_member {
        width: 60%;
        height: auto;
        margin: 0 auto;
        background-color: #fff;
    }

    .from {
        width: 100%;
        height: auto;
        border-top: 1px solid #000;
        background-color: #fff;
        padding: 3em;
        margin-bottom: 1em;
    }

    .from label {
        padding: 1em 0;
        display: block;
    }

    .from .input {
        width: 100%;
        min-height: 34px;
        padding: 6px 8px;
        font-size: 16px;
        line-height: 20px;
        color: #24292e;
        border: 1px solid #d1d5da;
        border-radius: 3px;
        outline: none;
    }

    .btn {
        display: block;
        margin-top: 20px;
    }

    .btn .right {
        float: right;
    }

    .save {
        font-size: 16px;
        color: #fff;
        background-color: #28a745;
        border-color: #28a745;
        border: 1px solid transparent;
        padding: .375rem .75rem;
        border-radius: 3px;
    }

    .cancel {
        font-size: 16px;
        color: #fff;
        background-color: #bd2130;
        border-color: #bd2130;
        border: 1px solid transparent;
        padding: .375rem .75rem;
        border-radius: 3px;
    }

    .img_upload img {
        display: block;
        margin: 0 auto; 
        width: 30%;
        height: auto;
    }

    .btn_upload label {
        display: block;
        margin: 0 auto;
    }

    .btn_upload input[type="file"] {
        display: none;
    }

    .btn_upload label{
        padding: 10px;
        background: #0095ff; 
        display: table;
        color: #fff;
        margin-top: 10px;
     }

     .input_img {
         border: 1px dashed #0095ff;
         padding: 1em 0;
     }

</style>
