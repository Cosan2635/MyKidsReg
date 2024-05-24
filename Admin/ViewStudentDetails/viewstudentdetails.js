new Vue({
    el: '#app',
    data: {
        selectedStudent: {}
    },
    methods: {
        goBack() {
            window.history.back();
        },
        fetchStudentDetails(studentId) {
            const url = `http://localhost:5191/api/Student/${studentId}`;
            axios.get(url)
                .then(response => {
                    this.selectedStudent = response.data;
                })
                .catch(error => {
                    console.error('Fejl ved hentning af studentoplysninger:', error);
                });
        }
    },
    mounted() {
        const urlParams = new URLSearchParams(window.location.search);
        const studentId = urlParams.get('id');
        if (studentId) {
            this.fetchStudentDetails(studentId);
        }
    }
});
