"use strict";

var doActive = document.querySelector('.doActive');
var noActive = document.querySelector(".noActive");
var active = document.querySelector(".active");
var workCards = document.querySelectorAll(".workCards");
var qw = document.querySelectorAll(".qw");
var closeModal = document.querySelector("#closeModal");
var sendBtn = document.querySelector('.send-btn');
var radioButtons = document.querySelectorAll('.radio input[type="radio"]');
var navLinks = document.querySelectorAll('.nav-menu li');
var hasDriverLicense; // Добавляем обработчик события change к каждой радиокнопке

radioButtons.forEach(function (button) {
  button.addEventListener('change', function () {
    hasDriverLicense = this.value;
  });
}); // Отправка формы

sendBtn.addEventListener('click', function () {
  var fullName = document.getElementById('fullName').value;
  var city = document.getElementById('city').value;
  var age = document.getElementById('age').value;
  var contact = document.getElementById('contact').value; // Проверка на заполнение и минимальную длину

  if (fullName.length < 2 || city.length < 2 || age.length < 2 || contact.length < 2) {
    alert('Заполните все поля, каждое поле должно содержать минимум 2 символа.');
    return; // Прекращаем выполнение функции, если есть незаполненные поля
  }

  var botToken = 'text';
  var chatId = 'text';
  var message = "\n        *\u041D\u043E\u0432\u0430\u044F \u0437\u0430\u044F\u0432\u043A\u0430:*\n        *\u0424\u0418\u041E:* ".concat(fullName, "\n        *\u0413\u043E\u0440\u043E\u0434:* ").concat(city, "\n        *\u0412\u043E\u0437\u0440\u0430\u0441\u0442:* ").concat(age, "\n        *\u041A\u043E\u043D\u0442\u0430\u043A\u0442:* ").concat(contact, "\n        *\u0412\u043E\u0434\u0438\u0442\u0435\u043B\u044C\u0441\u043A\u043E\u0435 \u0443\u0434\u043E\u0441\u0442\u043E\u0432\u0435\u0440\u0435\u043D\u0438\u0435:* ").concat(hasDriverLicense || 'Не выбрано', "\n    ");
  fetch("https://api.telegram.org/bot".concat(botToken, "/sendMessage?chat_id=").concat(chatId, "&text=").concat(encodeURIComponent(message), "&parse_mode=Markdown"), {
    method: 'POST'
  }).then(function (response) {
    return response.json();
  }).then(function (data) {
    console.log(data);
  })["catch"](function (error) {
    console.error(error);
  });
}); // Бургер-меню

function checkScreenWidth() {
  var screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

  if (screenWidth < 700) {
    // Функция для закрытия nav-menu
    var closeNavMenu = function closeNavMenu() {
      navMenu.classList.remove('show-menu');
    }; // Добавляем слушателя событий для каждой ссылки


    var navMenu = document.querySelector('.nav-menu');
    navLinks.forEach(function (link) {
      link.addEventListener('click', closeNavMenu);
    });
  }
}

checkScreenWidth();
document.addEventListener('DOMContentLoaded', function () {
  var burgersMenu = document.querySelectorAll('.burgerMenu');
  var navMenu = document.querySelector('.nav-menu');
  burgersMenu.forEach(function (burgerMenu) {
    burgerMenu.addEventListener('click', function () {
      navMenu.classList.toggle('show-menu');
    });
  });
}); // Показ доп. инфо по клику

workCards.forEach(function (card) {
  card.addEventListener('click', function () {
    var paragraphElement = card.querySelector('p');
    var keyDropElement = card.querySelector('.keyDrop'); // Проверяем текущий стиль и применяем соответствующие изменения

    if (paragraphElement.style.display === 'flex') {
      paragraphElement.style.display = '-webkit-box';
      keyDropElement.setAttribute('src', './images/KeyboardArrowDown.png');
    } else {
      paragraphElement.style.display = 'flex';
      keyDropElement.setAttribute('src', './images/KeyboardArrowDown2.png');
    }
  });
}); // Показ доп. инфо по клику

qw.forEach(function (card) {
  card.addEventListener('click', function () {
    var paragraphElement = card.querySelector('.vid');
    var qwElement = card.querySelector('.qw-vid p');
    var keyDropElement = card.querySelector('.keyDrop'); // Проверяем текущий стиль и применяем соответствующие изменения

    if (paragraphElement.style.display === 'flex') {
      paragraphElement.style.display = 'none';
      qwElement.style.fontWeight = '400';
      keyDropElement.setAttribute('src', './images/KeyboardArrowDown.png');
    } else {
      qwElement.style.fontWeight = '700';
      paragraphElement.style.display = 'flex';
      keyDropElement.setAttribute('src', './images/KeyboardArrowDown2.png');
    }
  });
});
doActive.addEventListener('click', function () {
  noActive.style.display = 'none';
  active.style.display = 'flex';
});