// Validar email

const emailInput = document.getElementById('email');
const emailError = document.getElementById('email-error');

function validateEmail() { // Valida o email inserido pelo usuário
    const emailValue = emailInput.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // O email deve conter um formato válido
    
    if (!emailPattern.test(emailValue)) { // Verifica se o email contém um formato válido
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

function validateName() { // Valida o nome inserido pelo usuário
    const nameValue = nameInput.value.trim();
    const namePattern = /^[a-zA-ZÀ-ÿ\s]+$/;

    // O nome deve conter apenas letras e espaços, sem números ou caracteres especiais
    // O regex permite letras acentuadas e espaços entre os nomes
    
    if (!namePattern.test(nameValue)) { // Verifica se o nome contém apenas letras e espaços
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

function validateUsername() { // Valida o nome de usuário inserido pelo usuário
    const usernameValue = usernameInput.value.trim();
    const usernamePattern = /^[a-zA-Z0-9]+$/;
    
    // O nome de usuário deve conter apenas letras e números, sem espaços ou caracteres especiais

    if (!usernamePattern.test(usernameValue)) { // Verifica se o nome de usuário contém apenas letras e números
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

function validateAvatar() { // Valida o arquivo de imagem inserido pelo usuário
    const avatarFile = avatarInput.files[0];

    // O arquivo deve ser uma imagem JPEG ou PNG e não pode exceder 2MB

    if (avatarFile) {
        const fileType = ['image/jpeg', 'image/png']; // Tipos de arquivo permitidos
        const fileSize = avatarFile.size / 1024 / 1024; // Convertendo para MB
        const maxSize = 2; // 2MB

        if (!fileType.includes(avatarFile.type)) { // Verifica se o tipo de arquivo é permitido
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

function handleUploadBoxClick() { // Função para abrir o seletor de arquivos quando a área de upload é clicada
    if (!avatarInput.files || avatarInput.files.length === 0) {
        avatarInput.click();
    }
};

uploadBox.addEventListener('click', handleUploadBoxClick); // Adiciona o evento de clique para abrir o seletor de arquivos

uploadBox.addEventListener('dragover', function(event) { // Permite o arrastar e soltar do arquivo
    event.preventDefault();
});

uploadBox.addEventListener('drop', function(event) { // Lida com o evento de soltar o arquivo na área de upload
    event.preventDefault();
    
    const files = event.dataTransfer.files;

    if (files.length > 0) { // Verifica se há arquivos arrastados
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(files[0]);
        avatarInput.files = dataTransfer.files;
    }
});

// Atualizar visual da área de upload

function removeImage() { // Remove a imagem do preview e os botões de ação
    avatarInput.value = '';
    uploadIcon.innerHTML = '<img class="upload-icon-img" src="images/upload.png" alt="Upload Icon" width="40">';
    uploadText.style.display = 'block';
    actionsDiv.style.display = 'none';

    uploadBox.classList.remove('active');
    uploadBox.addEventListener('click', handleUploadBoxClick);
}

function editImage() { // Permite ao usuário editar a imagem após o upload
    avatarInput.click();
}

const actionsDiv = document.getElementById('upload-actions');
const removeButton = actionsDiv.querySelector('.preview-button:nth-child(1)');
const changeButton = actionsDiv.querySelector('.preview-button:nth-child(2)');

avatarInput.addEventListener('change', function() { // Lida com a mudança no input de arquivo
    const files = avatarInput.files;
    
    if (files && files[0]) { // Verifica se há arquivos selecionados
        const file = files[0];
        
        if (file.type === 'image/jpeg' || file.type === 'image/png') { // Verifica se o arquivo é uma imagem JPEG ou PNG
            const reader = new FileReader();
            
            reader.onload = function(e) { // Lê o arquivo e exibe a imagem no preview
                uploadIcon.innerHTML = `<img src="${e.target.result}" alt="Preview" class="preview-image" width="40" height="40">`;
                uploadText.style.display = 'none';
                
                actionsDiv.style.display = 'flex';
                removeButton.style.display = 'block';
                changeButton.style.display = 'block';
            };
            
            reader.readAsDataURL(file);

            uploadBox.removeEventListener('click', handleUploadBoxClick); // Remove o evento de clique para evitar abrir o seletor de arquivos novamente
            uploadBox.classList.add('active');
        }
    }
});

removeButton.addEventListener('click', function() { // Adiciona o evento de clique para remover a imagem;
    e.preventDefault();
    removeImage();
});
changeButton.addEventListener('click', function() { // Adiciona o evento de clique para editar a imagem;
    e.preventDefault();
    editImage();
});