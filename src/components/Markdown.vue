
<template>
    <div v-html="text" id="MarkBox"></div>
</template>
<style scoped>
  #MarkBox{
    margin:0px;
  }
</style>
<script>
  import MarkdownIt from "markdown-it"
  import MarkdownItLatex from "markdown-it-latex"
  import MarkdownItKatex from "markdown-it-katex"
  import MarkdownItSup from "markdown-it-sup"
  import 'markdown-it-latex/dist/index.css'
  const markdown = new MarkdownIt().use(MarkdownItKatex).use(MarkdownItSup)
  export default {
    name: 'Markdown',
    components: {
  },
    props: {
      msg:String
    },
    methods: {
        example_function: function () {
        }
    },
    computed: {
      text() {
        return markdown.render(this.msg)
      }
    },
    data() {
        return {
        }
    }
    , watch: {
        
    }
  }
</script>
