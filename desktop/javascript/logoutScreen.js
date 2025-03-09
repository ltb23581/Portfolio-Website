document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('.loading_animation img');
    let delay = 0;
    let loopCount = 0;

    function fadeInImages() {
        for (let i = images.length - 1; i >= 0; i--) {
            setTimeout(() => {
                images[i].style.opacity = '1'; 
            }, delay);
            delay += 300; 
        }

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

    function redirectToNextPage() {
        document.body.style.transition = 'opacity 1s, visibility 1s';
        document.body.style.opacity = '0';
        document.body.style.visibility = 'hidden';

        setTimeout(() => {
            window.location.href = "/index.html"; 
        }, 1000); 
    }

    fadeInImages(); 
});
