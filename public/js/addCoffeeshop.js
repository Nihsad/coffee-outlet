const addCoffeeShopHandler = async (event) => {
    console.log('addCoffeeShopHandler called!');
    event.preventDefault();

    const name = document.getElementById('coffeeShopName').value.trim();
    /*const picture = document.getElementById('coffeeShopPicture');*/
    const address = document.getElementById('coffeeShopAddress').value.trim();
    const phone_number = document.getElementById('coffeeShopPhoneNumber').value.trim();
    const city = document.getElementById('coffeeShopCity').value;
    const price_range = document.getElementById('coffeeShopPriceRange').value;
    const drinks = document.getElementById('coffeeShopDrinks').checked;
    const food = document.getElementById('coffeeShopSnack').checked;
    const latitude = document.getElementById('coffeeShopLatitude').value.trim();
    const longitude = document.getElementById('coffeeShopLongitude').value.trim();
    const website = document.getElementById('coffeeShopWebsite').value.trim();
    const wifi = document.getElementById('coffeeShopWifi').checked;

    if (name && address && phone_number && city && price_range && latitude && longitude && website) {
        const response = await fetch('/api/coffeeshops/addCoffeeshop', {
            method: 'POST',
            body: JSON.stringify({ name, address, phone_number, city, price_range, drinks, food, latitude, longitude, website, wifi }),
            headers: { 'Content-Type': 'application/json' },
        });
        console.log(response);

        if (response.ok) {
            document.location.replace('/profile');
        } else {
            alert(response.statusText);
            alert('Failed to add coffee shop.');
        }
    }
};

document
    .querySelector('.coffeeShopForm')
    .addEventListener('submit', addCoffeeShopHandler);