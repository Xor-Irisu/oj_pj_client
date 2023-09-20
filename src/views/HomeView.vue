<template>
    <div class="MainPage">
        <OJHeader/>
        <ul>
            <li v-for="passage in TopPassages" :key=passage.pId>
              <PassageBox :pId="passage.pId"></PassageBox>
            </li>
        </ul>
    </div>
</template>
<style scoped>
    .MainPage{
        margin-left:5%;
        margin-right:5%;
        background:#F4F5F7;
        height:auto;
        padding-bottom:100px;
    }
    .MainPage li{
      list-style:none;
    }
</style>
<script>
  import OJHeader from '@/components/OJHeader.vue'
import MarkdownBox from '@/components/Markdown.vue'
import PassageBox from '@/components/PassageBox.vue';
  import global from '@/components/VueCommon.vue';
import axios from 'axios'
  
  export default {
  name: 'HomeView',
    mounted: function () {
      var that=this
      var url = this.server_url
      axios.post(url+'/passages/TopPassage')                             //放数据的接口
      .then(function (response) {                         //收到的数据
          console.log(response);                    //response就是返回数据
        that.TopPassages = response.data;   
      })
      .catch(function (error) {
          console.log(error);
      });
    },
    components: {
      OJHeader,
      MarkdownBox,
      PassageBox
    },
    methods: {
        example_function: function () {
        }
    },
    computed: {

    },
    data() {
      return {
        server_url: global.serverUrl,
        TopPassages:{}
      }
    }
    , watch: {
        
    }
  }
</script>
