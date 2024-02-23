const doActive = document.querySelector('.doActive')
const noActive = document.querySelector(`.noActive`)
const active = document.querySelector(`.active`)
const workCards = document.querySelectorAll(`.workCards`)
const qw = document.querySelectorAll(`.qw`)
const closeModal = document.querySelector(`#closeModal`)
const sendBtn = document.querySelector('.send-btn')
const radioButtons = document.querySelectorAll('.radio input[type="radio"]');
const navLinks = document.querySelectorAll('.nav-menu li');
let hasDriverLicense


// Добавляем обработчик события change к каждой радиокнопке
radioButtons.forEach(button => {
    button.addEventListener('change', function () {
        hasDriverLicense = this.value
    });
});

// Отправка формы
sendBtn.addEventListener('click', () => {
    const fullName = document.getElementById('fullName').value;
    const city = document.getElementById('city').value;
    const age = document.getElementById('age').value;
    const contact = document.getElementById('contact').value;

    // Проверка на заполнение и минимальную длину
    if (fullName.length < 2 || city.length < 2 || age.length < 2 || contact.length < 2) {
        alert('Заполните все поля, каждое поле должно содержать минимум 2 символа.');
        return; // Прекращаем выполнение функции, если есть незаполненные поля
    }

    const botToken = 'text';
    const chatId = 'text';

    const message = `
        *Новая заявка:*
        *ФИО:* ${fullName}
        *Город:* ${city}
        *Возраст:* ${age}
        *Контакт:* ${contact}
        *Водительское удостоверение:* ${hasDriverLicense || 'Не выбрано'}
    `;

    fetch(`https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}&parse_mode=Markdown`, {
        method: 'POST'
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error(error);
        });
});

// Бургер-меню
function checkScreenWidth() {
    const screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

    if (screenWidth < 700) {
        const navMenu = document.querySelector('.nav-menu');

        // Функция для закрытия nav-menu
        function closeNavMenu() {
            navMenu.classList.remove('show-menu');
        }

        // Добавляем слушателя событий для каждой ссылки
        navLinks.forEach(link => {
            link.addEventListener('click', closeNavMenu);
        });
        
    }
}
checkScreenWidth();


document.addEventListener('DOMContentLoaded', function () {
    const burgersMenu = document.querySelectorAll('.burgerMenu');
    const navMenu = document.querySelector('.nav-menu');

    burgersMenu.forEach(burgerMenu => {
        burgerMenu.addEventListener('click', function () {
            navMenu.classList.toggle('show-menu');
        });
    })
});

// Показ доп. инфо по клику
workCards.forEach(card => {
    card.addEventListener('click', () => {
        const paragraphElement = card.querySelector('p');
        const keyDropElement = card.querySelector('.keyDrop');

        // Проверяем текущий стиль и применяем соответствующие изменения
        if (paragraphElement.style.display === 'flex') {
            paragraphElement.style.display = '-webkit-box';
            keyDropElement.setAttribute('src', './images/KeyboardArrowDown.png');
        } else {
            paragraphElement.style.display = 'flex';
            keyDropElement.setAttribute('src', './images/KeyboardArrowDown2.png');
        }
    })
})

// Показ доп. инфо по клику
qw.forEach(card => {
    card.addEventListener('click', () => {
        const paragraphElement = card.querySelector('.vid');
        const qwElement = card.querySelector('.qw-vid p');
        const keyDropElement = card.querySelector('.keyDrop');

        // Проверяем текущий стиль и применяем соответствующие изменения
        if (paragraphElement.style.display === 'flex') {
            paragraphElement.style.display = 'none';
            qwElement.style.fontWeight = '400'
            keyDropElement.setAttribute('src', './images/KeyboardArrowDown.png');
        } else {
            qwElement.style.fontWeight = '700'
            paragraphElement.style.display = 'flex';
            keyDropElement.setAttribute('src', './images/KeyboardArrowDown2.png');
        }
    })
})


doActive.addEventListener('click', () => {
    noActive.style.display = 'none'
    active.style.display = 'flex'
})