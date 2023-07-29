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

    const tierImg = document.querySelector("#al-tier");
    const tier = document.querySelector("#tier");
    const solved = document.querySelector("#solved");
    const cls = document.querySelector("#class");
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === xhr.DONE) {
            if (xhr.status === 200 || xhr.status === 201) {
                var data = xhr.responseText;
                tierImg.src = "https://d2gd6pc034wcta.cloudfront.net/tier/" + data.tier + ".svg";
                tier.innerHTML = tier(data.tier);
                solved.innerHTML = numberWithCommas(data.solvedCount);
                cls.innerHTML = numberWithCommas(data.class);
            } else {
                console.error(xhr.responseText);
            }
        }
    };
    xhr.open('GET', '//solved.ac/api/v3/user/show?handle=plmo00456');
    xhr.send();

}

const pdfMake = () => {
    if(!confirm('PDF를 생성하시겠습니까?')) return;
    showLoadingOverlay();

    html2canvas($('body')[0]).then(function(canvas) {
        let imgData = canvas.toDataURL('image/png');

        let imgWidth = 210; // 이미지 가로 길이(mm) A4 기준
        let pageHeight = imgWidth * 1.414;  // 출력 페이지 세로 길이 계산 A4 기준
        let imgHeight = canvas.height * imgWidth / canvas.width;
        let heightLeft = imgHeight;

        let doc = new jsPDF('p', 'mm');
        let position = 0;

        // 첫 페이지 출력
        doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        // 한 페이지 이상일 경우 루프 돌면서 출력
        while (heightLeft >= 20) {
            position = heightLeft - imgHeight;
            doc.addPage();
            doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
        }

        let today = new Date();
        let year = today.getFullYear();
        let month = ('0' + (today.getMonth() + 1)).slice(-2);
        let day = ('0' + today.getDate()).slice(-2);
        let hours = ('0' + today.getHours()).slice(-2);
        let minutes = ('0' + today.getMinutes()).slice(-2);

        let dateString = year + month + day + hours + minutes;

        // 파일 저장
        doc.save("박우진_"+dateString+'.pdf');

        // 로딩 화면 숨기기
        hideLoadingOverlay();
    });
}


function scrollToElem(elemId) {
    var target = document.getElementById(elemId);
    target.scrollIntoView({behavior: "smooth"});
}

function numberWithCommas(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}

function tier(x){
    switch(x){
        case 1:
            return "브론즈5";
        case 2:
            return "브론즈4";
        case 3:
            return "브론즈3";
        case 4:
            return "브론즈2";
        case 5:
            return "브론즈1";
        case 6:
            return "실버5";
        case 7:
            return "실버4";
        case 8:
            return "실버3";
        case 9:
            return "실버2";
        case 10:
            return "실버1";
        case 11:
            return "골드5";
        case 12:
            return "골드4";
        case 13:
            return "골드3";
        case 14:
            return "골드2";
        case 15:
            return "골드1";
        case 16:
            return "플래티넘5";
        case 17:
            return "플래티넘4";
        case 18:
            return "플래티넘3";
        case 19:
            return "플래티넘2";
        case 20:
            return "플래티넘1";
        case 21:
            return "다이아몬드5";
        case 22:
            return "다이아몬드4";
        case 23:
            return "다이아몬드3";
        case 24:
            return "다이아몬드2";
        case 25:
            return "다이아몬드1";
        case 26:
            return "루비5";
        case 27:
            return "루비4";
        case 28:
            return "루비3";
        case 29:
            return "루비2";
        case 30:
            return "루비1";
        case 31:
            return "마스터";
    }
}

function showLoadingOverlay() {
    document.getElementById("loading-overlay").classList.remove("hidden");
    document.body.style.overflow = "hidden"; // 스크롤 방지
}

function hideLoadingOverlay() {
    document.getElementById("loading-overlay").classList.add("hidden");
    document.body.style.overflow = ""; // 스크롤 허용
}