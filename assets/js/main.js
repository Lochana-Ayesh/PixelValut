// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
}

// File Upload Preview
const uploadArea = document.getElementById('upload-area');
const fileInput = document.getElementById('file-upload');
const previewImg = document.getElementById('preview-img');
const uploadPlaceholder = document.getElementById('upload-placeholder');

if (uploadArea && fileInput) {
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        uploadArea.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    ['dragenter', 'dragover'].forEach(eventName => {
        uploadArea.addEventListener(eventName, highlight, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        uploadArea.addEventListener(eventName, unhighlight, false);
    });

    function highlight(e) {
        uploadArea.classList.add('border-cyan-500', 'bg-slate-800/80');
        uploadArea.classList.remove('border-slate-600');
    }

    function unhighlight(e) {
        uploadArea.classList.remove('border-cyan-500', 'bg-slate-800/80');
        uploadArea.classList.add('border-slate-600');
    }

    uploadArea.addEventListener('drop', handleDrop, false);

    function handleDrop(e) {
        let dt = e.dataTransfer;
        let files = dt.files;
        handleFiles(files);
    }

    fileInput.addEventListener('change', function() {
        handleFiles(this.files);
    });

    function handleFiles(files) {
        if (files.length > 0) {
            const file = files[0];
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => {
                    previewImg.src = reader.result;
                    previewImg.classList.remove('hidden');
                    uploadPlaceholder.classList.add('hidden');
                }
            }
        }
    }
}

// Like functionality dummy toggle
document.querySelectorAll('.like-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        const icon = this.querySelector('i');
        if (icon.classList.contains('text-white')) {
            icon.classList.remove('text-white');
            icon.classList.add('text-secondary');
        } else {
            icon.classList.remove('text-secondary');
            icon.classList.add('text-white');
        }
        
        // Add a small pop animation
        this.style.transform = 'scale(1.2)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 200);
    });
});
