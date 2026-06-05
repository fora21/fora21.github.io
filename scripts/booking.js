// booking.js - полная версия для всех апартаментов
document.addEventListener('DOMContentLoaded', function() {
    // Данные апартаментов 
    const apartmentsData = {
        'shale': {
            name: 'Шале',
            price: 35000,
            address: 'ул. Молодежная, 5',
            image: '../images/apartments/shale1.jpg',
            formspree: 'https://formspree.io/f/xblnlddz',
            type: 'standard'
        },
        'forest_house': {
            name: 'Лесной домик',
            price: 18000,
            address: 'ул. Луговая, 13А',
            image: '../images/apartments/forest1.jpg',
            formspree: 'https://formspree.io/f/mdkqkarl',
            type: 'standard'
        },
        'tent_places': {
            name: 'Палаточные места',
            price: 2000,
            address: 'Роща',
            image: '../images/apartments/tent1.jpg',
            formspree: 'https://formspree.io/f/xjknkgqo',
            type: 'standard'
        },
        'hostel': {
            name: 'Хостел',
            price: 2500,
            address: 'ул. Молодежная, 21',
            image: '../images/apartments/hostel1.jpg',
            formspree: 'https://formspree.io/f/mnnenjkv',
            type: 'per_person'
        },
        'merchant_apartment': {
            name: 'Купеческие апартаменты',
            price: 40000,
            address: 'ул. Молодежная, 6',
            image: '../images/apartments/merchant1.jpg',
            formspree: 'https://formspree.io/f/xblnldvo',
            type: 'standard'
        },
        'swiss_apartment': {
            name: 'Швейцарские апартаменты',
            price: 12000,
            address: 'ул. Пушкина, 7',
            image: '../images/apartments/swiss1.jpg',
            formspree: 'https://formspree.io/f/mrbnbedk',
            type: 'standard'
        },
        'beach_house': {
            name: 'Дом у пляжа',
            price: 78000,
            address: 'ул. Приозёрная, 3А',
            image: '../images/apartments/beach1.jpg',
            formspree: 'https://formspree.io/f/mwpgpvzo',
            type: 'standard'
        },
        'hotel_standard': {
            name: 'Гостиница Стандарт',
            price: 8000,
            address: 'ул. Молодежная, 22',
            image: '../images/apartments/hotel1.jpg',
            formspree: 'https://formspree.io/f/mrbnbeea',
            type: 'per_room_2pax',
            capacityPerRoom: 2
        }
    };

    function getApartmentType() {
        const path = window.location.pathname;
        const filename = path.split('/').pop().replace('.html', '');
        return filename.replace('booking_', '');
    }

    function getUrlParams() {
        const params = new URLSearchParams(window.location.search);
        return {
            checkin: params.get('checkin') || '',
            checkout: params.get('checkout') || '',
            adults: parseInt(params.get('adults')) || 0,
            children03: parseInt(params.get('children03')) || 0,
            children416: parseInt(params.get('children416')) || 0
        };
    }

    function init() {
        const aptType = getApartmentType();
        const apartment = apartmentsData[aptType];
        if (!apartment) {
            console.error('Апартамент не найден');
            return;
        }
        updatePageInfo(apartment);
        fillFormData(getUrlParams());
        calculateAndDisplayCost(getUrlParams().checkin, getUrlParams().checkout, apartment);
        setupFormHandlers(apartment);
    }

    function updatePageInfo(apartment) {
        const titleElement = document.querySelector('.apartment-title');
        const addressElement = document.querySelector('.apartment-address span');
        if (titleElement) titleElement.textContent = apartment.name;
        if (addressElement) addressElement.textContent = apartment.address;
        const imageElement = document.querySelector('.apartment-image img');
        if (imageElement && apartment.image) {
            imageElement.src = apartment.image;
        }
    }

    function fillFormData(urlParams) {
        const checkinInput = document.getElementById('checkin');
        const checkoutInput = document.getElementById('checkout');
        if (checkinInput && urlParams.checkin) checkinInput.value = urlParams.checkin;
        if (checkoutInput && urlParams.checkout) checkoutInput.value = urlParams.checkout;
        const totalGuests = urlParams.adults + urlParams.children03 + urlParams.children416;
        const guestsInput = document.getElementById('guests');
        if (guestsInput && totalGuests > 0) {
            guestsInput.value = totalGuests;
        }
    }

    function calculateNights(checkin, checkout) {
        if (!checkin || !checkout) return 0;
        const start = new Date(checkin);
        const end = new Date(checkout);
        const timeDiff = end.getTime() - start.getTime();
        return Math.ceil(timeDiff / (1000 * 3600 * 24));
    }

    function getTotalGuests() {
        const guestsInput = document.getElementById('guests');
        if (guestsInput && guestsInput.value) {
            return parseInt(guestsInput.value) || 0;
        }
        return 0;
    }

    function calculateAndDisplayCost(checkin, checkout, apartment) {
        const nights = calculateNights(checkin, checkout);
        let totalCost = 0;
        let calculationText = '';
        const guests = getTotalGuests();

        if (apartment.type === 'per_person') {
            totalCost = nights * apartment.price * guests;
            calculationText = `${nights} сут × ${guests} чел × ${apartment.price} ₽`;
        } 
        else if (apartment.type === 'per_room_2pax') {
            const rooms = Math.ceil(guests / 2);
            totalCost = nights * apartment.price * rooms;
            calculationText = `${rooms} номер(а) × ${apartment.price} ₽ × ${nights} сут`;
        } 
        else {
            totalCost = nights * apartment.price;
            calculationText = `${nights} сут × ${apartment.price} ₽`;
        }

        const advancePayment = Math.round(totalCost * 0.12);
        const finalPayment = totalCost - advancePayment;

        updateDisplay(nights, totalCost, advancePayment, finalPayment, calculationText);
        updateHiddenFields(totalCost, advancePayment, finalPayment);
    }

    function updateDisplay(nights, totalCost, advancePayment, finalPayment, calculationText) {
        // Обновляем текст расчёта — ищем по id, иначе берём первый спан в строке
        const calcTextEl = document.getElementById('calculationText') ||
                           document.querySelector('#calculationRow span:first-child') ||
                           document.querySelector('.calculation-row span:first-child');
        if (calcTextEl && calculationText) calcTextEl.textContent = calculationText;

        // Обновляем итоговую сумму (правый спан)
        const totalCostElement = document.getElementById('totalCost');
        if (totalCostElement) totalCostElement.textContent = formatPrice(totalCost);

        // Предоплата и оплата при заезде
        const advanceElement = document.getElementById('advancePayment');
        const finalElement = document.getElementById('finalPayment');
        if (advanceElement) advanceElement.textContent = formatPrice(advancePayment);
        if (finalElement) finalElement.textContent = formatPrice(finalPayment);
    }

    function updateHiddenFields(totalCost, advancePayment, finalPayment) {
        const totalCostInput = document.getElementById('total_cost');
        const advanceInput = document.getElementById('advance_payment');
        const finalInput = document.getElementById('final_payment');
        if (totalCostInput) totalCostInput.value = totalCost;
        if (advanceInput) advanceInput.value = advancePayment;
        if (finalInput) finalInput.value = finalPayment;
    }

    function formatPrice(price) {
        return new Intl.NumberFormat('ru-RU').format(price) + ' ₽';
    }

    // Валидация и отправка формы 
    function validateField(field) {
        const errorElement = document.getElementById(field.id + 'Error');
        if (!errorElement) return true;
        errorElement.style.display = 'none';
        errorElement.textContent = '';
        if (field.hasAttribute('required') && !field.value.trim()) {
            showError(errorElement, 'Это поле обязательно для заполнения');
            return false;
        }
        if (field.type === 'email' && field.value.trim()) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value)) {
                showError(errorElement, 'Введите корректный email');
                return false;
            }
        }
        if (field.type === 'tel' && field.value.trim()) {
            const digitsOnly = field.value.replace(/\D/g, '');
            if (digitsOnly.length < 10) {
                showError(errorElement, 'Введите корректный номер телефона');
                return false;
            }
        }
        return true;
    }

    function showError(errorElement, message) {
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
    }

    function validateForm() {
        let isValid = true;
        const requiredFields = document.querySelectorAll('#bookingForm input[required]');
        requiredFields.forEach(field => {
            if (!validateField(field)) isValid = false;
        });
        return isValid;
    }

    function setupFormHandlers(apartment) {
        const form = document.getElementById('bookingForm');
        if (!form) return;
        const inputs = form.querySelectorAll('input[required]');
        inputs.forEach(input => {
            input.addEventListener('blur', function() { validateField(this); });
        });
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmit(apartment);
        });
    }

    function handleFormSubmit(apartment) {
        if (!validateForm()) {
            alert('Пожалуйста, заполните все обязательные поля корректно');
            return;
        }
        const submitButton = document.querySelector('.submit-button');
        const originalText = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.textContent = 'Отправка...';

        const formData = new FormData();
        formData.append('Имя', document.getElementById('firstName').value);
        formData.append('Фамилия', document.getElementById('lastName').value);
        formData.append('Телефон', document.getElementById('phone').value);
        const additionalPhone = document.getElementById('additionalPhone').value;
        if (additionalPhone) formData.append('Дополнительный телефон', additionalPhone);
        formData.append('Количество гостей', document.getElementById('guests').value);
        const notes = document.getElementById('notes').value;
        if (notes) formData.append('Пожелания', notes);
        formData.append('Дата заезда', document.getElementById('checkin').value);
        formData.append('Дата выезда', document.getElementById('checkout').value);
        formData.append('Полная сумма', formatPrice(parseInt(document.getElementById('total_cost').value)));
        formData.append('Предоплата', formatPrice(parseInt(document.getElementById('advance_payment').value)));
        formData.append('Остаток к оплате', formatPrice(parseInt(document.getElementById('final_payment').value)));
        formData.append('Email', document.getElementById('email').value);
        formData.append('Тип апартамента', document.querySelector('input[name="apartment_type"]').value);
        formData.append('Цена за сутки', formatPrice(parseInt(document.querySelector('input[name="apartment_price"]').value)));

        fetch(apartment.formspree, {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
        })
        .then(response => {
            if (response.ok) return response.json();
            else throw new Error('Ошибка отправки');
        })
        .then(() => showSuccessNotification())
        .catch(error => {
            console.error(error);
            alert('Произошла ошибка при отправке формы. Попробуйте позже или свяжитесь с нами по телефону.');
        })
        .finally(() => {
            setTimeout(() => {
                submitButton.disabled = false;
                submitButton.textContent = originalText;
            }, 3000);
        });
    }

    function showSuccessNotification() {
        const notification = document.createElement('div');
        notification.className = 'success-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <div class="notification-icon">✅</div>
                <div class="notification-text">
                    <h3>Заявка отправлена!</h3>
                    <p>Мы свяжемся с вами в ближайшее время для подтверждения бронирования.</p>
                    <p>Через 5 секунд вы будете перенаправлены на страницу с развлечениями.</p>
                </div>
                <button class="notification-close" id="closeNotification">×</button>
            </div>
        `;
        document.body.appendChild(notification);
        setTimeout(() => notification.classList.add('show'), 100);
        const closeBtn = document.getElementById('closeNotification');
        if (closeBtn) closeBtn.addEventListener('click', () => closeNotificationAndRedirect(notification));
        setTimeout(() => closeNotificationAndRedirect(notification), 10000);
    }

    function closeNotificationAndRedirect(notification) {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) notification.parentNode.removeChild(notification);
            window.location.href = '../pages/entertainment.html';
        }, 300);
    }

    init();
});