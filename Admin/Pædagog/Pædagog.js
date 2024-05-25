new Vue({
    el: '#app',
    data: {
        API_URL: 'http://localhost:5191/api/Users',
        tableTitle: 'Pædagoge Sektion',
        tableData: [],
        currentSection: 'pædagog',
        user_Id: 0
    },
    methods: {
        loadTableData() {
            const url = this.API_URL;
            console.log('Loading data from URL:', url);
            axios.get(url)
                .then(response => {
                    console.log('Data loaded:', response.data);
                    // Filtrerer kun brugere med userType = Pædagoge
                    this.tableData = response.data.filter(user => user.usertype === 2); // Brug det korrekte attributnavn her
                })
                .catch(error => {
                    console.error('Fejl ved indlæsning af data:', error);
                });
        },
        viewUserDetails(user_Id) {
            if (user_Id != null) {
                console.log('Navigating to GetById.html for user with ID:', user_Id);
                window.location.href = `GetById.html?id=${user_Id}`;
            } else {
                console.error('Ugyldigt bruger-ID.');
            }
        },
        editItem(id) {
            console.log('Received user ID:', id);
            if (id) {
                window.location.href = `updateuser.html?id=${id}`;
            } else {
                console.error('Ugyldigt bruger-ID.');
            }
        },
        deleteItem(id) {
            const url = `${this.API_URL}/${id}`;
            console.log('Deleting user with ID:', id, 'URL:', url);
            axios.delete(url)
                .then(response => {
                    console.log('Bruger slettet:', response.data);
                    this.loadTableData();
                })
                .catch(error => {
                    console.error('Fejl ved sletning af bruger:', error);
                });
        },
        userTypeToString(userType) {
            switch (userType) {
                case 0:
                    return 'Super_Admin';
                case 1:
                    return 'Admin';
                case 2:
                    return 'Pædagoge';
                case 3:
                    return 'Forældre';
                default:
                    return 'Ukendt';
            }
        },goBack(){
            window.location.href=`../admin.html`
        }
    },
    mounted() {
        this.loadTableData();
    }
});
