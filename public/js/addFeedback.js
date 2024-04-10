const newFeedbackHandler = async (event) => {
    event.preventDefault();

    const form = event.target;
    const coffeeshopId = form.dataset.coffeeshopId;
    const description = document.querySelector('#newFeedback').value.trim();
    
    if (description !== '') {
        const response = await fetch(`/api/feedbacks/${coffeeshopId}`, {
            method: 'POST',
            body: JSON.stringify({ description }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace(`/api/coffeeshops/${coffeeshopId}`);
        } else {
            alert('Failed to add feedback');
        }
    }
};

document.querySelector('.feedback-form').addEventListener('submit', newFeedbackHandler);