new Vue({
    el: '#app',
    data: {
        PARENTS_RELATION_API_URL: 'http://localhost:5191/api/ParentRelations',
        tableTitle: 'Forældre- og Studerenderelationer',
        currentSection: 'ParentsRelation',
        parentRelations: [], // Tilføjet til at gemme forældrerelationer
        tableData: [] // Define tableData property
    },
    methods: {
        loadParentRelationById(id) {
            const url = `${this.PARENTS_RELATION_API_URL}/${id}`;
            axios.get(url)
                .then(response => {
                    console.log('Forældre relation hentet:', response.data);
                    // Handle the response data as needed
                })
                .catch(error => {
                    console.error('Fejl ved hentning af forældre relation:', error);
                });
        },
        goBack() {
            window.history.back();
        },
        // Define other methods as needed
    },
    mounted() {
        this.loadParentRelations(); 
    }
});
