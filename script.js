// Получаем элементы
var mainColorInput = document.getElementById('main-color');
var colorBoxes = document.querySelectorAll('.color-box');
var previewBoxes = document.querySelectorAll('.preview-box');

// Устанавливаем начальный цвет
mainColorInput.value = '#ff0000';
var mainColor = mainColorInput.value;

// Функция для создания оттенков
function adjustColor(color, amount) {
  var colorNum = parseInt(color.slice(1), 16);
  var r = (colorNum >> 16) + amount;
  var g = ((colorNum >> 8) & 0x00ff) + amount;
  var b = (colorNum & 0x0000ff) + amount;

  r = Math.min(Math.max(0, r), 255);
  g = Math.min(Math.max(0, g), 255);
  b = Math.min(Math.max(0, b), 255);

  return '#' + (r << 16 | g << 8 | b).toString(16).padStart(6, '0');
}

// Преобразование RGB в Hex
function rgbToHex(rgb) {
  var result = rgb.match(/\d+/g); // Извлекаем значения R, G, B
  if (!result) return '#000000'; // Если не удалось — возвращаем черный
  var r = parseInt(result[0]).toString(16).padStart(2, '0');
  var g = parseInt(result[1]).toString(16).padStart(2, '0');
  var b = parseInt(result[2]).toString(16).padStart(2, '0');
  return `#${r}${g}${b}`;
}

// Функция обновления цветов
function updateColors() {
  var lighter1 = adjustColor(mainColor, 50);
  var lighter2 = adjustColor(mainColor, 25);
  var darker1 = adjustColor(mainColor, -25);
  var darker2 = adjustColor(mainColor, -50);

  // Применяем цвета к основным прямоугольникам
  colorBoxes[0].style.backgroundColor = lighter1;
  colorBoxes[1].style.backgroundColor = lighter2;
  colorBoxes[2].style.backgroundColor = darker1;
  colorBoxes[3].style.backgroundColor = darker2;

  // Применяем цвета к превью прямоугольникам
  previewBoxes[0].style.backgroundColor = lighter1;
  previewBoxes[1].style.backgroundColor = lighter2;
  previewBoxes[2].style.backgroundColor = mainColor;
  previewBoxes[3].style.backgroundColor = darker1;
  previewBoxes[4].style.backgroundColor = darker2;

  previewBoxes.forEach(function(box, index) {
    box.setAttribute('title', rgbToHex(box.style.backgroundColor));
  });
}

// Событие при изменении основного цвета
mainColorInput.addEventListener('input', function() {
  mainColor = mainColorInput.value;
  updateColors();
});

// Обработчик клика на div в основной схеме (не копирует цвет)
colorBoxes.forEach((box) => {
  box.addEventListener('click', () => {
    mainColor = rgbToHex(box.style.backgroundColor);
    mainColorInput.value = mainColor;
    updateColors(mainColor);
  });
});

// Копирование цвета в буфер обмена
function copyToClipboard(color) {
  navigator.clipboard.writeText(color).then(function() {
    alert('Copied: ' + color);
  });
}

// Копирование цвета при клике на preview-box
previewBoxes.forEach(function(box) {
  box.addEventListener('click', function() {
    copyToClipboard(rgbToHex(box.style.backgroundColor));
  });
});

// Инициализация
updateColors();