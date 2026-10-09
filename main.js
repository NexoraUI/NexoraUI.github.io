const menu = document.getElementById("menu");
const nav = document.querySelector(".nav");
const overlay = document.querySelector(".overlay");
const menuIcon = document.querySelector("i");
// const container = document.getElementById("container")
const body = document.querySelector("body");

menu.addEventListener("click", function (e) {
    e.stopPropagation();
    nav.classList.toggle("active");
    overlay.classList.toggle("active");
    if (nav.classList.contains("active")) {
        menuIcon.classList.replace("fa-bars", "fa-x");
    } else {
        menuIcon.classList.replace("fa-x", "fa-bars");
    }
});

body.addEventListener("click", function () {
    nav.classList.remove("active");
    overlay.classList.remove("active");
    menuIcon.classList.replace("fa-x", "fa-bars");
});

AOS.init({
    duration: 800,
    once: true,
    offset: 100,
});

let section = document.querySelectorAll(".main-section");
let navLinks = document.querySelectorAll(".nav ul li a");

window.addEventListener("scroll", () => {
    let current = "";
    section.forEach((section) => {
        let sectionTop = section.offsetTop;
        let sectionHeight = section.clientHeight;
        if (
            scrollY >= sectionTop - 200 &&
            scrollY < sectionTop + sectionHeight - 200
        ) {
            current = section.getAttribute("id");
        }
    });
    navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
        }
    });
});


let form = document.getElementById("contactForm");

// inputs (نحفظ العناصر نفسها وليس قيمها)
let nameInput = document.getElementById("full-name");
let emailInput = document.getElementById("email");
let subjectInput = document.getElementById("subject");
let messageInput = document.getElementById("message");

// errors
let emailError = document.getElementById("emailError");
let nameError = document.getElementById("nameError");
let subjectError = document.getElementById("subjectError");
let messageError = document.getElementById("messageError");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    // نقرأ القيم هنا، لحظة الإرسال، ونحذف المسافات الزائدة بـ trim()
    let name = nameInput.value.trim();
    let email = emailInput.value.trim();
    let subject = subjectInput.value.trim();
    let message = messageInput.value.trim();

    let isValid = true;

    // الاسم
    if (name === "") {
        nameError.style.display = "block";
        isValid = false;
    } else {
        nameError.style.display = "none";
    }

    // الموضوع
    if (subject.length < 5) {
        subjectError.style.display = "block";
        isValid = false;
    } else {
        subjectError.style.display = "none";
    }

    // الرسالة
    if (message.length < 20) {
        messageError.style.display = "block";
        isValid = false;
    } else {
        messageError.style.display = "none";
    }

    // البريد
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        emailError.style.display = "block";
        isValid = false;
    } else {
        emailError.style.display = "none";
    }

    // الإرسال
    if (isValid) {
        fetch("https://formspree.io/f/xykvavpd", {
            method: "POST",
            body: new FormData(form),
            headers: { Accept: "application/json" }
        })
        .then(response => {
            if (response.ok) {
                alert("تم الإرسال بنجاح!");
                form.reset();
            } else {
                alert("حدث خطأ، حاول مرة أخرى.");
            }
        })
        .catch(() => {
            alert("تعذّر الاتصال بالإنترنت، حاول مرة أخرى.");
        });
    }
});