const signupFormHandler = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if (username && email && password) {
        const response = await fetch('/api/users/', {
        method: 'POST',
        body: JSON.stringify({ username, email, password }),
        headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            const emailResponse = await fetch('/send-signup-email', {
                method: 'POST',
                body: JSON.stringify({ email }),
                headers: { 'Content-Type': 'application/json' },
                });
                if (emailResponse.ok) {
                    console.log('Email sent successfully');
                  } else {
                    console.error('Error sending email');
                  }
            
                  document.location.replace('/');
                } else {
                  alert(response.statusText);
                }
    }
};
  

document
.querySelector('.signup-form').addEventListener('submit', signupFormHandler);

// const labels = document.querySelectorAll('.form-group-login label');
//     labels.forEach(label => {
//         label.innerHTML = label.innerText
//             .split('')
//             .map((letter, idx) => `<span style="transition-delay:${idx * 50}ms">${letter}</span>`)
//             .join('')
//     });