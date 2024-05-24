new Vue({
    el: '#app',
    data: {
        PARENTS_RELATION_API_URL: 'http://localhost:5191/api/ParentRelations',
        STUDENT_API_URL: 'http://localhost:5191/api/Student',
        USER_API_URL: 'http://localhost:5191/api/Users',
        parentRelation: {
            id: null,
            student_id: null,
            user_id: null
        },
        users: [],
        students: [],
        formTitle: 'Rediger Forældrerelation',
        dataLoaded: false // Til at spore om data er blevet indlæst
    },
    methods: {
        loadUsers() {
            axios.get(this.USER_API_URL)
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
        loadParentRelation() {
            const urlParams = new URLSearchParams(window.location.search);
            const id = urlParams.get('id');
            if (id) {
                axios.get(`${this.PARENTS_RELATION_API_URL}/${id}`)
                    .then(response => {
                        this.parentRelation = response.data;
                        // Indlæs brugere og studerende, når forældrerelationen er hentet
                        this.loadUsers();
                        this.loadStudents();
                    })
                    .catch(error => {
                        console.error('Fejl ved hentning af forældre relation:', error);
                    })
                    .finally(() => {
                        this.dataLoaded = true; // Indikerer at data er blevet indlæst
                    });
            } else {
                console.error('Ingen ID fundet i URL.');
            }
        },
        
        updateParentRelation() {
            axios.put(`${this.PARENTS_RELATION_API_URL}/${this.parentRelation.id}`, this.parentRelation)
                .then(response => {
                    console.log('Forældre relation opdateret:', response.data);
                    window.location.href = '../Parentrelations/parentrelation.html'; // Redirect efter opdatering
                })
                .catch(error => {
                    console.error('Fejl ved opdatering af forældre relation:', error);
                });
        },
        cancelEdit() {
            window.location.href = '../Parentrelations/parentrelation.html';
        }
    },
    mounted() {
        this.loadUsers();
        this.loadStudents();
        this.loadParentRelation();
    }
});
