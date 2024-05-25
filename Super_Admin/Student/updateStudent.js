new Vue({
    el: '#app',
    data: {
        STUDENT_API_URL: 'http://localhost:5191/api/Student',
        studentId: null,
        updatedStudent: {
            Id: null,
            Name: '',
            Last_name: '',
            Birthday: '',
            Department_id: null
        },
        errorLoadingDetails: false
    },
    methods: {
        getStudentIdFromUrl() {
            const params = new URLSearchParams(window.location.search);
            const studentId = params.get('id');
            return studentId;
        },

        getStudentDetails() {
            this.studentId = this.getStudentIdFromUrl();
            if (!this.studentId) {
                console.error("No student ID provided.");
                alert('No student ID provided.');
                this.goBack();
                return;
            }

            const url = `${this.STUDENT_API_URL}/${this.studentId}`;
            axios.get(url)
                .then(response => {
                    console.log(response.data); 
                    this.updatedStudent = response.data;
                })
                .catch(error => {
                    console.error('Error loading student details:', error);
                    alert('There was an error loading student details.');
                    this.errorLoadingDetails = true;
                });
        },

        updateStudent() {
            if (!this.updatedStudent.Name || !this.updatedStudent.Last_name || !this.updatedStudent.Birthday || this.updatedStudent.Department_id == null) {
                alert("Please fill out all fields.");
                return;
            }

            axios.put(`${this.STUDENT_API_URL}/${this.studentId}`, this.updatedStudent)
                .then(response => {
                    console.log('Student updated:', response.data);
                    alert('Student updated successfully.');
                    this.goBack();
                })
                .catch(error => {
                    console.error('Error updating student:', error);
                    alert('There was an error updating the student.');
                });
        },

        goBack() {
            window.history.back();
        }
    },
    mounted() {
        console.log('Component mounted')
        this.getStudentDetails();
    }
});