
<template>
    {{ server_url }}
</template>
<script>

  import axios from 'axios'
  export default {
    name: 'LoginView',
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
            server_url:"http://127.0.0.1:3000"
        }
    }
    , watch: {
        
    }
  }
</script>
