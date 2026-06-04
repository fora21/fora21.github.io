function initGallery() {
    const galleryGrid = document.getElementById('galleryGrid');
    
    // Очищаем галерею перед добавлением новых элементов
    galleryGrid.innerHTML = '';

    const galleryImages = [
        'gallery/photo1.jpg',
        'gallery/photo2.jpg',
        'gallery/photo3.jpg',
        'gallery/photo4.jpg',
        'gallery/photo5.jpg',
        'gallery/photo6.jpg',
        'gallery/photo7.jpg',
        'gallery/photo8.jpg'
    ];

    // Создаем элементы галереи
    galleryImages.forEach(imageSrc => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        
        const img = document.createElement('img');
        img.src = `images/${imageSrc}`;
        img.alt = "Фото базы отдыха ЭХО";
        img.loading = "lazy";
        
        galleryItem.appendChild(img);
        galleryGrid.appendChild(galleryItem);
        
        // Добавляем обработчик клика для лайтбокса
        galleryItem.addEventListener('click', function() {
            openLightbox(imageSrc);
        });
    });
}

function openLightbox(imageSrc) {
    // Создаем оверлей лайтбокса
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2000;
        cursor: pointer;
    `;
    
    // Создаем элемент изображения
    const img = document.createElement('img');
    img.src = `images/${imageSrc}`;
    img.alt = "Фото базы отдыха ЭХО";
    img.style.cssText = `
        max-width: 90%;
        max-height: 90%;
        border-radius: 10px;
        object-fit: contain;
    `;
    
    lightbox.appendChild(img);
    document.body.appendChild(lightbox);
    
    // Закрываем лайтбокс при клике
    lightbox.addEventListener('click', function() {
        if (document.body.contains(lightbox)) {
            document.body.removeChild(lightbox);
        }
    });
    
    // Закрываем на ESC
    document.addEventListener('keydown', function closeOnEsc(e) {
        if (e.key === 'Escape' && document.body.contains(lightbox)) {
            document.body.removeChild(lightbox);
            document.removeEventListener('keydown', closeOnEsc);
        }
    });
}

// Гарантируем, что галерея инициализируется только один раз
let galleryInitialized = false;

function initializeGalleryOnce() {
    if (!galleryInitialized) {
        initGallery();
        galleryInitialized = true;
    }
}

// Инициализируем при загрузке DOM
document.addEventListener('DOMContentLoaded', function() {
    initializeGalleryOnce();
});