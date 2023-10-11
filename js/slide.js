export function Slide() {

    document.addEventListener('DOMContentLoaded', function () {
        const openModalBtn = document.getElementById('openModalBtn');
        const imageModal = document.getElementById('imageModal');
        const spanClose = document.querySelector('.close-modal-preview');
        const btnClose = document.getElementById('close-modal-preview');
        const imageInput = document.getElementById('imageInput');
        const imagePreview = document.getElementById('imagePreview');
        const startSlideshowBtn = document.getElementById('startSlideshow');
        const slideshow = document.getElementById('slideshow');
        const hideImgSlideDefault = document.getElementById("default-img-slider")
        const controllSlide = document.getElementById("control-slide")


        // create(imagesArray)
        // Mở modal khi ấn nút "Chọn Ảnh"
        openModalBtn.addEventListener('click', function () {
            imageModal.style.display = 'block';
        });

        // Đóng modal khi ấn nút đóng hoặc click ngoài modal
        spanClose.addEventListener('click', function () {
            imageModal.style.display = 'none';
        });
        btnClose.addEventListener("click", function () {
            imageModal.style.display = 'none';
        })

        let imagesArray = []; // Mảng để lưu ảnh
        let imageUrls = [];

        // Định nghĩa hàm generateUniqueId
        function generateUniqueId() {
            return 'img-' + Math.random().toString(36).substr(2, 9);
        }
        // Xem trước ảnh khi chọn từ máy tính và lưu vào mảng
        imageInput.addEventListener('change', function () {
            imagesArray = []; // Xóa dữ liệu cũ trong mảng
            imagePreview.innerHTML = '';
            for (let i = 0; i < imageInput.files.length; i++) {
                const imgWrapper = document.createElement('div'); // Tạo thẻ div bao bọc mỗi thẻ img
                const span = document.createElement('span');
                const span1 = document.createElement('span');
                const icon = document.createElement('i');
                const img = document.createElement('img');
                const imgId = generateUniqueId(); // Tạo id động cho ảnh

                imgWrapper.classList.add("imagePreview-warrper");
                icon.classList.add("fa-solid", "fa-x");
                span.setAttribute("id", "icon-delete-img-preview");

                img.src = URL.createObjectURL(imageInput.files[i]);
                const imgInfo = { id: imgId, element: img, src: img.src };
                imagesArray.push(imgInfo);
                // imagesArray.push(img.src); // Lưu URL vào mảng

                img.addEventListener('click', function () {
                    openSlideshow(i);
                });
                icon.addEventListener('click', function () {
                    deleteImage(imgId);
                });
                imgWrapper.appendChild(span1);
                imgWrapper.appendChild(img); // Thêm thẻ img vào thẻ div bao bọc
                imgWrapper.appendChild(span);
                span.appendChild(icon);
                imagePreview.appendChild(imgWrapper); // Thêm thẻ div bao bọc vào imagePreview
            }
        });



        // Mở modal slideshow khi ấn nút "Bắt đầu Slideshow"
        startSlideshowBtn.addEventListener('click', function () {
            imageModal.style.display = 'none';
            if (imagesArray.length > 0) {
                hideImgSlideDefault.style.display = 'none'
                controllSlide.style.display = 'block'
                getUrlImg(imagesArray)
                createPrevireImg(imageUrls)
            }


        });

        function getUrlImg(imagesArray) {
            for (var i = 0; i < imagesArray.length; i++) {
                // console.log("imagesArray", imagesArray[i]);
                if (typeof imagesArray[i].src === 'string' && imagesArray[i].src.startsWith('blob:')) {
                    imageUrls.push(imagesArray[i].src);
                }
            }
        }

        // Hàm để xóa ảnh khỏi mảng và khỏi DOM dựa trên id hoặc class
        function deleteImage(imageId) {
            // Tìm phần tử trong mảng imagesArray
            const imageIndex = imagesArray.findIndex(imgInfo => imgInfo.id === imageId);

            if (imageIndex !== -1) {
                // Lấy thông tin ảnh từ mảng
                const removedImage = imagesArray.splice(imageIndex, 1)[0];
                console.log("removedImage", removedImage);
                const imageElement = removedImage.element;

                // Kiểm tra xem phần tử có tồn tại trong DOM không trước khi xóa
                if (imageElement && imageElement.parentNode) {
                    // Tìm thẻ div bao bọc (có class "imagePreview-warrper") của ảnh
                    const imgWrapper = imageElement.closest(".imagePreview-warrper");

                    // Kiểm tra xem thẻ div có class "imagePreview-warrper" tồn tại trước khi xóa
                    if (imgWrapper) {
                        imgWrapper.parentNode.removeChild(imgWrapper); // Xóa thẻ div khỏi DOM
                    }
                }
            }
            // console.log(imagesArray);
        }



        function openSlideshow(index) {
            slideshow.innerHTML = '';
            for (let i = index; i < imagesArray.length; i++) {
                const img = document.createElement('img');
                img.src = imagesArray[i].element.currentSrc;
                slideshow.appendChild(img);
            }
        }

        // console.log("imageUrls", imageUrls);
    });


    function createPrevireImg(imagesArray) {
        console.log(imagesArray);
        const slideshowContainer = document.querySelector('.slideshow-container');
        const dotContainer = document.querySelector('.dot-container');
        // Tạo slide và dấu chấm tương ứng từ mảng imagesArray
        if (imagesArray.length > 0) {
            for (let i = 0; i < imagesArray.length; i++) {
                const slide = document.createElement('div');
                slide.classList.add('mySlides');

                const numbertext = document.createElement('div');
                numbertext.classList.add('numbertext');
                numbertext.textContent = (i + 1) + ' / ' + imagesArray.length;

                const img = document.createElement('img');

                img.src = imagesArray[i];;
                img.style.width = '100%';

                slide.appendChild(numbertext);
                slide.appendChild(img);
                slideshowContainer.appendChild(slide);

                // const slide = document.createElement('div');
                const dot = document.createElement('span');
                dot.classList.add('dot');
                dot.setAttribute("id", `dot${i + 1}`)
                // dot.setAttribute('onclick', `currentSlide(${i + 1})`);
                dotContainer.appendChild(dot);
            }
            createControllSlide()

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
            var i;
            var slides = document.getElementsByClassName("mySlides");
            var dots = document.getElementsByClassName("dot");
            if (n > slides.length) { slideIndex = 1 }
            if (n < 1) { slideIndex = slides.length };
            for (i = 0; i < slides.length; i++) {
                slides[i].style.display = "none";
            }
            for (i = 0; i < dots.length; i++) {
                dots[i].classList.remove("active");
            }
            slides[slideIndex - 1].style.display = "block";
            dots[slideIndex - 1].classList.add("active");
        }

    }

}
// export default slide
