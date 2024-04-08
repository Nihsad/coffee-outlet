document.getElementById('coffeeShopForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent the form from submitting normally
  
    // Your SweetAlert2 code here
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Your form has been submitted! Our team will review it shortly.',
      showConfirmButton: false,
      timer: 2000
    });
  
    // If you want to submit the form via JavaScript after the alert, you can do so here
    // e.target.submit();
  });