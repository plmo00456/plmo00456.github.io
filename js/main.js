window.onload = function(){
    const swiper = new Swiper('.indv-project .images', {
        loop: true,
        pagination: {
            el: '.swiper-pagination',
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });

    const modal = document.getElementById("imageModal");
    const modalImage = document.getElementById("modalImage");
    const closeButton = document.querySelector(".close");

    const slideImages = document.querySelectorAll(".swiper-slide img");
    slideImages.forEach((image) => {
        image.addEventListener("click", (event) => {
            modal.classList.add("open");
            modalImage.src = event.target.src;
        });
    });

    closeButton.addEventListener("click", () => {
        modal.classList.remove("open");
    });

    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.classList.remove("open");
        }
    });

}