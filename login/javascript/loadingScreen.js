document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('.loading_animation img');
    let delay = 0;
    let loopCount = 0; 

    // Function to fade in each image sequentially
    function fadeInImages() {
        images.forEach((image, index) => {
            setTimeout(() => {
                image.style.opacity = '1'; 
            }, delay);
            delay += 300; 
        });

        // After all images have faded in, clear them and loop again
        setTimeout(() => {
            images.forEach(image => {
                image.style.opacity = '0'; 
            });

            loopCount++;

            if (loopCount < 2) {
                setTimeout(() => {
                    fadeInImages();
                }, 0); 
            } else {
                setTimeout(() => {
                    redirectToNextPage();
                }, 300);
            }
        }, delay); 
    }

    // TOOD: FIX SO TRANSITION IS SMOOTHER
    function redirectToNextPage() {
        document.body.style.transition = 'opacity 1s, visibility 1s'; 
        document.body.style.opacity = '0';
        document.body.style.visibility = 'hidden'; 

        setTimeout(() => {
            window.location.href = "../desktop/desktop.html"; // Redirect to the next page
        }, 1000); 
    }

    fadeInImages(); 
});

