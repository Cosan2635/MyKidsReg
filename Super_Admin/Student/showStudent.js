new Vue({
    el: '#app',
    data: {
        STUDENT_API_URL: 'http://localhost:5191/api/Student',
        student: null,
    },
    methods: {
        getStudentIdFromUrl() {
            const params = new URLSearchParams(window.location.search);
            return params.get('id');
        },
        
        getStudentDetails() {
            const studentId = this.getStudentIdFromUrl();
            console.log("Fetching details for student ID:", studentId);
            if (studentId) {
                const url = `${this.STUDENT_API_URL}/${studentId}`;
                console.log("Loading student details from URL:", url);
                axios.get(url)
                    .then(response => {
                        console.log("Student details fetched:", response.data);
                        this.student = response.data;
                    })
                    .catch(error => {
                        console.error('Error loading student details:', error);
                        alert('There was an error loading student details.');
                    });
            } else {
                alert('No student ID provided.');
                this.goBack();
            }
        },
        goBack() {
            window.history.back();
        }
    },
    mounted() {
        console.log("Component mounted. Fetching student details...");
        this.getStudentDetails();
    }
});
