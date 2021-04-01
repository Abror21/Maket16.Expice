class SLIDER {
    constructor(options) {
        this.slider = document.querySelector(options.slider);
        this.sliderWrapper = this.slider.querySelector('.slider__wrapper');
        this.sliderList = this.slider.querySelector('.slider__list');
        this.slides = this.sliderList.children;
        this.prev = this.slider.querySelector('.slider__left-btn');
        this.next = this.slider.querySelector('.slider__right-btn');
        this.imgs = this.slider.getElementsByTagName('img')

        this.sliderWidth = this.slider.clientWidth;
        this.sliderHeight = this.slider.clientHeight;
        this.direction = options.direction.toUpperCase() === 'Y' ? 'Y' : 'X';
        this.moveSize = this.direction == 'X' ? this.sliderWidth : this.sliderHeight;
        this.slideTime = isNaN(options.slideTime) == true ? options.slideTime : 1000;
        this.interval = isNaN(options.interval) != false ? 5000 : options.interval;
        this.activeSlide = 0;
        this.sliderList.style = `position: relative; width: ${this.sliderWidth}px; height: ${this.sliderHeight}px; overflow: hidden;`
        for (let i = 0; i < this.slides.length; i++) {
            let slide = this.slides[i];
            slide.style.transition = '0ms'
            slide.draggable = false
            slide.style = `position:absolute; width: ${this.sliderWidth}px;`
            if (i != this.activeSlide) {
                slide.style.transform = `translate${this.direction}(${this.moveSize}px)`
            }
            if (i == this.slides.length - 1) {
                slide.style.transform = `translate${this.direction}(-${this.moveSize}px)`
            }
        }

        let interval = setInterval(() => {
            this.move(this.next)
        }, this.interval)

        this.slider.addEventListener('mouseover', () => {
            clearInterval(interval)
        });
        this.slider.addEventListener('mouseleave', () => {
            interval = setInterval(() => {
                this.move(this.next)
            }, this.interval)
        })
        Array.from(this.imgs).forEach(img => {
            img.draggable = false
        })
        this.prev.addEventListener('click', () => this.move(this.prev));
        this.next.addEventListener('click', () => this.move(this.next));
    }

    move(btn) {
        this.prev.disabled = true;
        this.next.disabled = true;
        setTimeout(() => {
            this.prev.disabled = false;
            this.next.disabled = false;
        }, this.slideTime)
        let leftOrRight = btn == this.prev ? this.moveSize : this.moveSize * -1;

        for (let i = 0; i < this.slides.length; i++) {
            let slide = this.slides[i];
            slide.style.transition = '0ms'
            if (i != this.activeSlide) {
                slide.style.transform = `translate${this.direction}(${leftOrRight * -1}px)`
            }
        }
        this.slides[this.activeSlide].style.transition = this.slideTime + 'ms'
        this.slides[this.activeSlide].style.transform = `translate${this.direction}(${leftOrRight}px)`
        if (btn == this.next) {
            this.activeSlide++
            if (this.activeSlide >= this.slides.length) {
                this.activeSlide = 0
            }
        }
        if (btn == this.prev) {
            this.activeSlide--
            if (this.activeSlide < 0) {
                this.activeSlide = this.slides.length - 1
            }
        }
        this.slides[this.activeSlide].style.transform = `translate${this.direction}(0px)`
        this.slides[this.activeSlide].style.transition = this.slideTime + 'ms'
    }
}

let slider = new SLIDER({
    slider: '.slider',
    direction: 'X',
    slideTime: 1000,
    autoplay: true,
    interval: 3000
});

let slider2 = new SLIDER({
    slider: '.slider',
    direction: 'X',
    slideTime: 1000,
    autoplay: true,
    interval: 3000
})
////////////////////////////////////////////////////
let user = document.querySelector('.header__user-wrapper');
let changeColor = document.querySelector('.header__change-color');
let changeHandle = document.querySelector('.header__change-handle');

user.addEventListener('click', (e) => {
    if (e.target !== changeColor && e.target !== changeHandle) {
        user.classList.toggle('active')
        if (user.classList.contains('active')) {
            changeColor.style.maxHeight = '30px';
        } else {
            changeColor.style.maxHeight = '0px';
        }
    }
})

let root = document.querySelector(':root')

if (localStorage.red && localStorage.green && localStorage.left && localStorage.right && localStorage.greenOp) {
    root.style.setProperty('--green', localStorage.green);
    root.style.setProperty('--greenOp', localStorage.greenOp);
    root.style.setProperty('--red', localStorage.red);
    changeHandle.style = `left: ${localStorage.left}; right: ${localStorage.right};`;
} else {
    localStorage.red = '#FE043C'
    localStorage.green = '#FE043C'
    localStorage.greenOp = '#35cd8cb3'
    localStorage.left = '3px'
    localStorage.right = 'unset'
}

changeColor.addEventListener('click', (e) => {
    if (e.target !== changeHandle) {
        changeColor.classList.toggle('active')
        if (changeColor.classList.contains('active')) {
            localStorage.setItem("green", "#FE043C");
            localStorage.setItem("greenOp", "#fe043cb3");
            localStorage.setItem("red", "#35CD8C");
            localStorage.setItem("left", "unset");
            localStorage.setItem("right", "3px");
            root.style.setProperty('--green', localStorage.green);
            root.style.setProperty('--greenOp', localStorage.greenOp);
            root.style.setProperty('--red', localStorage.red);
            changeHandle.style = `left: unset; right: 3px;`
        }
        else {
            localStorage.setItem("green", "#35CD8C");
            localStorage.setItem("greenOp", "#35cd8cb3");
            localStorage.setItem("red", "#FE043C");
            localStorage.setItem("left", "3px");
            localStorage.setItem("right", "unset");
            root.style.setProperty('--green', localStorage.green);
            root.style.setProperty('--greenOp', localStorage.greenOp);
            root.style.setProperty('--red', localStorage.red);
            changeHandle.style = `left: 3px; right: unset;`
        }
    }
})
/////////////////////////////////////////////////////////////////
const dateInput = document.querySelector('.advancebook__info-date');
const dateOutput = document.querySelector('.advancebook__dateOutput');


let currentDate = new Date().toLocaleDateString().slice(0, 2);
let currentMonth = new Date().toLocaleDateString().slice(3, 5);
let currentYear = new Date().toLocaleDateString().slice(6);

dateOutput.innerText = currentDate + '-' + currentMonth + '-' + currentYear;

dateInput.addEventListener('change', () => {
    let year = dateInput.value.slice(0, 4)
    let month = dateInput.value.slice(5, 7)
    let day = dateInput.value.slice(8)
    dateOutput.innerText = day + '-' + month + '-' + year
})
////////////////////////////////////////////////////////
let timeInput = document.querySelector('.advancebook__info-time');
let timeOutput = document.querySelector('.advancebook__timeOutput');

let hours = new Date().getHours();
let minutes = new Date().getMinutes();

if (hours < 12) {
    timeOutput.innerText = hours + '.' + minutes + ' AM'
} else {
    timeOutput.innerText = hours + '.' + minutes + ' PM'
}

timeInput.addEventListener('change', () => {
    let hour = timeInput.value.slice(0, 2)
    let minute = timeInput.value.slice(3, 5)

    if (hour < 12) {
        timeOutput.innerText = hour + '.' + minute + ' AM'
    } else {
        timeOutput.innerText = hour + '.' + minute + ' PM'
    }
})
////////////////////////////////////////////////////////////
let guests = document.querySelector('.advancebook__info-guests');
let guestsInput = document.querySelector('.advancebook__info-number');
let guestsOutput = document.querySelector('.advancebook__numberOutput');

guests.addEventListener('click', () => {
    guestsInput.classList.add('active')
})
guestsInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        guestsOutput.innerText = guestsInput.value + ' People';
        guestsInput.classList.remove('active')
    }
})

window.addEventListener('click', (e) => {
if (guestsInput.classList.contains('active')) {
        if (e.target !== guestsInput && e.target !== guests) {
            guestsInput.classList.remove('active')
            guestsOutput.innerText = guestsInput.value + ' People';
        }
    }
})
////////////////////////////////////////////////////////
let header = document.querySelector('.header');
// window.onscroll = function(){
//     if(pageYOffset > 50){
//         header.classList.add('active')
//     }else{
//         header.classList.remove('active')
//     }
// }
// ///////////////////////////////////////////////////////
let menu = document.querySelector('.menu');
let headerSeperater = document.querySelector('.header__seperater');
let wrapper = document.querySelector('.wrapper');
let closeMenu = document.querySelector('.close-menu');
let body = document.querySelector('body');

menu.addEventListener('click', ()=>{
    body.style.overflow = 'hidden'
    headerSeperater.classList.add('active')
    wrapper.classList.add('active')
})
wrapper.addEventListener('click', ()=>{
    body.style.overflow = 'visible'
    headerSeperater.classList.remove('active')
    wrapper.classList.remove('active')
})
closeMenu.addEventListener('click', ()=>{
    body.style.overflow = 'visible'
    headerSeperater.classList.remove('active')
    wrapper.classList.remove('active')
})