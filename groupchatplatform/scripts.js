// Basic login logic
document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const password = document.getElementById('password').value;

    if (name && password) {
        window.location.href = `profile.html?name=${name}&password=${password}`;
    } else {
        alert('Please enter both name and password!');
    }
});

// Handle profile page logic
const params = new URLSearchParams(window.location.search);
const name = params.get('name');
document.getElementById('userName').innerText = name;

// Handle group creation
document.getElementById('createGroupForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const groupName = document.getElementById('groupName').value;
    const groupPassword = document.getElementById('groupPassword').value;

    if (groupName && groupPassword) {
        const groups = JSON.parse(localStorage.getItem('groups') || '[]');
        groups.push({ name: groupName, password: groupPassword });
        localStorage.setItem('groups', JSON.stringify(groups));
        window.location.href = `group.html?name=${name}&group=${groupName}&groupPassword=${groupPassword}`;
    } else {
        alert('Please enter both group name and password!');
    }
});

// Handle group chat logic
if (params.has('group')) {
    const groupName = params.get('group');
    const groupPassword = params.get('groupPassword');
    document.getElementById('groupNameDisplay').innerText = groupName;

    const inputPassword = prompt('Enter the group password:');
    if (inputPassword !== groupPassword) {
        alert('Incorrect password!');
        window.location.href = `profile.html?name=${name}&password=${params.get('password')}`;
    }

    document.getElementById('sendMessage').addEventListener('click', () => {
        const message = document.getElementById('messageInput').value;
        if (message) {
            const messages = JSON.parse(localStorage.getItem('messages') || '[]');
            messages.push({ name, message });
            localStorage.setItem('messages', JSON.stringify(messages));
            const messageElement = document.createElement('div');
            messageElement.innerText = `${name}: ${message}`;
            document.getElementById('messages').appendChild(messageElement);
            document.getElementById('messageInput').value = '';
        }
    });
}
