new Vue({
    el: '#app',
    data: {
        DEPARTMENT_API_URL: 'http://localhost:5191/api/Department',
        department: null
    },
    methods: {
        getDepartmentIdFromUrl() {
            const params = new URLSearchParams(window.location.search);
            return params.get('id');
        },
        getDepartmentDetails() {
            const departmentId = this.getDepartmentIdFromUrl();
            console.log("Fetching details for department ID:", departmentId);
            if (departmentId) {
                const departmentUrl = `${this.DEPARTMENT_API_URL}/${departmentId}`;
                axios.get(departmentUrl)
                    .then(response => {
                        console.log("Department details fetched:", response.data);
                        this.department = response.data;
                    })
                    .catch(error => {
                        console.error('Fejl ved hentning af afdelingsoplysninger:', error);
                        alert('Der opstod en fejl ved hentning af afdelingsoplysninger.');
                    });
            } else {
                alert('Ingen afdeling ID angivet.');
                this.goBack();
            }
        },
        goBack() {
            window.history.back();
        }
    },
    mounted() {
        console.log("Component mounted. Fetching department details...");
        this.getDepartmentDetails();
    }
});
