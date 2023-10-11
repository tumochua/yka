const languages = [
    {
        id: 1,
        name: "EN",
        logo: "./accset/US.svg",
        value: "en",
        className: "logo-language"
    },
    {
        id: 2,
        name: "Viet Nam",
        logo: "./accset/Vietnam.svg",
        value: "vn",
        className: "logo-language"
    },
    {
        id: 3,
        name: "Nhat",
        logo: "./accset/Korea.svg",
        value: "nh",
        className: "logo-language"
    },
]

export function Language() {
    const myLanguageModalToggle = document.getElementById("my-language-modal-toggle");
    const myLanguageModal = document.getElementById("my-language-modal");
    const languageList = document.getElementById("language-list");

    languages.forEach(language => {
        const li = document.createElement("li");
        const img = document.createElement("img");
        img.src = language.logo; // Đặt nguồn (src) cho thẻ <img> từ dữ liệu trong mảng
        // img.alt = language.name; // Đặt thuộc tính alt cho thẻ <img>
        // Thêm các lớp (class) từ dữ liệu trong mảng
        li.classList.add("languge-list-item");
        img.classList.add(language.className);

        li.appendChild(img); // Thêm thẻ <img> vào <li>
        li.appendChild(document.createTextNode(language.name)); // Thêm tên ngôn ngữ vào <li>
        languageList.appendChild(li); // Thêm <li> vào danh sách
    });

    let modalIsOpen = false;

    myLanguageModalToggle.addEventListener("click", () => {
        if (modalIsOpen) {
            myLanguageModal.style.display = "none";
        } else {
            // console.log('sdsabd', modalIsOpen);
            myLanguageModal.style.display = "block"; // Hiển thị modal khi click vào hình ảnh
        }

        modalIsOpen = !modalIsOpen;
    });

    myLanguageModal.addEventListener("click", (event) => {
        if (event.target.tagName === "LI") {
            myLanguageModal.style.display = "none"; // Đóng modal khi click vào phần tử LI
            modalIsOpen = false;
        }
        event.stopPropagation();
    });
}