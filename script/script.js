// Validar email

const emailInput = document.getElementById('email');
const emailError = document.getElementById('email-error');

function validateEmail() {
    const emailValue = emailInput.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailPattern.test(emailValue)) {
        emailInput.classList.add('error');
        emailError.textContent = 'Por favor, insira um endereço de e-mail válido.';
        emailError.classList.add('visible');
    } else {
        emailInput.classList.remove('error');
        emailError.textContent = '';
        emailError.classList.remove('visible');
    }
}

emailInput.addEventListener('blur', validateEmail);

// Validar nome

const nameInput = document.getElementById('name');
const nameError = document.getElementById('name-error');

function validateName() {
    const nameValue = nameInput.value.trim();
    const namePattern = /^[a-zA-ZÀ-ÿ\s]+$/;
    
    if (!namePattern.test(nameValue)) {
        nameInput.classList.add('error');
        nameError.textContent = 'Por favor, insira um nome válido.';
        nameError.classList.add('visible');
    } else {
        nameInput.classList.remove('error');
        nameError.textContent = '';
        nameError.classList.remove('visible');
    }
}

nameInput.addEventListener('blur', validateName);

// Validar nome de usuário

const usernameInput = document.getElementById('github');
const usernameError = document.getElementById('github-error');

function validateUsername() {
    const usernameValue = usernameInput.value.trim();
    const usernamePattern = /^[a-zA-Z0-9]+$/;
    
    if (!usernamePattern.test(usernameValue)) {
        usernameInput.classList.add('error');
        usernameError.textContent = 'Por favor, insira um nome de usuário válido.';
        usernameError.classList.add('visible');
    } else {
        usernameInput.classList.remove('error');
        usernameError.textContent = '';
        usernameError.classList.remove('visible');
    }
}

usernameInput.addEventListener('blur', validateUsername);

// Validar avatar

const avatarInput = document.getElementById('avatar');
const avatarError = document.getElementById('avatar-hint');

function validateAvatar() {
    const avatarFile = avatarInput.files[0];

    if (avatarFile) {
        const fileType = ['image/jpeg', 'image/png'];
        const fileSize = avatarFile.size / 1024 / 1024; // Convertendo para MB
        const maxSize = 2; // 2MB

        if (!fileType.includes(avatarFile.type)) {
            avatarInput.classList.add('error');
            avatarError.textContent = 'Por favor, insira uma imagem JPEG ou PNG.';
            avatarError.classList.add('visible');
        }
        else if (avatarFile.size > 2 * 1024 * 1024) { // 2MB
            avatarInput.classList.add('error');
            avatarError.textContent = 'O tamanho máximo do arquivo é de 2MB.';
            avatarError.classList.add('visible');
        } else {
            avatarInput.classList.remove('error');
            avatarError.textContent = '';
            avatarError.classList.remove('visible');
        }
    }
}

// Arrastar e soltar o arquivo

const uploadBox = document.querySelector('.upload-box');
const uploadText = document.querySelector('.upload-text');
const uploadIcon = document.querySelector('.upload-icon');

function handleUploadBoxClick() {
    if (!avatarInput.files || avatarInput.files.length === 0) {
        avatarInput.click();
    }
};

uploadBox.addEventListener('click', handleUploadBoxClick);

uploadBox.addEventListener('dragover', function(event) {
    event.preventDefault();
});

uploadBox.addEventListener('drop', function(event) {
    event.preventDefault();
    
    const files = event.dataTransfer.files;

    if (files.length > 0) {
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(files[0]);
        avatarInput.files = dataTransfer.files;
    }
});

// Atualizar visual da área de upload

function removeImage() {
    avatarInput.value = '';
    uploadIcon.innerHTML = '<img class="upload-icon-img" src="images/upload.png" alt="Upload Icon" width="40">';
    uploadText.style.display = 'block';
    actionsDiv.style.display = 'none';

    uploadBox.classList.remove('active');
    uploadBox.addEventListener('click', handleUploadBoxClick);
}

function editImage() {
    avatarInput.click();
}

const actionsDiv = document.getElementById('upload-actions');
const removeButton = actionsDiv.querySelector('.preview-button:nth-child(1)');
const changeButton = actionsDiv.querySelector('.preview-button:nth-child(2)');

avatarInput.addEventListener('change', function() {
    const files = avatarInput.files;
    
    if (files && files[0]) {
        const file = files[0];
        
        if (file.type === 'image/jpeg' || file.type === 'image/png') {
            const reader = new FileReader();
            
            reader.onload = function(e) {
                uploadIcon.innerHTML = `<img src="${e.target.result}" alt="Preview" class="preview-image" width="40" height="40">`;
                uploadText.style.display = 'none';
                
                actionsDiv.style.display = 'flex';
                removeButton.style.display = 'block';
                changeButton.style.display = 'block';
            };
            
            reader.readAsDataURL(file);

            uploadBox.removeEventListener('click', handleUploadBoxClick);
            uploadBox.classList.add('active');
        }
    }
});

removeButton.addEventListener('click', removeImageHandler);
changeButton.addEventListener('click', removeImageHandler);