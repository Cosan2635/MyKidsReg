new Vue({
    el: '#app',
    data: {
        STUDENT_API_URL: 'http://localhost:5191/api/Student',
        DEPARTMENT_API_URL: 'http://localhost:5191/api/Department',
        students: [],
        departments: [],
        newStudent: {
            Name: '',
            Last_name: '',
            Birthday: '',
            Department_id: null
        },
        selectedStudentId: null,
        selectedStudent: null,
        updatedStudent: {
            Name: '',
            Last_name: '',
            Birthday: '',
            Department_id: null
        }
    },
    methods: {
        loadStudents() {
            axios.get(this.STUDENT_API_URL)
                .then(response => {
                    // Fjern Department_id fra hvert student-objekt
                    this.students = response.data.map(student => ({
                        Id: student.id,
                        Name: student.name,
                        Last_name: student.last_name,
                        Birthday: student.birthday
                    }));
                })
                .catch(error => {
                    console.error('Error loading students:', error);
                });
        },
        
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
            window.location.href = '../Student/createstudent.html';
        },
        
        deleteStudent(studentId) {
            axios.delete(`${this.STUDENT_API_URL}/${studentId}`)
                .then(response => {
                    console.log('Student deleted:', response.data);
                    this.students = this.students.filter(student => student.Id !== studentId);
                })
                .catch(error => {
                    console.error('Error deleting student:', error);
                });
        },
        resetForm() {
            this.newStudent = {
                Name: '',
                Last_name: '',
                Birthday: '',
                Department_id: null
            };
        },
        updateStudent() {
            if (!this.updatedStudent.Name || !this.updatedStudent.Last_name || !this.updatedStudent.Birthday || !this.updatedStudent.Department_id) {
                alert("Please fill out all fields.");
                return;
            }

            axios.put(`${this.STUDENT_API_URL}/${this.selectedStudentId}`, this.updatedStudent)
                .then(response => {
                    console.log('Student updated:', response.data);
                    // Find den opdaterede student i array'et og opdater den
                    const index = this.students.findIndex(student => student.Id === this.selectedStudentId);
                    if (index !== -1) {
                        this.students[index] = response.data;
                    }
                    // Nulstil formular og valgte student
                    this.resetForm();
                    this.selectedStudentId = null;
                    this.selectedStudent = null;
                })
                .catch(error => {
                    console.error('Error updating student:', error);
                });
        },
        getStudentById() {

            window.location.href = '../Student/showStudent.html'
            // if (!this.selectedStudentId) {
            //     alert("Please select a student.");
            //     return;
            // }

            // axios.get(`${this.STUDENT_API_URL}/${this.selectedStudentId}`)
            //     .then(response => {
            //         console.log('Student retrieved:', response.data);
            //         this.selectedStudent = response.data;
            //         // Udfyld opdateringsformularen med de oplysninger, der er hentet
            //         this.updatedStudent = {
            //             Name: this.selectedStudent.Name,
            //             Last_name: this.selectedStudent.Last_name,
            //             Birthday: this.selectedStudent.Birthday,
            //             Department_id: this.selectedStudent.Department_id
            //         };
            //     })
            //     .catch(error => {
            //         console.error('Error retrieving student:', error);
            //     });
        },
        goBack() {
            window.location.href='../superadmin.html';
        }
    },
    mounted() {
        this.loadStudents();
        this.loadDepartments();
    }
});
