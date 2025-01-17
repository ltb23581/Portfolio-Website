document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll(".target-section-LOM, .target-section-RSL");
    const containers = document.querySelectorAll(".container1, .container2, .container3, .container4, .container5, .container6, .containerImg1, .containerImg2, .containerImg3, .containerImg4, .containerImg5, .containerImg6"); 

    const containerObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                if (!entry.target.classList.contains("has-animated")) {
                    entry.target.classList.add("in-view", "has-animated");
                }
                // Ensure images stay visible after being intersected
                const imageContainer = entry.target.querySelector(".containerImg1, .containerImg2, .containerImg3, .containerImg4, .containerImg5, .containerImg6");
                if (imageContainer) {
                    imageContainer.classList.add("persistent");
                    console.log("Image container made persistent:", imageContainer);
                }
            }
        });
    }, { threshold: 0.1 });    

    sections.forEach((section) => {
        const timelineBar = section.querySelector(".timeline-bar");
        const timeline = section.querySelector(".timeline");

        const timelineObserver = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    timelineBar.style.height = `${timeline.scrollHeight}px`;
                    timelineBar.style.opacity = "1";
                }
            },
            { threshold: 0.1 }
        );

        timelineObserver.observe(timeline);
    });

    containers.forEach((container) => containerObserver.observe(container));
});

document.addEventListener("DOMContentLoaded", () => {
    const container1 = document.querySelector(".container1");
    const container2 = document.querySelector(".container2");
    const container3 = document.querySelector(".container3");
    const container4 = document.querySelector(".container4");
    const container5 = document.querySelector(".container5");
    const container6 = document.querySelector(".container6");

    const containerImg1 = document.querySelector(".containerImg1");
    const containerImg2 = document.querySelector(".containerImg2");
    const containerImg3 = document.querySelector(".containerImg3");
    const containerImg4 = document.querySelector(".containerImg4");
    const containerImg5 = document.querySelector(".containerImg5");
    const containerImg6 = document.querySelector(".containerImg6");

    // Add hover event listeners to reveal images
    container1.addEventListener("mouseenter", () => {
        containerImg1.classList.add("persistent");
    });

    container2.addEventListener("mouseenter", () => {
        containerImg2.classList.add("persistent");
    });

    container3.addEventListener("mouseenter", () => {
        containerImg3.classList.add("persistent");
    });

    container4.addEventListener("mouseenter", () => {
        containerImg4.classList.add("persistent");
    });

    container5.addEventListener("mouseenter", () => {
        containerImg5.classList.add("persistent");
    });

    container6.addEventListener("mouseenter", () => {
        containerImg6.classList.add("persistent");
    });
});
