document.addEventListener('DOMContentLoaded', function() {
    const tableSection = document.getElementById('table-section');
    const tableTitle = document.getElementById('table-title');
    const dataTable = document.getElementById('data-table').getElementsByTagName('tbody')[0];

    // Event listeners for navigation links
    document.getElementById('user-link').addEventListener('click', function() {
        loadTableData('bruger');
    });
    document.getElementById('student-link').addEventListener('click', function() {
        loadTableData('studerende');
    });
    document.getElementById('institution-link').addEventListener('click', function() {
        loadTableData('institution');
    });

    // Function to load table data
    function loadTableData(type) {
        tableTitle.textContent = `${type.charAt(0).toUpperCase() + type.slice(1)} Sektion`;
        // Fetch data from the API
        fetch(`/api/${type}`)
            .then(response => response.json())
            .then(data => {
                // Clear existing table data
                dataTable.innerHTML = '';
                // Populate table with new data
                data.forEach(item => {
                    const row = dataTable.insertRow();
                    row.innerHTML = `
                        <td>${item.id}</td>
                        <td>${item.navn}</td>
                        <td>${item.type}</td>
                        <td>
                            <button class="btn btn-info btn-sm"><i class="fas fa-info-circle"></i></button>
                            <button class="btn btn-warning btn-sm"><i class="fas fa-edit"></i></button>
                            <button class="btn btn-danger btn-sm"><i class="fas fa-trash-alt"></i></button>
                            <button class="btn btn-secondary btn-sm"><i class="fas fa-eye"></i></button>
                        </td>
                    `;
                });
            })
            .catch(error => console.error('Fejl ved indlæsning af data:', error));
    }

    // Load user data by default on page load
    loadTableData('bruger');
});
