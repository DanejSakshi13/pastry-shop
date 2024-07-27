document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    form.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent form submission

        // Get form inputs
        const fname = document.getElementById('fname').value.trim();
        const address = document.getElementById('address').value.trim();
        const date = document.getElementById('date').value;
        const pastry = document.getElementById('pastry').value.trim();
        const online = document.getElementById('online').checked;
        const cod = document.getElementById('cod').checked;

        // Check if any field is empty
        if (!fname || !address || !date || pastry === '' || (!online && !cod)) {
            alert('Please fill in all fields and select options.');
            return; // Exit function if validation fails
        }

        // If all validation passes, submit the form data to the backend
        fetch('http://localhost:3000/submitOrder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                fname,
                address,
                date,
                pastry,
                paymentMethod: online ? 'online' : 'cod' // Assuming the payment method is determined by checkboxes
            })
        })
        .then(response => {
            if (response.ok) {
                return response.text();
            } else {
                throw new Error('Error saving order');
            }
        })
        .then(data => {
            alert(data); // Display success message from the backend
        })
        .catch(error => {
            console.error(error);
            alert('Error saving order');
        });
    });
});
