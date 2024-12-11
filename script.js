document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const usernameField = document.getElementById('username');
    const emailField = document.getElementById('email');
    const passwordField = document.getElementById('password');

    const usernameError = document.getElementById('usernameError');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');

    if (localStorage.getItem('authToken')) {
        window.location.href = '/home';
    }

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        let valid = true;

        if (usernameField.value !== 'emilys') {
            usernameError.textContent = "Username must be 'emilys'.";
            valid = false;
        } else {
            usernameError.textContent = '';
        }

        
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(emailField.value)) {
            emailError.textContent = "Please enter a valid email address.";
            valid = false;
        } else {
            emailError.textContent = '';
        }

        if (passwordField.value.length < 8) {
            passwordError.textContent = "Password must be at least 8 characters.";
            valid = false;
        } else {
            passwordError.textContent = '';
        }

        if (!valid) return;

        const loginData = {
            username: 'emilys', 
            password: passwordField.value,
            email: emailField.value, 
            expiresInMins: 30 
        };

        fetch('https://dummyjson.com/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);  
            if (data.token) {
                localStorage.setItem('authToken', data.token);
                localStorage.setItem('userData', JSON.stringify(data.user));
                window.location.href = 'home.html';
            } else {
                alert('Invalid credentials.');
            }
        })
        .catch(err => {
            console.error('Login failed', err);
        });
    });


    document.getElementById('googleLogin').addEventListener('click', () => {
        alert('Google login feature not implemented.');
    });

    document.getElementById('facebookLogin').addEventListener('click', () => {
        alert('Facebook login feature not implemented.');
    });
});
