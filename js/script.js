document.addEventListener("DOMContentLoaded", () => {

    const tabs = document.querySelectorAll(".tabheader__item"),
        tabcontent = document.querySelectorAll(".tabcontent"),
        tabparent = document.querySelector(".tabheader__items");

    function hideTabContent() {
        tabcontent.forEach((item) => {
            item.style.display = "none";
        });

        tabs.forEach(item => {
            item.classList.remove("tabheader__item_active");

        });
    }
    hideTabContent();

    function showTabContent(i = 0) {
        tabcontent[i].style.display = "block";
        tabs[i].classList.add("tabheader__item_active");
    }
    showTabContent();

    tabparent.addEventListener("click", (event) => {
        const target = event.target;

        if (target && target.classList.contains("tabheader__item")) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

    // Timer

    const deadline = "2022-09-13";

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor((t / (1000 * 60 * 60)) % 24),
            minutes = Math.floor((t / (1000 * 60)) % 60),
            seconds = Math.floor((t / 1000) % 60);

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),

            timeInterval = setInterval(updateClock, 1000);

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = t.days;
            hours.innerHTML = t.hours;
            minutes.innerHTML = t.minutes;
            seconds.innerHTML = t.seconds;

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }
    setClock('.timer', deadline);

    // Modal

    const modalTrigger = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal'),
        modalClose = document.querySelector('[data-close]');

    console.log(modalTrigger, modal, modalClose);

    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        //Если тригер уже был нажат, появление окна через таймер не будет
        clearTimeout(modalTimerId);
        //modal.classList.toggle('show');
    }

    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
        //modal.classList.toggle('show');
    }

    modalTrigger.forEach((item) => {
        item.addEventListener('click', openModal);
    });
    modalClose.addEventListener('click', closeModal);

    // Закрытие модалки при клике на подлжку
    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });
    // Закрытие модалки при нажатии esc
    document.addEventListener('keydown', (event) => {
        if (event.code === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });

    // Открытие окна через 3 секунды
    const modalTimerId = setTimeout(openModal, 8000);

    //Открытие модалки при скроле до конца страницы
    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }
    window.addEventListener('scroll', showModalByScroll);

    // Classes

    const cardItem = document.querySelectorAll('.menu__item'),
        cardWrapper = document.querySelector('[data-wrapper]');

    cardItem.forEach(item => {
        item.remove();
    });

    class Card {
        constructor(title, descr, cost) {
            this.title = title;
            this.descr = descr;
            this.cost = cost;
        }

        render() {
            const cardCreateElement = document.createElement('div');

            cardCreateElement.innerHTML = `<div class="menu__item"> <img src = "img/tabs/vegy.jpg" alt = "vegy" ><h3 class="menu__item-subtitle">${this.title}</h3> <div class="menu__item-descr">${this.descr}</div> <div class="menu__item-divider"></div> <div class="menu__item-price"> <div class="menu__item-cost">Цена:</div> <div class="menu__item-total"><span>${this.cost}</span> грн/день</div> </div>`;

            cardWrapper.append(cardCreateElement);

        }
    }

    new Card('Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        283).render();

    new Card('Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        283).render();

    new Card('Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        283).render();
});