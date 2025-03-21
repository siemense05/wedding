const swiperBody = new Swiper(".main__body-swiper", {
    slidesPerView: 3,
    grabCursor: true,
    spaceBetween: 0,
    centeredSlides: true,
    initialSlide: 1,
    loop: true,
});

const swiperExamples = new Swiper(".swiper__examples", {
    slidesPerView: 3,
    grabCursor: true,
    spaceBetween: 0,
    centeredSlides: true,
    initialSlide: 1,
    loop: true,
});

const swiperHotel = new Swiper(".hotel-photos__swiper", {
    slidesPerView: 1,
    scrollbar: {
        el: ".hotel-photos__scrollbar",
    },
});


document.addEventListener("DOMContentLoaded", () => {
    // Установите конечную дату
    const deadline = new Date("2025-07-10T00:00:00");

    // Найдите элементы DOM
    const elDays = document.querySelector(".timer__days");
    const elHours = document.querySelector(".timer__hours");
    const elMinutes = document.querySelector(".timer__minutes");
    const elSeconds = document.querySelector(".timer__seconds");

    // Функция склонения числительных
    const declensionNum = (num, words) => {
        return words[
            num % 100 > 4 && num % 100 < 20
                ? 2
                : [2, 0, 1, 1, 1, 2][num % 10 < 5 ? num % 10 : 5]
        ];
    };

    // Функция обновления таймера
    const updateTimer = () => {
        const now = new Date();
        const diff = Math.max(0, deadline - now);

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);

        elDays.textContent = String(days).padStart(2, "0");
        elHours.textContent = String(hours).padStart(2, "0");
        elMinutes.textContent = String(minutes).padStart(2, "0");
        elSeconds.textContent = String(seconds).padStart(2, "0");

        elDays.dataset.title = declensionNum(days, ["день", "дня", "дней"]);
        elHours.dataset.title = declensionNum(hours, ["час", "часа", "часов"]);
        elMinutes.dataset.title = declensionNum(minutes, [
            "минута",
            "минуты",
            "минут",
        ]);
        elSeconds.dataset.title = declensionNum(seconds, [
            "секунда",
            "секунды",
            "секунд",
        ]);

        if (diff === 0) {
            clearInterval(timerId);
        }
    };

    // Запустите таймер
    updateTimer();
    const timerId = setInterval(updateTimer, 1000);
});


// MODAL

const btn = document.querySelector('.form-guest__button')
const modal = document.querySelector('.modal')

btn.addEventListener('click', openModal)
modal.addEventListener('click', closeModal)
document.addEventListener('keydown', closeModal)


function openModal(e) {
    e.preventDefault()
    document.body.classList.toggle('body--opened-modal')
}

function closeModal(e) {
    const target = e.target

    if (target.closest('.modal__close') || target.classList.contains('modal') || target.classList.contains('button') || e.code === 'Escape'
    )
        
    document.body.classList.remove('body--opened-modal')
}


// FORM

document.addEventListener('DOMContentLoaded', function () {
    const dropdownCustom = document.querySelector('.custom-dropdown')
    const dropdownHeader = document.querySelector('.dropdown-header');
    const dropdownOptions = document.querySelector('.dropdown-options');
    const selectedOptionInput = document.getElementById('selected-option');
    const arrow = document.querySelector('.arrow');

    // Открытие/закрытие списка
    dropdownHeader.addEventListener('click', function () {
        dropdownCustom.classList.toggle('open');
    });

    // Выбор варианта
    dropdownOptions.querySelectorAll('li').forEach(option => {
        option.addEventListener('click', function () {
            const value = this.getAttribute('data-value');
            const text = this.textContent;

            // Устанавливаем значение скрытого поля
            selectedOptionInput.value = value;

            // Обновляем текст заголовка
            dropdownHeader.querySelector('span').textContent = text;

            // Закрываем список
            dropdownCustom.classList.remove('open');
        });
    });

    // Закрытие списка при клике вне его
    document.addEventListener('click', function (event) {
        if (!dropdownHeader.contains(event.target) && !dropdownOptions.contains(event.target)) {
            dropdownCustom.classList.remove('open');
        }
    });
});
