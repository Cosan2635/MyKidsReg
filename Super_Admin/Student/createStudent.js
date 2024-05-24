new Vue({
    el: '#app',
    data: {
        STUDENT_API_URL: 'http://localhost:5191/api/Student',
        DEPARTMENT_API_URL: 'http://localhost:5191/api/Department',
        newStudent: {
            Name: '',
            Last_name: '',
            Birthday: '',
           // Department_id: null
        },
        departments: []
    },
    methods: {
        loadDepartments() {
            axios.get(this.DEPARTMENT_API_URL)
                .then(response => {
                    this.departments = response.data;
                })
                .catch(error => {
                    console.error('Error loading departments:', error);
                });
        },
        createStudent() {
            axios.post(this.STUDENT_API_URL, this.newStudent)
                .then(response => {
                    console.log('Student created:', response.data);
                    // Redirect to the main student list page
                    window.location.href = 'student.html';
                })
                .catch(error => {
                    console.error('Error creating student:', error);
                });
        },
        goBack()
        {
window.history.back();
        }
    },
    mounted() {
        this.loadDepartments();
    }
});
