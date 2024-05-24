new Vue({
    el: '#app',
    data: {
        departments: [],
        tableTitle: 'Afdelinger',
        currentSection: 'department'
    },
    methods: {
        loadTableData(section) {
            this.currentSection = section;
            if (section === 'department') {
                this.loadTable();
            }
        },
        loadTable() {
            axios.get('http://localhost:5191/api/Department')
                .then(response => {
                    this.departments = response.data;
                })
                .catch(error => {
                    console.error('Fejl ved hentning af afdelinger:', error);
                });
        },
        createDepartment() {
            window.location.href = 'createdepartment.html';
        },
        viewDepartmentDetails(id) {
            window.location.href = `viewdepartmentdetails.html?id=${id}`;
        },
        editDepartment(id) {
            window.location.href = `editdepartment.html?id=${id}`;
        },
        deleteDepartment(id) {
            // Add logic to delete department
        }
    },
    mounted() {
        this.loadTableData('department');
    }
});
