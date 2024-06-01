new Vue({
    el: '#app',
    data: {
        API_URL: 'http://localhost:5191/api/Users',
        tableTitle: 'Student Afdeling Pædagog',
        relations: [],
        newRelation: {
            departmentId: null,
            userId: null,
            studentId: null
        },
        editRelation: null,
        departments: [],
        teachers: [],
        students: []
    },
    methods: {
        fetchRelations() {
            axios.get('http://localhost:5191/api/TeacherRelation')
                .then(response => {
                    console.log('Relations data:', response.data);
                    // Tilføj en logning for at kontrollere, om studentdataene er hentet korrekt
                    console.log('Students data:', this.students);
                    this.relations = response.data.map(rel => ({
                        id: rel.id,
                        departmentName: this.getDepartmentNameById(rel.department_id),
                        teacherName: this.getUserNameById(rel.user_id),
                        studentName: this.getStudentNameById(rel.student_id)
                    }));
                })
                .catch(error => {
                    console.error("There was an error fetching the relations!", error);
                });
        },
        
        fetchDepartments() {
            axios.get('http://localhost:5191/api/Department')
                .then(response => {
                    console.log('Departments data:', response.data);
                    this.departments = response.data;
                })
                .catch(error => {
                    console.error("There was an error fetching the departments!", error);
                });
        },
        fetchTeachers() {
            axios.get(this.API_URL)
                .then(response => {
                    console.log('Users data:', response.data);
                    this.teachers = response.data.filter(user => user.usertype === 2); // Bemærk korrekt brug af usertype
                })
                .catch(error => {
                    console.error("There was an error fetching the teachers!", error);
                });
        },
        fetchStudents() {
            axios.get('http://localhost:5191/api/Student')
                .then(response => {
                    console.log('Students data:', response.data);
                    this.students = response.data;
                })
                .catch(error => {
                    console.error("There was an error fetching the students!", error);
                });
        },
        getDepartmentNameById(id) {
            const department = this.departments.find(dep => dep.id === id);
            return department ? department.name : 'Ukendt';
        },
        getUserNameById(id) {
            const user = this.teachers.find(user => user.user_Id === id);
            return user ? user.name : 'Ukendt';
        },
        getStudentNameById(id) {
          
            const student = this.students.find(student => student.Id === id);
            return student ? student.name : 'Ukendt studerende';
        },
        createRelation() {
            window.location.href = `../APB/createapb.html`;
        },
        updateRelation(relation) {
            window.location.href=`../APB/editapb.html`
            // axios.put(`http://localhost:5191/api/TeacherRelation/${relation.id}`, relation)
            //     .then(response => {
            //         this.fetchRelations();
            //     })
            //     .catch(error => {
            //         console.error("There was an error updating the relation!", error);
            //     });
        },
        deleteRelation(relation) {
            axios.delete(`http://localhost:5191/api/TeacherRelation/${relation.id}`)
                .then(response => {
                    const index = this.relations.indexOf(relation);
                    this.relations.splice(index, 1);
                })
                .catch(error => {
                    console.error("There was an error deleting the relation!", error);
                });
        },
        resetNewRelation() {
            this.newRelation = {
                departmentId: null,
                userId: null,
                studentId: null
            };
        },
       
        userTypeToString(userType) {
            switch (userType) {
                case 0:
                    return 'Super_Admin';
                case 1:
                    return 'Admin';
                case 2:
                    return 'Pædagoge';
                case 3:
                    return 'Forældre';
                default:
                    return 'Ukendt';
            }
        },
        
    },
    mounted() {
        this.fetchRelations();
        this.fetchDepartments();
        this.fetchTeachers();
        this.fetchStudents();
    }
});