// Opret komponenterne
const BrugerComponent = {
    template: `
      <div>
        <h1>Bruger Sektion</h1>
        <!-- Indhold for bruger sektionen -->
      </div>
    `
  };
  
  const InstitutionComponent = {
    template: `
      <div>
        <h1>Institution Sektion</h1>
        <!-- Indhold for institution sektionen -->
      </div>
    `
  };
  
  // Opret routeren
  const router = new VueRouter({
    routes: [
      { path: '/bruger', component: BrugerComponent },
      { path: '/institution', component: InstitutionComponent }
    ]
  });
  

new Vue({
    el: '#app',
    router,
    data: {
        API_URL: 'https://mykidsreg20240529121704.azurewebsites.net/api/Users',
       
        INSTITUTION_API_URL: 'http://localhost:5191/api/Institution',
       
        tableTitle: 'Bruger Sektion',
        tableData: [],
        institutions: [],
      
        currentSection: 'bruger',
        user_Id: 0,
        institution: {
            id: null,
            name: '',
            address: '',
            zip_Code: null,
            tlf_Number: null
        },
        parentRelation: { 
            id: null,
            user_id: null,
            student_id: null
        }
    },
    methods: {
        loadTableData(entityType) {
            this.currentSection = entityType;
            if (entityType === 'institution') {
                this.loadInstitutions();
                this.tableTitle = 'Institution Sektion';
                return;
            } else if (entityType === 'ParentsRelation') {
                this.loadParentsRelations();
                return;
            } else {
                this.tableTitle = 'Bruger Sektion';
            }

            const url = `${this.API_URL}`;
            console.log('Loading data from URL:', url); 
            axios.get(url)
                .then(response => {
                    console.log('Data loaded:', response.data); 
                    this.tableData = response.data;
                })
                .catch(error => {
                    console.error('Fejl ved indlæsning af data:', error);
                });
        },
        loadInstitutions() {
            axios.get(this.INSTITUTION_API_URL)
                .then(response => {
                    this.institutions = response.data;
                })
                .catch(error => {
                    console.error('Fejl ved hentning af institutioner:', error);
                });
        },
        

        createUser() {
            window.location.href = '../User/createUser.html';
        },
        createInstitution() {
            window.location.href = 'createInstitution.html';
        },
        viewUserDetails(user_Id) {
            if (user_Id != null) {
                console.log('Navigating to GetById.html for user with ID:', user_Id); 
                window.location.href = `../User/GetById.html?id=${user_Id}`;
            } else {
                console.error('Ugyldigt bruger-ID.');
            }
        },
        viewInstitutionDetails(instId) {
            if (instId != null) {
                console.log('Navigating to showInstitutionsInfo.html for institution with ID:', instId);
                window.location.href = `../Institution/showInstitutionsInfo.html?id=${instId}`;
            } else {
                console.error('Ugyldigt institutions-ID.');
            }
        },
        editItem(id) {
            console.log('Received user ID:', id);
            if (id) {
                window.location.href = '../User/updateuser.html?id=' + id;
            } else {
                console.error('Ugyldigt bruger-ID.');
            }
        },
                
        editInstitution(inst) {
            this.institution = { ...inst };
            window.location.href = `../Institution/editInstitution.html?id=${inst.id}`;
        },
        createParentRelation() {
            window.location.href = '../Parentrelations/createParentRelations.html';
        },
        viewParentRelationDetails(id) {
            const url = `${this.PARENTS_RELATION_API_URL}/${id}`;
            axios.get(url)
                .then(response => {
                    console.log('Forældre relation hentet:', response.data);
                    window.location.href = `../Parentrelations/showRelationInfo.html?id=${id}`;
                })
                .catch(error => {
                    console.error('Fejl ved hentning af forældre relation:', error);
                });
        },
        editParentRelation(id) {
            console.log('Received parent relation ID:', id); 
            if (id) {
                window.location.href = `../Parentrelations/editParentRelation.html?id=${id}`;
            } else {
                console.error('Ugyldigt forældre-relation-ID.');
            }
        },
        deleteItem(id) {
            const url = `${this.API_URL}/${id}`;
            console.log('Deleting user with ID:', id, 'URL:', url); 
            axios.delete(url)
                .then(response => {
                    console.log('Bruger slettet:', response.data);
                    this.loadTableData('bruger'); 
                })
                .catch(error => {
                    console.error('Fejl ved sletning af bruger:', error);
                });
        },
        deleteInstitution(id) {
            const url = `${this.INSTITUTION_API_URL}/${id}`;
            console.log('Deleting institution with ID:', id, 'URL:', url); 
            axios.delete(url)
                .then(response => {
                    console.log('Institution slettet:', response.data);
                    this.loadTableData('institution'); 
                })
                .catch(error => {
                    console.error('Fejl ved sletning af institution:', error);
                });
        },
        deleteParentRelation(id) {
            const url = `${this.PARENTS_RELATION_API_URL}/${id}`; 
            console.log('Sletning af forældre relation med ID:', id, 'URL:', url); 
            axios.delete(url)
                .then(response => {
                    console.log('Forældre relation slettet:', response.data);
                    this.loadTableData('ParentsRelation'); 
                })
                .catch(error => {
                    console.error('Fejl ved sletning af forældre relation:', error);
                });
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
        navigateToAdminRelation() {
            this.currentSection = 'AdminRelation';
            this.loadAdminRelations(); // Load admin relations data
        },
        logout() {
            // Implementer logud-logik her
            // For eksempel, hvis du vil navigere til index.html, kan du bruge window.location.href
            window.location.href = "../Login/index.html";
        }
    },
    
    mounted() {
        this.loadTableData('bruger'); 
    }
});
