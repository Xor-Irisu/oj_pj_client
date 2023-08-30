
<template>
    <markdown :source="text"></markdown>
</template>
<script>
import VueMarkdown from 'vue-markdown'
  export default {
    name: 'Markdown',
    components: {
    },
    methods: {
        example_function: function () {
        }
    },
    computed: {

    },
    data() {
        return {
            text:
                '> # aaa' +
                '>bbb'
        }
    }
    , watch: {
        
    }
  }
</script>
