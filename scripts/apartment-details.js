// Упрощенная галерея
class ApartmentGallery {
    constructor() {
        this.currentImageIndex = 0;
        this.allImages = [];
        this.touchStartX = 0;
        this.touchEndX = 0;
        this.isMobile = window.innerWidth <= 768;
        this.init();
        
        window.addEventListener('resize', () => {
            this.isMobile = window.innerWidth <= 768;
        });
    }

    init() {
        this.setupGallery();
        this.setupLightbox();
    }

    setupGallery() {
        const morePhotos = document.querySelector('.more-photos');

       
        this.collectAllImages();

       
        if (morePhotos) {
            morePhotos.addEventListener('click', () => {
                this.openLightbox(0);
            });
        }

        // Основное изображение
        const mainImage = document.querySelector('.main-image');
        mainImage.style.cursor = 'default';
        
        // Статичные миниатюры 
        const staticThumbs = document.querySelectorAll('.static-thumb');
        staticThumbs.forEach(thumb => {
            thumb.style.cursor = 'default';
        });
    }

    collectAllImages() {
        // Основное изображение
        const mainImage = document.querySelector('.main-image').src;
        
        // Две статичные миниатюры
        const staticThumbs = document.querySelectorAll('.static-thumb img');
        const thumbImages = Array.from(staticThumbs).map(thumb => thumb.src);
        
       
        this.allImages = [mainImage, ...thumbImages];
        
      
        const apartmentType = this.getApartmentType();
        this.addAdditionalImages(apartmentType);
    }

    getApartmentType() {
        const url = window.location.pathname;
        const pageName = url.split('/').pop().replace('.html', '');
        return pageName;
    }

    addAdditionalImages(apartmentType) {
        const additionalImages = this.getAdditionalImagesForApartment(apartmentType);
        this.allImages = [...this.allImages, ...additionalImages];
    }

    getAdditionalImagesForApartment(apartmentType) {
        const imagePaths = {
            'shale': [
                '../images/apartments/shale/shale4.jpg',
                '../images/apartments/shale/shale5.jpg',
                '../images/apartments/shale/shale6.jpg', 
                '../images/apartments/shale/shale7.jpg',
                '../images/apartments/shale/shale8.jpg',
                '../images/apartments/shale/shale9.jpg',
                '../images/apartments/shale/shale10.jpg',
                '../images/apartments/shale/shale11.jpg',
                '../images/apartments/shale/shale12.jpg',
                '../images/apartments/shale/shale13.jpg'
            ],
            'forest_house': [
                '../images/apartments/forest_house/forest2.jpg',
                '../images/apartments/forest_house/forest3.jpg',
                '../images/apartments/forest_house/forest4.jpg',
                '../images/apartments/forest_house/forest5.jpg',
                '../images/apartments/forest_house/forest6.jpg',
                '../images/apartments/forest_house/forest7.jpg'
            ],
            'hostel': [
                '../images/apartments/hostel/hostel2.jpg',
                '../images/apartments/hostel/hostel3.jpg',
                '../images/apartments/hostel/hostel4.jpg',
                '../images/apartments/hostel/hostel5.jpg'
            ],
            'merchant_apartment': [
                '../images/apartments/merchant_apartment/merchant2.jpg',
                '../images/apartments/merchant_apartment/merchant3.jpg',
                '../images/apartments/merchant_apartment/merchant4.jpg',
                '../images/apartments/merchant_apartment/merchant5.jpg',
                '../images/apartments/merchant_apartment/merchant6.jpg',
                '../images/apartments/merchant_apartment/merchant7.jpg',
                '../images/apartments/merchant_apartment/merchant8.jpg',
                '../images/apartments/merchant_apartment/merchant9.jpg',
                '../images/apartments/merchant_apartment/merchant10.jpg'
            ],
            'swiss_apartment': [
                '../images/apartments/swiss_apartment/swiss2.jpg',
                '../images/apartments/swiss_apartment/swiss3.jpg',
                '../images/apartments/swiss_apartment/swiss4.jpg',
                '../images/apartments/swiss_apartment/swiss5.jpg',
                '../images/apartments/swiss_apartment/swiss6.jpg',
                '../images/apartments/swiss_apartment/swiss7.jpg',
                '../images/apartments/swiss_apartment/swiss8.jpg'
            ],
            'beach_house': [
                '../images/apartments/beach_house/beach2.jpg',
                '../images/apartments/beach_house/beach3.jpg',
                '../images/apartments/beach_house/beach4.jpg',
                '../images/apartments/beach_house/beach5.jpg',
                '../images/apartments/beach_house/beach6.jpg',
                '../images/apartments/beach_house/beach7.jpg',
                '../images/apartments/beach_house/beach8.jpg',
                '../images/apartments/beach_house/beach9.jpg',
                '../images/apartments/beach_house/beach10.jpg',
                '../images/apartments/beach_house/beach11.jpg',
                '../images/apartments/beach_house/beach12.jpg',
                '../images/apartments/beach_house/beach13.jpg',
                '../images/apartments/beach_house/beach14.jpg'
            ],
            'hotel_standard': [
                '../images/apartments/hotel_standard/hotel2.jpg',   
                '../images/apartments/hotel_standard/hotel3.jpg',                
                '../images/apartments/hotel_standard/hotel4.jpg',
                '../images/apartments/hotel_standard/hotel5.jpg',
                '../images/apartments/hotel_standard/hotel6.jpg',
                '../images/apartments/hotel_standard/hotel7.jpg',
                '../images/apartments/hotel_standard/hotel8.jpg',
                '../images/apartments/hotel_standard/hotel9.jpg'
            ]
        };

        return imagePaths[apartmentType] || [];
    }

    setupLightbox() {
        this.lightbox = document.getElementById('lightbox');
        this.lightboxImage = document.querySelector('.lightbox-image');
        this.lightboxCounter = document.querySelector('.lightbox-counter');
        this.closeBtn = document.querySelector('.close-lightbox');
        this.prevBtn = document.querySelector('.prev');
        this.nextBtn = document.querySelector('.next');
        this.thumbnailsContainer = document.querySelector('.lightbox-thumbnails');
        this.dotsContainer = document.querySelector('.lightbox-dots');

        this.closeBtn.addEventListener('click', () => this.closeLightbox());
        this.prevBtn.addEventListener('click', () => this.navigate(-1));
        this.nextBtn.addEventListener('click', () => this.navigate(1));

        this.lightbox.addEventListener('click', (e) => {
            if (e.target === this.lightbox) {
                this.closeLightbox();
            }
        });

        // Свайп на мобильных
        this.lightbox.addEventListener('touchstart', (e) => {
            this.touchStartX = e.changedTouches[0].clientX;
        });

        this.lightbox.addEventListener('touchend', (e) => {
            this.touchEndX = e.changedTouches[0].clientX;
            this.handleSwipe();
        });

        document.addEventListener('keydown', (e) => {
            if (this.lightbox.style.display === 'flex') {
                if (e.key === 'ArrowLeft') this.navigate(-1);
                else if (e.key === 'ArrowRight') this.navigate(1);
                else if (e.key === 'Escape') this.closeLightbox();
            }
        });
    }

    handleSwipe() {
        const minSwipeDistance = 50;
        const swipeDistance = this.touchEndX - this.touchStartX;

        if (Math.abs(swipeDistance) > minSwipeDistance) {
            if (swipeDistance > 0) {
                this.navigate(-1);
            } else {
                this.navigate(1);
            }
        }
    }

    openLightbox(startIndex) {
        this.currentImageIndex = startIndex;
        this.showImage(startIndex);
        this.lightbox.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        if (this.isMobile) {
            this.createLightboxDots();
        } else {
            this.createLightboxThumbnails();
        }
    }

    closeLightbox() {
        this.lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    showImage(index) {
        this.currentImageIndex = index;
        this.lightboxImage.src = this.allImages[index];
        this.lightboxCounter.textContent = `${index + 1}/${this.allImages.length}`;
        
        if (this.isMobile) {
            document.querySelectorAll('.lightbox-dot').forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        } else {
            document.querySelectorAll('.lightbox-thumb').forEach((thumb, i) => {
                thumb.classList.toggle('active', i === index);
            });
        }
    }

    navigate(direction) {
        let newIndex = this.currentImageIndex + direction;
        if (newIndex < 0) newIndex = this.allImages.length - 1;
        if (newIndex >= this.allImages.length) newIndex = 0;
        this.showImage(newIndex);
    }

    createLightboxThumbnails() {
        this.thumbnailsContainer.innerHTML = '';
        
        this.allImages.forEach((src, index) => {
            const thumb = document.createElement('div');
            thumb.className = 'lightbox-thumb';
            if (index === this.currentImageIndex) {
                thumb.classList.add('active');
            }
            
            const img = document.createElement('img');
            img.src = src;
            img.alt = `Фото ${index + 1}`;
            
            thumb.appendChild(img);
            thumb.addEventListener('click', () => {
                this.showImage(index);
            });
            
            this.thumbnailsContainer.appendChild(thumb);
        });
    }

    createLightboxDots() {
        this.dotsContainer.innerHTML = '';
        
        this.allImages.forEach((src, index) => {
            const dot = document.createElement('button');
            dot.className = 'lightbox-dot';
            if (index === this.currentImageIndex) {
                dot.classList.add('active');
            }
            
            dot.addEventListener('click', () => {
                this.showImage(index);
            });
            
            this.dotsContainer.appendChild(dot);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ApartmentGallery();
});
