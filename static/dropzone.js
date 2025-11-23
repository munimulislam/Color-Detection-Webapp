const dropZone = document.getElementById('dropZone');
const fileInput = document.getElementById('file');
const fileName = document.getElementById('fileName');
const submitBtn = document.getElementById('submitBtn');
const imagePreview = document.getElementById('image-preview');
const imageHolder = document.getElementById('image-holder');

const allowedFileTypes = ["image/png", "image/jpeg", "image/gif"];

const allowedFileSizeInMB = 50
const allowedFileSizeInBytes = allowedFileSizeInMB * 1024 * 1024

dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('bg-primary', 'bg-opacity-10', 'border-primary');
});

dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('bg-primary', 'bg-opacity-10', 'border-primary');
});

dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('bg-primary', 'bg-opacity-10', 'border-primary');

    const files = e.dataTransfer.files;

    if (files.length > 0) {
        fileInput.files = files;
    }
});

fileInput.addEventListener('change', (e) => {
    files = fileInput.files;
    isValid = validateUpload(files);

    if (!isValid) {
        fileName.classList.add('d-none');
        imageHolder.classList.add('d-none');
        submitBtn.disabled = true;

        return;
    }

    updateFileName(files[0].name);
    updateImage(files[0]);
});

function validateUpload(files) {
    isValid = true;

    if (files.length > 1) {
        console.log("Only 1 image can be uploaded at a time")
        isValid = false;
    }

    file = files[0];

    if (!allowedFileTypes.includes(file.type)) {
        console.log("Please upload image file")
        isValid = false;
    }

    if (file.size > allowedFileSizeInBytes) {
        console.log("file size cant be more than " + allowedFileSizeInMB + "MB")
        isValid = false;
    }

    return isValid;
}

function updateFileName(filename) {
    fileName.textContent = `✓ Selected: ${filename}`;
    fileName.classList.remove('d-none');
    submitBtn.disabled = false;
}

function updateImage(file) {    
    const reader = new FileReader();

    reader.onload = function (e) {
        imagePreview.classList.remove('d-none');
        imagePreview.src = e.target?.result;

        imageHolder?.classList.remove('d-none');
    };

    reader.readAsDataURL(file);
}