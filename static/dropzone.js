const dropZone = document.getElementById('dropZone');
const fileInput = document.getElementById('file');
const fileName = document.getElementById('fileName');
const submitBtn = document.getElementById('submitBtn');

// Drag and drop events
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
        updateFileName();
    }
});

// File input change event
fileInput.addEventListener('change', updateFileName);

cameraInput.addEventListener('change', (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
        const file = files[0];
        // Copy camera file to main file input
        fileInput.files = files;
        showPreview(file);
    } else {
        clearPreview();
    }
});

function updateFileName() {
    if (fileInput.files.length > 0) {
        fileName.textContent = `✓ Selected: ${fileInput.files[0].name}`;
        fileName.classList.remove('d-none');
        submitBtn.disabled = false;
    } else {
        fileName.classList.add('d-none');
        submitBtn.disabled = true;
    }
}