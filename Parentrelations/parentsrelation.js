new Vue({
    el: '#app',
    data: {
        PARENTS_RELATION_API_URL: 'http://localhost:5191/api/ParentRelations',
        tableTitle: 'Forældre- og Studerenderelationer',
        currentSection: 'ParentsRelation',
        parentRelations: [] // Tilføjet til at gemme forældrerelationer
    },
    methods: {
        loadParentRelations() {
            axios.get(this.PARENTS_RELATION_API_URL)
                .then(response => {
                    this.parentRelations = response.data;
                })
                .catch(error => {
                    console.error('Fejl ved indlæsning af forældre relationer:', error);
                });
        },
        createParentRelation() {
            window.location.href = '../Parentrelations/createParentRelations.html';
        },
        viewParentRelationDetails(id) {
            const url = `${this.PARENTS_RELATION_API_URL}/${id}`;
            axios.get(url)
                .then(response => {
                    console.log('Forældre relation hentet:', response.data);
                    window.location.href = `../Parentrelations/showRelationInfo.html?id=${id}`;
                })
                .catch(error => {
                    console.error('Fejl ved hentning af forældre relation:', error);
                });
        },
        editParentRelation(id) {
            console.log('Received parent relation ID:', id); 
            if (id) {
                window.location.href = `../Parentrelations/editParentRelation.html?id=${id}`;
            } else {
                console.error('Ugyldigt forældre-relation-ID.');
            }
        },
        deleteParentRelation(id) {
            const url = `${this.PARENTS_RELATION_API_URL}/${id}`; 
            console.log('Sletning af forældre relation med ID:', id, 'URL:', url); 
            axios.delete(url)
                .then(response => {
                    console.log('Forældre relation slettet:', response.data);
                    this.loadParentRelations(); // Opdater forældrerelationer efter sletning
                })
                .catch(error => {
                    console.error('Fejl ved sletning af forældre relation:', error);
                });
        }
    },
    mounted() {
        this.loadParentRelations(); // Indlæs forældrerelationer ved montering af komponenten
    }
});
