<template>
    <div class="bone">
        <div class="context_part">

            <div :class="inner_class_item(item.role)"  v-for="(item,index) in myDataStore.LLMAssistantData" :key="item.content" >
                <a class="context_icon" :title="icon_tips[item.role]" :href="icon_link[item.role]" target="_blank">
                    {{ icon_list[item.role] }}
                </a>
                <div :class="inner_class_box(item.role)">{{ item.content }}</div>

            </div>

            <div class="item_loading" v-loading="true" v-show="is_item_loading" element-loading-background="rgba(0,0,0,0)"></div>

        </div>

        <div class="input_box">
            <textarea class="input_part" @keydown="sent_input" @keyup="judge_clear" placeholder="请输入..."
             v-model="message"></textarea>

             <div class="enter_btn" @click="click_enter_btn" title="发射">&#xe970;</div>
        </div>
        
    </div>
</template>

<script setup>
    import { onMounted,onUnmounted,ref, watch,onBeforeUnmount,computed,  nextTick  } from 'vue';
    import { MyDataStore } from '@/stores';

    const myDataStore = MyDataStore();
    const message = ref('')
    const judge_shift=ref(false)
    const icon_list={
        'user':'',
        'assistant':''
    }
    const icon_tips={
        'user':'user',
        'assistant':'品客'
    }
    const icon_link={
        'user':'https://console.xfyun.cn/services/cbm',
        'assistant':'https://image.baidu.com/search/index?tn=baiduimage&ps=1&ct=201326592&lm=-1&cl=2&nc=1&ie=utf-8&dyTabStr=MCwzLDEsMiw0LDUsNiw3LDgsOQ%3D%3D&word=%E5%93%81%E5%AE%A2'
    }

    const is_item_loading = ref(false)

    const click_enter_btn=()=>{
        const textarea = document.querySelector('.input_part');

        let eventd = new KeyboardEvent('keydown', {
            key: 'Enter',
            keyCode: 13
        });

        let eventu = new KeyboardEvent('keyup', {
            key: 'Enter',
            keyCode: 13  
        });

        textarea.dispatchEvent(eventd);
        textarea.dispatchEvent(eventu);

    }


    const render=async (temp_question)=>{
        if(!(temp_question.trim().length === 0)){
            // console.log(temp_question)
            
            await myDataStore.addUserMessage(temp_question)
            
            

            is_item_loading.value = true
            //等待dom更新完
            nextTick(async ()=>{
                const context_part = document.querySelector('.context_part');
                context_part.scrollTop = context_part.scrollHeight;

                await myDataStore.getLLMAssistant(temp_question)

                is_item_loading.value = false
                context_part.scrollTop = context_part.scrollHeight;
            })

            

        }
    }


    const sent_input= async (e)=>{

        if(e.keyCode === 13 ){

            if(e.shiftKey){
                // console.log('shift+enter')
                judge_shift.value = true
                return
            }
            else{
                render(message.value)
                            
            }
        }
        
    }
    const judge_clear=(e)=>{
        if(e.keyCode === 13){
            if(judge_shift.value===false  ){
                message.value = ''
            }
            else{
                judge_shift.value = false
            }
        }
    }

    const inner_class_item=(item_t)=>{
        return {
            context_item: true,
            [item_t === 'user' ? 'user_item' : 'assistant_item']: true
        }  
    }
    const inner_class_box=(item_t)=>{
        return {
            context_box: true,
            [item_t === 'user' ? 'user_box' : 'assistant_box']: true
        }  
    }

    

    onMounted(()=>{
        let input_part = document.querySelector('.input_part');
        input_part.focus();

        // render('你好')

        const context_part = document.querySelector('.context_part');
        context_part.scrollTop = context_part.scrollHeight;

    })



</script>

<style lang="scss" scoped>
    .bone{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-direction: column;
        position: relative;
        padding: 10px 40px;
        
        
    }
    .context_part{
        width: 97%;
        height: 450px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-direction: column;
        position: relative;

        overflow-y: scroll;

        padding: 10px 25px 10px 10px;
        scroll-behavior: smooth;
    }
    .context_part::-webkit-scrollbar{
        width: 6px;
    }
    .context_part::-webkit-scrollbar-thumb {
        background: rgb(178, 180, 180);
        border-radius: 10px;
    }


    .context_item{
        width: 100%;

        display: flex;
        justify-content: center;
        align-items: flex-start;
        flex-direction: row;
        position: relative;
        
        margin: 10px 0;

        font-family: 'icomoon';
    }
    .assistant_item{
        justify-content: flex-start;
    }
    .user_item{
        justify-content: end;
        flex-direction: row-reverse;
    }

    .context_icon{
        font-size: 25px;
        margin: 3px 10px;
        font-family: 'icomoon';
        user-select: none;
        color: #000;
        text-decoration: none;

        animation: breath 2s linear infinite;
        
    }
    @keyframes breath{
        0%{
            text-shadow: 0px 0px 10px rgba(255, 255, 255, 0.4);
        }
        50%{
            text-shadow: 0px 0px 20px  rgba(63, 231, 246, 0.9);
            
        }
        100%{
            text-shadow: 0px 0px 10px rgba(255, 255, 255, 0.4);
        }
    }

    .context_box{
        max-width: 60%;
        
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-direction: row;

        position: relative;
        padding: 10px 12px 10px 12px;

        font-size: 16px;
        font-weight: 500;
        color: #000;
        line-height: 24px;
        
        border-radius: 11px;
        white-space: pre-line;
        word-wrap: break-word;
        word-break: break-all;
    }

    .assistant_box{
        background-color: #c2c1c1;
    }
    .user_box{
        color: rgb(255, 255, 255);
        background-color: rgba(64, 124, 205,0.9);
    }

    .input_box{
        width: 100%;
        
        margin-top: 20px;

        position: relative;
        bottom: 0;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        
        background-color: transparent;
        border: 1px solid #ffffff;
        border-radius: 35px;

        padding: 12px 70px 12px 20px;
    }

    .input_part{
        width: 100%;
        height: 23px;
        position: relative;
        bottom: 0;
        left: 0;
        background-color: transparent;
        overflow: auto;

        color: rgb(248, 249, 250);
        font-size: 20px;
        font-weight: 300;
        border: 0px solid transparent;

        line-height: 20px;

        font-family:MaoKenShiJinHei-2 ;

    }
    .enter_btn{
        font-size: 25px;
        color: #ffffff;
        font-family: 'icomoon';
        position: absolute;
        right: 20px;
        cursor: pointer;
        transition: all 0.3s linear;

        user-select: none;
    }
    .enter_btn:hover{
        text-shadow: 0px 0px 5px rgba(255, 255, 255, 0.7);
    }   

    textarea::-webkit-scrollbar {
        width: 6px;
    }

    textarea::-webkit-scrollbar-thumb {
        background: rgb(255, 255, 255);
        border-radius: 4px;
    }


    .item_loading{
        width: 100%;
        height: 50px;
        margin-top: 50px;
        background-color: transparent;
    }

</style>