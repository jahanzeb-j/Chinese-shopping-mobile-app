<template>
    <div class="write_card_info">
        <div>
            填写卡信息
        </div>
        <mt-button size="normal" @click="next">下一步</mt-button>
    </div>
</template>

<style scoped>

</style>

<script>
    export default{
        name: 'write_card_info',
        mounted(){

        },
        methods: {
            next(){
                window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'write_person_info';
            }
        }
    }
</script>
