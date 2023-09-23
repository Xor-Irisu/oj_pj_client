
<template>
  <div class="MainPage">
    <OJHeader />
    <PassageBox onPassage=1 :CreateMode=true></PassageBox>
  </div>
</template>
<style scoped>
.MainPage {
  margin-left: 5%;
  margin-right: 5%;
  background: #F4F5F7;
  height: auto;
  padding-bottom: 100px;
}
</style>
<script>
import OJHeader from '@/components/OJHeader.vue'
import MarkDownBox from '@/components/Markdown.vue'
import global from '@/components/VueCommon.vue';
import PassageBox from '@/components/PassageBox.vue';
import axios from 'axios'
export default {
  name: 'CreatePassageView',
  mounted: function () {

  },
  components: {
    OJHeader,
    MarkDownBox,
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
      server_url: global.serverUrl
    }
  }
  , watch: {

  }
}
</script>
