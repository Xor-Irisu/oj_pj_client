
<template>
    <div class="MainPage">
        <OJHeader/>
        <PassageBox :pId="pId" onPassage=1></PassageBox>
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
  import MarkdownBox from '@/components/Markdown.vue'
import global from '@/components/VueCommon.vue';
import PassageBox from '@/components/PassageBox.vue';
  import axios from 'axios'
  export default {
    name: 'PassageView',
    components: {
      OJHeader,
    MarkdownBox,
      PassageBox
    },
    mounted: function () {
        var query = this.$route.query;
        this.pId=query.pId
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
            EditMode: false,
            pId: 0,
        }
    }
    , watch: {
        '$route.query.pId'() {
            location.reload();
        }
    }
  }
</script>
