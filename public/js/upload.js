document.addEventListener('DOMContentLoaded', () => {
  const dropZone = document.getElementById('drop-zone');
  const fileInput = document.getElementById('file-input');
  const progressBar = document.querySelector('.progress-bar');
  const progressDiv = document.getElementById('upload-progress');
  const statusDiv = document.getElementById('upload-status');

  // Drag and drop handlers
  dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('dragover');
  });

  dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('dragover');
  });

  dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('dragover');
    const files = e.dataTransfer.files;
    if (files.length) {
      handleFileUpload(files[0]);
    }
  });

  fileInput.addEventListener('change', (e) => {
    if (e.target.files.length) {
      handleFileUpload(e.target.files[0]);
    }
  });

  function handleFileUpload(file) {
    // File size validation (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      showStatus('File size exceeds 5MB limit', 'danger');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    progressDiv.classList.remove('d-none');
    progressBar.style.width = '0%';

    fetch('/upload', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          showStatus('File uploaded successfully!', 'success');
        } else {
          throw new Error(data.error || 'Upload failed');
        }
      })
      .catch((error) => {
        showStatus(error.message, 'danger');
      })
      .finally(() => {
        progressDiv.classList.add('d-none');
      });
  }

  function showStatus(message, type) {
    statusDiv.className = `alert alert-${type}`;
    statusDiv.textContent = message;
    statusDiv.classList.remove('d-none');
    setTimeout(() => {
      statusDiv.classList.add('d-none');
    }, 5000);
  }
});
