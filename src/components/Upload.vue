<template>
    <div>
        <!-- <input type="file" name="file" @change="uploadFn" id="file"> -->
        <div class="input"
            v-for="(file, index) in files" 
            :key="index" :name="`file[${index}]`">
            <input 
                type="file" id="file" 
                ref="file" 
                v-on:change="selectImg($event, index)"/>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSRIClFu3SxX37I0PdX79m6SpETlfgKcOHIXpHA7539vDIlDeS" 
                :id="`preview[${index}]`" 
                width="100" 
                height="100" >
        </div>
        <input type="button" value="add" @click="addInput">
        <input type="submit" value="upload" @click="uploadFile">
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: '',
    data () {
        return {
            uploadImg: [],
            files: [''],
            countInput: 1
        }
    },
    methods: {
        addInput(){
            this.files.push('')
        },
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
        changPro(event){
            this.profile = event.target.files[0]
        },
        uploadFile(){
            
            let formData = new FormData();
            // formData.append('file', this.fiuploadImgle);

            for (var i=0; i < this.uploadImg.length; i++) {
                console.log(this.uploadImg[i])
                var f = this.uploadImg[i];
                formData.append(`file[${i}]`, f, f.name);
            }

            // formData.append('profile', this.profile, this.profile.name)
            // formData.append('name', this.file.name)
            // formData.append('size', this.file.size)
            // formData.append('type', this.file.type)

            console.log(formData)


            // fd.append('file', this.uploadImg)
            // console.log(formData)

            // axios.post( 'http://localhost:3200/upload',
            axios.post( 'http://localhost:3100/api/member/add',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            ).then(function(respon){
                console.log(respon.data);
                this.file = []
                this.uploadImg = []
            })
            .catch(function(){
                console.log('FAILURE!!');
            });


            // POST /someUrl
            // this.$http.post('http://localhost:3200/ggg', formData, { headers: { 'Content-Type' : 'multipart/form-data'}}
                
            // ).then(response => {

            //     console.log('respon => ', response)

            // }, response => {
            //     // error callback
            //     console.log('error => ', response)
            // });


            // this.$http
            //     .get('http://localhost:3200/')
            //     .then( (data) => {
            //         console.log('ggg =>', data)
            //         // this.quote = data.data
            //     })
            //     .catch((err) => console.log('error => ', err.data))



        }
    }
}
</script>

<style scoped>

</style>