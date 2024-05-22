document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('create-student-form');
    const goBackButton = document.getElementById('go-back-btn');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const lastName = document.getElementById('last_name').value;
        const birthday = document.getElementById('birthday').value;

        const studentData = {
            name: name,
            last_name: lastName,
            birthday: birthday
        };

        createStudent(studentData);
    });

    goBackButton.addEventListener('click', function () {
        // Gå tilbage til admin-siden
        window.location.href = 'admin.html';
    });

    function createStudent(studentData) {
        const url = 'http://localhost:5191/api/Student';
        axios.post(url, studentData)
            .then(response => {
                console.log('Student oprettet:', response.data);
                // Gå tilbage til admin-siden efter oprettelse
                window.location.href = 'admin.html';
            })
            .catch(error => {
                console.error('Fejl ved oprettelse af student:', error);
            });
    }
});
