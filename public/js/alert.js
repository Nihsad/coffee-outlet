'use strict'

// Fetch all the forms we want to apply custom Bootstrap validation styles to
const forms = document.querySelectorAll('.needs-validation')

// Loop over them and prevent submission
Array.from(forms).forEach(form => {
  form.addEventListener('submit', event => {
    if (!form.checkValidity()) {
      event.preventDefault()
      event.stopPropagation()
    } else {
      // If the form is valid, show the alert
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Thank you for your submission.',
        text: 'Our team will review it shortly.',
        showConfirmButton: true,
        timer: 3000
      });

      event.preventDefault(); // Prevent the form from submitting normally
      form.reset(); // Clear the form
    }

    form.classList.add('was-validated')
  }, false)
})