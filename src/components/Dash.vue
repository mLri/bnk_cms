<template>
    <div id="dashboard">
        <div class="dash">

            <h1>Dashboard</h1>

            <div class="dash_item">
                <div class="item" @click="goto('MemberShow')">
                    <div class="logo_item">
                        <img 
                            src="https://cdn.icon-icons.com/icons2/1155/PNG/512/1486564730-gears-cogs_81537.png" 
                            alt="">
                    </div>
                    Member Management
                </div>
                <div class="item">
                    <div class="logo_item">
                        <img 
                            src="https://cdn.icon-icons.com/icons2/1155/PNG/512/1486564730-gears-cogs_81537.png" 
                            alt="">
                    </div>
                    ??? Management
                </div>
                <div class="item">
                    <div class="logo_item">
                        <img 
                            src="https://cdn.icon-icons.com/icons2/1155/PNG/512/1486564730-gears-cogs_81537.png" 
                            alt="">
                    </div>
                    ??? Management
                </div>
                <div class="item">
                    <div class="logo_item">
                        <img 
                            src="https://cdn.icon-icons.com/icons2/1155/PNG/512/1486564730-gears-cogs_81537.png" 
                            alt="">
                    </div>
                    ??? Management
                </div>
                <div class="item">
                    <div class="logo_item">
                        <img 
                            src="https://cdn.icon-icons.com/icons2/1155/PNG/512/1486564730-gears-cogs_81537.png" 
                            alt="">
                    </div>
                    ??? Management
                </div>
                <div class="item">
                    <div class="logo_item">
                        <img 
                            src="https://cdn.icon-icons.com/icons2/1155/PNG/512/1486564730-gears-cogs_81537.png" 
                            alt="">
                    </div>
                    ??? Management
                </div>
                <div class="item">
                    <div class="logo_item">
                        <img 
                            src="https://cdn.icon-icons.com/icons2/1155/PNG/512/1486564730-gears-cogs_81537.png" 
                            alt="">
                    </div>
                    ??? Management
                </div>
                <div class="item">
                    <div class="logo_item">
                        <img 
                            src="https://cdn.icon-icons.com/icons2/1155/PNG/512/1486564730-gears-cogs_81537.png" 
                            alt="">
                    </div>
                    ??? Management
                </div>
            </div>
        </div>
        
    </div>
</template>

<script>
export default {
    data(){
        return {

        }
    },
    methods: {
        goto(name){
            this.$router.push({ name: name } )
        }
    }
}
</script>

<style scoped>

    .dash {
        width: 90%;
        margin: 0 auto;
    }

    .dash_item {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        grid-column-gap: 1em;
        grid-row-gap: 1em;
    }

    .item {
        width: 100%;
        height: auto;
        border: 1px solid #000;
        padding: 3em;
        background-color: #fff;
        text-align: center;
    }
    
    .item:hover {
        background-color: #BFBFBF;
        cursor: pointer;
    }

    .logo_item  {
        width: 25%;
        height: auto;
        margin: 0 auto;
    }

    .logo_item img {
        width: 100%;
        height: auto;
        margin-bottom: 5px;
    }
</style>
