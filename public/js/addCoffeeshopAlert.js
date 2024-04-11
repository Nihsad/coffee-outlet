'use strict'

// Fetch all the forms we want to apply custom Bootstrap validation styles to
const forms = document.querySelectorAll('.needs-validation')

// Loop over them and prevent submission
Array.from(forms).forEach(form => {
  form.addEventListener('submit', async event => {
    console.log('submit form');
    if (!form.checkValidity()) {
      console.log('Form is invalid'); // Log when the form is invalid
      event.preventDefault()
      event.stopPropagation()
      form.classList.add('was-validated'); // Add the 'was-validated' class to show valid/invalid styles
    } else {
      console.log('Form is valid'); // Log when the form is valid
      const name = document.getElementById('coffeeShopName').value.trim();
      const picture = document.getElementById('coffeeShopPicture');
      console.log(picture.files[0]); // This will log the selected file to the console
      const address = document.getElementById('coffeeShopAddress').value.trim();
      const phone_number = document.getElementById('coffeeShopPhoneNumber').value.trim();
      const city = document.getElementById('coffeeShopCity').value;
      const price_range = document.getElementById('coffeeShopPriceRange').value;
      const drinksElement = document.querySelector('input[name="coffeeShopDrinks"]:checked');
      const drinks = drinksElement ? drinksElement.value === 'true' : false;
      const foodElement = document.querySelector('input[name="coffeeShopSnacks"]:checked');
      const food = foodElement ? foodElement.value === 'true' : false;
      const latitude = document.getElementById('coffeeShopLatitude').value.trim();
      const longitude = document.getElementById('coffeeShopLongitude').value.trim();
      const website = document.getElementById('coffeeShopWebsite').value.trim();
      const wifiElement = document.querySelector('input[name="coffeeShopWifi"]:checked');
      const wifi = wifiElement ? wifiElement.value === 'true' : false;

      event.preventDefault(); // Prevent the default form submission

      const formData = new FormData();
      formData.append('name', name);
      formData.append('coffeeShopPicture', picture.files[0]);
      formData.append('address', address);
      formData.append('phone_number', phone_number);
      formData.append('city', city);
      formData.append('price_range', price_range);
      formData.append('drinks', drinks);
      formData.append('food', food);
      formData.append('latitude', latitude);
      formData.append('longitude', longitude);
      formData.append('website', website);
      formData.append('wifi', wifi);
      
        const response = await fetch('/api/coffeeshops/addCoffeeshop', {
          method: 'POST',
          body: formData,
          // headers: { 'Content-Type': 'application/json' },
        });
        console.log("Response status:", response.status);
        console.log('Response body:', await response.json()); // Log the body of the response

        if (response.ok) {
          console.log('Response is OK'); // Log when the response is OK
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Thank you for your submission.',
            text: 'Our team will review it shortly.',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
          }).then(() => {
            document.location.replace('/profile');
          });
        } else {
          console.log('Response is not OK'); // Log when the response is not OK
          console.log(response.statusText);
          console.log('Failed to add coffee shop.');
          form.reset(); // Clear the form
        }
      }
    }, false);
});
