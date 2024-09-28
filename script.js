document.addEventListener("DOMContentLoaded", () => {
    // Load videos on page load
    loadVideos();

    // Upload video form submission
    const uploadForm = document.getElementById('uploadForm');
    if (uploadForm) {
        uploadForm.addEventListener('submit', async function (e) {
            e.preventDefault();
            const file = document.getElementById('videoFile').files[0];
            const formData = new FormData();
            formData.append('file', file);

            const loadingIndicator = document.getElementById('loading');
            loadingIndicator.classList.remove('hidden');

            try {
                const response = await fetch('https://api.altcha.org/v1/upload/video', {
                    method: 'POST',
                    headers: {
                        'Authorization': 'Bearer ckey_01552414f54b0690a6a1e56de5ab', // Replace with your actual API key
                    },
                    body: formData
                });

                const result = await response.json();
                if (result && result.url) {
                    document.getElementById('status').textContent = 'Upload successful!';
                    setTimeout(() => {
                        window.location.href = 'index.html'; // Redirect to main page
                    }, 2000);
                } else {
                    throw new Error('Upload failed. Please try again.');
                }
            } catch (error) {
                document.getElementById('status').textContent = error.message;
            } finally {
                loadingIndicator.classList.add('hidden');
            }
        });
    }
});

// Function to load existing videos (dummy data for demonstration)
async function loadVideos() {
    // Placeholder implementation using dummy data
    const videos = [
        { url: 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4', filename: 'Sample Video 1' },
        { url: 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4', filename: 'Sample Video 2' }
    ];

    videos.forEach(video => {
        const videoElem = document.createElement('div');
        videoElem.classList.add('video-container');
        videoElem.innerHTML = `
            <video controls>
                <source src="${video.url}" type="video/mp4">
                Your browser does not support the video tag.
            </video>
            <p>${video.filename}</p>
        `;
        document.getElementById('videoList').appendChild(videoElem);
    });
}
