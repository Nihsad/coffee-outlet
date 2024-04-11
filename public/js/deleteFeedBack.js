const deleteFeedBackHandler = async (event) => {
    event.preventDefault();

    const id = event.target.getAttribute('data-id');
    
    if(id) {
        const response = await fetch(`/api/feedbacks/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        });

        console.log(response);

        if(response.ok) {
            document.location.replace(`/api/coffeeshops/`);
        } else {
            alert('Failed to delete feedback');
            console.log("NO FUNCIONÓ")
        }
    }
};

document.querySelectorAll('.deleteFeedbackBtn').forEach(button => {
    button.addEventListener('click', deleteFeedBackHandler);
})