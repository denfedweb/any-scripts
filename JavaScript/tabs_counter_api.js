window.addEventListener("DOMContentLoaded", function () {

    'use strict';

    //табы на странице
    let tab = document.querySelectorAll(".info-header-tab"),
        info = document.querySelector(".info-header"),
        tabContent = document.querySelectorAll(".info-tabcontent");

    function hideTabContent(a) {
        for (let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove("show");
            tabContent[i].classList.add("hide");
        }

    }

    hideTabContent(1); //заменяет (а) в функции хайдконтент и показывает первый таб
    function showTabContent(b) {
        if (tabContent[b].classList.contains("hide")) { //проверка действительно ли этот элемент скрыт
            tabContent[b].classList.remove("hide");
            tabContent[b].classList.add("show");

        }

    }


    info.addEventListener("click", function (e) {
        let target = e.target;
        if (target && target.classList.contains("info-header-tab")) {
            for (let i = 0; i < tab.length; i++) {
                if (target == tab[i]) {
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                }

            }

        }
    });


    // таймер отсчета до

    let deadline = "2019-10-21"; //отсчет до какого времени 

    function getTimeRemaining(endtime) {
        let t = Date.parse(endtime) - Date.parse(new Date()),
            seconds = Math.floor((t / 1000) % 60),
            minutes = Math.floor((t / 1000 / 60) % 60),
            hours = Math.floor((t / (1000 * 60 * 60)));
        // hours = Math.floor((t/1000/60/60) % 24),//если нужны и дни
        // days = Math.floor((t/(1000*60*60*24))); //если нужны и дни
        return {
            "total": t,
            "hours": hours,
            "minutes": minutes,
            "seconds": seconds
        };
    }

    function setClock(id, endtime) {
        let timer = document.getElementById(id),
            hours = timer.querySelector(".hours"),
            minutes = timer.querySelector(".minutes"),
            seconds = timer.querySelector(".seconds"),
            timeInterval = setInterval(updateClock, 1000);

        function updateClock() {
            let t = getTimeRemaining(endtime);
            hours.textContent = t.hours;
            minutes.textContent = t.minutes;
            seconds.textContent = t.seconds;
            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }
    setClock("timer", deadline);

    //модальное окно

    let more = document.querySelector(".more"),
        overlay = document.querySelector(".overlay"),
        close = document.querySelector(".popup-close");

    more.addEventListener("click", () => {
        overlay.style.display = "block";
        this.classList.add("more-splash"); //анимация на кнопку, на которую нажал
        document.body.style.overflow = "hidden"; //запрет на прокрутку страницы, (неработает)
    });
    close.addEventListener("click", () => {
        overlay.style.display = "none";
        more.classList.remove("more-splash"); //убрана this ибо класс будет убран у крестика
        document.body.style.overflow = ""; //запрет на прокрутку страницы, (неработает)
    });

    ///отправка формы на сервер

    let message = {
        loading: "Загрузка...",
        success: "Спасибо скоро мы с вами свяжемся!",
        failure: "Что-то пошло не так..."
    };
    let form = document.querySelector(".main-form"),
        input = form.getElementsByTagName("input"),
        statusMessage = document.createElement("div");

    statusMessage.classList.add("status"); //добавить класс к новому элементу

    form.addEventListener("submit", function (e) { //прослушиватель к форме а не к кнопке
        e.preventDefault(); //отменяем стнд поведение браузера(перезагрузка страницы при нажатии кнопки)
        form.appendChild(statusMessage); //добавляем в форму новый див
        let request = new XMLHttpRequest();
        request.open("POST", "server.php"); //метод и url сервера куда будем обращаться 
        //    request.setRequestHeader ("Content-Type", "application/x-www-form-urlencoded");//данные получены из формы
        request.setRequestHeader("Content-Type", "application/json; charset=utf-8"); //если нужны данные в формате json 
        let formData = new FormData(form); //во внутрь указать ту форму откуда получены данные, в formData получаем все что ввел пользователь

        let obj = {}; //пустой обьект что бы положить туда данные (если нужны данные в формате json)
        formData.forEach(function (value, key) { //помещаем все данные из formdata в obj (если нужны данные в формате json)
            obj[key] = value; //заполняем обьект данными из formData
        });
        let json = JSON.stringify(obj); //превращаем formData в json (если нужны данные в формате json)

        request.send(json); //если не нужен формат json, просто указать formData внутри 
        request.addEventListener("readystatechange", function () {
            if (request.readyState < 4) {
                statusMessage.innerHTML = message.loading;
            } else if (request.readyState == 4 && request.status == 200) {
                statusMessage.innerHTML = message.success;
            } else {
                statusMessage.innerHTML = message.failure;
            }

        });
        for (let i = 0; i < input.length; i++) { //очистить поле input после отправки
            input[i].value = "";

        }

    });

    ///слайдер
    let slideIndex = 1, //параметр текущего слайда
        slides = document.querySelectorAll(".slider-item"),
        prev = document.querySelector(".prev"),
        next = document.querySelector(".next"),
        dotsWrap = document.querySelector(".slider-dots"),
        dots = document.querySelectorAll(".dot");
    showSlides(slideIndex); //вызов функции с текущим слайдом
    function showSlides(n) {
        if (n > slides.length) { //если слайды закончились, вернуться к первому
            slideIndex = 1;
        }
        if (n < 1) { //если листаем слайдер назад, то возвращает к последнему слайду
            slideIndex = slides.length;
        }

        slides.forEach((item) => item.style.display = "none");
        dots.forEach((item) => item.classList.remove("dot-active"));
        slides[slideIndex - 1].style.display = "block";
        dots[slideIndex - 1].classList.add("dot-active");
    }

    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    function currentSlide(n) {
        showSlides(slideIndex = n);
    }
    prev.addEventListener("click", () => {
        plusSlides(-1);

    });
    next.addEventListener("click", () => {
        plusSlides(1);

    });

    dotsWrap.addEventListener("click", function (e) {
        for (let i = 0; i < dots.length + 1; i++) {
            if (e.target.classList.contains("dot") && e.target == dots[i - 1]) {
                currentSlide(i);
            }

        }
    });

    ///калькулятор
    let persons = document.querySelectorAll(".counter-block-input")[0],
        restDays = document.querySelectorAll(".counter-block-input")[1],
        place = document.getElementById("select"),
        totalValue = document.getElementById("total"),
        personsSum = 0,
        daysSum = 0,
        total = 0;

    totalValue.innerHTML = 0;
    persons.addEventListener("change", function () {
        personsSum = this.value;
        total = (daysSum + personsSum) * 4000; //формула для расчетов
        if (persons.value == "" || restDays.value == "") {
            totalValue.innerHTML = 0;
        } else {
            totalValue.innerHTML = total;
        }
    });
    restDays.addEventListener("change", function () {
        daysSum = this.value;
        total = (daysSum + personsSum) * 4000; //формула для расчетов
        if (persons.value == "" || restDays.value == "") {
            totalValue.innerHTML = 0;
        } else {
            totalValue.innerHTML = total;
        }
    });
    place.addEventListener("change", function () {
        if (persons.value == "" || restDays.value == "") {
            totalValue.innerHTML = 0;
        } else {
            let a = total;
            totalValue.innerHTML = a * this.options[this.selectedIndex].value;
        }
    });


});