new Vue({
    el: '#app',
    data: {
        API_URL: 'http://localhost:5191/api/Users',
        tableTitle: 'Bruger Sektion',
        tableData: []
    },
    methods: {
        loadTableData(type) {
            this.tableTitle = `${type.charAt(0).toUpperCase() + type.slice(1)} Sektion`;
            axios.get(`${this.API_URL}/${type}`)
                .then(response => {
                    this.tableData = response.data;
                })
                .catch(error => {
                    console.error('Fejl ved indlæsning af data:', error);
                });
        },
        createUser() {
            // Naviger til opret bruger siden
            window.location.href = 'createuser.html';
        },
        viewDetails(id) {
            // Hent detaljer for en specifik bruger
            axios.get(`${this.API_URL}/bruger/${id}`)
                .then(response => {
                    console.log('Bruger detaljer:', response.data);
                    // Du kan vise detaljer i en modal eller et nyt vindue
                    alert(`Bruger detaljer:\nID: ${response.data.id}\nNavn: ${response.data.navn}\nType: ${response.data.type}`);
                })
                .catch(error => {
                    console.error('Fejl ved hentning af bruger detaljer:', error);
                });
        },
        editItem(id) {
            // Rediger en specifik bruger
            axios.put(`${this.API_URL}/bruger/${id}`, {
                navn: 'Opdateret Navn', // Eksempel data
                type: 'Opdateret Type'  // Eksempel data
            })
            .then(response => {
                console.log('Bruger opdateret:', response.data);
                this.loadTableData('bruger'); // Opdatér tabeldata efter redigering
            })
            .catch(error => {
                console.error('Fejl ved opdatering af bruger:', error);
            });
        },
        deleteItem(id) {
            // Slet en specifik bruger
            axios.delete(`${this.API_URL}/bruger/${id}`)
                .then(response => {
                    console.log('Bruger slettet:', response.data);
                    this.loadTableData('bruger'); // Opdatér tabeldata efter sletning
                })
                .catch(error => {
                    console.error('Fejl ved sletning af bruger:', error);
                });
        }
    },
    mounted() {
        this.loadTableData('bruger'); // Indlæs brugerdata som standard
    }
});
