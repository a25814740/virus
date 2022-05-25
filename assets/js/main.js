
const App = {
    data() {
        return {
            s3_l_active: false,
            s3_r_active: false,
        }
    },
    beforeCreate() { },
    created() {
        window.addEventListener("scroll", this.handleScroll);
    },
    beforeMount() { },
    mounted() {
        this.$nextTick(function () {
            // 仅在整个视图都被渲染之后才会运行的代码
            // this.myFullpage();
            this.bannerSwiper();
            // this.situationChart();
            this.situationNumEffect();
                // this.introScene();
                // this.introWheel();
            this.vaccineScene();

            this.situationNumEffect();
            this.post_pandemicSwiper();
            this.about_usSwiper();
        })
    },
    beforeUpdate() {

    },
    updated() {

    },
    methods: {
        myFullpage() {
            new fullpage('#fullpage', {
                // Navigation
                menu: '#menu',
                lockAnchors: false,
                anchors: ['firstPage', 'secondPage'],
                navigation: true,
                navigationPosition: 'right',
                navigationTooltips: ['slide 1', 'slide 2', 'slide 3', 'slide 4', 'slide 5', 'slide 6', 'slide 7', 'slide 8', 'slide 9', 'slide 10', 'slide 11'],
                showActiveTooltip: true,
                slidesNavigation: false,
                slidesNavPosition: 'bottom',
                //options here
                autoScrolling: true,
                scrollHorizontally: true,
                sectionsColor: ['#f2f2f2', '#4BBFC3', '#7BAABE', 'whitesmoke', '#000'],
                // Custom selectors
                sectionSelector: '.section',
                slideSelector: '.slide',
                // Events
                beforeLeave: function (origin, destination, direction, trigger) { },
                onLeave: function (origin, destination, direction, trigger) { },
                afterLoad: function (origin, destination, direction, trigger) { },
                afterRender: function () { },
                afterResize: function (width, height) { },
                afterReBuild: function () { },
                afterResponsive: function (isResponsive) { },
                afterSlideLoad: function (section, origin, destination, direction, trigger) { },
                onSlideLeave: function (section, origin, destination, direction, trigger) { },
                onScrollOverflow: function (section, slide, position, direction) { },
            });
        },
        bannerSwiper() {
            const bannerSwiper = new Swiper('#banner .swiper', {
                loop: true,
                effect: 'fade',
                parallax: true,
                fadeEffect: {
                    crossFade: true
                },
                navigation: {
                    nextEl: '#banner .swiper-button-next',
                    prevEl: '#banner .swiper-button-prev',
                },
                pagination: {
                    el: '#banner .swiper-pagination',
                    type: 'bullets',
                },
            });
        },
        situationChart() {
            const labels = ['第一劑', '第二劑', '第三劑', '第四劑'];
            const data = {
                labels: labels,
                datasets: [{
                    axis: 'y',
                    label: 'My First Dataset',
                    data: [65, 59, 80, 81],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(255, 205, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)'
                    ],
                    borderColor: [
                        'rgb(255, 99, 132)',
                        'rgb(255, 159, 64)',
                        'rgb(255, 205, 86)',
                        'rgb(75, 192, 192)'
                    ],
                    borderWidth: 1
                }]
            };
            // </block:setup>

            // <block:config:0>
            const config = {
                type: 'bar',
                data,
                responsive: true,
                maintainAspectRatio: true,
                options: {
                    indexAxis: 'y'
                }
            };

            const situationChart = new Chart(
                document.getElementById('situationChart'),
                config
            );
        },
        situationNumEffect() {
            // Some settings to begin with
            const counterSelector = '.counter'
            const delay = 1000

            // Prepare a few helper functions
            const rangeToString = (first, last) =>
                Array.from(Array(last + 1 - first), (_, i) => first + i).join('')

            const prependRanges = input =>
                rangeToString(0, 9).repeat(2) + input

            const appendRanges = input =>
                input + rangeToString(0, 9).repeat(2)

            const simulateRange = input =>
                input + '!$0a95xd'.repeat(2)

            const randomOffset = () =>
                Math.floor(Math.random() * 16) + 5

            // Initiate the spinners
            Splitting({
                target: counterSelector
            })

            document.querySelectorAll(counterSelector).forEach(counter => {

                counter.querySelectorAll('.char').forEach(char => {

                    let val = char.innerHTML,
                        before,
                        after,
                        offsetY = randomOffset() * 22

                    char.style.setProperty('animation-delay', `${delay}ms`)

                    if ([',', '.'].indexOf(val) !== -1) {
                        char.style.setProperty('margin-left', '-10px')
                        char.style.setProperty('margin-right', '-10px')
                        before = after = ''
                    } else if (/\D/.test(val)) {
                        before = after = simulateRange(val)
                    } else {
                        n = Number(val)
                        before = prependRanges(rangeToString(0, n - 1))
                        after = appendRanges(rangeToString(n + 1, 9))
                    }

                    char.setAttribute('data-nbefore', before)
                    char.setAttribute('data-nafter', after)

                    setTimeout(() => {

                        char.style.setProperty('top', `-${offsetY}px`)
                        char.style.setProperty('transform', `translate3D(0, ${offsetY}px, 0)`)
                        char.style.setProperty('color', '#afe3ff')

                        setTimeout(() => {
                            char.style.setProperty('color', '#4f6dc6')
                        }, delay)

                    }, delay)

                })

            })

        },
        introClick(p) {
            if (p == 'l') {
                if (this.s3_l_active == false) {
                    this.s3_l_active = true;
                } else {
                    this.s3_l_active = false;
                }
            } else if (p == 'r') {
                if (this.s3_r_active == false) {
                    this.s3_r_active = true;
                } else {
                    this.s3_r_active = false;
                }
            };
        },
        introScene() {
            let scene1 = document.getElementById('scene1');
            let parallax1 = new Parallax(scene1);

            let scene2 = document.getElementById('scene2');
            let parallax2 = new Parallax(scene2);

            let scene3 = document.getElementById('scene3');
            let parallax3 = new Parallax(scene3);

            let scene4 = document.getElementById('scene4');
            let parallax4 = new Parallax(scene4);
        },
        introWheel() {
            let outer = document.querySelector('.s3r_outer');
            let picture = document.querySelector('.bg');
            let p_left = [ 0, 0, 35, 70, 100];
            let p_top = [ 25, 100, 70, 85, 20];
            let n = 0;
            let counter = 0;
            function s3r_wheel(w) {
                counter++;
          
                if(counter == 2) {
                    if(w.wheelDelta < 0) {
                        if(n < 5){
                            n++;
                        }
                        console.log(n);
                        console.log(w.wheelDelta);
                    }else if(w.wheelDelta > 0) {
                        if(n > 0){
                            n--;
                        }
                        console.log(w.wheelDelta);
                        console.log(n);
                    }
                    picture.style.backgroundPosition = `${p_left[n]}% ${p_top[n]}%`;
                    counter = 0;
                }
            }
            // function debounce(w, delay=1000) {
            //     let timer = null;
            //    console.log(44);
            //     return () => {
            //       let context = this;
            //       let args = arguments;
               
            //       clearTimeout(timer);
            //       timer = setTimeout(() => {
            //         s3r_wheel.apply(context, args);
            //       }, delay)
            //     }
            //   }
         

            outer.addEventListener('mousewheel', s3r_wheel);
        },
        vaccineScene() {
              let s7_scene1 = document.getElementById('s7_scene1');
              let parallax_7_1 = new Parallax(s7_scene1);
  
              let s7_scene2 = document.getElementById('s7_scene2');
              let parallax_7_2 = new Parallax(s7_scene2);
  
              let s7_scene3 = document.getElementById('s7_scene3');
              let parallax_7_3 = new Parallax(s7_scene3);
  
              let s7_scene4 = document.getElementById('s7_scene4');
              let parallax_7_4 = new Parallax(s7_scene4);
        },
        post_pandemicSwiper() {
            const post_pandemicSwiper = new Swiper('#Post-pandemic .swiper', {
                loop: true,
                    effect: 'fade',
                    parallax: true,
                    fadeEffect: {
                        crossFade: true
                    },
                init: false,
                navigation: {
                    nextEl: '#Post-pandemic .swiper-button-next',
                    prevEl: '#Post-pandemic .swiper-button-prev',
                },
                pagination: {
                    el: '#Post-pandemic .swiper-pagination',
                    type: 'bullets',
                },
                // pagination: {
                //     el: '.swiper-pagination',
                //     observer: true,
                //     observeParents: true,
                // },
            })
            let fancyboxTrigger = document.querySelector('.fancybox-trigger');
            // fancyboxTrigger.addEventListener('click', (e) => {
            $('.fancybox-trigger').click(function(e){
                e.preventDefault();
                $.fancybox.open({
                    src: "#popup-swiper",
                    type: 'inline',
                    opts: {
                        toolbar: false,
                        defaultType: 'inline',
                        autoFocus: true,
                        touch: false,
                        afterLoad: function () {
                            mySwiper.init();
                            mySwiper.slideTo(thisTarget - 1)

                        }
                    }
                })
            })



            // const post_pandemicSwiper = new Swiper('#Post-pandemic .swiper', {
            //     loop: true,
            //     effect: 'fade',
            //     parallax: true,
            //     fadeEffect: {
            //         crossFade: true
            //     },
            //     navigation: {
            //         nextEl: '#Post-pandemic .swiper-button-next',
            //         prevEl: '#Post-pandemic .swiper-button-prev',
            //     },
            //     pagination: {
            //         el: '#Post-pandemic .swiper-pagination',
            //         type: 'bullets',
            //     },
            // });
        },

        about_usSwiper() {
            var about_usTextSwiper = new Swiper('#about-us .textSwiper', {
                loop: false,
                // spaceBetween: 10,
                slidesPerView: 5,
                freeMode: true,
                watchSlidesProgress: true,
                // thumbs: {
                //     swiper: about_usSwiper,
                // }
            });

            var about_usSwiper = new Swiper('#about-us .bigSwiper', {
                loop: false,
                effect: 'fade',
                // parallax: true,
                // fadeEffect: {
                //     crossFade: true
                // },
                navigation: {
                    nextEl: '#about-us .swiper-button-next',
                    prevEl: '#about-us .swiper-button-prev',
                },
                thumbs: {
                    swiper: about_usTextSwiper,
                }

            });

        },
    }
}


Vue.createApp(App).mount('#app');