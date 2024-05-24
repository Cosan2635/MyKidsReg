new Vue({
    el: '#app',
    data: {
        API_URL: 'http://localhost:5191/api/Users',
        STUDENT_API_URL: 'http://localhost:5191/api/Student',
        PARENTS_RELATION_API_URL: 'http://localhost:5191/api/ParentRelations',
        users: [],
        students: [],
        parentRelation: {
            user_id: null,
            student_id: null
        }
    },
    methods: {
        loadUsers() {
            axios.get(this.API_URL)
                .then(response => {
                    this.users = response.data;
                })
                .catch(error => {
                    console.error('Fejl ved hentning af brugere:', error);
                });
        },
        loadStudents() {
            axios.get(this.STUDENT_API_URL)
                .then(response => {
                    this.students = response.data;
                })
                .catch(error => {
                    console.error('Fejl ved hentning af studerende:', error);
                });
        },
        createParentRelation() {
            axios.post(this.PARENTS_RELATION_API_URL, this.parentRelation)
                .then(response => {
                    console.log('Forældrerelation oprettet:', response.data);
                    window.location.href = '../Parentrelations/parentrelation.html'; // Tilbage til hovedsiden eller en anden passende side
                })
                .catch(error => {
                    console.error('Fejl ved oprettelse af forældrerelation:', error);
                });
        },
        goBack() {
            window.history.back();
        }
    },
    mounted() {
        this.loadUsers();
        this.loadStudents();
    }
});
