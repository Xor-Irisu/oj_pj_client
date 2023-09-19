
<template>
  <div class="MainPage">
    <OJHeader />
    <div class="PassageList">
      <el-button type="primary" class="createbutton" @click="toCreate">创建文章</el-button>
      <ul>
        <li v-for="passage in Passages" :key="passage.pId" class="passageBox">
          <div class="passageBoxLeft" @click="toPassage(passage.pId)">
            {{ passage.pTitle }}
          </div>
          <div class="passageBoxRight">
            {{ passage.uId }}<br>{{ passage.pTime }}
          </div>
        </li>
      </ul>
      <el-pagination class="PageControl" :page-size="Page_Size" :pager-count="11" layout="prev, pager, next" :total="1000"
        :current-page="n_Page" @current-change="changePage" />
    </div>
  </div>
</template>
<style scoped>
.MainPage .PassageList .createbutton {
  margin-left: 40px;
  margin-top: 10px;
}

.MainPage .PassageList .passageBox {
  list-style: none;
  color: var(--el-text-color-primary);
  font-size: 16px;
  border: 1px solid var(--el-border-color);
  border-radius: 10px;
  width: 90%;
  margin-top: 10px;
  padding: 0px;
  padding-left: 20px;
  padding-top: 5px;
  height: 26px;
  background: #FFFFFF;
  padding-bottom: 5px;
}

.MainPage .PassageList .passageBoxLeft {
  display: block;
  font-size: 16px;
  padding-right: 0px;
  float: left;
  margin-top: 3px;
  text-overflow: ellipsis;
}

.MainPage .PassageList .passageBoxRight {
  margin-top: 0px;
  display: block;
  float: right;
  font-size: 3px;
  width: 130px;

}

.MainPage .PassageList {
  color: var(--el-text-color-primary);
  font-size: 16px;
  border: 1px solid var(--el-border-color);
  border-radius: 10px;
  margin-left: 1%;
  width: 68%;
  margin-top: 10px;
  padding: 0px;
  padding-right: 20px;
  padding-top: 5px;
  background: #FFFFFF;
  padding-bottom: 10px;
}

.MainPage .PageControl {
  margin-left: 30px;
}

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
import axios from 'axios'
export default {
  name: 'PassagesView',
  mounted: function () {
    var that = this
    var url = this.server_url
    var formData = new URLSearchParams();
    axios.post(url + '/passages/count')                             //放数据的接口
      .then(function (response) {                         //收到的数据
        console.log(response);                    //response就是返回数据
        that.pCount = response.data.pCount
      })
      .catch(function (error) {
        console.log(error);
      });
    this.changePage(1);
  },
  components: {
    OJHeader,
    MarkDownBox
  },
  methods: {
    example_function: function () {
    },
    toCreate: function () {
      this.$router.push(`/CreatePassage`)
    },
    changePage: function (value) {
      this.n_Page = value
      var l = (value - 1) * 10
      var cnt = this.Page_Size
      var that = this
      var url = this.server_url
      var formData = new URLSearchParams();
      formData.append('l', l);
      formData.append('cnt', cnt)
      axios.post(url + '/passages/passages', formData)                             //放数据的接口
        .then(function (response) {                         //收到的数据
          console.log(response);                    //response就是返回数据
          that.Passages = response.data
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    toPassage(value) {
      this.$router.push(`/passage?pId=${value}`)
    }
  },
  computed: {

  },
  data() {
    return {
      server_url: global.serverUrl,
      pCount: 0,
      n_Page: 0,
      Page_Size: 10,
      Passages: {}
    }
  }
  , watch: {
  }
}
</script>
