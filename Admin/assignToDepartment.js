new Vue({
    el: '#app',
    data: {
        studentId: null,
        departmentId: ''
    },
    methods: {
        assignStudentToDepartment() {
            const assignmentData = {
                studentId: this.studentId,
                departmentId: this.departmentId
            };

            const url = `http://localhost:5191/api/Student/assignToDepartment`;
            axios.post(url, assignmentData)
                .then(response => {
                    console.log('Student tildelt til afdeling:', response.data);
                    window.location.href = 'admin.html';
                })
                .catch(error => {
                    console.error('Fejl ved tildeling af student til afdeling:', error);
                });
        },
        goBack() {
            window.location.href = 'admin.html';
        }
    },
    mounted() {
        const urlParams = new URLSearchParams(window.location.search);
        this.studentId = urlParams.get('id');
    }
});
