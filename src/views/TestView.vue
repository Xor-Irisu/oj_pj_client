
<template>
    <div class="MainPage">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css">
        <Header/>
        <el-button type="primary" @click="example_function">Primary</el-button>
        <el-text>{{ text }}</el-text><br/>
        <textarea v-model="markdown"></textarea>
        <div v-html="text2"></div>
    </div>
</template>
<style>
    .MainPage{
        margin-top:20px;
        margin-left:5%;
        margin-right:5%;
    }
</style>

<script>
//e
import axios from 'axios'
import MarkdownIt from "markdown-it"
import MarkdownItLatex from "markdown-it-latex"
import MarkdownItKatex from "markdown-it-katex"
import MarkdownItSup from "markdown-it-sup"
import 'markdown-it-latex/dist/index.css'
const markdown = new MarkdownIt().use(MarkdownItKatex).use(MarkdownItSup)
import Header from '@/components/OJHeader.vue'
import { marked } from "marked";
  export default {
    name: 'TestView',

    components: {
        Header,
    },
    methods: {
        example_function: function () {
            var that=this
            axios.post(that.server_url+'/init/init_database')                             //放数据的接口
            .then(function (response) {                         //收到的数据
                console.log(response);                    //response就是返回数据
                that.text=response.data
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    },
    computed: {
        html() {
            return marked(this.text2)
        }
    },
    data() {
        return {
            text: "nothing",
            server_url: "http://127.0.0.1:3000",
            text2: markdown.render("# 这锅都齐了\n## 怎么还不吃^啊^ \nThis is a ~~tql~~ r^4^ **Markdown** editor. $\\sqrt{3x-1} \\leq (1+x)^2$  $wcnm$^emo^"),
            markdown: "# Hello World\n\nThis is a **Markdown** editor.",
            html:""
        }
    }
    , watch: {
        markdown(value) {
        this.html = marked(value);
    }
    }
  }
</script>
