<template>
    <div class="MainPage">
        <OJHeader/>
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
</style>
<script>
  import OJHeader from '@/components/OJHeader.vue'
  import MarkDownBox from '@/components/Markdown.vue'
  import global from '@/components/VueCommon.vue';
  import axios from 'axios'
  export default {
  name: 'TestView',
    mounted: function () {
      
    },
    components: {
      OJHeader,
      MarkDownBox
    },
    methods: {
        example_function: function () {
        }
    },
    computed: {

    },
    data() {
        return {
            server_url:global.serverUrl
        }
    }
    , watch: {
        
    }
  }
</script>
