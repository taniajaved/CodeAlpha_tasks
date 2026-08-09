document.addEventListener("DOMContentLoaded", () => {
    const filterButtons = document.querySelectorAll(".filter-tab");
    const galleryItems = document.querySelectorAll(".studio-card");
    
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const lightboxCaption = document.getElementById("lightbox-caption");
    const closeBtn = document.querySelector(".close-viewer");
    const prevBtn = document.querySelector(".prev-control");
    const nextBtn = document.querySelector(".next-control");

    let activeImages = [];
    let currentIndex = 0;

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            document.querySelector(".filter-tab.active").classList.remove("active");
            button.classList.add("active");

            const filterValue = button.getAttribute("data-filter");

            galleryItems.forEach(item => {
                if (filterValue === "all" || item.classList.contains(filterValue)) {
                    item.style.display = "block";
                } else {
                    item.style.display = "none";
                }
            });
        });
    });

    function updateActiveImages() {
        activeImages = Array.from(galleryItems).filter(item => item.style.display !== "none");
    }

    function openLightbox(item) {
        updateActiveImages();
        currentIndex = activeImages.indexOf(item);
        
        const imgSrc = item.querySelector("img").getAttribute("src");
        const imgAlt = item.querySelector("img").getAttribute("alt");
        
        lightboxImg.setAttribute("src", imgSrc);
        lightboxCaption.textContent = imgAlt;
        lightbox.style.display = "flex";
    }

    galleryItems.forEach(item => {
        item.addEventListener("click", () => openLightbox(item));
    });

    closeBtn.addEventListener("click", () => lightbox.style.display = "none");
    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) lightbox.style.display = "none";
    });

    function showImage(index) {
        const targetImg = activeImages[index].querySelector("img");
        lightboxImg.setAttribute("src", targetImg.getAttribute("src"));
        lightboxCaption.textContent = targetImg.getAttribute("alt");
    }

    nextBtn.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % activeImages.length;
        showImage(currentIndex);
    });

    prevBtn.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + activeImages.length) % activeImages.length;
        showImage(currentIndex);
    });
});
