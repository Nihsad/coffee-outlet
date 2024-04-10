const updateFormHandler = async (event) => {
    event.preventDefault(); 

    const description = document.querySelector('#feedbackDescription').value.trim();
    const id = document.querySelector('#feedback-id').value.trim();
    const coffeeShopId = document.querySelector('#cofeeshop-id').value.trim();
    if(description) {
        const response = await fetch(`/api/feedbacks/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ description }),
            headers: { 'Content-Type': 'application/json' },
        });

        if(response.ok) {
            document.location.replace(`/api/coffeeshops/${coffeeShopId}`);
        } else {
            alert('Failed to update feedback');
        }
    }
};

document.querySelector('.update-form').addEventListener('submit', updateFormHandler);