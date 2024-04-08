// const { text } = require("express");

document.getElementById('coffeeShopForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent the form from submitting normally
  
    // Your SweetAlert2 code here
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Thank you for your submission.',
      text: 'Our team will review it shortly.',
      showConfirmButton: true,
      timer: 3000
    });
  
      e.target.reset(); // Clear the form
    // If you want to submit the form via JavaScript after the alert, you can do so here
    // e.target.submit();
  });