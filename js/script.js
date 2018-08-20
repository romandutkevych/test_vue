

Vue.component('cb-item-0', {
    props:["pictures"],
    // data:{
    //     visible: true
    // },
    template:
                `<div class="cb-item cb-item-0">
                            <p class="cb-item__title">
                                Выберите изображение
                            </p>
                            <p class="cb-item__text">
                                для начала выберите основу, саму картину, на которую вы и гости вашего праздника будете
                                наносить отпечатки пальцев с пожеланиями
                            </p>
                            <div class="cb-item-pics">
                                <div v-for="(picture,index) in pictures"
                                     v-bind:class="'cb-item-pic cb-item-pic'+index"
                                     v-on:click="takePict(index)">
                                     <!--<p>{{picture.name}}</p>-->
                                    <img v-bind:src="picture.imageLink" v-bind:title="picture.name" v-bind:alt="picture.name"  width="176"
                                         height="220">
                                </div>
                            </div>
                        </div>`,
    methods:{
        takePict(index){
            this.$emit('take-pict', index);
        }
    }
});

Vue.component('cb-item-1', {
    props:["borders"],
    template:
                `<div class="cb-item cb-item-1">
                            <p class="cb-item__title">
                                Рама
                            </p>
                            <p class="cb-item__text">
                                подберите раму, которая подойдет случаю и впишется в интерьер, ведь вы же не просто
                                оставляете "пальчики", а создаете предмет декора для дома и офиса:
                            </p>
                            <div class="cb-item-borders">
                                <div v-for="(border,index) in borders"
                                     v-bind:class="'cb-item-border cb-item-border'+index"
                                     v-on:click="takeBorder(index)">
                                     <!--<p>{{picture.name}}</p>-->
                                    <img v-bind:src="border.imageLink" v-bind:title="border.name" v-bind:alt="border.name"  width="176"
                                         height="220">
                                </div>
                            </div>
                        </div>`,
    methods:{
        takeBorder:function (index) {
            this.$emit('take-border',index)
        }
    }
});

Vue.component('cb-item-2', {
    props:["fonts"],
    data(){
        return{
            n_text:{
                title:'',
                name:'',
                date:''
            },
            n_fonts:{
                name: '',
                current: 0,
            }
        }

    },
    template:
        `<div class="cb-item cb-item-2">
                            <p class="cb-item__title">
                                Заголовок
                            </p>
                            <p class="cb-item__text">
                                персонализируйте ваше "Дерево пожеланий"; вверху и внизу картины есть специальные поля,
                                которые можно заполнить по вашему усмотрению: вписать имена виновников торжества, или
                                особые пожелания, добавить дату, или логотип компании, если речь идет о корпоративном
                                подарке.
                            </p>
                            <div class="cb-item__line">
                                <input id="pic-title" @change="changeText" v-model="n_text.title" placeholder="Наша Свадьба" maxlength="22" type="text">
                                <span>Заголовок картины</span>

                            </div>
                            <div class="cb-item__line">
                                <input id="pic-name" @change="changeText" v-model="n_text.name" placeholder="Анастасия и Константин" maxlength="36" type="text">
                                <span>Подпись</span>
                            </div>
                            <div class="cb-item__line">
                                <input id="pic-date" @change="changeText"  v-model="n_text.date" placeholder="29 июля 2015" maxlength="26" type="text">
                                <span>Дата события</span>
                            </div>
                            <div class="cb-item__line--btns">
                                    <span v-for="(font,index) in fonts"
                                            v-model="n_fonts.name"
                                            v-bind:class="['btn-font', {'btn-font--active': n_fonts.current === index}]"
                                            v-bind:id="font.toLowerCase()"
                                            @click="changeFont(index,font)">
                                    {{font}}</span>
                            </div>
                        </div>`,
    methods:{
        changeText:function(){
                if(this.n_text.title =='' && this.n_text.name =='' && this.n_text.age ==''){
                    console.log('заповнити всі поля');
                }else{
                    this.$emit('change-txt',this.n_text);
                }
        },
        changeFont:function(index,font){
            this.n_fonts.current = index;
            this.n_fonts.name = font;
            console.log(this.n_fonts.current);
            this.$emit('change-font',this.n_fonts.name)
        }

    }
});

Vue.component('cb-item-3', {
    props:["marks"],
    data(){
       return{
           chekedmark:{
               num:'',
           }
       }
    },
    template:
        `<div class="cb-item cb-item-3">
                            <p class="cb-item__title">
                                Цвет отпечатков
                            </p>
                            <p class="cb-item__text">
                                наконец, подберите самые подходящие цвета красок, с помощью которых вы и оставите на
                                картине свой след на память!<br>
                                <strong>Обратите внимание: более 2-х цветов увеличат стоимость</strong>
                            </p>

                            <div class="cb-item-marks">
                                <div v-for="(mark,index) in marks" v-bind:class="'cb-item-mark'">
                                    <input v-bind:id="mark.id" v-bind:type="'checkbox'" v-bind:value="index" v-on:change="chekmakr(index)"
                                    @click="marks[index].chacked = !marks[index].chacked">
                                    <label v-bind:for="mark.id" v-bind:title="mark.name"></label>
                                    <img v-bind:src="mark.imageLink" v-bind:alt="mark.name" width="136" height="136">
                                </div>
                            </div>
                        </div>`,
    methods:{
        chekmakr(index){
            this.chekedmark.num = index;
            this.$emit('change-mark',this.chekedmark.num);
        },
        meetchek(index){
            this.$emit('meet-mark',index);
        }
    }
});

new Vue({
    el: "#app",
    data:{
        currentButton: 0,
        buttons:['Изображение','Рама','Заголовок','Цвет отпечатков'],
        pictures:[
            {
                number: '01',
                name: 'Картинка №1',
                imageLink: './img/pics/01.jpg'
            },
            {
                number: '02',
                name: 'Картинка №2',
                imageLink: './img/pics/02.jpg'
            },
            {
                number: '03',
                name: 'Картинка №3',
                imageLink: './img/pics/03.jpg'
            },
            {
                number: '04',
                name: 'Картинка №4',
                imageLink: './img/pics/04.jpg'
            },
            {
                number: '05',
                name: 'Картинка №5',
                imageLink: './img/pics/05.jpg'
            },
            {
                number: '06',
                name: 'Картинка №6',
                imageLink: './img/pics/06.jpg'
            },
            {
                number: '07',
                name: 'Картинка №7',
                imageLink: './img/pics/07.jpg'
            },
            {
                number: '08',
                name: 'Картинка №8',
                imageLink: './img/pics/08.jpg'
            },
            {
                number: '09',
                name: 'Картинка №9',
                imageLink: './img/pics/09.jpg'
            },
            {
                number: '10',
                name: 'Картинка №10',
                imageLink: './img/pics/10.jpg'
            },
            {
                number: '11',
                name: 'Картинка №11',
                imageLink: './img/pics/11.jpg'
            }
        ],
        borders:[
            {
                number:'01',
                name:'Багетная №1',
                imageLink:'./img/borders/rama-01.png'
            },
            {
                number:'02',
                name:'Багетная №2',
                imageLink:'./img/borders/rama-02.png'
            },
            {
                number:'03',
                name:'Багетная №3',
                imageLink:'./img/borders/rama-03.png'
            },
            {
                number:'04',
                name:'Багетная №4',
                imageLink:'./img/borders/rama-04.png'
            },
            {
                number:'05',
                name:'Багетная №5',
                imageLink:'./img/borders/rama-05.png'
            },
            {
                number:'06',
                name:'Багетная №6',
                imageLink:'./img/borders/rama-06.png'
            },
            {
                number:'07',
                name:'Багетная №7',
                imageLink:'./img/borders/rama-07.png'
            },
            {
                number:'08',
                name:'Багетная №8',
                imageLink:'./img/borders/rama-08.png'
            },
            {
                number:'09',
                name:'Багетная №9',
                imageLink:'./img/borders/rama-09.png'
            },
            {
                number:'10',
                name:'Багетная №10',
                imageLink:'./img/borders/rama-10.png'
            },
            {
                number:'11',
                name:'Багетная №11',
                imageLink:'./img/borders/rama-11.png'
            },
            {
                number:'12',
                name:'Багетная №12',
                imageLink:'./img/borders/rama-12.png'
            },
            {
                number:'13',
                name:'Багетная №13',
                imageLink:'./img/borders/rama-13.png'
            },
            {
                number:'14',
                name:'Багетная №14',
                imageLink:'./img/borders/rama-14.png'
            },
            {
                number:'15',
                name:'Багетная №15',
                imageLink:'./img/borders/rama-15.png'
            }
        ],
        marks:[
            {
                name:'BahamaBlue',
                id:'mark0',
                imageLink:'./img/marks/BahamaBlue.jpg',
                color: '#2456ca',
                number: 0,
                chacked:false
            },
            {
                name:'BambooLeaves',
                id:'mark1',
                imageLink:'./img/marks/BambooLeaves.jpg',
                color: '#6f8c19',
                number: 1,
                chacked:false
            },
            {
                name:'LilacPosies',
                id:'mark2',
                imageLink:'./img/marks/LilacPosies.jpg',
                color: '#aa288b',
                number: 2,
                chacked:false
            },
            {
                name:'PearTart',
                id:'mark3',
                imageLink:'./img/marks/PearTart.jpg',
                color: '#d1d22a',
                number: 3,
                chacked:false
            },
            {
                name:'RhubarbStalk',
                id:'mark4',
                imageLink:'./img/marks/RhubarbStalk.jpg',
                color: '#881f3c',
                number: 4,
                chacked:false
            },{
                name:'Tangelo',
                id:'mark5',
                imageLink:'./img/marks/Tangelo.jpg',
                color: '#f26a27',
                number: 5,
                chacked:false
            },
            {
                name:'CottageIvy',
                id:'mark6',
                imageLink:'./img/marks/CottageIvy.jpg',
                color: '#1d6b3e',
                number: 6,
                chacked:false
            },
            {
                name:'PearTart',
                id:'mark7',
                imageLink:'./img/marks/PearTart.jpg',
                color: '#e3e072',
                number: 7,
                chacked:false
            },
            {
                name:'BahamaBlue',
                id:'mark8',
                imageLink:'./img/marks/BahamaBlue.jpg',
                color: '#2456ca',
                number: 8,
                chacked:false
            },
            {
                name:'PottersClay',
                id:'mark9',
                imageLink:'./img/marks/PottersClay.jpg',
                color: '#d07a2d',
                number: 9,
                chacked:false
            }
        ],
        pictureitem: {
            itemlink:null,
            itemname: 'Не выбрано'
        },
        borderitem:{
            itemlink:null,
            itemname: 'Не выбрано'
        },
        picturetext:{
            title:'',
            name:'',
            date:'',
            font:'ariston'
        },
        picturefont:{
            font:'ariston'
        },
        fonts:['Ariston','DaVinci','Brody'],
        changemarks:[],
        calk:0,
        sendData:{
            picture:'',
            border:'',
            title:'',
            name:'',
            date:'',
            font:'',
            marks:[]
        },
        errors:[]
    },
    methods:{
        takepict: function(index){
            this.pictureitem.itemlink = this.pictures[index].imageLink;
            this.pictureitem.itemname = this.pictures[index].name;
            this.sendData.picture = this.pictureitem.itemname;
            this.calk = this.calk+1;
            console.log(this.sendData.picture);
            console.log(this.calk);
        },
        takebord:function (index) {
            this.borderitem.itemlink = this.borders[index].imageLink;
            this.borderitem.itemname = this.borders[index].name;
            this.sendData.border = this.borderitem.itemname;
            this.calk = this.calk+1;
            console.log(this.calk);
        },
        chantext:function (val) {
            this.picturetext= val;
            this.sendData.title = this.picturetext.title;
            this.sendData.name = this.picturetext.name;
            this.sendData.date = this.picturetext.date;
            console.log(this.picturetext.date, this.picturetext.title, this.picturetext.name);
        },
        changefont:function (font) {
            this.picturefont.font = font;
            this.sendData.font = this.picturefont.font;
            console.log(this.picturefont.font);
        },
        chagemarks:function (index) {

            if (this.marks[index].chacked == true) {
                this.changemarks.push(this.marks[index]);
                this.sendData.marks.push(this.marks[index]);
                this.calk = this.calk+1;
            } else{
               this.changemarks.splice(this.changemarks.num,1);
               this.sendData.marks.splice(this.sendData.marks.num,1);
                this.calk = this.calk-1;
            }

            console.log(this.calk);
        },
        readysendData(){
            console.log(this.sendData.picture);
            const str = JSON.stringify(this.sendData);
            axios.post(`https://jsonplaceholder.typicode.com/posts`,str)
                .then(response=>{})
                .catch(e=>{
                    this.errors.push(e);
                })
        }


    },
    computed: {
        currentComponent: function () {
            if(this.currentButton > 3){
                this.currentButton = 0;
            }
            return 'cb-item-' + this.currentButton;
        },
        readyForSent: function () {
           if(this.pictureitem.itemname != 'Не выбрано' && this.borderitem.itemname != 'Не выбрано' && this.changemarks != [] ){
               this.calk = 3;
               console.log(this.calk );
           }
        }
    }
});

(function ($) {
    $(document).ready(function () {


        //******* BEGIN SLIDERS *******
        $('.slider').slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            arrows: true,
            //centerMode: true,
            variableWidth: true
        });

        function productSlider() {
            var sliderFor = {
                infinite: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: true,
                fade: true,
                asNavFor: '.slider-nav'
            }

            var sliderNav = {
                infinite: true,
                slidesToShow: 3,
                centerPadding: 0,
                slidesToScroll: 1,
                asNavFor: '.slider-for',
                dots: false,
                arrows: true,
                centerMode: true,
                focusOnSelect: true
            }

            $('.slider-for').slick(sliderFor);
            $('.slider-nav').slick(sliderNav);
        }

        //инициализация слайдера на странице товара
        productSlider();
        //******* END SLIDERS *******

        //******* BEGIN PRODUCT SLIDER POPUP *******
        var speed = 300;
        $('.slider-for .slide, #overlay').click(function () {
            var wh = $(window).height(),
                ww = $(window).width(),
                slider = $('.slider-product'),
                overlay = $('#overlay');

            if (wh < 580 || ww < 720) {
                $('.slick-next').trigger('click');
                return false;
            } else if (wh < 720) {
                $('.slider-nav').addClass('hidden');
                $('.slider-product').addClass('no-thumbs');
            } else {
                $('.no-thumbs').removeClass('no-thumbs');
                $('.slider-nav').removeClass('hidden');
            }

            slider.animate({
                'opacity': 0
            }, speed, function () {

                $('body').toggleClass('oh');

                if (overlay.hasClass('active')) {
                    overlay.animate({
                        opacity: 0
                    }, speed * 2, function () {
                        //после анимации убираем класс 'active'
                        overlay.removeClass('active');
                    });
                } else {
                    overlay
                        .addClass('active')
                        .animate({
                            opacity: .8
                        }, speed * 2);
                }

                slider
                    .toggleClass('position-fixed')
                    .animate({'opacity': 1}, speed);

                $('.slider-for, .slider-nav').slick('unslick');
                productSlider();
                //переинициализация слайдера, после изменения его размеров
            });
        });
        //******* END PRODUCT SLIDER POPUP *******


        //******* BEGIN SELECT2 *******
        var isSelect = $('.product__select, .cart__select').length;
        if (isSelect) {
            $('.product__select select').select2({
                placeholder: "Характеристика",
                width: 250
            });
            $('.cart__select select').select2({
                placeholder: "Характеристика",
                width: 'auto'
            });
        }
        //******* END SELECT2 *******


        //******* BEGIN PRODUCT QTY *******
        $('.product__qty').each(function (ind, item) {
            var productQty = $(item).find('.product__qty__input'),
                itemId = $(item).attr('id'),
                minQty = productQty.data('min-value'),
                qty = productQty.val(),
                up = $(item).find('.product__qty-up'),
                down = $(item).find('.product__qty-down');

            productQty.keyup(function () {
                var inputQty = productQty.val();
                if (isNaN(inputQty) || inputQty < minQty) {
                    productQty.val(minQty);
                    qty = minQty;
                }
                qty = productQty.val();
                count(itemId, qty);
            });

            up.click(function () {
                qty++;
                productQty.val(qty);
                count(itemId, qty);
            });

            down.click(function () {
                if (qty > minQty) {
                    qty--;
                    productQty.val(qty);
                    count(itemId, qty);
                }
            });
        });
        //******* END PRODUCT QTY *******


        //******* BEGIN CART COUNT *******
        var isCartPage = $('.cart-page').length ? true : false;
        var count = function (id, qty) {
            if (isCartPage == false) return false;
            var item = $('#' + id),
                line = item.parent().parent(),
                price = line.find('.cart__price span'),
                total = line.find('.cart__price--total span'),
                result = 0;

            if (isNaN(price.text()) || isNaN(qty)) return false;

            result = price.text() * qty;
            total.text(result);
            countTotal();
        }
        //******* END CART COUNT *******


        //******* BEGIN CART TOTAL COUNT *******
        var countTotal = function () {
            if (isCartPage == false) return false;
            var total = $('.cart__total__amount span'),
                totalAmount = 0,
                tempTotalAmount,
                resultTotalAmount = [];
            $('.cart__price--total span').each(function (ind, el) {
                var totalPrice = $(el).text();
                if (isNaN(totalPrice)) return false;
                totalAmount += +totalPrice;
            });
            tempTotalAmount = totalAmount.toString().split('').reverse();
            tempTotalAmount.forEach(function (item, i) {
                if ((i + 1) % 3 == 0) item = ' ' + item;
                resultTotalAmount.push(item);
            });
            totalAmount = resultTotalAmount.reverse().join('')
            total.text(totalAmount);
        };

        if (isCartPage) countTotal();
        //******* END CART TOTAL COUNT *******


        //******* BEGIN CART REMOVE BUTTON *******
        if (isCartPage) {
            $('.cart__remove').click(function () {
                $(this).parent().parent().fadeOut(speed).delay(speed, function () {
                    $(this).remove();
                    countTotal();
                });
            });
        }
        //******* END CART REMOVE BUTTON *******


        //******* BEGIN FAQ ACCORDEON *******
        if ($('.faq-page').length) {
            // Toggle question
            var body = $('html, body');
            var positions = [];

            $('.faq__title').each(function (ind, el) {
                var currentPosition = $(el).offset().top;
                positions.push(currentPosition);
            });
            $('.faq__title').click(function () {
                var $this = $(this),
                    ind = $('.faq__title').index($this),
                    lines = $('.faq__line'),
                    positionTop = $('.faq__title').eq(ind).offset().top,
                    line = $this.parent(),
                    active = $('.faq__line.active');

                body.stop().animate({scrollTop: positionTop}, '500', 'swing');

                if (line.hasClass('active')) {
                    // сворачиваем текущий объект
                    line.removeClass('active')
                        .find('.faq__content')
                        .slideUp(speed);
                } else {
                    // сворачиваем все и разворачиваем текущий
                    active
                        .removeClass('active')
                        .find('.faq__content')
                        .slideUp(speed);

                    line.addClass('active')
                        .find('.faq__content')
                        .slideDown();
                }
            });
        }
        //******* END FAQ ACCORDEON *******


        //******* BEGIN FANCYBOX *******
        if ($('a.fancybox').length) {
            $('a.fancybox').fancybox({
                'nextEffect': 'none',
                'prevEffect': 'none',
                'openSpeed': 200,
                'closeSpeed': 200,
                'nextSpeed': 200,
                'prevSpeed': 200
            });
            $('.popup__ok').click(function () {
                $('.fancybox-overlay').trigger('click');
            });
        }
        //******* END FANCYBOX *******
    });
})(jQuery);

