window.onload = function(){
    let theme = 'light';
    let mark = true;

    const onToggleTheme = ( { currentTarget } ) => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        theme = newTheme;

        document.documentElement.setAttribute( 'data-theme', newTheme );
        currentTarget.setAttribute( 'aria-pressed', newTheme === 'dark' );
    };

    const themeBtn = document.querySelector( `.theme-switch.dark-mode` );
    if ( ! themeBtn ) return;
    themeBtn.addEventListener( 'click', onToggleTheme, false );

    const onToggleMark = ( { currentTarget } ) => {
        const newMark = !mark;
        mark = newMark;

        document.documentElement.setAttribute( 'data-mark', newMark + '' );
        currentTarget.setAttribute( 'aria-pressed', !newMark);
    };

    const markBtn = document.querySelector( `.theme-switch.mark` );
    if ( ! markBtn ) return;
    markBtn.addEventListener( 'click', onToggleMark, false );


    let currentSwiper = 0;
    const swiper = new Swiper('.indv-project .images', {
        loop: true,
        pagination: {
            el: '.swiper-pagination',
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        speed: 400,
        spaceBetween: 100,
    })

    const modal = document.getElementById("imageModal");
    const modalImage = document.getElementById("modalImage");
    const closeButton = document.querySelector(".close");
    const slideImages = document.querySelectorAll(".swiper-slide img");
    const leftBtn = document.querySelector("#modal-left-btn");
    const rightBtn = document.querySelector("#modal-right-btn");

    for(let i = 0; i<swiper.length; i++){
        swiper[i].on('click', (e) => {
            currentSwiper = i;
        })
        swiper[i].on('slideChange', (e) =>  {
            currentSwiper = i;
            const img = e.slides[e.activeIndex].querySelector("img");
            if(img){
                modalImage.src = img.src;
                const rect = modalImage.getBoundingClientRect();
                leftBtn.style.top = ( rect.bottom / 2 ) + "px";
                leftBtn.style.left = rect.left - 55 + "px";
                rightBtn.style.top = ( rect.bottom / 2 ) + "px";
                rightBtn.style.right = rect.left - 55 + "px";
            }
        });
    }

    slideImages.forEach((image) => {
        image.addEventListener("click", (event) => {
            modal.classList.add("open");
            modalImage.src = event.target.src;
            const rect = modalImage.getBoundingClientRect();
            leftBtn.style.top = ( rect.bottom / 2 ) + "px";
            leftBtn.style.left = rect.left - 55 + "px";
            rightBtn.style.top = ( rect.bottom / 2 ) + "px";
            rightBtn.style.right = rect.left - 55 + "px";
        });
    });

    closeButton.addEventListener("click", (e) => {
        modal.classList.remove("open");
    });

    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.classList.remove("open");
        }
    });

    document.addEventListener("keydown", (e) => {
        if(modal.classList.contains("open")){
            if(e.key === 'Escape'){
                modal.classList.remove("open");
            }else if(e.key === 'ArrowLeft'){
                swiper[currentSwiper].slidePrev();
            }else if(e.key === 'ArrowRight'){
                swiper[currentSwiper].slideNext();
            }
        }
    });

    leftBtn.addEventListener("click", () => {
        swiper[currentSwiper].slidePrev();
    });

    rightBtn.addEventListener("click", () => {
        swiper[currentSwiper].slideNext();
    })


    // 백준 정보 가져오기
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


    // 프로그래머스 데이터 가져오기
    const score = document.querySelector("#score");
    const solvedChallengesCount = document.querySelector("#solvedChallengesCount");
    const updateDate = document.querySelector("#updateDate");

    var xhr2 = new XMLHttpRequest();
    xhr2.onreadystatechange = function() {
        if (xhr2.readyState === xhr2.DONE) {
            if (xhr2.status === 200 || xhr2.status === 201) {
                var data = JSON.parse(xhr2.response);
                score.innerHTML = addCommas(data.score);
                solvedChallengesCount.innerHTML = addCommas(data.solvedChallengesCount);
                updateDate.innerHTML = "※ " + data.updateDate + " 반영";
            } else {
                console.error(xhr2.responseText);
            }
        }
    };
    xhr2.open('GET', 'file/programmers_status.json');
    xhr2.send();

    // 줌 기능
    const zoomValue = document.querySelector('#currentPer');
    const zoomIn = document.querySelector('#zoomIn');
    const zoomOut = document.querySelector('#zoomOut');
    let nowZoom = 100;

    function zooms() {
        zoomValue.textContent = nowZoom + '%';
        document.querySelector('.wrap').style.zoom = nowZoom + "%";
        if(nowZoom == 60) {
            return;
        }
        if(nowZoom == 200) {
            return;
        }
    }

    zoomValue.addEventListener('click', () => {
        nowZoom = 100;
        zooms();
    });

    zoomIn.addEventListener('click', () => {
        nowZoom = nowZoom + 20;

        // 화면크기 최대 확대율 200%
        if(nowZoom >= 200){
            nowZoom = 200;
        }
        zooms();
    });

    zoomOut.addEventListener('click', () => {
        nowZoom = nowZoom - 20;

        // 화면크기 최대 축소율 70%
        if(nowZoom <= 60){
            nowZoom = 60;
        }
        zooms();
    });


    // 현재 스크롤 위치 감지
    let currentScrollEmenet = null;
    var findCenterElement = function() {
        var center = $(window).scrollTop() + ($(window).height() / 2);
        var result = null;

        $('.group').each(function() {
            var top = $(this).offset().top;
            var bottom = top + $(this).outerHeight();

            if (top <= center && center <= bottom) {
                result = this;
                return false; // break the loop
            }
        });
        if(currentScrollEmenet === result) return null;
        else currentScrollEmenet = result;
        return result;
    }

    $(window).on('scroll', function() {
        const centerElement = findCenterElement();
        if (centerElement) {
            const id = centerElement.id.split('-')[0];
            $('.pageMenu').removeClass('selected');
            $(`#${id}Btn`).addClass('selected');
        }
    });

}

const pdfMake = () => {
    if(!confirm('PDF를 생성하시겠습니까?')) return;
    showLoadingOverlay();
    const tBoldEle = document.querySelectorAll(".t-bold");
    tBoldEle.forEach((e) => {
        e.classList.remove("t-bold");
        e.classList.add("t-bold-tmp");
    });

    let doc = new jsPDF('p', 'mm');
    let imgWidth = 210; // 이미지 가로 길이(mm) A4 기준
    let pageHeight = imgWidth * 1.414;  // 출력 페이지 세로 길이 계산 A4 기준

    // 로딩 화면 보이기
    showLoadingOverlay();

    // 캡쳐할 요소 그룹
    const groups = [['.top', '#menu1', '#menu2', '#menu3'], ['#menu4'], ['#menu5'], ['#menu5-2'], ['#menu5-3'], ['#menu6', '#menu7', '#menu8', '#menu9']];

    const captureGroupAndAddToPdf = (group) => {
        // 모든 요소를 일단 숨김
        $('.top').hide();
        $('.main .container').children().hide();

        // 현재 그룹의 요소만 보임
        group.forEach(selector => {
            $(selector).show();
        });

        return html2canvas($('.wrap')[0]).then(canvas => {
            let imgData = canvas.toDataURL('image/jpeg', 1);
            let imgHeight = canvas.height * imgWidth / canvas.width;
            let heightLeft = imgHeight;
            let position = 0;

            doc.addPage();
            position = heightLeft - imgHeight;

            // 첫 페이지 출력
            doc.addImage(imgData, 'JPEG', 0, position ,imgWidth ,imgHeight);
            // 한 페이지 이상일 경우 루프 돌면서 출력
            while (heightLeft >= pageHeight +20) {
                position -= pageHeight;
                doc.addPage();
                doc.addImage(imgData, 'JPEG', 0, position ,imgWidth ,imgHeight);
                heightLeft -= pageHeight;
            }
        });
    };

    groups.reduce((promiseChain, currentGroup) => {
        return promiseChain.then(() => captureGroupAndAddToPdf(currentGroup))
            .then(() => $('body .wrap').children().show());   // 여기서 모든 요소를 다시 보임.
    }, Promise.resolve()).then(() => {

        let today=new Date();
        let year=today.getFullYear();
        let month=('0'+(today.getMonth()+1)).slice(-2);
        let day=('0'+today.getDate()).slice(-2);
        let hours=('0'+today.getHours()).slice(-2);
        let minutes=('0'+today.getMinutes()).slice(-2);

        var dateString=year+month+day+hours+minutes;

        // 첫장에 빈 화면이 존재해 첫장 삭제
        doc.deletePage(1);
        // 파일 저장
        doc.save("박우진_"+dateString+'.pdf');

        tBoldEle.forEach((e) => {
            e.classList.add("t-bold");
            e.classList.remove("t-bold-tmp");
        });

        $('body .wrap').children().show();
        $('.main .container').children().show();
        // 로딩 화면 숨기기
        hideLoadingOverlay();
    });
}
// document.addEventListener("DOMContentLoaded", function () {
//     const groups = document.querySelectorAll(".group");
//     const observer = new IntersectionObserver(entries => {
//         entries.forEach(entry => {
//             const id = entry.target.getAttribute('id').split('-')[0];
//             if (entry.intersectionRatio > 0) {
//                 console.log(entry.intersectionRect);
//                 document.querySelectorAll('.pageMenu').forEach(page => {
//                     page.classList.remove('selected');
//                 });
//                 console.log('현재 보이는 요소의 ID:', entry.target.getAttribute('id'));
//                 document.querySelector(`#${id}Btn`).classList.add("selected");
//             }
//         });
//     });
//
//     groups.forEach(group => {
//         observer.observe(group);
//     });
// });




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

function addCommas(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
