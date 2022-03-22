window.onload = function() {

var buttonChk = document.getElementById("counter__submit"); // Кнопка "расчитать"
var buttonClr = document.getElementById("counter__clear"); // Кнопка "очитить"
var button = document.getElementsByClassName("counter__button"); // Коллекция кнопок
var inputHeight = document.getElementById("input_height"); // Поле ввода роста
var inputWeight = document.getElementById("input_weight"); // Поле ввода веса
var messageErrInputHeight = document.getElementById("counter__message_height-id"); // Поле сообщения некорректного ввода в поле ввода роста
var messageErrInputWeight = document.getElementById("counter__message_weight-id"); // Поле ввода веса
var infoReference = document.getElementById("counter__reference-id"); // Звездочка сноски
var infoReferenceText = document.getElementById("counter__reference-text-id"); // Текст сноски "всплывающий"
var answr = document.getElementById("counter__answer_id"); // Поле индекса
var message = document.getElementById("counter__message_id"); // Поле сообщения об ожидании
// Переменная сообщения диагноза
var msgAnswr = [
		'Дефицит массы тела*',
		'Нормальная масса тела*',
		'Избыточная масса тела*',
		'Ожирение (I степень)*',
		'Ожирение (II степень)*',
		'Ожирение (III степень)*',
];
// Переменная сообщения об ожидании
var msgLoad = [
		'Идёт рассчет, ждите',
		'Пару секунд и посчитаем',
		'Немного терпения',
];

// Сноска видима
infoReference.onmouseover = function() {
	infoReferenceText.style.visibility = "visible";
}
// Сноска невидима
infoReference.onmouseout = function() {
	infoReferenceText.style.visibility = "hidden";
}
// НИЖЕ ЭКСПЕРИМЕНТЫ -----------------


// НИЖЕ РАБОТАЮЩИЙ КОД НЕ ЛОМАТЬ -----------------

// Закрываем сообщения о некорректно введенных данных
function messageErrInputCloser() {
	messageErrInputHeight.style.visibility = "hidden";
	inputHeight.style.backgroundColor = '#fff';
	inputHeight.style.color = '#000';
	messageErrInputWeight.style.visibility = "hidden";
	inputWeight.style.backgroundColor = '#fff';
	inputWeight.style.color = '#000';
	
}

// Проверяем поле ввода роста
function verificationInputHeight() {
	if (inputHeight.value < 145 || inputHeight.value > 300) {
		messageErrInputHeight.style.visibility = "visible";
		inputHeight.style.backgroundColor = '#F9BFBF';
		inputHeight.style.color = '#FE0000';
		return false;
	} else {
		messageErrInputCloser();
		return true;
	}
}
// Проверяем поле ввода веса
function verificationInputWeight() {
	if (inputWeight.value < 45 || inputWeight.value > 300) {
		messageErrInputWeight.style.visibility = "visible";
		inputWeight.style.backgroundColor = '#F9BFBF';
		inputWeight.style.color = '#FE0000';
		return false;
	} else {
		messageErrInputCloser();
		return true;
	}
}

function verificationInputData() {
	if (verificationInputHeight() === true && verificationInputWeight() === true) {
		strtCalc()
	} else {
		message.innerHTML = 'Введите характеристики';
		answr.innerHTML =  '';
	}
}

function strtCalc() {
	btnDisable(); // Отключение кнопки и изменение цвета фона для отключенной кнопки
	msgLoadContent(); // Сообщение на время задержки старта расчетов
	// Таймер задержки старта расчетов
	setTimeout(calcOfIndex, 2000, inputWeight.value, inputHeight.value);
}

// Активируем кнопки и меняем стиль на "активированную"
function btnUnDisabled() {
	var arr = Array.from(button);
	arr.forEach(function(item, i, arr){
		item.disabled = "";
		item.classList.remove('counter__button_deactivate');
	});
};

// Деактивируем кнопку и меняем стиль на "деактивированную"
function btnDisable() {
	var arr = Array.from(button);
	arr.forEach(function(item, i, arr){
		item.disabled = "disabled";
		item.classList.add('counter__button_deactivate');
	// Таймер задержки активации кнопки изменения цвета фона на активную
	setTimeout(btnUnDisabled, 2000);
	});
};

// Функция "случайное число" возвращаем случайное число для получения индекса
function getRandomInt(max) {
  return Math.round(Math.random() * max);
};
// Выводим сообщение на время задержки, для чего вызываем функцию "случайное число"
// максимальная граница равна длине массива с сообщениями
function msgLoadContent() {
	msgLoad.forEach(function(item, i, arr){
		console.log('item - ', item, i );
	});
	console.log('msgLoad - ', msgLoad.length );
	console.log('msgLoad() - ', msgLoad);
	var a = getRandomInt(msgLoad.length);
	console.log('a - ', a);
	message.innerHTML = msgLoad[a];
	console.log('message.innerHTML - ', message.innerHTML);
};

//Вычисляем массу и выводим сообщения ответа
function calcOfIndex(w, h) {
	h = h/100;
	var index = w / ( h * h );
	answr.innerHTML = (Math.round(index * 100))/100;
	
	if (index <= 18.5) {
		message.innerHTML = msgAnswr[0];
		message.style.backgroundColor = "#a3b02d";
	} else if (index < 24.9) {
		message.innerHTML = msgAnswr[1];
		message.style.backgroundColor = "#5b8d2e";
	} else if (index < 29.9) {
		message.innerHTML = msgAnswr[2];
		message.style.backgroundColor = "#e57d26";
	} else if (index < 34.9) {
		message.innerHTML = msgAnswr[3];
		message.style.backgroundColor = "#e15023";
	} else if (index < 39.9) {
		message.innerHTML = msgAnswr[4];
		message.style.backgroundColor = "#e15023";
	} else if (index > 39.9) {
		message.innerHTML = msgAnswr[5];
		message.style.backgroundColor = "#e15023";
	}
	
};

function startCalc() {
	btnDisable(); // Отключение кнопки и изменение цвета фона для отключенной кнопки
	msgLoadContent(); // Сообщение на время задержки старта расчетов
	// Таймер задержки старта расчетов
	setTimeout(calcOfIndex, 2000, inputWeight.value, inputHeight.value);
}

// Слушатели событий на поля ввода
inputHeight.addEventListener('change', verificationInputHeight, verificationInputData);
inputWeight.addEventListener('change', verificationInputWeight, verificationInputData);

buttonChk.onclick = function() {
	verificationInputData() // Проверяем введеные данные
	//startCalc()
	message.style.backgroundColor = "";
	answr.innerHTML = '';
};

// Отчистка значений инпутов и результатов
buttonClr.onclick = function() {
	messageErrInputCloser();
	answr.innerHTML = '';
	message.innerHTML = '';
	inputHeight.value = '';
	inputWeight.value = '';
};


}