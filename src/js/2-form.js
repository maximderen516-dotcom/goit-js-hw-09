'use strict';

const form = document.querySelector('.feedback-form');
const emailInput = form.elements.email;
const messageInput = form.elements.message;

const STORAGE_KEY = 'feedback-form-state';

let formData = { email: '', message: '' };

// 1. Читаємо значення зі сховища
const savedState = localStorage.getItem(STORAGE_KEY);

// 2. Якщо дані є, перетворюємо JSON на об'єкт
if (savedState) {
  const parsed = JSON.parse(savedState);

  // 3. Оновлюємо обидві властивості, "" як значення за замовчуванням
  formData.email = parsed.email ?? '';
  formData.message = parsed.message ?? '';

  // 4. Підставляємо значення в поля
  emailInput.value = formData.email;
  messageInput.value = formData.message;
}

form.addEventListener('input', event => {
  const { name, value } = event.target;

  formData[name] = value.trim();

  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
});

form.addEventListener('submit', event => {
  event.preventDefault();                         // 1. зупиняємо перезавантаження

  if (!formData.email || !formData.message) {     // 2. перевірка обох полів
    alert('Fill please all fields');
    return;                                       // форму і сховище не чіпаємо
  }

  console.log(formData);                          // 3. виводимо поточні значення

  localStorage.removeItem(STORAGE_KEY);           // 4. видаляємо запис зі сховища
  form.reset();                                   // 5. очищаємо поля
  formData = { email: '', message: '' };          // 6. скидаємо formData
});