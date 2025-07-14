document.getElementById('show-signup').addEventListener('click', function() {
    document.getElementById('login-form-container').style.display = 'none';
    document.getElementById('signup-form-container').style.display = 'block';
});

document.getElementById('show-login').addEventListener('click', function() {
    document.getElementById('signup-form-container').style.display = 'none';
    document.getElementById('login-form-container').style.display = 'block';
});

// Login form
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('login-username').value;
    const registeredUser = localStorage.getItem('registeredUser');

    if (username === registeredUser) {
        // Save user as logged in
        localStorage.setItem('user', username);
        //alert('Welcome, ' + username + '! Redirecting to store...');
        window.location.href = "http://127.0.0.1:5500/Roomize_main.html"; // Redirect to store
    } else {
        alert('Login failed: No account found. Please sign up first.');
    }
});



// Sign-up form
document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('signup-username').value;

    // Save username to localStorage (simulate account creation)
    localStorage.setItem('registeredUser', username);

    alert('Signed up with username: ' + username);

    // Show login screen
    document.getElementById('signup-form-container').style.display = 'none';
    document.getElementById('login-form-container').style.display = 'block';
});

document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('signup-username').value;
    const picInput = document.getElementById('signup-pic');
    const reader = new FileReader();

    reader.onload = function () {
        // Save user info and pic in localStorage
        localStorage.setItem('user', username);
        localStorage.setItem('profilePic', reader.result); // base64 string

        alert('Signed up! Logging in...');
        window.location.href = "http://127.0.0.1:5500/Roomize_main.html"; // or your homepage
    };

    if (picInput.files[0]) {
        reader.readAsDataURL(picInput.files[0]);
    } else {
        // No picture uploaded
        localStorage.setItem('user', username);
        localStorage.removeItem('profilePic');
        alert('Signed up! Logging in...');
        window.location.href = "http://127.0.0.1:5500/Roomize_main.html";
    }
});

const authLink = document.getElementById('auth-link');
const userGreeting = document.getElementById('user-greeting');
const profilePic = document.getElementById('profile-pic');

const user = localStorage.getItem('user');
const pic = localStorage.getItem('profilePic');

if (user) {
    authLink.textContent = 'Logout';
    authLink.href = '#';
    userGreeting.textContent = `Hi, ${user}`;
    
    if (pic) {
        profilePic.src = pic;
        profilePic.style.display = 'inline-block';
    }

    authLink.addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.removeItem('user');
        localStorage.removeItem('profilePic');
        alert('You have been logged out.');
        window.location.reload();
    });
} else {
    authLink.textContent = 'Login';
    authLink.href = 'login.html';
    userGreeting.textContent = '';
    profilePic.style.display = 'none';
}