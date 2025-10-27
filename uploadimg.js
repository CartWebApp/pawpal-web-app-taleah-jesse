document.addEventListener('DOMContentLoaded', () => {
    // Get the file input and the container for the pictures
    const fileInput = document.getElementById('image-upload');
    const picturesDiv = document.querySelector('.pictures');

    // Add an event listener for when a file is selected
    fileInput.addEventListener('change', function() {
        const file = this.files[0]; // Get the first file from the selection

        if (file) {
            // Use FileReader to read the file's data
            const reader = new FileReader();

            // This function runs when the file has been read
            reader.onload = function(e) {
                // Create a new image element
                const img = document.createElement('img');
                // Set the image's source to the file data
                img.src = e.target.result;
                img.alt = 'Uploaded Profile Picture';

                // Clear any existing content and add the new image
                picturesDiv.innerHTML = '';
                picturesDiv.appendChild(img);
            };

            // Read the file as a Data URL (a Base64 encoded string)
            reader.readAsDataURL(file);
        }
    });
});