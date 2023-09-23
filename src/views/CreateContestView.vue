<template>
<div class="MainPage">
    <OJHeader/>
    <div class="ContestBox">
        <div class="Title2">比赛名称</div>
        <div class="mdBox">
            <el-input v-model="cName"></el-input>
        </div>
        <div class="Title2">比赛简介</div>
        <div class="mdBox">
            <el-input v-model="cBrief"></el-input>
        </div>
        <div class="Title2">比赛题目</div>
        <div style="text-align: center">
        <el-transfer v-model="rightValueColumn"  :props="{key:'pId',label:'pName'}" 
        filterable :filter-method="search_id" filter-placeholder="请输入题目编号"
        style="text-align: left; display: inline-block"  target-order="push"
            @right-check-change="choose" :titles="['可选题目', '比赛题目']"
            :button-texts="['移除比赛', '加入比赛']" :format="{
                noChecked: '${total}',
                hasChecked: '${checked}/${total}',
            }" :data="problems" >
            <template #right-footer>
                <el-button class="transfer-footer" size="small" @click="moveUp"><el-icon>
                        <CaretTop />
                    </el-icon></el-button>
                <el-button class="transfer-footer" size="small" @click="moveDown"><el-icon>
                        <CaretBottom />
                    </el-icon></el-button>
            </template>
        </el-transfer>
        </div>

        <div class="Title2">比赛开始时间</div>
        <div class="mdBox">
            <el-date-picker v-model="cBeginTime" type="datetime" placeholder="请选择开始时间"></el-date-picker>
        </div>
        <div class="Title2">比赛结束时间</div>
        <div class="mdBox">
            <el-date-picker v-model="cEndTime" type="datetime" placeholder="请选择结束时间"></el-date-picker>
        </div>
        <div class="Title2">比赛密码</div>
        <div class="mdBox">
            <el-input v-model="cPw"></el-input>
        </div>
        <br><br>
        <el-button type="success" @click="create_function">创建比赛</el-button>
    </div>
</div>
</template>
<script>
    import OJHeader from '@/components/OJHeader.vue'
    import MarkDownBox from '@/components/Markdown.vue'
    import global from '@/components/VueCommon.vue';
    import axios from 'axios'
    export default {
        name:'CreateContest',
        components:{
            OJHeader,
            MarkDownBox
        },
        data(){
            return {
                server_url: global.serverUrl,
                cName: "",
                cBrief: "",
                cBeginTime: "",
                cEndTime: "",
                cPw: "",
                problems:[],
                rightValue:[],
                rightValueColumn:[],
            }
        },
        created(){
            var that=this
            axios.post(that.server_url+'/contest/problem')
                .then(function(response){
                    that.problems=response.data;;
                })
                .catch(function(error){
                    console.log(error);
                });           
        },
        methods:{
            create_function: function(){
                if(this.cBeginTime==""||this.cName==""||this.cBrief==""||this.cEndTime=="")alert("信息不全");
                else{var that=this 
                axios.post(that.server_url+'/contest/createcontest',
                {cName:this.cName,
                 cBrief:this.cBrief,
                 cProblem:this.rightValueColumn,
                 cBeginTime:this.cBeginTime,
                 cEndTime:this.cEndTime
                })
                .then(function(response){
                    console.log(response);
                    alert("创建成功");
                    that.$router.back();
                })
                .catch(function(error){
                    alert("失败");
                    console.log(error);
                    that.$router.push({
                        path:'/contest'
                    })
                });
                }
            },
            choose(value){
                this.rightValue=value;
            },
            moveUp(){
                if(Array.isArray(this.rightValue) &&Array.isArray(this.rightValueColumn) &&this.rightValue.length == 1){
                    let index=this.rightValueColumn.indexOf(this.rightValue[0]);
                    if(index==0){
                        window.alert('无法再上移了');
                        return;
                    }
                    let change_index=index-1;
                    let change_item=this.rightValueColumn[change_index];
                    this.rightValueColumn.splice(change_index,1,this.rightValue[0]);
                    this.rightValueColumn.splice(index,1,change_item);
                    return;
                }
                else {
                    window.alert('只能且必须选中一项要移动的列')
                }
            },
            moveDown(){
                let index=0;
                if(Array.isArray(this.rightValue) &&Array.isArray(this.rightValueColumn) &&this.rightValue.length == 1){
                    index=this.rightValueColumn.indexOf(this.rightValue[0]);
                    if(index==this.rightValueColumn.length-1){
                        window.alert('无法再下移了');
                        return;
                    }
                    let change_index=index+1;
                    let change_item=this.rightValueColumn[change_index];
                    this.rightValueColumn.splice(change_index,1,this.rightValue[0]);
                    this.rightValueColumn.splice(index,1,change_item);
                }
                else {
                    window.alert('只能且必须选中一项要移动的列')
                }
            },
            search_id(inputvalue,option){
                if(inputvalue=="")return true;
                const id=option.pId;
                return inputvalue==id;
            }
        }
    }
</script>
<style scoped>
.mdBox {
    margin-left: 20px;
    padding-left: 10px;
    border-left: 5px solid var(--el-border-color);
}
.Title2 {
    margin-left: 10px;
    font-weight: bold;
    font-size: 30px;
    margin-top: 20px;
}

.ContestBox {
    display: inline-block;
    color: var(--el-text-color-primary);
    font-size: 16px;
    border: 1px solid var(--el-border-color);
    border-radius: 10px;
    margin-left: 0;
    width: 68%;
    padding: 0px;
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 5px;
    background: #FFFFFF;
    padding-bottom: 100px;
}

.MainPage {
    margin-left: 5%;
    margin-right: 5%;
    background: #F4F5F7;
    height: auto;
    padding-bottom: 100px;
}
</style>