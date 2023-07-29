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
                var data = JSON.parse(xhr.response);
                tierImg.src = "https://d2gd6pc034wcta.cloudfront.net/tier/" + data.tier + ".svg";
                tier.innerHTML = tierStr(data.tier);
                solved.innerHTML = numberWithCommas(data.solvedCount);
                cls.innerHTML = numberWithCommas(data.class);

                if(isChromeBasedBrowser()) {
                    makeCnavas();
                }
            } else {
                console.error(xhr.responseText);
            }
        }
    };
    xhr.open('GET', 'https://corsproxy.io/?https%3A%2F%2Fsolved.ac%2Fapi%2Fv3%2Fuser%2Fshow%3Fhandle%3Dplmo00456');
    xhr.send();

}

const pdfMake = () => {
    if(!confirm('PDF를 생성하시겠습니까?')) return;
    showLoadingOverlay();
    const tBoldEle = document.querySelectorAll(".t-bold");
    tBoldEle.forEach((e) => {
        e.classList.remove("t-bold");
        e.classList.add("t-bold-tmp");
    });

    html2canvas($('body')[0]).then(function(canvas) {
        let imgData = canvas.toDataURL('image/jpeg', 1);

        let imgWidth = 210; // 이미지 가로 길이(mm) A4 기준
        let pageHeight = imgWidth * 1.414;  // 출력 페이지 세로 길이 계산 A4 기준
        let imgHeight = canvas.height * imgWidth / canvas.width;
        let heightLeft = imgHeight;

        let doc = new jsPDF('p', 'mm');
        let position = 0;

        // 첫 페이지 출력
        doc.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        // 한 페이지 이상일 경우 루프 돌면서 출력
        while (heightLeft >= 20) {
            position = heightLeft - imgHeight;
            doc.addPage();
            doc.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
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

        tBoldEle.forEach((e) => {
            e.classList.add("t-bold");
            e.classList.remove("t-bold-tmp");
        });
        // 로딩 화면 숨기기
        hideLoadingOverlay();
    });
}
document.addEventListener("DOMContentLoaded", function () {
    window.addEventListener("scroll", function () {
        for (var i = 1; i <= document.querySelectorAll(".group").length; i++) {
            var menuItem = document.querySelector("#menu" + i);
            var button = document.querySelector("#menu" + i + "Btn");
            var rect = menuItem.getBoundingClientRect();
            if (rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2) {
                button.classList.add("selected");
            } else {
                button.classList.remove("selected");
            }
        }
    });
});


function scrollToElem(elemId) {
    var target = document.getElementById(elemId);
    var offset = 200; // 위로 조정할 픽셀 수 설정

    var topPos = target.offsetTop - offset;

    window.scrollTo({
        top: topPos,
        behavior: "smooth"
    });
}

function numberWithCommas(x) {
    try {
        var parts = x.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return parts.join(".");
    }catch(e){
        return x;
    }
}

function tierStr(x){
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

function makeCnavas(){
    var xhr = new XMLHttpRequest();
    var svgUrl = document.querySelector("#al-tier");
    xhr.open("GET", 'https://corsproxy.io/?' + svgUrl.src);
    xhr.responseType = "blob";
    xhr.onload = response;
    xhr.send();

    function response(e) {
        var urlCreator = window.URL || window.webkitURL;
        var imageUrl = urlCreator.createObjectURL(this.response);
        svgUrl.src = imageUrl;
        var img = new Image();
        img.src = imageUrl;
        img.onload = function() {
            var canvas = document.createElement('canvas');
            var ctx = canvas.getContext('2d');
            canvas.id = "canvas";
            ctx.drawImage(img, 0, 0);
            svgUrl.after(canvas);
            svgUrl.remove();
        };
    }
}

function isChromeBasedBrowser() {
    const userAgent = window.navigator.userAgent.toLowerCase();
    return userAgent.includes('chrome') || userAgent.includes('chromium');
}