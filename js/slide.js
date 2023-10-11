export function Slide() {
    const imageModal = document.getElementById('imageModal');
    const imageInput = document.getElementById('imageInput');
    const imagePreview = document.getElementById('imagePreview');
    const startSlideshowBtn = document.getElementById('startSlideshow');
    const hideImgSlideDefault = document.getElementById("default-img-slider");
    const controllSlide = document.getElementById("control-slide");

    let imagesArray = []; // Mảng để lưu ảnh
    let coppyImagesArray = [];
    let check = false;

    document.addEventListener('DOMContentLoaded', function () {
        // Mở modal khi ấn nút "Chọn Ảnh"
        document.getElementById('openModalBtn').addEventListener('click', function () {
            // imageModal.style.display = 'block';
            if (imagesArray.length > 0) {
                imagesArray = [];
                imagePreview.innerHTML = '';
            }
            // isSlideshowStarted = false; // Đặt lại trạng thái khi mở modal
            imageModal.style.display = 'block';
        });

        // Đóng modal khi ấn nút đóng hoặc click ngoài modal
        const closeFunctions = () => {
            imageModal.style.display = 'none';
        };

        document.querySelector('.close-modal-preview').addEventListener('click', closeFunctions);
        document.getElementById('close-modal-preview').addEventListener("click", closeFunctions);

        // Xem trước ảnh khi chọn từ máy tính và lưu vào mảng
        imageInput.addEventListener('change', function () {
            imagesArray = []; // Xóa dữ liệu cũ trong mảng
            imagePreview.innerHTML = '';

            for (let i = 0; i < imageInput.files.length; i++) {
                const imgId = generateUniqueId();
                const imgInfo = { id: imgId, element: null, src: URL.createObjectURL(imageInput.files[i]) };
                imagesArray.push(imgInfo);

                const imgWrapper = createImagePreviewElement(imgInfo, imgId);
                imagePreview.appendChild(imgWrapper);
            }
        });

        // Mở modal slideshow khi ấn nút "Bắt đầu Slideshow"


        startSlideshowBtn.addEventListener('click', function () {
            imageModal.style.display = 'none';
            if (imagesArray.length > 0) {
                hideImgSlideDefault.style.display = 'none';
                controllSlide.style.display = 'block';
                createPrevireImg(imagesArray);
            }
        });
    });

    function generateUniqueId() {
        return 'img-' + Math.random().toString(36).substr(2, 9);
    }

    function createImagePreviewElement(imgInfo, imgId) {
        const imgWrapper = document.createElement('div');
        imgWrapper.classList.add("imagePreview-warrper");

        const span1 = document.createElement('span');
        const img = document.createElement('img');

        const icon = document.createElement('i');
        const span = document.createElement('span');
        icon.classList.add("fa-solid", "fa-x");
        span.setAttribute("id", "icon-delete-img-preview");

        img.src = imgInfo.src;
        imgInfo.element = img;

        img.addEventListener('click', function () {
            openSlideshow(imagesArray.indexOf(imgInfo));
        });

        icon.addEventListener('click', function () {
            deleteImage(imgId);
        });

        imgWrapper.appendChild(span1);
        imgWrapper.appendChild(img);
        imgWrapper.appendChild(span);
        span.appendChild(icon);

        return imgWrapper;
    }

    function createPrevireImg(imagesArray) {
        // console.log("imagesArray", imagesArray);
        const slideshowContainer = document.querySelector('.slideshow-container');
        const dotContainer = document.querySelector('.dot-container');

        for (let i = 0; i < imagesArray.length; i++) {
            const slide = createSlideElement(i + 1, imagesArray[i]);
            slideshowContainer.appendChild(slide);

            const dot = createDotElement(i + 1);
            dotContainer.appendChild(dot);
        }

        createControllSlide();

        function createSlideElement(slideNumber, imgInfo) {
            // console.log("slideNumber, imgInfo", slideNumber, imgInfo, imagesArray);
            const slide = document.createElement('div');
            slide.classList.add('mySlides');

            const numbertext = document.createElement('div');
            numbertext.classList.add('numbertext');
            numbertext.textContent = slideNumber + ' / ' + imagesArray.length;

            const img = document.createElement('img');
            img.src = imgInfo.src;
            img.style.width = '100%';

            slide.appendChild(numbertext);
            slide.appendChild(img);

            return slide;
        }

        function createDotElement(dotNumber) {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            dot.setAttribute("id", `dot${dotNumber}`);
            return dot;
        }
    }

    function createControllSlide() {
        let slideIndex = 1;
        showSlides(slideIndex);

        document.getElementById('prevBtn').addEventListener('click', () => plusSlides(-1));
        document.getElementById('nextBtn').addEventListener('click', () => plusSlides(1));

        const dots = document.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => currentSlide(index + 1));
        });

        function plusSlides(n) {
            showSlides(slideIndex += n);
        }

        function currentSlide(n) {
            showSlides(slideIndex = n);
        }

        function showSlides(n) {
            const slides = document.getElementsByClassName("mySlides");
            const dots = document.getElementsByClassName("dot");
            if (n > slides.length) { slideIndex = 1; }
            if (n < 1) { slideIndex = slides.length; }
            for (let i = 0; i < slides.length; i++) {
                slides[i].style.display = "none";
            }
            for (let i = 0; i < dots.length; i++) {
                dots[i].classList.remove("active");
            }
            slides[slideIndex - 1].style.display = "block";
            dots[slideIndex - 1].classList.add("active");
        }
    }

    function deleteImage(imageId) {
        const imageIndex = imagesArray.findIndex(imgInfo => imgInfo.id === imageId);

        if (imageIndex !== -1) {
            const removedImage = imagesArray.splice(imageIndex, 1)[0];
            const imageElement = removedImage.element;

            if (imageElement && imageElement.parentNode) {
                const imgWrapper = imageElement.closest(".imagePreview-warrper");
                if (imgWrapper) {
                    imgWrapper.parentNode.removeChild(imgWrapper);
                }
            }
        }
    }

    function openSlideshow(index) {
        slideshow.innerHTML = '';
        for (let i = index; i < imagesArray.length; i++) {
            const img = document.createElement('img');
            img.src = imagesArray[i].element.currentSrc;
            slideshow.appendChild(img);
        }
    }
}
