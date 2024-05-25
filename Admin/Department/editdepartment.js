new Vue({
    el: '#app',
    data: {
        API_URL: 'http://localhost:5191/api/Department',
        institutions: [],
        departmentData: {
            id: null,
            name: '',
            institution_Id: null
        }
    },
    mounted() {
        // Hent department ID fra URL
        const urlParams = new URLSearchParams(window.location.search);
        const departmentId = urlParams.get('id');
        
        if (departmentId) {
            this.loadDepartment(departmentId);
        }

        // Hent alle institutioner
        this.fetchInstitutions();
    },
    methods: {
        fetchInstitutions() {
            axios.get('http://localhost:5191/api/Institution')
                .then(response => {
                    this.institutions = response.data;
                })
                .catch(error => {
                    console.error('Fejl ved hentning af institutioner:', error);
                    alert('Der opstod en fejl ved hentning af institutioner.');
                });
        },
        loadDepartment(id) {
            axios.get(`${this.API_URL}/${id}`)
                .then(response => {
                    this.departmentData = response.data;
                })
                .catch(error => {
                    console.error('Fejl ved hentning af afdeling:', error);
                    alert('Der opstod en fejl ved hentning af afdeling.');
                });
        },
        updateDepartment() {
            axios.put(`${this.API_URL}/${this.departmentData.id}`, this.departmentData)
                .then(response => {
                    
                    window.location.href = '../Department/department.html';
                })
                .catch(error => {
                    console.error('Fejl ved opdatering af afdeling:', error);
                    alert('Der opstod en fejl ved opdatering af afdeling.');
                });
        },
        goBack() {
            window.location.href= `../Department/department.html`;
        }
    }
});
