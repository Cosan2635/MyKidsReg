new Vue({
    el: '#app',
    data: {
        ADMIN_RELATION_API_URL: 'http://localhost:5191/api/AdminRelations',
        tableTitle: 'Admin Relations',
        currentSection: 'AdminRelation',
        adminRelations: [], // To store admin relations data
        tableData: [] // To store table data
    },
    methods: {
        loadAdminRelations() {
            axios.get(this.ADMIN_RELATION_API_URL)
                .then(response => {
                    this.adminRelations = response.data;
                    this.tableData = response.data; 
                })
                .catch(error => {
                    console.error('Error loading admin relations:', error);
                });
        },
        // Define other methods as needed
    },
    mounted() {
        this.loadAdminRelations(); 
    }
});
