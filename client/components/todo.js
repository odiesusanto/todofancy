Vue.component('todo-list', {
    template: `
    <div class="container">
        <table class="table">
            <thead>
                <tr>
                    <th>Task</th>
                    <th>Status</th>
                    <th>Done By</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(todo, index) in todos" :key="index">
                    <td>
                    {{todo.task}}
                    </td>
                    <td>
                    {{todo.status}}
                    </td>
                    <td>
                    {{todo.doneBy}}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    `,
    props: ["todos"]
})