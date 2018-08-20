var app = new Vue({
    el: '#app',
    data: {
        todos: []
    },
    created() {
        this.showTasks()
    },
    methods: {
        showTasks() {
            let token = localStorage.getItem('token')
            
            axios.get('http://localhost:3000/todos',
            {
                headers: {
                    token: token
                }
            })
            .then(tasks => {
                console.log("---", tasks.data.data)
                this.todos = tasks.data.data
            })
            .catch(err => {
                console.log(err.message)
            })
        }
    }
})