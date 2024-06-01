new Vue({
    el: '#app',
    data: {
        API_URL: 'http://localhost:5191/api/Users',
        TEACHER_RELATION_API_URL: 'http://localhost:5191/api/TeacherRelation',
        newRelation: {
            departmentId: null,
            userId: null
        },
        departments: [],
        teachers: [],
        errorMessage: null
    },
    methods: {
        createRelation() {
            console.log('Nye relation:', this.newRelation);
        
            if (!this.newRelation.userId || !this.newRelation.departmentId) {
                this.errorMessage = 'Både afdeling og pædagog skal vælges.';
                console.log('Fejl: Både afdeling og pædagog skal vælges.');
                return;
            }
        
            console.log('Forsøger at oprette relation med data:', {
                User_id: this.newRelation.userId,
                Department_id: this.newRelation.departmentId
            });
        
            axios.post(this.TEACHER_RELATION_API_URL, {
                User_id: this.newRelation.userId,
                Department_id: this.newRelation.departmentId
            })
            .then(response => {
                console.log('Relation mellem lærer og afdeling oprettet:', response.data);
                window.location.href = '../APB/apb.html';
            })
            .catch(error => {
                console.error('Fejl ved oprettelse af relation mellem lærer og afdeling:', error.response);
                this.errorMessage = 'Der opstod en fejl ved oprettelsen af relationen. Prøv igen.';
            });
        },
        
        fetchDepartments() {
            axios.get('http://localhost:5191/api/Department')
                .then(response => {
                    this.departments = response.data;
                    console.log('Afdelinger hentet:', this.departments);
                })
                .catch(error => {
                    console.error("Fejl ved hentning af afdelinger:", error);
                });
        },

        fetchTeachers() {
            axios.get(this.API_URL)
                .then(response => {
                    this.teachers = response.data.filter(user => user.usertype === 2);
                    console.log('Pædagoger hentet:', this.teachers);
                })
                .catch(error => {
                    console.error("Fejl ved hentning af pædagoger:", error);
                });
        }
    },
    mounted() {
        this.fetchDepartments();
        this.fetchTeachers();
    }
});
