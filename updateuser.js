document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('update-user-form');
    const userId = new URLSearchParams(window.location.search).get('id'); // Få bruger ID fra URL'en

    // Hent brugerdata og udfyld formularen
    if (userId) {
        axios.get(`https://mykidsreg20240518001356.azurewebsites.net/api/bruger/${userId}`)
            .then(response => {
                const user = response.data;
                form.user_id.value = user.id;
                form.username.value = user.username;
                form.name.value = user.name;
                form.last_name.value = user.last_name;
                form.address.value = user.address;
                form.zip_code.value = user.zip_code;
                form.email.value = user.email;
                form.tlf_nr.value = user.tlf_nr;
                form.user_type.value = user.user_type;
            })
            .catch(error => {
                console.error('Fejl ved hentning af brugerdata:', error);
                alert('Kunne ikke hente brugerdata. Prøv igen.');
            });
    }

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const userData = {
            username: form.username.value,
            name: form.name.value,
            last_name: form.last_name.value,
            address: form.address.value,
            zip_code: form.zip_code.value,
            email: form.email.value,
            tlf_nr: form.tlf_nr.value,
            user_type: form.user_type.value
        };

        axios.put(`https://mykidsreg20240518001356.azurewebsites.net/api/bruger/${userId}`, userData)
            .then(response => {
                alert('Bruger opdateret succesfuldt!');
                window.location.href = 'superadmin.html';
            })
            .catch(error => {
                console.error('Fejl ved opdatering af bruger:', error);
                alert('Der opstod en fejl. Prøv igen.');
            });
    });
});
