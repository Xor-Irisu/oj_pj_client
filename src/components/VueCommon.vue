<script type="text/javascript">
    // 定义一些公共的属性和方法
    const httpUrl = 'localhost:8080'
    const serverUrl = 'http://127.0.0.1:3000'
    function clear_info() {
        localStorage.removeItem('uId')
        localStorage.removeItem('uId_token')
    }
    // 暴露出这些属性和方法
    export default {
        httpUrl,
        serverUrl,
        clear_info
    }
</script>