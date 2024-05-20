new Vue({
    el: '#app',
    data: {
        API_URL: 'http://localhost:5191/api/Users',
        tableTitle: 'Bruger Sektion',
        tableData: [], 
        id : 0
    },
    methods: {
        loadTableData() {
            const url = `${this.API_URL}`;
            console.log('Loading data from URL:', url); // Debug log
            axios.get(url)
                .then(response => {
                    console.log('Data loaded:', response.data); // Debug log
                    this.tableData = response.data;
                })
                .catch(error => {
                    console.error('Fejl ved indlæsning af data:', error);
                });
        },
        createUser() {
            // Naviger til opret bruger siden
            window.location.href = 'createUser.html';
        },
        viewDetails(id) {
            const url = `${this.API_URL}/${id}`;
            console.log('Viewing details for user with ID:', id, 'URL:', url); // Debug log
            axios.get(url)
                .then(response => {
                    console.log('Bruger detaljer:', response.data);
                    // Vis brugeroplysningerne i en modal eller et nyt vindue
                    // Her vises oplysningerne som en simpel alert-besked, men du kan ændre dette til at passe til din brugergrænseflade
                    alert(`Bruger detaljer:\nID: ${response.data.User_Id}\nNavn: ${response.data.Name}\nType: ${response.data.Usertype}\nAdresse: ${response.data.Address}\nEmail: ${response.data.E_mail}\nMobilnummer: ${response.data.Mobil_nr}`);
                })
                .catch(error => {
                    console.error('Fejl ved hentning af bruger detaljer:', error);
                });
        },
        editItem(id) {
            console.log('Received user ID:', id); // Tilføjet konsollogning
            if (id) {
                // Naviger til updateuser.html med brugerens ID som parameter
                window.location.href = `updateuser.html?id=${id}`;
            } else {
                console.error('Ugyldigt bruger-ID.');
            }
        },
        
        
        
        deleteItem(id) {
            const url = `${this.API_URL}/${id}`;
            console.log('Deleting user with ID:', id, 'URL:', url); // Debug log
            axios.delete(url)
                .then(response => {
                    console.log('Bruger slettet:', response.data);
                    this.loadTableData(); // Opdatér tabeldata efter sletning
                })
                .catch(error => {
                    console.error('Fejl ved sletning af bruger:', error);
                });
        }        
    },
    mounted() {
        this.loadTableData(); // Indlæs brugerdata som standard
    }
});
