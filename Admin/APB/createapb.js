new Vue({
    el: '#app',
    data: {
        API_URL: 'http://localhost:5191/api/Users',
        STUDENT_API_URL: 'http://localhost:5191/api/Student',
        TEACHER_RELATION_API_URL: 'http://localhost:5191/api/TeacherRelation',
        newRelation: {
            departmentId: null,
            userId: null,
            studentId: null
        },
        departments: [],
        teachers: [],
        students: []
    },
    methods: {
        createRelation() {
            // Opret en relation mellem en lærer og en afdeling
            axios.post(this.TEACHER_RELATION_API_URL, {
                userId: this.newRelation.userId,
                departmentId: this.newRelation.departmentId
            })
            .then(teacherRelationResponse => {
                console.log('Relation mellem lærer og afdeling oprettet:', teacherRelationResponse.data);
        
                // Hvis der er valgt en student, skal vi opdatere department for den student
                if (this.newRelation.studentId) {
                    axios.put(`${this.STUDENT_API_URL}/${this.newRelation.studentId}`, {
                        departmentId: this.newRelation.departmentId
                    })
                    .then(studentResponse => {
                        console.log('Afdeling opdateret for studenten:', studentResponse.data);
                        window.location.href = '../APB/apb.html'; // Gå tilbage til hovedsiden eller en anden passende side
                    })
                    .catch(studentError => {
                        console.error('Fejl ved opdatering af afdeling for studenten:', studentError);
                    });
                } else {
                    window.location.href = '../APB/apb.html'; // Gå tilbage til hovedsiden eller en anden passende side
                }
            })
            .catch(teacherRelationError => {
                console.error('Fejl ved oprettelse af relation mellem lærer og afdeling:', teacherRelationError);
            });
        },
        
        fetchDepartments() {
            axios.get('http://localhost:5191/api/Department')
                .then(response => {
                    this.departments = response.data;
                })
                .catch(error => {
                    console.error("Fejl ved hentning af afdelinger:", error);
                });
        },
        fetchTeachers() {
            axios.get(this.API_URL)
                .then(response => {
                    this.teachers = response.data.filter(user => user.usertype === 2);
                })
                .catch(error => {
                    console.error("Fejl ved hentning af pædagoger:", error);
                });
        },
        fetchStudents() {
            axios.get(this.STUDENT_API_URL)
                .then(response => {
                    this.students = response.data;
                })
                .catch(error => {
                    console.error("Fejl ved hentning af studerende:", error);
                });
        }
    },
    mounted() {
        this.fetchDepartments();
        this.fetchTeachers();
        this.fetchStudents();
    }
});
