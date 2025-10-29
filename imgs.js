  
        // Load saved images when page loads
        window.addEventListener('DOMContentLoaded', function() {
            loadSavedImages();
        });
    
        function loadSavedImages() {
            const boxes = document.querySelectorAll('.pictures');
            boxes.forEach((box, index) => {
                const savedImage = localStorage.getItem('petImage_' + index);
                if (savedImage) {
                    displayImage(box, savedImage);
                }
            });
        }
    
        function triggerUpload(box) {
            const fileInput = box.querySelector('input[type="file"]');
            if (fileInput) {
                fileInput.click();
            }
        }
    
        function handleImageUpload(event, input) {
            const file = event.target.files[0];
            if (!file) return;
    
            if (!file.type.startsWith('image/')) {
                alert('Please upload an image file');
                return;
            }
    
            const reader = new FileReader();
            const box = input.parentElement;
    
            reader.onload = function(e) {
                const imageData = e.target.result;
                
                // Save to localStorage
                const boxes = document.querySelectorAll('.pictures');
                const boxIndex = Array.from(boxes).indexOf(box);
                localStorage.setItem('petImage_' + boxIndex, imageData);
                
                // Display the image
                displayImage(box, imageData);
            };
    
            reader.readAsDataURL(file);
        }
    
        function displayImage(box, imageData) {
            // Clear existing content except file input
            const existingImg = box.querySelector('img');
            const existingBtn = box.querySelector('.remove-btn');
            
            if (existingImg) existingImg.remove();
            if (existingBtn) existingBtn.remove();
            
            // Create image element
            const img = document.createElement('img');
            img.src = imageData;
            img.alt = 'Pet photo';
            
            // Create remove button
            const removeBtn = document.createElement('button');
            removeBtn.className = 'remove-btn';
            removeBtn.innerHTML = '×';
            removeBtn.onclick = function(event) {
                event.stopPropagation();
                removeImage(this);
            };
            
            // Add elements to box
            box.appendChild(img);
            box.appendChild(removeBtn);
        }
    
        function removeImage(btn) {
            event.stopPropagation();
            const box = btn.parentElement;
            const img = box.querySelector('img');
            
            // Remove from localStorage
            const boxes = document.querySelectorAll('.pictures');
            const boxIndex = Array.from(boxes).indexOf(box);
            localStorage.removeItem('petImage_' + boxIndex);
            
            if (img) img.remove();
            btn.remove();
            
            // Reset file input
            const input = box.querySelector('input[type="file"]');
            if (input) {
                input.value = '';
            }
        }