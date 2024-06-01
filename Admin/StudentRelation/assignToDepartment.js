new Vue({
    el: '#app',
    data: {
        studentId: null,
        departmentId: '',
        departments: []
    },
    methods: {
        assignStudentToDepartment() {
            const assignmentData = {
                studentId: this.studentId,
                departmentId: this.departmentId
            };

            const url = `http://localhost:5191/api/Student`;
            axios.post(url, assignmentData)
                .then(response => {
                    console.log('Student tildelt til afdeling:', response.data);
                    window.location.href = '../admin.html';
                })
                .catch(error => {
                    console.error('Fejl ved tildeling af student til afdeling:', error);
                });
        },
        goBack() {
            window.location.href = '../admin.html';
        },
        fetchDepartments() {
            // Hent afdelinger
            axios.get('http://localhost:5191/api/Department')
                .then(response => {
                    this.departments = response.data;
                })
                .catch(error => {
                    console.error('Fejl ved hentning af afdelinger:', error);
                });
        }
    },
    mounted() {
        const urlParams = new URLSearchParams(window.location.search);
        this.studentId = urlParams.get('id');
        this.fetchDepartments();
    }
});
