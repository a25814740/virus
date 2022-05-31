const app = Vue.createApp({
    data() {
        return {
            pageDatas: [],
            cursorOptions: {
                "cursorOuter": "circle-basic",
                "hoverEffect": "circle-move",
                "hoverItemMove": false,
                "defaultCursor": false,
                "outerWidth": 30,
                "outerHeight": 30
            },
            s3_l_active: false,
            s3_r_active: false,
            isMenuHovering: true,
            isMenuActive: false,
            menuAnimation_active: false,
            menuAnimationB_active: false,
        }
    },
    filters: {
        //轉為千分號
        currency(val) {
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        }
    },
    beforeCreate() {},
    created() {
        // window.addEventListener("scroll", this.handleScroll);
        this.getPageData(); // 讀取頁面資料
    },
    beforeMount() {},
    mounted() {

        this.$nextTick(function () {

            magicMouse(this.cursorOptions); // 鼠標更換
            // 僅在整個視圖都被渲染之後才會運行的代碼
            this.myFullpage();
            this.bannerSwiper();
            this.situationChart();
            this.introScene();
            // this.introWheel();
            this.vaccineScene();
            this.post_pandemicSwiper();
            this.about_usSwiper();
            this.s9_sceneSymptom();
        })
    },
    beforeUpdate() {},
    updated() {},
    methods: {
        getPageData: function () {
            let _this = this;
            console.log('getPageData');

            fetch("/assets/js/pageData.json")
                .then(r => r.json())
                .then(json => {
                    _this.pageDatas = json;
                });
        },
        theFormat(number) {
            return number.toFixed(2);
        },
        myMenuFilter: function () {
            this.isMenuActive = !this.isMenuActive;
        },
        menuAni() {
            this.menuAnimation_active = !this.menuAnimation_active;
        },
        menuAniB() {
            if (this.menuAnimation_active == false) {
                this.menuAnimationB_active = true;
                setTimeout(() => {
                    this.menuAnimationB_active = false;
                }, 2000);
            }
        },
        myFullpage() {
            let _this = this;
            new fullpage('#fullpage', {
                // Navigation
                menu: '#menu',
                lockAnchors: false,
                // lockAnchors: true,
                // anchors: ['index', '全球確診情形', '台灣確診情形', '台灣疫苗施打情形', '病毒結構與病毒增值', '變異株起源', '感染症狀', '傳統疫苗', '新型疫苗', '新冠疫苗開發歷程', '目前台灣施打新冠疫苗種類', '後疫情時代', '關於我們'],
                navigation: false,
                navigationPosition: 'right',
                // navigationTooltips: ['slide 1', 'slide 2', 'slide 3', 'slide 4', 'slide 5', 'slide 6', 'slide 7', 'slide 8', 'slide 9', 'slide 10', 'slide 11'],
                showActiveTooltip: true,
                slidesNavigation: false,
                slidesNavPosition: 'bottom',
                //options here
                autoScrolling: true,
                // autoScrolling: false,
                scrollHorizontally: false,
                scrollOverflow: true,
                // sectionsColor: ['#f2f2f2', '#4BBFC3', '#7BAABE', 'whitesmoke', '#000'],
                // Custom selectors
                sectionSelector: '.section',
                // slideSelector: '.slide',
                responsiveHeight: 900,
                // Events
                beforeLeave: function (origin, destination, direction, trigger) {},
                onLeave: function (origin, destination, direction, trigger) {
                    // console.log('onLeave');
                },
                afterLoad: function (origin, destination, direction, trigger) {
                    // console.log('afterLoad');
                    // console.log(destination);
                    let sectionID = destination.item.id;
                    if (sectionID) {
                        let counter = document.querySelectorAll('#' + sectionID + ' .counter');
                        if (counter) {
                            _this.situationNumEffect();
                        }
                    }
                },
                afterRender: function () {
                    // console.log('afterRender');
                },
                afterResize: function (width, height) {},
                afterReBuild: function () {},
                afterResponsive: function (isResponsive) {},
                afterSlideLoad: function (section, origin, destination, direction, trigger) {},
                onSlideLeave: function (section, origin, destination, direction, trigger) {},
                onScrollOverflow: function (section, slide, position, direction) {},
            });
        },
        bannerSwiper() {
            const bannerSwiper = new Swiper('#banner .swiper', {
                loop: true,
                effect: 'fade',
                parallax: true,
                autoplay: {
                    delay: 5000
                },
                fadeEffect: {
                    crossFade: true
                },
                pagination: {
                    el: '#banner .swiper-pagination',
                    type: 'bullets',
                    clickable: false
                },
                on: {
                    init: function (swiper) {
                        // console.log('init');
                        var activeIndex = this.activeIndex;
                        var activeSlide = document.getElementsByClassName('swiper-slide')[activeIndex];
                        var activeSlideVideo = activeSlide.getElementsByTagName('video')[0];
                        if (activeSlideVideo) {
                            // console.log('init is Video');
                            swiper.autoplay.stop();
                        } else {
                            // console.log('init is Image');
                            swiper.autoplay.start()
                        }

                    },

                    transitionEnd: function (swiper) {
                        // console.log('transitionEnd');
                        var activeIndex = this.activeIndex;
                        var activeSlide = document.getElementsByClassName('swiper-slide')[activeIndex];
                        var activeSlideVideo = activeSlide.getElementsByTagName('video')[0];


                        if (activeSlideVideo) {
                            // console.log('is Video');

                            // 確認是否第一次暫停
                            var checkVideoTimes = document.querySelector('.video-pause');
                            if (!checkVideoTimes) {
                                // 第一次暫停
                                swiper.autoplay.stop();
                                activeSlideVideo.addEventListener("pause", function () {
                                    // console.log('第一次暫停，video新增 video-pause 的 Class，開啟Swiper自動播放');
                                    activeSlideVideo.classList.add('video-pause');
                                    swiper.autoplay.start();
                                }, true);

                            } else {
                                // 不是第一次暫停
                                // console.log('已經增加video-pause，將Swiper自動播放暫停');
                                swiper.autoplay.stop();
                            }
                        } else {
                            // console.log('is Image');
                            swiper.autoplay.start()
                        }
                    },
                    autoplayStart: function (swiper) {
                        // console.log('Swiper自動播放已開啟');
                    },
                    autoplayStop: function (swiper) {
                        // console.log('Swiper自動播放已暫停，影片播放');

                        var videos = document.querySelectorAll('#banner video');

                        Array.prototype.forEach.call(videos, function (video) {
                            video.play();
                        });
                    }
                }
            });
        },
        situationChart() {
            const labels = ['第一劑', '第二劑', '第三劑', '追加劑'];
            const data = {
                labels: labels,
                datasets: [{
                    axis: 'y',
                    data: [86.5, 84, 80.2, 65],
                    barPercentage: 0.5,

                    backgroundColor: [
                        '#616161',
                        '#d6d6d6',
                        '#616161',
                        '#d6d6d6',
                    ],
                    color: ['#FFF', '#FFF', '#FFF', '#FFF', ]
                }]
            };
            // </block:setup>

            // <block:config:0>
            const config = {
                type: 'bar',
                data,
                responsive: true,
                maintainAspectRatio: true,
                // options: {
                //     indexAxis: 'y'
                // }
                options: {
                    plugins: {
                        legend: {
                            display: false,
                            labels: {
                                color: 'rgb(255, 99, 132)'
                            }
                        }
                    },
                }

            };

            const situationChart = new Chart(
                document.getElementById('situationChart'),
                config,
            );
        },
        situationNumEffect() {

            // console.log('situationNumEffect');
            // Some settings to begin with
            const counterSelector = '.counter'
            const delay = 500

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

                    }, delay)

                })

            })

        },
        unsplitting(innerHTML) {
            return innerHTML
                .replace(/<span class="whitespace">(\s)<\/span>/g, "$1")
                .replace(
                    /<span class="char" data-char="\S+" style="--char-index:\s?\d+;">(\S+)<\/span>/g,
                    "$1"
                )
                .replace(/ aria-hidden="true"/g, "")
                .replace(
                    /<span class="word" data-word="\S+" style="--word-index:\s?\d+;( --line-index:\s?\d+;)?">(\S+)<\/span>/g,
                    "$2"
                );
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
            // let scene0 = document.getElementById('scene0');
            // let parallax0 = new Parallax(scene0);

            let scene1 = document.getElementById('scene1');
            let parallax1 = new Parallax(scene1);

            let scene2 = document.getElementById('scene2');
            let parallax2 = new Parallax(scene2);

            let scene3 = document.getElementById('scene3');
            let parallax3 = new Parallax(scene3);

            let scene4 = document.getElementById('scene4');
            let parallax4 = new Parallax(scene4);

            let scene5 = document.getElementById('scene5');
            let parallax5 = new Parallax(scene5);
        },
        introWheel() {
            let outer = document.querySelector('.s3r_outer');
            let picture = document.querySelector('.bg');
            let p_left = [0, 0, 35, 70, 100];
            let p_top = [25, 100, 70, 85, 20];
            let n = 0;
            let counter = 0;

            function s3r_wheel(w) {
                counter++;
                console.log(555);
                if (counter == 2) {
                    if (w.wheelDelta < 0) {
                        if (n < 5) {
                            n++;
                        }
                        console.log(n);
                        console.log(w.wheelDelta);
                    } else if (w.wheelDelta > 0) {
                        if (n > 0) {
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
        s9_sceneSymptom() {
            let sceneSymptom = document.getElementById('sceneSymptom');
            let parallax_9 = new Parallax(sceneSymptom);
        },
        v_intro() {
            let scene0 = document.querySelector('#scene0');
            let img = document.querySelector('.image');
            let x = null;
            let y = null;

            scene0.addEventListener( 'mouseover', m => {
                x = (m.pageX - (window.innerWidth - 700) / 2 ) / 7;
                img.style.transform = `translate( ${x}, ${y});`;
            })

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
            })
            Fancybox.bind("[data-fancybox='gallery-popup-Post-pandemic']", {
                on: {
                    ready: (fancybox) => {
                        post_pandemicSwiper.init();
                    },
                    done: (fancybox) => {
                        console.log('done');
                        fullpage_api.setAllowScrolling(false);
                    },
                    closing: (fancybox) => {
                        console.log('closing');
                        fullpage_api.setAllowScrolling(true);
                    }
                }
            })
        },
        about_usSwiper() {
            var about_usTextSwiper = new Swiper('#about-us .textSwiper', {
                loop: false,
                slidesPerView: 5,
                freeMode: true,
                watchSlidesProgress: true,

            });

            var about_usSwiper = new Swiper('#about-us .bigSwiper', {
                loop: false,
                effect: 'fade',
                navigation: {
                    nextEl: '#about-us .swiper-button-next',
                    prevEl: '#about-us .swiper-button-prev',
                },
                thumbs: {
                    swiper: about_usTextSwiper,
                }

            });

            Fancybox.bind("[$.data-fancybox='$.gallery-aboutUs']", {
                on: {
                    ready: (fancybox) => {
                        about_usTextSwiper.init();
                        about_usSwiper.init();
                    }
                }
            })


        },
    }
})

app.component('loading-screen', {
    template: `
      <div id="loading">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="background:transparent;display:block;" width="221px" height="221px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
<text x="50" y="50" text-anchor="middle" dy="0.38em" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke="#912623" stroke-width="0.30000000000000004" font-size="19" font-family="Roboto">
  COVID-19
  <animate attributeName="stroke-dasharray" repeatCount="indefinite" calcMode="spline" dur="4s" values="0 49;49 49;0 49" keyTimes="0;0.5;1" keySplines="0.3 0 0.7 1;0.3 0 0.7 1"></animate>
  <animate attributeName="stroke-dashoffset" repeatCount="indefinite" dur="4s" values="0;0;-49" keyTimes="0;0.5;1"></animate>
</text>
</svg>
  </div>`
});

app.component('header-logo', {
    template: `
    <svg width="600" height="600" viewBox="0 0 600 600" id="mySvg">
                    <path class="COLC_1">
                        <animate attributeName="d" dur="10s" repeatCount="indefinite"
                            values="
                    M346.5,60.5c-44-1.11-67.55,11.81-81,24-31.31,28.37-17,61.15-52,105-18.13,22.69-38.71,34.88-71,54-50.8,30.08-62.32,22.54-82,42-35.14,34.75-49,108.9-14,146,35.69,37.77,104.89,18.89,108,18,57.59-16.52,63.55-61.63,105-62s49.37,44.79,94,48c46.18,3.32,103-40.34,107-85,4.89-55.12-73.75-78.07-68-133,5.32-50.81,76.34-66.71,72-100C462.39,101.32,442.22,79,346.5,60.5Z;
                
                
                    M308,76c-44-1.11-50.55,15.81-64,28-31.31,28.37-54-54.85-89-11-18.13,22.69-18.71,57.88-51,77-50.8,30.08-40.32,25.54-60,45C8.86,249.75-9,365.9,26,403c35.69,37.77,82.89,24.89,86,24,57.59-16.52,38.55-30.63,80-31s72.37,40.79,117,44c46.18,3.32,93-35.34,97-80,4.89-55.12-76.75-18.07-71-73,5.32-50.81,82.34-110.71,78-144C410.89,126.82,403.72,94.47,308,76Z;
                
                    M418,76c-44-1.11-99.55,52.81-113,65-31.31,28.37-115-91.85-150-48-18.13,22.69,32.29,114.88,0,134-50.8,30.08,4.68,79.54-15,99C104.86,360.75,0,392.9,35,430c35.69,37.77,79.89,9.89,83,9,57.59-16.52,68.55-26.63,110-27s63.37,55.79,108,59c46.18,3.32,94-10.34,98-55,4.89-55.12-80.75-34.07-75-89,5.32-50.81,76.34-72.71,72-106C428.89,204.82,513.72,94.47,418,76Z;
                
                    M308,76c-44-1.11-50.55,15.81-64,28-31.31,28.37-54-54.85-89-11-18.13,22.69-18.71,57.88-51,77-50.8,30.08-40.32,25.54-60,45C8.86,249.75-9,365.9,26,403c35.69,37.77,82.89,24.89,86,24,57.59-16.52,38.55-30.63,80-31s72.37,40.79,117,44c46.18,3.32,93-35.34,97-80,4.89-55.12-76.75-18.07-71-73,5.32-50.81,82.34-110.71,78-144C410.89,126.82,403.72,94.47,308,76Z;
                
                    M346.5,60.5c-44-1.11-67.55,11.81-81,24-31.31,28.37-17,61.15-52,105-18.13,22.69-38.71,34.88-71,54-50.8,30.08-62.32,22.54-82,42-35.14,34.75-49,108.9-14,146,35.69,37.77,104.89,18.89,108,18,57.59-16.52,63.55-61.63,105-62s49.37,44.79,94,48c46.18,3.32,103-40.34,107-85,4.89-55.12-73.75-78.07-68-133,5.32-50.81,76.34-66.71,72-100C462.39,101.32,442.22,79,346.5,60.5Z;">
                        </animate>
                    </path>

                    <path class="COLC_1">
                        <animate attributeName="d" dur="4s" repeatCount="indefinite" values=""></animate>
                    </path>
                </svg>

                <svg id="P_8" data-name="圖層 8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 169.12 176.39">
                    <circle class="cls-4" cx="81.53" cy="88.33" r="67.63" />
                    <line class="cls-4" x1="23.76" y1="35.76" x2="42.99" y2="53.05" />
                    <line class="cls-4" x1="5.78" y1="78.61" x2="31.44" y2="81.74" />
                    <line class="cls-4" x1="6.63" y1="127.69" x2="29.45" y2="115.53" />
                    <line class="cls-4" x1="42.75" y1="163.53" x2="54.47" y2="140.49" />
                    <line class="cls-4" x1="92.11" y1="166.55" x2="88.49" y2="140.95" />
                    <line class="cls-4" x1="138.94" y1="150.48" x2="121.29" y2="131.59" />
                    <line class="cls-4" x1="164.21" y1="106.31" x2="138.91" y2="100.96" />
                    <line class="cls-4" x1="153.16" y1="58.37" x2="129.37" y2="68.49" />
                    <line class="cls-4" x1="124.43" y1="22.68" x2="110.74" y2="44.62" />
                    <line class="cls-4" x1="77.71" y1="7.77" x2="79.09" y2="33.59" />
                    <line class="cls-4" x1="34.44" y1="27.38" x2="45.69" y2="41.76" />
                    <line class="cls-4" x1="0.73" y1="63.2" x2="25.46" y2="70.74" />
                    <line class="cls-4" x1="8.2" y1="111.72" x2="32.78" y2="103.71" />
                    <line class="cls-4" x1="33.66" y1="151.17" x2="49.2" y2="130.51" />
                    <line class="cls-4" x1="78.05" y1="176.3" x2="78.93" y2="150.46" />
                    <line class="cls-4" x1="123.92" y1="154.35" x2="113.17" y2="137.84" />
                    <line class="cls-4" x1="159.83" y1="120.4" x2="135.85" y2="110.73" />
                    <line class="cls-4" x1="168.55" y1="68.26" x2="143.36" y2="74.1" />
                    <line class="cls-4" x1="138.45" y1="25.71" x2="121.16" y2="44.94" />
                    <line class="cls-4" x1="92.94" y1="0.3" x2="89.81" y2="25.97" />
                    <line class="cls-4" x1="42.26" y1="12.21" x2="54.42" y2="35.03" />
                </svg>

                <svg id="P_7" data-name="圖層 7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 185.95 211.5">
                    <path class="cls-1" d="M339.22,224.65a79.75,79.75,0,1,0-6.28,82.13"
                        transform="translate(-168.72 -164)" />
                    <path class="cls-1" d="M329.34,224.65" transform="translate(-168.72 -164)" />
                    <path class="cls-1" d="M347.73,260.51" transform="translate(-168.72 -164)" />
                    <line class="cls-2" x1="99.38" x2="99.38" y2="22.84" />
                    <line class="cls-2" x1="50.28" y1="26.05" x2="57.18" y2="35.91" />
                    <line class="cls-2" x1="1.65" y1="60.45" x2="30.11" y2="70.81" />
                    <line class="cls-2" x1="14.35" y1="118.58" x2="31.53" y2="113.98" />
                    <line class="cls-2" x1="38.77" y1="169.75" x2="58.24" y2="146.55" />
                    <line class="cls-2" x1="142.47" y1="172.35" x2="135.39" y2="160.1" />
                    <line class="cls-2" x1="114.33" y1="11.56" x2="112.13" y2="24.03" />
                    <line class="cls-2" x1="55.51" y1="2.11" x2="68.31" y2="29.56" />
                    <line class="cls-2" x1="23.42" y1="52.22" x2="35.58" y2="59.24" />
                    <line class="cls-2" x1="15.3" y1="103.23" x2="25.79" y2="102.32" />
                    <line class="cls-2" x1="33.06" y1="151.12" x2="42.49" y2="143.22" />
                    <line class="cls-2" x1="75.7" y1="181.77" x2="79.62" y2="167.15" />
                    <line class="cls-2" x1="134.12" y1="193.91" x2="123.76" y2="165.45" />
                    <line class="cls-2" x1="171.38" y1="46.8" x2="153.67" y2="59.2" />
                    <line class="cls-2" x1="129.73" y1="10.46" x2="124.48" y2="27.41" />
                    <line class="cls-2" x1="74.7" y1="4.12" x2="82.54" y2="33.38" />
                    <line class="cls-2" x1="21.99" y1="31.18" x2="45.19" y2="50.65" />
                    <line class="cls-2" x1="0.22" y1="86.87" x2="30.39" y2="89.51" />
                    <line class="cls-2" x1="8.97" y1="147.83" x2="35.2" y2="132.69" />
                    <line class="cls-2" x1="54.81" y1="190.15" x2="67.61" y2="162.7" />
                    <line class="cls-2" x1="113.93" y1="183.18" x2="110.11" y2="161.51" />
                    <line class="cls-2" x1="164.38" y1="165.95" x2="142.97" y2="144.53" />
                    <line class="cls-2" x1="149.07" y1="10.34" x2="136.06" y2="32.88" />
                    <line class="cls-2" x1="91.89" y1="10.62" x2="92.98" y2="23.09" />
                    <line class="cls-2" x1="11.84" y1="95.91" x2="32.33" y2="95.91" />
                    <line class="cls-2" x1="32.24" y1="162.51" x2="46.79" y2="147.96" />
                    <line class="cls-2" x1="98.62" y1="190.56" x2="98.62" y2="169.75" />
                    <path class="cls-2" d="M227,188.85" transform="translate(-168.72 -164)" />
                    <line class="cls-2" x1="164.86" y1="30.98" x2="151.21" y2="44.63" />
                    <line class="cls-3" x1="170.06" y1="173.44" x2="170.06" y2="209" />
                    <line class="cls-3" x1="154.17" y1="185.18" x2="185.95" y2="185.18" />
                    <line class="cls-3" x1="154.17" y1="209" x2="185.95" y2="209" />
                    <line class="cls-3" x1="166" y1="101.61" x2="174.12" y2="101.61" />
                    <line class="cls-3" x1="170.06" y1="57.88" x2="170.06" y2="101.61" />
                    <polygon class="cls-3"
                        points="169.24 128.73 169.24 123.13 177.54 123.13 177.54 104.1 162.58 104.1 162.58 185.18 177.54 185.18 177.54 151.93 169.24 151.93 169.24 146.33 177.54 146.33 177.54 140.33 169.24 140.33 169.24 134.73 177.54 134.73 177.54 128.73 169.24 128.73" />
                </svg>
    `
});

app.component('sequelae-svg', {
    template: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1013.26 791.5">
                            <defs>
                            </defs>
                            <g id="MAN">
                                <path class="cls-1"
                                    d="M478,103.34c7.5-9.12,20.82-12.33,32.65-16.75-2.53-1-7.27-1.42-1.49-3.16,7.13-2.16,14.4-2,21.91-1.9,20.12.15,37.45,4,53.34,14.07,16.86,10.73,27.26,27.63,26.8,44.76-.56,20.86-21.29,36.9-40,49.39-17.87,11.95-39.13,25.33-63.64,19.57-16.17-3.81-37-12.27-46.88-23.65-13.85-15.92-9.69-38.36-1-55.31A159.12,159.12,0,0,1,478,103.34Z"
                                    transform="translate(-17.58 -31.09)" />
                                <path class="cls-1"
                                    d="M505.92,217.06c3,9.34,7,19.52,3.14,29.13-2.07,5.1-8.34,6.64,0,7.6"
                                    transform="translate(-17.58 -31.09)" />
                                <path class="cls-1" d="M542.06,219.59c.84,8.82-2.36,31.19,12.57,34.2"
                                    transform="translate(-17.58 -31.09)" />
                                <path class="cls-1" d="M551.49,253.79c-16.57,1.42-33.71,7.6-50.28,7.6"
                                    transform="translate(-17.58 -31.09)" />
                                <path class="cls-1"
                                    d="M587.63,256.32c-42,4.75-84.47,7.5-126.67,10.63-13,1-26,1.29-39,2.32-4.75.37-12.78-.37-17.2,1.05-.78.26.76,1.25,1.31,1.76a24.35,24.35,0,0,1,5.5,7.32c7.66,15.43,8.58,33.32,9.17,49.68.71,19.85-.86,39.67-3.58,59.39-.64,4.62-.62,17.18-3.93,19.84"
                                    transform="translate(-17.58 -31.09)" />
                                <path class="cls-1"
                                    d="M601.78,255.05c-7.67,42.85-6.29,87.3-6.29,130.47v120c0,2.44-1.09-1.28-1.57-2.25"
                                    transform="translate(-17.58 -31.09)" />
                                <path class="cls-1"
                                    d="M617.49,533.71c-40.06-4.53-81.15-2.53-121.52-2.53a205.86,205.86,0,0,0-38.33,3.09c-4,.75-10.91,4-6.72-.56"
                                    transform="translate(-17.58 -31.09)" />
                                <path class="cls-1"
                                    d="M428.93,293.05c-15.36,53.88-7.7,109-16.5,163.54-3.42,21.19-13.36,84.55-13.36,63.19"
                                    transform="translate(-17.58 -31.09)" />
                                <path class="cls-1"
                                    d="M614.35,280.39c-2.52,24.13-3.15,48-3.15,72.19,0,31.16-1.68,62.3-1.57,93.45.09,24.91,3.66,49.66,6.29,74.45.32,3.08,4.47,21.17-3.14,12"
                                    transform="translate(-17.58 -31.09)" />
                                <path class="cls-1"
                                    d="M606.49,533.71c-16.67,2.29-31.49.81-48.28-.63-30.4-2.62-60.67-3.17-91.22-3.17-17.95,0-35.64.12-53.43,2.25s2.12-1.21,7.51-2.25"
                                    transform="translate(-17.58 -31.09)" />
                                <path class="cls-1" d="M587.63,547.64c-40.1-.19-81.26.05-121-3.8"
                                    transform="translate(-17.58 -31.09)" />
                                <path class="cls-1"
                                    d="M619.06,258.85c-51.36-5.54-101.7-2.28-153.29-.63-11.83.38-23.81.38-35.53,1.83-4.35.54,8.59-1.53,12.83-2.46"
                                    transform="translate(-17.58 -31.09)" />
                                <path class="cls-1" d="M623.77,261.39c-55,3.09-109.8,5.06-165,5.06"
                                    transform="translate(-17.58 -31.09)" />
                                <path class="cls-1"
                                    d="M410.07,275.32c4.22,30.93,14.14,60.94,16.85,92.11,3,34.23-3.61,67.8,5.15,101.68"
                                    transform="translate(-17.58 -31.09)" />
                                <path class="cls-1"
                                    d="M625.35,284.19c-12.35,46.68-15.78,94.52-18,142.14-1.52,32.78-4,65.8-.87,98.51"
                                    transform="translate(-17.58 -31.09)" />
                                <path class="cls-1"
                                    d="M383.36,555.24a128.59,128.59,0,0,1,5.93,51.93,156.42,156.42,0,0,1-4.36,24.35c-1.49,6.09-1.7,5.29,1.57,8.59"
                                    transform="translate(-17.58 -31.09)" />
                                <path class="cls-1"
                                    d="M611.2,571.71c-46-6.61-91.47-12.07-138.37-12.6-15.6-.17-31.73-.71-47.22,1.2-1.35.17-9.69,2.88-7.69,1.27"
                                    transform="translate(-17.58 -31.09)" />
                                <path class="cls-1"
                                    d="M630.06,567.91c-43.5-7.46-86.23-18.11-131.38-15.55-13.75.78-26.38,3.4-38.5,8.65-1.63.71-7.68,3.48-7.68,1.83"
                                    transform="translate(-17.58 -31.09)" />
                                <path class="cls-1"
                                    d="M619.06,564.11c-7.14,16.3-11.62,31.09-13.27,48.34-.6,6.27-1.54,14.63.7,20.06"
                                    transform="translate(-17.58 -31.09)" />
                                <path class="cls-1"
                                    d="M587.63,555.24a307.25,307.25,0,0,1,3.23,38.49c.31,11.29,3.66,15.84,10.92,24.84"
                                    transform="translate(-17.58 -31.09)" />
                                <path class="cls-1"
                                    d="M600.2,622.37c-48.14,3.17-96.5,1.13-144.74,4.44-20.41,1.39-40.55,3.75-60.76,6.4-.46.06-19,3.84-12.92.56"
                                    transform="translate(-17.58 -31.09)" />
                                <path class="cls-1"
                                    d="M614.35,642.64c-38.5,2.3-77.07.14-115.59,1.83-19.6.86-38.53,3.87-57.88,6.19-3.73.45-9.13,1.61-10.38-.42"
                                    transform="translate(-17.58 -31.09)" />
                                <path class="cls-1"
                                    d="M575.06,605.91c0,50.76,9.53,101,11.88,151.71.61,13.28,1,26.61.52,39.9-.24,6.84.16,15.76-3,22.38-1.13,2.39-.43-7.23,0-8.8"
                                    transform="translate(-17.58 -31.09)" />
                                <path class="cls-1"
                                    d="M422.63,635c-2,13.74-6.69,26.44-11.49,39.69-8.88,24.51-14.38,49-19.79,74.12-5,23-27.15,90.68-23.06,67.56"
                                    transform="translate(-17.58 -31.09)" />
                                <path class="cls-1"
                                    d="M617.49,267.72c-15.84,14.51-29.43,34.76-13.09,53.62,6.45,7.46,21,14,32.3,14.64,13.3.72,22.26-6.93,29.15-15.06,14.11-16.64,15.86-38.16-5.93-51.09-12.48-7.4-29.5-6.59-44-4.64"
                                    transform="translate(-17.58 -31.09)" />
                                <path class="cls-1"
                                    d="M419.5,258.85c-18.94,9.9-34.35,20.21-33.87,40,.37,15.76,21.95,17.92,37.36,16.75,17.6-1.33,36.23-14.11,26.19-29-6.35-9.41-16.74-21.39-31.25-21.39"
                                    transform="translate(-17.58 -31.09)" />
                                <path class="cls-1"
                                    d="M645.77,300.65c8.07,39.68,24.74,77.11,38.24,115.69,3.63,10.37,11.37,24.46,10.21,35.67-.38,3.75-7.28-5.35-7.59-5.7"
                                    transform="translate(-17.58 -31.09)" />
                                <path class="cls-1"
                                    d="M641.06,312.05c9,28.75,18.08,57.46,26.71,86.27,3.11,10.39,6.37,20.86,8.73,31.39.81,3.59,1.27,3.53-.87,2.67"
                                    transform="translate(-17.58 -31.09)" />
                                <path class="cls-1"
                                    d="M686.63,445.05c-12.37,6.09-18.91,13.38-10.3,24.77,8.36,11.06,25.08,8.73,34.31-.14,8.45-8.14,8.82-22.46,4.8-32-1.85-4.41-4.72-9.06-10-11.33-4.08-1.74-6.2-.68-6.2-2.82"
                                    transform="translate(-17.58 -31.09)" />
                                <path class="cls-1"
                                    d="M685.06,442.51c8.38,19,18.15,37.7,26,56.86,11.39,27.74,16.42,56.75,22.7,85.43,3,13.55,6.09,27.07,8.73,40.67,1.36,7-3-1.32-4-3.1"
                                    transform="translate(-17.58 -31.09)" />
                                <path class="cls-1"
                                    d="M394.35,301.92c-12.49,33.57-21.85,67.35-30.2,101.75-3.67,15.13-12.22,60.59-12.22,45.18"
                                    transform="translate(-17.58 -31.09)" />
                                <path class="cls-1"
                                    d="M339.36,434.91c-8.8,7.39-21.68,17.54-15.89,29.14s23.31,11.07,33.08,3.51c10-7.69,15.92-17.28,6.12-26.81-3-2.91-14.94-11.3-17-4.57"
                                    transform="translate(-17.58 -31.09)" />
                                <path class="cls-1"
                                    d="M342.5,445.05c-20.24,51.5-43,103.11-71.23,152.13-7.44,12.92-16.11,25.29-23.66,38.14-1.93,3.29,2.34.57,3.75-.28"
                                    transform="translate(-17.58 -31.09)" />
                                <path class="cls-1"
                                    d="M414.78,600.84c-33.35,8.11-58.72,24.74-53.95,55.52,1.88,12.08,8.77,25.06,21.22,32.51,17.26,10.34,36.37,2.55,51.07-7,26.26-17,49.07-48.51,33.78-75.57-8.9-15.75-29.67-24.89-50.55-20.69"
                                    transform="translate(-17.58 -31.09)" />
                                <path class="cls-1"
                                    d="M573.49,603.37c-20.79,2.71-39.66,4.47-55.52,16.47-12.39,9.37-19,22.38-13.79,36,5.78,15.1,25,23.58,41.9,29.34,19.18,6.52,42.57,4.86,61.46-1.69,27.87-9.66,45.49-43.62,35.61-67-8.54-20.21-45.37-28.1-68.09-23.22"
                                    transform="translate(-17.58 -31.09)" />
                                <path class="cls-1"
                                    d="M493.35,212c3.78,19,7,37.43-7,54.18-2.67,3.19-25.91,20.64-30.73,16.75"
                                    transform="translate(-17.58 -31.09)" />
                                <path class="cls-1"
                                    d="M537.35,215.79c-5.57,16.58-.91,32.11,11.35,46.3,1.53,1.77,18.51,15.56,18.51,6.9"
                                    transform="translate(-17.58 -31.09)" />
                                <path class="cls-1"
                                    d="M575.06,142.33c22.94-4.14.23-3.56-9.25-3.17-22.36.91-44.52,2.13-66.7,4.71-13.64,1.59-54.11,7.32-40.33,7.32"
                                    transform="translate(-17.58 -31.09)" />
                                <path class="cls-1"
                                    d="M513.78,96.73c.31,28.74,6.29,56.38,10.91,84.79,1.7,10.45,3.12,20.9,3.23,31.45,0,2.88-1.53,12.85,1.57,5.35"
                                    transform="translate(-17.58 -31.09)" />
                                <path class="cls-1"
                                    d="M248.22,628.71c-11.37,4.22-23,8.08-32.13,15.2-4.12,3.22-8.49,7.41-13.44,9.85-1.82.89,19.74,10,23.22,12,2.87,1.58,8.2,5.91,12,5.91,1.08,0,5.45-9,5.94-9.85,6.53-11,5.38-23.31,12.22-34.34"
                                    transform="translate(-17.58 -31.09)" />
                                <path class="cls-1"
                                    d="M725.91,585.64c-4.61,12.49-8.64,25.28-16.58,36.73-1.92,2.76-4.12,5.4-6.29,8-1.47,1.77-6.84,4.59-4.36,5.34,3.16,1,12.18-1.86,14.84-2.74A154.69,154.69,0,0,1,750,625.19c8.19-.7,16.14-1.81,24.27-2.75,1.61-.18-6.39-3.9-7.51-4.71-11.68-8.46-21-23.39-23.57-35.89"
                                    transform="translate(-17.58 -31.09)" />
                                <path class="cls-1"
                                    d="M710.6,626.35c-8.69,9.91-13.51,17.11-15.79,29.33-1,5.38-.93,10.68-.93,16.1,0,2-1.13,13.21,2.79,8.48"
                                    transform="translate(-17.58 -31.09)" />
                                <path class="cls-1"
                                    d="M719,625.23c1.36,14.73,2,29.07,4.8,43.67.39,2.06,2.43,8.45.77,9.11"
                                    transform="translate(-17.58 -31.09)" />
                                <path class="cls-1" d="M741.25,634.22c1,9.46,1.19,19.23,5.58,28.07"
                                    transform="translate(-17.58 -31.09)" />
                                <path class="cls-1" d="M751,623c2.8,2.94,23.2,18.76,20.9,22.47"
                                    transform="translate(-17.58 -31.09)" />
                                <path class="cls-1"
                                    d="M725.92,599.4c-10.18,3.75-20.59,7-28.64,13.48-6.57,5.3-.07,3.71,6.35,3.37"
                                    transform="translate(-17.58 -31.09)" />
                                <path class="cls-1" d="M250.82,645.45c.77,9.51,8.27,41-7,47.16"
                                    transform="translate(-17.58 -31.09)" />
                                <path class="cls-1" d="M231.32,672.4c-3.38,8.43-7,16.38-7,25.27,0,4.4,2,1.59,4.18-.56"
                                    transform="translate(-17.58 -31.09)" />
                                <path class="cls-1" d="M220.17,669c-1.76,3.87-13.11,22.23-4.18,25.83"
                                    transform="translate(-17.58 -31.09)" />
                                <path class="cls-1" d="M216,658.92c-6.87,11.2-19.6,33.62-5.57,44.92"
                                    transform="translate(-17.58 -31.09)" />
                                <path class="cls-1" d="M207.63,657.8c-9.5,3.62-25.82,8.83-8.36,12.35"
                                    transform="translate(-17.58 -31.09)" />
                                <line class="cls-2" x1="535" y1="612.53" x2="642.76" y2="707.92" />
                            </g>
                            <g id="OOO">
                                <path class="cls-3"
                                    d="M604.71,81.5c0,13.2-8.74,25.39-23.38,34.36S546.44,130.4,524,130.4s-42.77-5.58-57.38-14.54S443.19,94.7,443.19,81.5s8.74-25.4,23.38-34.37S501.47,32.59,524,32.59s42.77,5.59,57.38,14.54S604.71,68.29,604.71,81.5Z"
                                    transform="translate(-17.58 -31.09)" />
                                <path class="cls-3"
                                    d="M550.84,185c0,5.34-3.74,10.46-10.39,14.33s-15.84,6.27-26.12,6.27-19.5-2.43-26.11-6.27-10.39-9-10.39-14.33,3.74-10.47,10.39-14.34,15.84-6.27,26.11-6.27,19.51,2.43,26.12,6.27S550.84,179.68,550.84,185Z"
                                    transform="translate(-17.58 -31.09)" />
                                <path class="cls-3"
                                    d="M547,138.88c0,12.21-12,22.54-27.37,22.54s-27.36-10.33-27.36-22.54,12-22.54,27.36-22.54S547,126.68,547,138.88Z"
                                    transform="translate(-17.58 -31.09)" />
                                <path class="cls-3"
                                    d="M593.17,315.31c0,17.7-10.1,33.86-26.71,45.66s-39.62,19.15-65.12,19.15-48.51-7.35-65.12-19.15-26.7-28-26.7-45.66,10.09-33.86,26.7-45.66,39.63-19.15,65.12-19.15,48.52,7.35,65.12,19.15S593.17,297.61,593.17,315.31Z"
                                    transform="translate(-17.58 -31.09)" />
                                <path class="cls-3"
                                    d="M549.87,630.16c0,25.25-25.09,46.2-56.7,46.2s-56.71-21-56.71-46.2S461.55,584,493.17,584,549.87,604.92,549.87,630.16Z"
                                    transform="translate(-17.58 -31.09)" />
                                <path class="cls-3"
                                    d="M460.4,504.53c0,25.25-25.1,46.2-56.71,46.2s-56.7-21-56.7-46.2,25.09-46.19,56.7-46.19S460.4,479.29,460.4,504.53Z"
                                    transform="translate(-17.58 -31.09)" />
                                <path class="cls-3"
                                    d="M628.76,381.23c0,7.15-4.38,13.82-11.86,18.76s-17.88,8-29.45,8-22-3.1-29.45-8-11.86-11.61-11.86-18.76,4.38-13.82,11.86-18.77,17.88-8,29.45-8,22,3.1,29.45,8S628.76,374.07,628.76,381.23Z"
                                    transform="translate(-17.58 -31.09)" />
                                <path class="cls-3"
                                    d="M562.38,429.31c0,25.25-25.1,46.19-56.71,46.19S449,454.56,449,429.31s25.09-46.19,56.7-46.19S562.38,404.06,562.38,429.31Z"
                                    transform="translate(-17.58 -31.09)" />
                            </g>
                            <g id="LINE">
                                <line class="cls-4" x1="584.71" y1="45.81" x2="731.91" y2="41.15" />
                                <line class="cls-5" x1="274.09" y1="390.91" x2="429.94" y2="394.78" />
                                <line class="cls-2" x1="203.85" y1="559.5" x2="336.62" y2="493.58" />
                                <line class="cls-2" x1="535" y1="612.53" x2="642.76" y2="707.92" />
                                <line class="cls-2" x1="610.14" y1="339.85" x2="676.53" y2="320.47" />
                                <line class="cls-6" x1="316.53" y1="280.02" x2="392.53" y2="285.44" />
                                <line class="cls-2" x1="534.26" y1="155.22" x2="652.59" y2="180.04" />
                                <line class="cls-2" x1="356.04" y1="92.35" x2="474.37" y2="103.99" />
                            </g>
                            <g id="TEXTT" data-name="圖層 4">
                                <path class="cls-7"
                                    d="M781.14,79.17a32.07,32.07,0,0,1-2.2,3.84,20.56,20.56,0,0,1,2.52,4.16l2-.84a23.62,23.62,0,0,0-2.2-3.34c.66-1,1.4-2.2,2-3.34Zm3.5,0a29.77,29.77,0,0,1-2.24,3.76A21.33,21.33,0,0,1,785.06,87l1.92-.82a21.2,21.2,0,0,0-2.3-3.26c.66-1,1.42-2.14,2-3.26Zm3.6,0a31.18,31.18,0,0,1-2.36,3.8,22.27,22.27,0,0,1,3,4.12l2-.94a23.18,23.18,0,0,0-2.54-3.22c.7-1,1.48-2.1,2.14-3.24Zm-8.58,8.64V97.93h2.14V89.75h6.3v8.08h2.22v-10Zm1,7.42v1.94h8.48V95.23Zm2.92-9a16.55,16.55,0,0,1-.76,2.6l2.12.42a27.74,27.74,0,0,0,1.42-2.66ZM786,89.69a12.81,12.81,0,0,1-4.18,4.24A9.51,9.51,0,0,1,783,95.21a15.43,15.43,0,0,0,4.56-4.68Zm-3.88,1.68a27.82,27.82,0,0,1,4.52,3.56l1.34-1.36a28.57,28.57,0,0,0-4.6-3.38Zm-8-11.52V82h4V79.85Zm-.14,4.56v2.18h3.66V84.41Zm0,4.66v2.22h3.68V89.07ZM773,79.85v7.26c0,2.94-.08,7-1.16,9.76a7.48,7.48,0,0,1,1.84,1c1.18-3,1.34-7.62,1.34-10.78V79.85Zm3.56,0V95.37c0,.26-.08.34-.3.34a12.16,12.16,0,0,1-1.44,0,8.41,8.41,0,0,1,.6,2.2,4.47,4.47,0,0,0,2.52-.42c.58-.38.72-1,.72-2V79.85Zm22.48.68v1.94h11.46V80.53Zm0,11v2h11.2v-2Zm4.32-1.1c-.24,2.9-.78,4.68-4.82,5.66A6.22,6.22,0,0,1,799.86,98c4.72-1.3,5.6-3.74,5.9-7.5Zm2.7,1.94-2,.46a7.74,7.74,0,0,0,5.1,5.1A7.35,7.35,0,0,1,810.76,96,6.19,6.19,0,0,1,806.14,92.39Zm-4.66-13.24v4.52h2.18V79.15Zm4.34,0v4.52H808V79.15Zm-3.58,8.92h5.06v.86h-5.06Zm0-2.36h5.06v.86h-5.06Zm-2.14-1.6v6.42h9.44V84.11ZM794.16,80v2.18h3.36V80Zm-1.22,0v7.24c0,2.9-.08,6.92-1.12,9.68a7.94,7.94,0,0,1,1.76,1c1.16-3,1.32-7.54,1.32-10.66V80Zm3.66,0V95.31c0,.24-.06.32-.26.32s-.8,0-1.38,0a7.52,7.52,0,0,1,.52,2,4.55,4.55,0,0,0,2.38-.4c.52-.36.66-.94.66-1.86V80Zm-2.44,4.58v2.16h3.34V84.53Zm0,4.64v2.18h3.34V89.17Zm28.22-.8-2.22.1c1,6,2.9,8.7,9.38,9.5a8.36,8.36,0,0,1,1.36-2.36C825,95.21,823.08,93.05,822.34,88.37ZM820,87.29c-.3,4.46-.78,7.26-7.88,8.56A7.25,7.25,0,0,1,813.42,98c7.84-1.68,8.78-5.3,9.18-10.68Zm2.32-7.12-2.12.1c1,5.5,2.88,8,8.92,8.72a8.2,8.2,0,0,1,1.3-2.22C825,86.39,823.08,84.43,822.36,80.17Zm-2.32-1c-.3,4.28-.82,6.68-7.6,7.8a6.21,6.21,0,0,1,1.18,2c7.54-1.44,8.52-4.62,8.92-9.8Zm-3.72,1.34a5.22,5.22,0,0,1-2.46,3.12l1.7,1.24a6,6,0,0,0,2.66-3.72Zm10-.06a19.16,19.16,0,0,1-2.08,3.26l1.9.62A32.44,32.44,0,0,0,828.6,81Zm-10.16,8.46a5.65,5.65,0,0,1-2.56,3.36l1.78,1.16a6.26,6.26,0,0,0,2.72-3.88Zm10,0A18.22,18.22,0,0,1,824,92.19l2,.7a30.22,30.22,0,0,0,2.54-3.22Zm10.38,8.58,2.14-1.84a37.37,37.37,0,0,0-4.36-4.36l-2.1,1.8A39.1,39.1,0,0,1,836.52,97.51Zm27.4-14v1.6h6.6v-1.6Zm3.54,11.64a19.33,19.33,0,0,1,2,2.82L871,97a18.67,18.67,0,0,0-2-2.68Zm-6.48.5a11.49,11.49,0,0,1,1.78,1.78l1.44-.9a10.22,10.22,0,0,0-1.84-1.7Zm-2.46-.78a9.32,9.32,0,0,1-2.7,1.92,10,10,0,0,1,1.52,1.2,13.48,13.48,0,0,0,3-2.52Zm3.6-11.54a22.75,22.75,0,0,1-3.94,1,5,5,0,0,1,.4,1,23.24,23.24,0,0,0,4.52-1Zm4.12,6.46h2v.84h-2Zm0,2.22h2v.86h-2Zm0-4.42h2v.84h-2Zm-1.72-1.44v8.16h5.56V86.15Zm-3.92,3.74h1.52v.54H860.6Zm0,1.5h1.52V92H860.6Zm0-3h1.52v.54H860.6Zm-1.4-1V93h4.4v-5.6Zm7.24-3.4a24.94,24.94,0,0,1-.42,3l1.62.24c.22-.78.52-1.94.8-3.06Zm-9.38,3.9v7.18h6.86v-1.5H858.6V87.87Zm.44-4.76v2.1c0,1.38.42,1.76,2.16,1.76h2.4c1.18,0,1.62-.34,1.78-1.6a4.36,4.36,0,0,1-1.38-.5c-.06.7-.16.8-.6.8h-2c-.6,0-.7,0-.7-.46v-2.1Zm8.12,11.12a9.74,9.74,0,0,1-2.36,2.54,13.52,13.52,0,0,1,1.36,1.2,14.68,14.68,0,0,0,2.66-2.78ZM856,80.83v1.88h14.8V80.83Zm5.1-1.68v2.68h2.54V79.15Zm-6.58,1.68v6.42c0,2.86-.18,6.64-2.44,9.2A8.41,8.41,0,0,1,853.6,98c2.56-2.84,3-7.5,3-10.72V80.83Zm-2.58,2.7A16.3,16.3,0,0,1,853,87.35l1.62-.88a15.86,15.86,0,0,0-1.18-3.68Zm-.12,6.64.68,2.08c1-.66,2.06-1.36,3.06-2.06L855,88.47C853.78,89.13,852.64,89.79,851.82,90.17Zm30.16-.1v1.28h3.64V90.07ZM882,92v1.14h3.56V92Zm-.16,1.8v1.14h3.74V93.79Zm-3.24-7.86v1.2h3.7v-1.2Zm6.58,0v1.2h3.56v-1.2Zm-7.62-2.2v14.2h2V83.73Zm10.44,0V95.57c0,.22-.06.28-.26.3s-.8,0-1.38,0a6.69,6.69,0,0,1,.56,2.1,4.6,4.6,0,0,0,2.42-.4c.58-.36.7-1,.7-1.92V83.73Zm-3.22,6.34v5.6c0,.16,0,.2-.2.2h-1a5.17,5.17,0,0,1,.44,1.4,4,4,0,0,0,1.84-.24c.46-.24.56-.64.56-1.34V90.07Zm-3.54,0v2.68a4.35,4.35,0,0,1-1.3,3.54,9,9,0,0,1,1.36,1.08,6,6,0,0,0,1.58-4.58V90.07Zm-2.66-6.34v1.46h2.94V88h-2.94v1.44h4.76V83.73Zm10.22,0h-4.62v5.66h4.62V88H886V85.19h2.8Zm-12.62-2.94v2.06H890.6V80.79Zm4.94-1.64V82h2.54V79.15Zm-6.58,1.64v6.42c0,2.84-.18,6.56-2.3,9.12a7.75,7.75,0,0,1,1.62,1.52c2.42-2.82,2.82-7.44,2.82-10.62V80.79Zm-2.62,2.32a17.17,17.17,0,0,1,1.18,4l1.72-.82a15,15,0,0,0-1.28-3.86Zm-.2,6.94.7,2.16c1.14-.66,2.32-1.42,3.44-2.14l-.56-1.82C873.94,89,872.62,89.63,871.7,90.05Zm30.64-4.92v1.8h4v-1.8ZM900.84,91v1.6h6.52V91ZM894,79.85v1.88h5.48V79.85Zm4.86,0v.34c-1.08,2.56-4,4.66-7,5.56a9.21,9.21,0,0,1,1.28,1.76,13.31,13.31,0,0,0,8-7l-1.5-.72-.38.08Zm4.26-.7-1.92.56a13.29,13.29,0,0,0,8.3,7.54,9.41,9.41,0,0,1,1.42-1.9A11.46,11.46,0,0,1,903.14,79.15Zm3,.12a18.66,18.66,0,0,1-2.5,2.36L905,82.69a32.51,32.51,0,0,0,2.84-2.2Zm2.58,2a18.34,18.34,0,0,1-2.6,2.36l1.44,1.06a24.93,24.93,0,0,0,2.88-2.22Zm-14.2,4v1.8h3.34v3.42H900V85.25Zm-.38,3.22a48.91,48.91,0,0,1-1,5l1.94.32c.36-1.38.78-3.54,1.08-5.28Zm3.7,3.06v.28c-.18,2.54-.36,3.64-.68,3.94a1,1,0,0,1-.74.18c-.44,0-1.42,0-2.44-.12a4.78,4.78,0,0,1,.7,2c1.06,0,2.1,0,2.68,0a2.35,2.35,0,0,0,1.6-.68c.54-.56.78-1.9,1-4.8,0-.26.06-.82.06-.82Zm3.58-6.4v1.42a3,3,0,0,1-1.7,2.86,8.87,8.87,0,0,1,1.5,1.5,4.76,4.76,0,0,0,2.2-4.32V85.13ZM906.88,91v.26c-1,2.86-3.7,4.4-7.22,5a8,8,0,0,1,1,1.74c4-.86,7.06-2.66,8.32-6.58l-1.32-.44-.36.06Zm-3.62,1.46-1.82.48q2.1,4,7.34,5A9.27,9.27,0,0,1,910.16,96C906.9,95.57,904.42,94.35,903.26,92.43Zm-8.1-4-.32,1.76h3.74V88.47Zm-.56,3.06-.34,1.74h4.18V91.53Zm10.62-6.4v3c0,1.12.14,1.5.46,1.84a2,2,0,0,0,1.34.44h1a3.23,3.23,0,0,0,1-.14,1.19,1.19,0,0,0,.72-.54,3.9,3.9,0,0,0,.3-1.32,5.22,5.22,0,0,1-1.66-.86,6.06,6.06,0,0,1-.08.9c-.06.14-.12.22-.2.24a.9.9,0,0,1-.26,0h-.34a.27.27,0,0,1-.22-.08,1.19,1.19,0,0,1,0-.46v-3ZM893.36,83a13.59,13.59,0,0,1,2.34,1.64l1.42-1.4a13.61,13.61,0,0,0-2.42-1.5Zm27.9-.6-1.12,2.28h10.72V82.41Zm2.64,4.4V89h6.44V86.81Zm0,4.42v2.24h6.72V91.23Zm-1.2-8.06V97.93h2.46V83.17Zm-1-3.84a20,20,0,0,1-4.26,7.58,14.73,14.73,0,0,1,1.82,1.68A27.4,27.4,0,0,0,924,80Zm-5.28-.1a21.05,21.05,0,0,1-4.6,7.52,15.58,15.58,0,0,1,1.32,2.56,29.55,29.55,0,0,0,5.6-9.34Zm-2,5.52V97.91h2.42V82.35l0,0Zm28.18,8.32v2.3h6v-2.3Zm-.86-12V97h2.34V83.31h3.22v13.5h2.46V81Zm-5.86.1V97.91h2.4V81.13Zm-3.6,4v2.22h8.92V85.11Zm3.44.84a18.72,18.72,0,0,1-3.86,7.34,12.24,12.24,0,0,1,1.2,2.26c1.84-2,3.4-5.82,4.26-9.06Zm4-6.64a34.37,34.37,0,0,1-7.36,1.74,8.43,8.43,0,0,1,.66,1.88,40.83,40.83,0,0,0,8.26-1.74Zm-1.66,8.14-1.14,1.14a46.86,46.86,0,0,1,3,4.52l1.38-2C940.86,90.53,938.68,88,938.06,87.45Zm25.72,0c-1.76,4.72-5.88,7.18-11.76,8.3A13.3,13.3,0,0,1,953.54,98c6.06-1.5,10.5-4.36,12.82-9.86ZM957.34,84a15.09,15.09,0,0,1-5.1,4,16.51,16.51,0,0,1,2,1.88,23.27,23.27,0,0,0,5.56-5Zm1.78,3.56-2.3.68c2.26,5.36,6,8.52,12.46,9.76a10.68,10.68,0,0,1,1.58-2.3C964.72,94.69,960.9,91.93,959.12,87.51Zm-6.58-6.06v2.36h17.74V81.45Zm7.6-2.34V83h2.46V79.11Zm3.18,6.1a30,30,0,0,1,5.12,4.46L970.58,88a32.66,32.66,0,0,0-5.28-4.26ZM985,80.27a10.59,10.59,0,0,1,2.74,1.48L989,80.29a11,11,0,0,0-2.8-1.34ZM974.78,81v1.9H990.2V81Zm1.54,2.84v1.54h5.9V83.85Zm.06,2.48V90h1.92V86.33Zm10.4-2.92a11.56,11.56,0,0,1-5.16,6.48,14.58,14.58,0,0,1,1.66,1.68A15.34,15.34,0,0,0,989,84Zm-4.7-4.26c.26,6.66,2.6,12.6,6.1,12.6,1.62,0,2.34-.66,2.66-3.5a5.92,5.92,0,0,1-1.8-1.06c-.1,1.72-.28,2.4-.72,2.4-1.78,0-3.84-4.92-4-10.44Zm-5.7,7.18v1.54h3.76v1.26h-3.76v1.54h5.72V86.33Zm.78,6V95c0,2.06.6,2.72,3.2,2.72h3.22c2,0,2.62-.6,2.9-3.08a6.74,6.74,0,0,1-2.14-.84c-.08,1.58-.22,1.8-1,1.8h-2.72c-.94,0-1.1-.08-1.1-.62V92.35Zm1.86-.54a12.73,12.73,0,0,1,3,2.48l1.66-1.44a12.06,12.06,0,0,0-3.1-2.32Zm6.58,1.24a13.7,13.7,0,0,1,3,4.28l2.18-1.12A13.75,13.75,0,0,0,987.6,92Zm-11.12-.72A7.17,7.17,0,0,1,972,96.17l2,1.36a8.53,8.53,0,0,0,2.62-4.44ZM973.66,81v3c0,2-.16,4.82-1.84,6.82a8.14,8.14,0,0,1,1.76,1.46c1.9-2.26,2.28-5.8,2.28-8.26V81ZM1001,86.45v2h8.28v-2Zm0,3.82v2.14h8.68V90.27Zm2.9-11.08V97.91h2.3V79.19Zm-4.08,3.38V93.21H1002v-8.5h6.16v8.4h2.28V82.57Zm-7.38.28V85h6V82.85Zm2.4-3.68v4.7h2.34v-4.7Zm2.56,8.36L996,88.67a40.34,40.34,0,0,1,2.66,3.08l1.4-1.92A35,35,0,0,0,997.36,87.53Zm.14-4.68v.44a14.61,14.61,0,0,1-5.86,7.36,9.35,9.35,0,0,1,1.14,2.28,20,20,0,0,0,6.92-9.32l-1.32-.84-.4.08Zm-2.7,6.84v8.24h2.34V86.87Zm24.72-9.54v2.1h11v-2.1Zm.72,10.26v2.12H1030V90.41Zm-1.2,4.88v2.1h11.8v-2.1Zm4.72-4v5.24h2.42V91.33Zm-2.48-8.76a30.17,30.17,0,0,1-2.08,3.64,19.46,19.46,0,0,1,2.26,3.94l1.92-.76a23.43,23.43,0,0,0-2-3.2c.62-1,1.34-2.1,1.9-3.14Zm3.42,0a26,26,0,0,1-2.18,3.64,19.55,19.55,0,0,1,2.5,3.94l1.86-.8a19.87,19.87,0,0,0-2.16-3.16c.66-1,1.4-2.1,2-3.14Zm3.48,0a29.49,29.49,0,0,1-2.26,3.64,20.78,20.78,0,0,1,2.7,3.94l1.86-.84a21.75,21.75,0,0,0-2.34-3.12c.66-1,1.42-2.08,2-3.12ZM1015,79.17a28,28,0,0,1-2,4.52l1.6.66c.76-1.12,1.68-2.9,2.5-4.46Zm2.26,2.36a40,40,0,0,1-4.38,6.86l1.38.78a62.59,62.59,0,0,0,4.94-6.74Zm-5.36,2.3a14.74,14.74,0,0,1,2.62,3.42l1.3-1.84a13.87,13.87,0,0,0-2.74-3.18Zm4.68,2.5a17.92,17.92,0,0,1,1.66,4.38l1.8-.82a16.58,16.58,0,0,0-1.8-4.26Zm-4.74,1.6.26,2.06,6.64-.5,0-2C1016.22,87.69,1013.64,87.83,1011.84,87.93Zm5.28,3.42A15.9,15.9,0,0,1,1018,95l1.78-.58a16,16,0,0,0-1-3.54Zm-4.42-.44a15.27,15.27,0,0,1-1,4.66,15.55,15.55,0,0,1,1.74.84,18.3,18.3,0,0,0,1.2-5.18Zm2.2-1.92v8.94H1017V89ZM835.26,104v2.24h12V104Zm-1.16,0v7c0,3-.18,7-2.22,9.74a9.54,9.54,0,0,1,2,1.3c2.22-2.94,2.54-7.7,2.54-11v-7Zm12.14,0c0,9.52-.2,18,3,18,1.26,0,1.72-1.12,1.94-3.56a11.43,11.43,0,0,1-1.36-1.88,7.18,7.18,0,0,1-.32,2.84c-1,0-1-7.5-.86-15.4Zm-6.08,4.7v10.5h2.08v-10.5Zm-1.26,3.48h4.66v2.2H838.9Zm-1.84-1.82v5.84h8.44v-5.84Zm7.34-3.82a43.77,43.77,0,0,1-7.82,1,6.62,6.62,0,0,1,.58,1.78,44.94,44.94,0,0,0,8.82-1.06Zm-8.24,12,.16,2.14c2.4-.18,5.72-.44,8.88-.72v-2C841.9,118.13,838.44,118.35,836.16,118.45Zm6.92-1.7a18,18,0,0,1,1.74,4.54l2-.64a17,17,0,0,0-1.88-4.46Zm13.78-9.18h9v.78h-9Zm0-2.22h9v.76h-9Zm-2.3-1.54v6.1h13.72v-6.1Zm-2,9.66v1.9h17.72v-1.9Zm1-2.72v1.8h15.8v-1.8Zm11.68,3.44-1.68.76a16,16,0,0,0,6,3.42,9.21,9.21,0,0,1,1.38-1.68A15,15,0,0,1,865.22,114.19Zm-11.38,5.62,1,1.76c1.48-.48,3.34-1.12,5.08-1.74l-.28-1.64C857.52,118.81,855.32,119.45,853.84,119.81Zm3.34-10.24v5h2.32v-5Zm6.1,0v4.94h2.34v-4.94Zm-3,6.22v4.14c0,.22-.08.28-.32.28s-1.1,0-1.84,0a6.92,6.92,0,0,1,.6,1.78,8.9,8.9,0,0,0,2.9-.26c.68-.3.86-.76.86-1.72v-4.2Zm-2.58-1.64a13,13,0,0,1-5.66,2.74,9,9,0,0,1,1.38,1.66,14.65,14.65,0,0,0,6.08-3.64Zm4.36,5.54a48.3,48.3,0,0,1,5.5,1.92l1.08-1.54a56.2,56.2,0,0,0-5.5-1.76Zm-5.52-2.42a6.14,6.14,0,0,1,1.16,1.48l1.84-.92a6.25,6.25,0,0,0-1.26-1.42Zm8.16-1a11.81,11.81,0,0,1-1.28,1.6l1.64.84c.46-.36,1-.9,1.66-1.5Zm10.6,6.6a5.06,5.06,0,0,0,4-4.84c0-1.68-.76-2.76-2.16-2.76a1.83,1.83,0,0,0-2,1.8,1.8,1.8,0,0,0,1.92,1.8,1.7,1.7,0,0,0,1.18-.44l-1.1-1.8.14,2c0,1.14-.92,2.12-2.6,2.66Zm17.88-16.26v10.14h2.42V109h11.6v7.68h2.52v-10Zm1.26,6.66v2.36h14.16v-2.36Zm5.68-10.14v18.78h2.54V103.15Zm15.16.8v2.24h12V104Zm-1.16,0v7c0,3-.18,7-2.22,9.74a9.54,9.54,0,0,1,2,1.3c2.22-2.94,2.54-7.7,2.54-11v-7Zm12.14,0c0,9.52-.2,18,3,18,1.26,0,1.72-1.12,1.94-3.56a11.43,11.43,0,0,1-1.36-1.88,7.18,7.18,0,0,1-.32,2.84c-1,0-1-7.5-.86-15.4Zm-6.08,4.7v10.5h2.08v-10.5Zm-1.26,3.48h4.66v2.2H918.9Zm-1.84-1.82v5.84h8.44v-5.84Zm7.34-3.82a43.77,43.77,0,0,1-7.82,1,6.62,6.62,0,0,1,.58,1.78,44.94,44.94,0,0,0,8.82-1.06Zm-8.24,12,.16,2.14c2.4-.18,5.72-.44,8.88-.72v-2C921.9,118.13,918.44,118.35,916.16,118.45Zm6.92-1.7a18,18,0,0,1,1.74,4.54l2-.64a17,17,0,0,0-1.88-4.46ZM938.44,109v2h11.72v-2Zm6,4.76v2h5.48v-2Zm-7.4,5.6v2.08h13.8v-2.08Zm6.28-9.5v10.7h2.3v-10.7Zm-4.22,3.2v7.4h2.18v-7.4Zm-2.62-7.72v2.14H950.8v-2.14Zm-1.3,0v6c0,2.82-.22,6.48-2.68,9a8.18,8.18,0,0,1,1.72,1.6c2.8-2.74,3.24-7.36,3.24-10.56v-6Zm5.94-2.22v3.56h2.54v-3.56Zm-9,4.72a17,17,0,0,1,1.36,3.82l1.84-1a13.73,13.73,0,0,0-1.48-3.7Zm-.18,6.84.7,2.26c1.16-.66,2.4-1.4,3.56-2.14L935.6,113C934.22,113.65,932.86,114.31,931.9,114.71Zm27.92-5.94v2.38h10.94v-2.38Zm6.58-4.24a16.94,16.94,0,0,1,2.14,3.66l2-1a17.22,17.22,0,0,0-2.28-3.54Zm-12.62,4.14v2.14h4.08v-2.14ZM952.1,113v2.14h5.34V113Zm4.82-9.84v18.78h2.24V103.15Zm-4.12.88v6.76H955V104Zm.52,9.78v1.64c0,1.26-.18,3.52-1.48,5a9.18,9.18,0,0,1,1.82,1.1c1.56-1.68,1.82-4.44,1.82-6v-1.7Zm10.32-10.64v5.94c0,3.68-.46,8.1-4.84,11a8.38,8.38,0,0,1,1.6,1.86c5-3.4,5.54-8.5,5.54-12.88v-5.94Zm2.64,6.44-2.22.16c.28,3.14.88,9.06,5.26,12.06a6.8,6.8,0,0,1,1.76-2C966.94,117.25,966.44,112.33,966.28,109.61Z"
                                    transform="translate(-17.58 -31.09)" />
                                <path class="cls-7"
                                    d="M710.22,219.93v2.28h11.5v-2.28Zm.64-4.78v2.28h10.22v-2.28Zm3.68-2.84v18.56H717V212.31Zm-.24,9a13,13,0,0,1-5.58,6.48,9.71,9.71,0,0,1,1.62,1.9,15.85,15.85,0,0,0,5.86-7.82Zm2.86-.08-1.8.58a19.91,19.91,0,0,0,4.84,7.92,9.45,9.45,0,0,1,1.78-2A15.23,15.23,0,0,1,717.16,221.25Zm-12.28-7.36v2.3h2.64v7.38h-2.64v2.32h4.82v-12Zm-1.22,0v13.62h2.18V213.89Zm25.16,9.82h7v.66h-7Zm0,1.84h7v.68h-7Zm0-3.66h7v.66h-7Zm-2.28-1.24v6.8h11.62v-6.8Zm6.7,6.16v1.54c0,1.8.6,2.34,3,2.34h3c1.74,0,2.36-.56,2.58-2.66a5.75,5.75,0,0,1-2-.72c-.1,1.36-.22,1.58-.86,1.58h-2.42c-.8,0-1-.06-1-.54v-1.54Zm-4.4.1c-.4,1.4-1.36,2-5.84,2.22a6.22,6.22,0,0,1,1,1.8c5.26-.52,6.64-1.66,7.14-4Zm-5.18-8.36v3h2.1v-1.52H739v1.52h2.2v-3Zm1.76-5.56.34,6.34h2.08l-.3-5.5c.32-.06.46-.14.5-.3Zm11.88-.22c0,2.1-.18,4.76-.38,6.46h2.16c.16-1.66.3-4.32.36-6.46Zm-2.46,0v1.4h2.92v-1.4Zm-5.66-.62a27.12,27.12,0,0,1-3.06,1.42l1,.88a19.24,19.24,0,0,0,3.3-1.32Zm-2.74,2.64v1.26h3.34v-1.26Zm0,1.86v1.28h3.4v-1.28Zm8.64-1.86v1.26h3.36v-1.26Zm0,1.86v1.28h3.38v-1.28Zm-1.86-4.36a8.15,8.15,0,0,1-3.18,2.34,7.36,7.36,0,0,1,1,.94,9.72,9.72,0,0,0,3.48-2.92Zm-2.6,1.1a12.91,12.91,0,0,1,2.8,2l.92-.88a13.55,13.55,0,0,0-2.82-1.88Zm2.72,1.92a8.5,8.5,0,0,1-3.32,2.54,7.8,7.8,0,0,1,1,1,10.5,10.5,0,0,0,3.6-3.14Zm-2.74,1.06a14.79,14.79,0,0,1,3,2.24l1-.88a15.33,15.33,0,0,0-3.1-2.16Zm12.72,5.14v2.1H761.6v-2.1Zm.7-8v2.06h17v-2.06Zm-.08,14.94.54,2.24c2.44-.38,5.76-.88,8.86-1.42l-.12-2.16C749.84,227.67,746.24,228.19,743.9,228.49Zm9.18-6-2.12.52c1.68,4.28,4.5,6.86,9.46,7.94a9.16,9.16,0,0,1,1.46-2.1C757.26,228.11,754.4,225.93,753.08,222.53Zm5.42.66a24.9,24.9,0,0,1-4,3l1.52,1.28a30.72,30.72,0,0,0,4.34-2.88Zm-7.3-11.06v10.54h2.38V212.13Zm-4.5,5.66h1.86v1.48H746.7Zm-1.66-1.4v4.26h5.3v-4.26Zm11.08,1.4H758v1.48h-1.86Zm-1.68-1.4v4.26h5.32v-4.26Zm-7.72,6.12v7.06l2.36-.26v-6.8Zm16.66-1.58v2.42h18.08v-2.42Zm3.12-8.56a15.89,15.89,0,0,1-3.26,6.72,17.25,17.25,0,0,1,2.32,1.28,21.91,21.91,0,0,0,3.48-7.46Zm.58,2.94-1.22,2.44h13.88v-2.44Zm6.56,6.12-2.28.52c1.56,4.72,4.14,7.68,9.08,9a10.81,10.81,0,0,1,1.62-2.26C777.48,227.71,774.84,225.19,773.64,221.43Zm-2.58-9.28v6.36c0,3.82-.84,8.14-8.06,10.28a9.17,9.17,0,0,1,1.52,2.12c8-2.5,9.06-7.7,9.06-12.38v-6.38Z"
                                    transform="translate(-17.58 -31.09)" />
                                <path class="cls-7"
                                    d="M738.34,755.61v2.1h18.14v-2.1Zm4.68-5.76v1.86h10.8v-1.86Zm0,2.86v1.86h10.8v-1.86Zm-3.8,9.9.54,2.22c2.44-.38,5.76-.88,8.84-1.38l-.1-2.12C745.18,761.81,741.58,762.35,739.22,762.61Zm9-6.42-2.2.54a12.05,12.05,0,0,0,9.28,8.24,9.14,9.14,0,0,1,1.52-2.16C752.34,762,749.54,759.69,748.26,756.19Zm5.68,1.26a26.64,26.64,0,0,1-4.36,2.9l1.6,1.24a31.55,31.55,0,0,0,4.68-2.78ZM741.7,746.83v9.66h2.46v-7.68h10.22v-2Zm0,9.4v6.92l2.48-.26v-6.66Zm28-9.18v2.16h5.18v-2.16Zm0,4.52v2.1h5.18v-2.1Zm0,4.56v2.14h5.2v-2.14Zm4.14-9.08v15.2c0,.3-.1.4-.4.4s-1.26,0-2.12,0a7.86,7.86,0,0,1,.68,2.28,7.15,7.15,0,0,0,3.22-.44c.72-.36.94-1,.94-2.18V747.05Zm-5.12,0v7.34c0,2.86-.12,6.66-1.62,9.22A8.46,8.46,0,0,1,769,765c1.7-2.84,2-7.42,2-10.58v-7.34Zm-10.48,1.46v2.08H768v-2.08Zm2.62,3.26v1.84h4.76v-1.84Zm0,3.12v1.82h4.78v-1.82ZM758,758.05v2.1h9.9v-2.1Zm1.82-11.68v12.44H762V746.37Zm4.66,0v12.44h2.2V746.37Zm-4,13.92a9.19,9.19,0,0,1-2.66,3.28,15.48,15.48,0,0,1,1.94,1.4,15.13,15.13,0,0,0,3-4Zm3,.9a19,19,0,0,1,2.16,3.06l1.94-1.14a19.79,19.79,0,0,0-2.28-2.92Zm14.64-8V755h11.66v-1.82Zm4.72-1.18v2.2H785V752Zm-1.24,5.36h4.68v1.22h-4.68Zm-2.06-1.54v4.3h8.92v-4.3Zm2-5.62h4.84v.8h-4.84Zm0-2h4.84v.78h-4.84Zm-2.14-1.34v5.5h9.2v-5.5Zm3.42,12.28v3.74c0,.22-.06.26-.3.26s-1.06,0-1.8,0a8.1,8.1,0,0,1,.86,1.84,6.44,6.44,0,0,0,2.58-.32c.66-.3.84-.78.84-1.7v-3.8Zm-2.88,1.32a8,8,0,0,1-2.08,2.86,15.2,15.2,0,0,1,1.72,1.16,12.08,12.08,0,0,0,2.36-3.5Zm5.68.88a18.65,18.65,0,0,1,2,2.88l1.86-1a21.14,21.14,0,0,0-2.1-2.78Zm8.22-14.82a14.15,14.15,0,0,1-4.76,4,9.76,9.76,0,0,1,1.7,1.7,18.81,18.81,0,0,0,5.34-4.74Zm.36,5.58a15.53,15.53,0,0,1-5,4.08,9.9,9.9,0,0,1,1.72,1.7,20.6,20.6,0,0,0,5.56-4.84Zm.42,5.44a12.57,12.57,0,0,1-6.18,5.44,9.71,9.71,0,0,1,1.68,2,15.81,15.81,0,0,0,6.88-6.62Zm10.6-9v1.18h4.16v-1.18Zm-4.76,6.88v1.46h14.26v-1.46Zm1.94,6.36v1h10.1v-1Zm0,1.56v1.18h10.1v-1.18Zm-4.08-5.42v1.54h18.22v-1.54Zm-.32-6.16.34,1.66,5-.64-.06-1.42C801.3,751.49,799.38,751.65,798,751.73Zm5.72,1.34.42,1.64c1.62-.22,3.64-.5,5.64-.82l-.06-1.4C807.48,752.71,805.26,753,803.72,753.07Zm-.76-2.52c-.62,2.18-2.42,3.54-4.86,4.3a8.73,8.73,0,0,1,1.08,1.44,8.54,8.54,0,0,0,5.56-5.48Zm11.76-3.86V747c-.3.94-.74,2.24-1.28,3.54,1,.76,1.42,1.32,1.42,1.74a.6.6,0,0,1-.28.58,1.56,1.56,0,0,1-.48.1l-1.12,0a3.39,3.39,0,0,1,.54,1.6,8.25,8.25,0,0,0,1.42,0,2.49,2.49,0,0,0,1-.34,1.7,1.7,0,0,0,.8-1.62,3.28,3.28,0,0,0-1.4-2.32c.46-.94,1-1.92,1.4-2.94l-1.42-.64-.28.1Zm-16.5,2.44a14.5,14.5,0,0,1,2.74,2.14l1-1.54a16,16,0,0,0-2.78-2Zm2.48-3a17.38,17.38,0,0,1-1.62,2.82l1.28.54c.6-.72,1.32-1.76,2-2.74Zm1.84,1.54a26,26,0,0,1-3.32,4.38l1.28.62a38.71,38.71,0,0,0,3.66-4.3Zm8.4-1v8.38h1.92v-6.76h2.4v-1.62Zm-6.38,0v6.92h1.84v-6.92Zm.72,0v1.2h3.16v2.4h-3.16v1.22h5v-4.82Zm.88,7.78v1.8h2.28v-1.8Zm-5,5.5v5h2.18v-3.78h8.46v3.76h2.3V760Zm1.78-3a3.85,3.85,0,0,1,.7,1.32l2-.54a3.94,3.94,0,0,0-.78-1.3Zm4.7-5a10.46,10.46,0,0,1,2.1,2.74l1.42-.8a10.08,10.08,0,0,0-2.2-2.66Zm2.52,4.22a12.25,12.25,0,0,1-.92,1.62l1.7.52c.36-.4.86-.94,1.4-1.58Zm11.42-6.48v2.34h13.92v-2.34Zm-.82,5.9V758h14v-2.3ZM818.42,762v2.34H836.5V762Zm7.78-15.86v17h2.5v-17Zm-4.62.24a17.41,17.41,0,0,1-3.58,7.2,15.68,15.68,0,0,1,2.16,1.46,24.07,24.07,0,0,0,3.9-8.1Zm24.7,1.66v2h10.24v-2Zm.48,13.86V764h10.06v-2.1Zm-1.3-9.22v12.24h2.16V752.69Zm5.22,2.86h3.06v1h-3.06Zm0,2.64h3.06v1h-3.06Zm0-5.26h3.06v1h-3.06Zm-2.08-1.72v9.72h7.3v-9.72Zm2.06-5c-.1,1.82-.28,4.12-.52,5.58h2.22c.26-1.42.56-3.64.74-5.46Zm-12.24.94v2.16h7.32v-2.16Zm2.64,4.24v2.14h3.3v-2.14Zm-1.26,5.36a11.12,11.12,0,0,1,2.5,2.24l1.24-1.94a10.66,10.66,0,0,0-2.58-2Zm.84-8.88c-.44,3.44-1.3,6.72-2.88,8.72a13.31,13.31,0,0,1,1.7,1.64c1.76-2.36,2.86-6.06,3.42-10Zm3,3.52v.48c-.56,5.56-2.28,9.48-5.14,11.54a8.16,8.16,0,0,1,1.66,1.66c3-2.3,4.94-6.82,5.64-13.36l-1.36-.4-.38.08Zm14.62-3v2.26h7.54v-2.26Zm7.84,2.1v2.3h9v-2.3Zm-5.24-1.18v10.06h2.36V749.23Zm13.08,1.18v.48c-.18,7.6-.4,10.56-.94,11.18a.89.89,0,0,1-.8.34c-.46,0-1.42,0-2.48-.1a5.6,5.6,0,0,1,.74,2.36,16.23,16.23,0,0,0,2.88-.06,2.36,2.36,0,0,0,1.78-1.06c.72-1,.94-3.92,1.16-12.06,0-.3,0-1.08,0-1.08Zm-16,8.62.56,2.5c2.22-.6,5.1-1.42,7.78-2.2l-.32-2.28C863.08,757.81,860,758.61,857.94,759Zm10.94-12.56c0,7.74.2,13.44-5.32,16.54a7.2,7.2,0,0,1,1.7,2c6-3.58,6-10.16,6.06-18.5Zm12.16-.42a27,27,0,0,1-2,5.08l2.08.54a38.2,38.2,0,0,0,2.38-5.08Zm-3,4.1.18,2.28c2.28-.14,5.36-.32,8.3-.54l0-2.08C883.42,750,880.18,750.09,878,750.15Zm1.18,3.22v11.54h2.22v-9.56h4.14v-2Zm5.22,0v9.08c0,.26-.08.32-.32.32s-1.06,0-1.76,0a9.1,9.1,0,0,1,.76,2.14,6.29,6.29,0,0,0,2.82-.4c.68-.36.88-1,.88-2v-9.14Zm-4.2,3v1.78h5.54v-1.78Zm0,2.94v1.78h5.54v-1.78Zm8.14-13.1v6c0,2.22.58,2.9,2.94,2.9h2.76c1.86,0,2.5-.72,2.76-3.32a6.36,6.36,0,0,1-2.14-.88c-.08,1.76-.2,2.06-.86,2.06h-2.18c-.76,0-.88-.1-.88-.8v-6Zm6,1.18a28.64,28.64,0,0,1-5.24,2.24,6.92,6.92,0,0,1,.68,1.66,37.73,37.73,0,0,0,6.08-2.16Zm-6,8.16v6.32c0,2.22.6,2.9,3,2.9h2.84c1.92,0,2.56-.8,2.82-3.62a6.69,6.69,0,0,1-2.12-.88c-.1,2-.22,2.4-.92,2.4h-2.28c-.78,0-.92-.08-.92-.82v-6.3Zm6.16.84a25,25,0,0,1-5.44,2.48,10,10,0,0,1,.7,1.68,33.07,33.07,0,0,0,6.3-2.4Zm-10.76-8.16A20,20,0,0,1,886,753l2.18-.88a19.17,19.17,0,0,0-2.4-4.66Z"
                                    transform="translate(-17.58 -31.09)" />
                                <path class="cls-7"
                                    d="M40.78,286.85V289h4.06v-2.16Zm5.36,1.64v2.24H57.48v-2.24Zm-5.26,2.92v2.18H44.6v-2.18Zm0,4.66v2.22H44.6v-2.22Zm-1-9.22v7.32c0,2.94-.08,7-1.26,9.76a8.76,8.76,0,0,1,1.9,1.06c1.26-3,1.44-7.64,1.44-10.84v-7.3Zm3.74,0v15.46c0,.24-.06.32-.28.32s-.9,0-1.54,0a7.2,7.2,0,0,1,.62,2.26,4.69,4.69,0,0,0,2.62-.46c.6-.38.76-1,.76-2.08v-15.5Zm6.92-.46v3.4h2.4v-3.4Zm.08,4.66v13.86h2.26V291.05Zm-3.82,1.32v9.54h2.18v-7.34H55.6v-2.2Zm8,0v7.14c0,.18-.06.24-.24.24s-.76,0-1.34,0a8.28,8.28,0,0,1,.64,2.36,4.38,4.38,0,0,0,2.42-.44c.62-.4.76-1.1.76-2.1v-7.2Zm15-5.08v17.64H72.1V289.55h3.48v-2.26Zm-10.54.78v2.08H68.9v-2.08Zm-.42,5.6v2.16H69.14v-2.16Zm4.1-7.38v3.08h2.32v-3.08Zm-2.52,4.42a12.91,12.91,0,0,1,.7,3l2.1-.5a12.67,12.67,0,0,0-.82-2.92Zm5.36-.5a18.92,18.92,0,0,1-.84,3l1.88.46c.36-.76.76-1.9,1.2-3Zm-5,11.66V304h6.18v-2.08Zm-.82-4.72V305h2.22v-5.72h3.76v5.64h2.32v-7.72Zm15-9.86v.84c-.44,1.4-1.36,4.5-2.16,6.42a5.82,5.82,0,0,1,2.06,4.1c0,.7-.14,1.14-.48,1.36a1.45,1.45,0,0,1-.74.18c-.3,0-.7,0-1.14,0a5.64,5.64,0,0,1,.6,2.34,10.27,10.27,0,0,0,1.6,0,3.2,3.2,0,0,0,1.38-.52c.76-.52,1.1-1.5,1.1-3a6.61,6.61,0,0,0-2-4.7c.78-1.72,1.66-4,2.38-6l-1.76-1.1-.38.08Zm6,2.1v2.1h4v9.26H81v2.12h6.14V289.39Zm-1.4,0v15h2.18v-15Zm1.3,5.34v2.08H86v-2.08Zm1.54-8.6a24.85,24.85,0,0,1-.66,3.68l1.92.42c.4-.94.9-2.36,1.36-3.72Zm7.34,3.12v2.18H95.6v-2.18Zm5,0v.46c-.22,8.34-.48,11.78-1.12,12.46a1,1,0,0,1-.88.36c-.5,0-1.7,0-3-.12a5.28,5.28,0,0,1,.8,2.32,17.64,17.64,0,0,0,3.14,0,2.51,2.51,0,0,0,1.94-1.12c.82-1.06,1.06-4.24,1.32-13.24,0-.3,0-1.08,0-1.08Zm-5-3.1a19.29,19.29,0,0,1-3.12,7.06,14.58,14.58,0,0,1,2,1.4,26.34,26.34,0,0,0,3.44-7.92Zm-1,8.86a42.61,42.61,0,0,1,2.76,4.66l2-1.24A49.45,49.45,0,0,0,90.72,294Zm14.22-7.24v1.78h13.76v-1.78Zm.26,2.48V292h11.74v-1.72Zm-2.24,2.44v1.82h11.58v-1.82Zm1.72-6.58a13.71,13.71,0,0,1-4.22,6.14,13.45,13.45,0,0,1,2.14,1.46,19.3,19.3,0,0,0,4.54-7Zm9,6.58c.06,6.72.38,12.24,3.62,12.24,1.5,0,2-1.12,2.12-3.72a9.09,9.09,0,0,1-1.52-1.52c0,1.72-.14,2.84-.42,2.84-1.14,0-1.4-4.58-1.38-9.84Zm-7.36,4.2v8h2.36v-8Zm-4.74-.78v1.66h11.64v-1.66Zm.74,2.36v1.6H110.7v-1.6Zm-1.22,2.34v1.76h12.5v-1.76Zm2.38-6a7.12,7.12,0,0,1,.74,1.82l2.14-.6a6.79,6.79,0,0,0-.86-1.76Zm6-.64a18.09,18.09,0,0,1-1,1.84l1.92.54c.38-.44.82-1.1,1.34-1.82Zm15.46-6.32v1.8h13.66v-1.8Zm.18,2.56v1.74H135v-1.74ZM121,293v1.82h11.56V293Zm-1.3,5.24V300h11.9v-1.82Zm3.26-12.08a13.45,13.45,0,0,1-4.4,6.2,17.84,17.84,0,0,1,2.26,1.52,19.24,19.24,0,0,0,4.7-7.06Zm8.86,6.84c.08,6.54.4,11.92,3.64,11.92,1.5,0,2-1.12,2.12-3.68a7.85,7.85,0,0,1-1.54-1.52c0,1.72-.12,2.82-.4,2.82-1.12,0-1.42-4.44-1.4-9.54Zm-11,3.08a8.26,8.26,0,0,1,1.24,2.38l1.92-.76a8.94,8.94,0,0,0-1.36-2.34Zm4.76,5a32.05,32.05,0,0,1,4.44,3.1l1.6-1.42a37.21,37.21,0,0,0-4.54-2.94Zm-.9-5.84v9.7h2.26v-9.7Zm4.24.08a15.7,15.7,0,0,1-1.4,2.52l1.54.58c.54-.62,1.26-1.54,2-2.44ZM124.14,299a12.3,12.3,0,0,1-5.16,3.9,9.7,9.7,0,0,1,1.5,1.76,14.5,14.5,0,0,0,5.44-5Zm26.34-4.6c-1.76,4.72-5.88,7.18-11.76,8.3a13.3,13.3,0,0,1,1.52,2.28c6.06-1.5,10.5-4.36,12.82-9.86ZM144,291a15.09,15.09,0,0,1-5.1,4,16.51,16.51,0,0,1,2,1.88,23.27,23.27,0,0,0,5.56-5Zm1.78,3.56-2.3.68c2.26,5.36,6,8.52,12.46,9.76a10.68,10.68,0,0,1,1.58-2.3C151.42,301.69,147.6,298.93,145.82,294.51Zm-6.58-6.06v2.36H157v-2.36Zm7.6-2.34V290h2.46v-3.88Zm3.18,6.1a30,30,0,0,1,5.12,4.46l2.14-1.66a32.66,32.66,0,0,0-5.28-4.26Zm18-6.1a9.44,9.44,0,0,1-3.68,4.7,6.17,6.17,0,0,1,1.58,1.48,12.93,12.93,0,0,0,4.32-5.84Zm.56,1.46-1.1,1.84h5v-1.84Zm.32,4.64c-.06,1.38-.36,2.3-1.64,2.86a4.24,4.24,0,0,1,1,1.28c1.76-.84,2.18-2.2,2.32-4.14Zm2.46.08v1.64c0,1.46.3,1.88,1.78,1.88h1.3c.92,0,1.4-.28,1.58-1.16a4.08,4.08,0,0,1-1.48-.56c0,.18-.12.24-.36.24h-.76c-.3,0-.32,0-.32-.4v-1.64Zm-6.6,5.84v2h12.46v-2Zm7.44.66-2.08.22c.9,3.24,2.52,5.12,6.06,5.86a7.12,7.12,0,0,1,1.36-2C174.54,302.43,172.94,301.07,172.24,298.79Zm-4.56-7.94h-2v6.66h2v-4.78h7.4v-1.88Zm6.88,0v6.62h2v-6.62Zm-2.8-3.28v.4a16.37,16.37,0,0,1-1.56,3.22,13.58,13.58,0,0,1,1.62,1,24.49,24.49,0,0,0,2.28-3.74l-1.52-1-.34.08Zm-1.86,8.92c-.24,3.66-.8,5.64-6,6.64a6.11,6.11,0,0,1,1.18,1.86c5.8-1.34,6.7-4,7-8.5Zm-11.38-.28.54,2.3c1.76-.5,4-1.14,6-1.78l-.32-2.16C162.5,295.21,160.12,295.85,158.52,296.21Zm.32-6.26v2.2H165V290Zm2.12-3.78v16.22c0,.28-.1.34-.34.34a16.16,16.16,0,0,1-1.66,0,9.21,9.21,0,0,1,.62,2.24,5.27,5.27,0,0,0,2.76-.46c.62-.36.82-1,.82-2.1V286.17Zm18,2.14v2.26h7.54v-2.26Zm7.84,2.1v2.3h9v-2.3Zm-5.24-1.18v10.06h2.36V289.23Zm13.08,1.18v.48c-.18,7.6-.4,10.56-.94,11.18a.89.89,0,0,1-.8.34c-.46,0-1.42,0-2.48-.1a5.6,5.6,0,0,1,.74,2.36,16.23,16.23,0,0,0,2.88-.06,2.36,2.36,0,0,0,1.78-1.06c.72-1,.94-3.92,1.16-12.06,0-.3,0-1.08,0-1.08Zm-16,8.62.56,2.5c2.22-.6,5.1-1.42,7.78-2.2l-.32-2.28C183.78,297.81,180.66,298.61,178.64,299Zm10.94-12.56c0,7.74.2,13.44-5.32,16.54a7.2,7.2,0,0,1,1.7,2c6-3.58,6-10.16,6.06-18.5Zm12.16-.42a27,27,0,0,1-2,5.08l2.08.54a38.2,38.2,0,0,0,2.38-5.08Zm-3,4.1.18,2.28c2.28-.14,5.36-.32,8.3-.54l0-2.08C204.12,290,200.88,290.09,198.72,290.15Zm1.18,3.22v11.54h2.22v-9.56h4.14v-2Zm5.22,0v9.08c0,.26-.08.32-.32.32s-1.06,0-1.76,0a9.1,9.1,0,0,1,.76,2.14,6.29,6.29,0,0,0,2.82-.4c.68-.36.88-1,.88-2v-9.14Zm-4.2,3v1.78h5.54v-1.78Zm0,2.94v1.78h5.54v-1.78Zm8.14-13.1v6c0,2.22.58,2.9,2.94,2.9h2.76c1.86,0,2.5-.72,2.76-3.32a6.36,6.36,0,0,1-2.14-.88c-.08,1.76-.2,2.06-.86,2.06h-2.18c-.76,0-.88-.1-.88-.8v-6Zm6,1.18a28.64,28.64,0,0,1-5.24,2.24,6.92,6.92,0,0,1,.68,1.66,37.73,37.73,0,0,0,6.08-2.16Zm-6,8.16v6.32c0,2.22.6,2.9,3,2.9h2.84c1.92,0,2.56-.8,2.82-3.62a6.69,6.69,0,0,1-2.12-.88c-.1,2-.22,2.4-.92,2.4h-2.28c-.78,0-.92-.08-.92-.82v-6.3Zm6.16.84a25,25,0,0,1-5.44,2.48,10,10,0,0,1,.7,1.68,33.07,33.07,0,0,0,6.3-2.4Zm-10.76-8.16a20,20,0,0,1,2.26,4.78l2.18-.88a19.17,19.17,0,0,0-2.4-4.66Zm23.36,5.7V296h7.1V294Zm-.06-5v2.18h8V289Zm3.12-2.8v9.06h2.34v-9.06Zm-4.12,2.8v4.64c0,3-.2,7.16-2.44,10a8.57,8.57,0,0,1,2,1.24c2.34-3.1,2.74-8,2.74-11.26V289Zm3.66,6.18-2.06.52c1.4,4.42,3.8,7.68,7.86,9.26a9.26,9.26,0,0,1,1.6-2.1A11.14,11.14,0,0,1,230.42,295.17Zm4.7-6.18v.3a38.18,38.18,0,0,1-.76,3.88l2,.4a40.46,40.46,0,0,0,1.12-4.32l-1.7-.34-.36.08Zm-.66,5v.38a11.25,11.25,0,0,1-7.1,8.6,8.65,8.65,0,0,1,1.4,2c4.08-1.76,7-5,8.1-10.52l-1.54-.54-.42.1Zm-13.16,2.74v8.24h2.26V294Zm-2.32-7v2.14h5.58v-2.14Zm2.3-3.46v4.7h2.26v-4.7Zm2,7.92-1.22,1a42,42,0,0,1,2.86,4.22l1.38-1.58C225.8,297.19,223.82,294.71,223.24,294.13Zm.78-4.46v.44a15.55,15.55,0,0,1-5.6,7.28,9.58,9.58,0,0,1,1.1,2.22,21.33,21.33,0,0,0,6.6-9.18l-1.26-.84-.38.08Zm1.44,3.8a16.71,16.71,0,0,1-1.64,2.54l1.12.88c.56-.6,1.26-1.52,1.94-2.38Zm14.66-6.06v2.48h16.12v-2.48Zm-1,6.8v2.52h18.08v-2.52Zm7.6-6v16.7h2.7v-16.7Zm18.52-1.56v1.6h11.72v-1.6Zm2.16,4v1h7.18v-1Zm-.06,1.58v.94h7.24v-.94Zm2.68-4.62a18.3,18.3,0,0,1-.6,2.08h2.12c.26-.58.58-1.32.86-2.08ZM266.5,289v5.72h2v-4.64h4.86v4.64h2.12V289Zm-1.66,4.86v3h2.06v-1.46h8.18v1.46h2.16v-3Zm1.62,1.92a4.06,4.06,0,0,1-1.6,2.26l1.34,1.08a4.8,4.8,0,0,0,1.78-2.8Zm1.72.2v1c0,1.38.42,1.76,2.2,1.76h2.1c1.18,0,1.66-.36,1.8-1.62a5.52,5.52,0,0,1-1.5-.52c-.08.7-.16.84-.56.84h-1.56c-.5,0-.6,0-.6-.46v-1Zm1-.36a10.31,10.31,0,0,1,2.44,1.4l1-1a10.1,10.1,0,0,0-2.5-1.3Zm4.12.78a11.23,11.23,0,0,1,2.26,2.54L277,298a9.8,9.8,0,0,0-2.32-2.46Zm-4.26,1.7a9.94,9.94,0,0,1-4.6,2.74,6.58,6.58,0,0,1,1.3,1.48,12.14,12.14,0,0,0,5.38-3.82Zm4.26,1.14v.36c-1.08,1.9-4.2,3.2-9.18,3.76a8.4,8.4,0,0,1,1.14,1.6c5.42-.74,8.86-2.36,10.36-5.1l-1.42-.68-.42.06Zm-4.62.92-2,.52c1.94,2.66,5.16,3.88,9.78,4.26a8.41,8.41,0,0,1,1.26-2C273.5,302.79,270.24,302,268.7,300.15Zm.52-.92-.92,1.32h5.6v-1.32Zm-10.7-3,.54,2.3c1.76-.5,4-1.14,6-1.78l-.32-2.16C262.5,295.21,260.12,295.85,258.52,296.21Zm.32-6.26v2.2H265V290Zm2.12-3.78v16.22c0,.28-.1.34-.34.34a16.16,16.16,0,0,1-1.66,0,9.21,9.21,0,0,1,.62,2.24,5.27,5.27,0,0,0,2.76-.46c.62-.36.82-1,.82-2.1V286.17Zm21,19.72a5.06,5.06,0,0,0,4-4.84c0-1.68-.76-2.76-2.16-2.76a1.83,1.83,0,0,0-2,1.8,1.8,1.8,0,0,0,1.92,1.8,1.7,1.7,0,0,0,1.18-.44l-1.1-1.8.14,2c0,1.14-.92,2.12-2.6,2.66Zm28.66-19.74V294h2.44v-7.84Zm-1.84,15.78v2.14h6.5v-2.14Zm-2.4-13.18v2.16h11.08v-2.16Zm.56,4.36v2.18H317v-2.18Zm.62,3.86v7.94h2.2v-5.8h4.48v5.78h2.3V297Zm-5.86-10.8a25.73,25.73,0,0,1-2,4.52l1.62.66a44.89,44.89,0,0,0,2.54-4.44Zm2.4,2.36a38,38,0,0,1-4.42,6.88l1.46.74a58.44,58.44,0,0,0,5-6.78Zm-5.48,2.38a15.35,15.35,0,0,1,2.74,3.3l1.22-1.88a15.2,15.2,0,0,0-2.84-3.08Zm5,2.44a18.52,18.52,0,0,1,1.74,4.34l1.82-.84a16.94,16.94,0,0,0-1.86-4.24Zm-5,1.62.2,2.08c2-.12,4.56-.3,7.06-.5l0-1.9C303.22,294.79,300.48,294.91,298.62,295Zm5.36,3.4a23.35,23.35,0,0,1,1.18,3.88l1.88-.68a25.8,25.8,0,0,0-1.3-3.78Zm-4.5-.46a14.54,14.54,0,0,1-1.06,4.66,15.35,15.35,0,0,1,1.82.88,18.42,18.42,0,0,0,1.22-5.2ZM301.8,296V305h2.14V296ZM53.12,316.61v2.1h10v-2.1Zm-.24,9.5v2.1H63.2v-2.1Zm-1.06-5.4V329h2.36v-6.14H62.1V329h2.46v-8.26ZM58,312.53a26.21,26.21,0,0,0,8.18,6.72,10.52,10.52,0,0,1,1.58-2.16,20.35,20.35,0,0,1-8.62-6.92h-2.5a21,21,0,0,1-8.16,7.16,10.31,10.31,0,0,1,1.5,1.94A24.38,24.38,0,0,0,58,312.53Zm12.74-1.68V313h4.06v-2.16Zm5.36,1.64v2.24H87.48v-2.24Zm-5.26,2.92v2.18H74.6v-2.18Zm0,4.66v2.22H74.6v-2.22Zm-1-9.22v7.32c0,2.94-.08,7-1.26,9.76a8.76,8.76,0,0,1,1.9,1.06c1.26-3,1.44-7.64,1.44-10.84v-7.3Zm3.74,0v15.46c0,.24-.06.32-.28.32s-.9,0-1.54,0a7.2,7.2,0,0,1,.62,2.26,4.69,4.69,0,0,0,2.62-.46c.6-.38.76-1,.76-2.08v-15.5Zm6.92-.46v3.4h2.4v-3.4Zm.08,4.66v13.86h2.26V315.05Zm-3.82,1.32v9.54h2.18v-7.34H85.6v-2.2Zm8,0v7.14c0,.18-.06.24-.24.24s-.76,0-1.34,0a8.28,8.28,0,0,1,.64,2.36,4.38,4.38,0,0,0,2.42-.44c.62-.4.76-1.1.76-2.1v-7.2Zm15-5.08v17.64h2.34V313.55h3.48v-2.26Zm-10.54.78v2.08H98.9v-2.08Zm-.42,5.6v2.16H99.14v-2.16Zm4.1-7.38v3.08h2.32v-3.08Zm-2.52,4.42a12.91,12.91,0,0,1,.7,3l2.1-.5a12.67,12.67,0,0,0-.82-2.92Zm5.36-.5a18.92,18.92,0,0,1-.84,3l1.88.46c.36-.76.76-1.9,1.2-3Zm-5,11.66V328h6.18v-2.08Zm-.82-4.72V329h2.22v-5.72h3.76v5.64h2.32v-7.72Zm15-9.86v.84c-.44,1.4-1.36,4.5-2.16,6.42a5.82,5.82,0,0,1,2.06,4.1c0,.7-.14,1.14-.48,1.36a1.45,1.45,0,0,1-.74.18c-.3,0-.7,0-1.14,0a5.64,5.64,0,0,1,.6,2.34,10.27,10.27,0,0,0,1.6,0,3.2,3.2,0,0,0,1.38-.52c.76-.52,1.1-1.5,1.1-3a6.61,6.61,0,0,0-2-4.7c.78-1.72,1.66-4,2.38-6l-1.76-1.1-.38.08Zm6.72.72v16.9H114V312Zm-2.7,3.6v2.24h7v-2.24Zm2.9,1.06a19.91,19.91,0,0,1-3.4,6.72,12.89,12.89,0,0,1,1.12,2.3,26.87,26.87,0,0,0,3.68-8.4Zm2.9-6.32a26.16,26.16,0,0,1-6,1.48,7.85,7.85,0,0,1,.66,1.84,31.1,31.1,0,0,0,7-1.46Zm-1,8-1,.94a30.64,30.64,0,0,1,2.28,3.62l1.38-1.88C116.06,320.55,114.32,318.75,113.82,318.33Zm6.6-8.18v6.4h2.38v-6.4Zm-3.92.92v1.46H127v-1.46Zm.36,2.14v1.38h9.66v-1.38Zm-1,2.06v1.5h11.5v-1.5Zm3.4,5.86h4.86V322h-4.86Zm0,2.22h4.86v.86h-4.86Zm0-4.42h4.86v.82h-4.86Zm-2.16-1.48v8.24h9.28v-8.24Zm5.16,9.16c1.18.74,2.56,1.74,3.32,2.34l2.08-1.12c-.9-.64-2.5-1.6-3.8-2.38Zm-2.92-1.26a14.49,14.49,0,0,1-4.46,2.18,14.92,14.92,0,0,1,1.48,1.5,17.74,17.74,0,0,0,4.84-2.44Zm21.76-5.84a9.27,9.27,0,0,1,1.54,2l1.2-1.08a8.56,8.56,0,0,0-1.58-1.82Zm-7.06-7.36v2.26H147.4v-2.26Zm6.86,4.3v1.86h4.34v-1.86Zm-1.56-6.32v3h2.42v-3Zm-2.84,4.16a17.35,17.35,0,0,1-3.74,6.3,12.5,12.5,0,0,1,1.56,1.52,23.83,23.83,0,0,0,4.4-7.18Zm4.12.06a15.63,15.63,0,0,1-3.64,6.52,11.64,11.64,0,0,1,1.5,1.48,20.75,20.75,0,0,0,4.32-7.48Zm4.2,2.1v.4c-.9,4.94-3.7,8.64-7.4,10.28a8,8,0,0,1,1.38,1.8c4.12-2.1,7.1-5.94,8.22-12.06l-1.44-.52-.36.1ZM129.6,312a13.64,13.64,0,0,1,3.22,2.14l1.44-1.92a15,15,0,0,0-3.32-2Zm-.9,5.4a12.72,12.72,0,0,1,3.2,2l1.42-1.94a12.56,12.56,0,0,0-3.3-1.82Zm.36,10.06,2.18,1.32c.88-2,1.8-4.3,2.52-6.44l-1.9-1.34A60.1,60.1,0,0,1,129.06,327.47Zm11.46-8.3-1.8.54a16.56,16.56,0,0,0,7.52,9.22,8.79,8.79,0,0,1,1.54-1.88A14.13,14.13,0,0,1,140.52,319.17Zm-5.12-.66v10.4h2.1V316.49l-.06,0Zm17.74-1.08H163V320h-9.88Zm-2-1.48v5.48h14V316Zm3.44-2.28v1.56h7.06v-1.56Zm2.46,2.76v4.22H159v-4.22Zm1-4.42a25.89,25.89,0,0,0,8.26,4.6,11.12,11.12,0,0,1,1.4-2,20.37,20.37,0,0,1-8.62-4.48h-2.28a19.83,19.83,0,0,1-8.2,4.64,11,11,0,0,1,1.24,1.9A24.42,24.42,0,0,0,158,312Zm-4.16,5.86a8.3,8.3,0,0,1,.7,2.22l1.76-.52a9,9,0,0,0-.8-2.16Zm6.62-.54a17.6,17.6,0,0,1-.82,2.3l1.64.44c.32-.56.72-1.4,1.16-2.26Zm-8.22,4.74v6.86h2.36v-5.3h7v5.24h2.46v-6.8Zm1.36,2.36V326h9v-1.58Zm0,2.4v1.56h9v-1.56Zm15.52-15.5v2.22h10.52v-2.22Zm-.36,6.54v2.22h11.12v-2.22Zm6.84-5.94v17H178v-17Zm-4.54,0v6.72c0,3.16-.26,6.38-2.56,8.82a8.19,8.19,0,0,1,1.78,1.64c2.7-2.84,3-6.7,3-10.44v-6.74Zm13.5-1.48a14.82,14.82,0,0,1-5.18,4.18,8.55,8.55,0,0,1,1.7,1.7,20.31,20.31,0,0,0,5.76-5ZM185,316a16.17,16.17,0,0,1-5.32,4.44,10.25,10.25,0,0,1,1.68,1.68,21.48,21.48,0,0,0,5.82-5.22Zm.34,5.32a14.39,14.39,0,0,1-6.7,5.68,8.42,8.42,0,0,1,1.68,1.94,17.83,17.83,0,0,0,7.3-6.74Zm6.42-3.6v2.2h4.62v-2.2Zm3.7,0V318c0,3.88-.12,5.28-.36,5.6a.68.68,0,0,1-.62.24,15.63,15.63,0,0,1-1.72-.08,5.49,5.49,0,0,1,.66,2.24,16.32,16.32,0,0,0,2.34-.06,2,2,0,0,0,1.38-.78c.46-.62.56-2.4.64-6.64,0-.28,0-.88,0-.88Zm6-6.26a16.34,16.34,0,0,1,3.2,2.32l1.54-1.62a18.85,18.85,0,0,0-3.3-2.16Zm2.36,5.14a16.63,16.63,0,0,1-7.9,10.32,19.58,19.58,0,0,1,1.74,2c4-2.44,6.9-6.5,8.58-11.72Zm-11.94-3.4v2.36H207.3v-2.36Zm-1.6,0V319c0,2.62-.14,6.12-1.68,8.52a9,9,0,0,1,2,1.64c1.82-2.7,2.16-7.14,2.16-10.14v-5.88Zm8.12-3c.06,9.12,1.68,18.62,6,18.62,1.88,0,2.68-.9,3.06-4.62a6.28,6.28,0,0,1-2-1.36c-.12,2.52-.36,3.54-.82,3.54-2,0-3.86-8-3.72-16.18Zm12.38.68V313h4.06v-2.16Zm5.36,1.64v2.24h11.34v-2.24Zm-5.26,2.92v2.18h3.72v-2.18Zm0,4.66v2.22h3.72v-2.22Zm-1-9.22v7.32c0,2.94-.08,7-1.26,9.76a8.76,8.76,0,0,1,1.9,1.06c1.26-3,1.44-7.64,1.44-10.84v-7.3Zm3.74,0v15.46c0,.24-.06.32-.28.32s-.9,0-1.54,0a7.2,7.2,0,0,1,.62,2.26,4.69,4.69,0,0,0,2.62-.46c.6-.38.76-1,.76-2.08v-15.5Zm6.92-.46v3.4h2.4v-3.4Zm.08,4.66v13.86h2.26V315.05Zm-3.82,1.32v9.54h2.18v-7.34h6.66v-2.2Zm8,0v7.14c0,.18-.06.24-.24.24s-.76,0-1.34,0a8.28,8.28,0,0,1,.64,2.36,4.38,4.38,0,0,0,2.42-.44c.62-.4.76-1.1.76-2.1v-7.2Zm14.3,3-2.22.1c1,6,2.9,8.7,9.38,9.5a8.36,8.36,0,0,1,1.36-2.36C241.7,326.21,239.78,324.05,239,319.37Zm-2.3-1.08c-.3,4.46-.78,7.26-7.88,8.56a7.25,7.25,0,0,1,1.26,2.12c7.84-1.68,8.78-5.3,9.18-10.68Zm2.32-7.12-2.12.1c1,5.5,2.88,8,8.92,8.72a8.2,8.2,0,0,1,1.3-2.22C241.68,317.39,239.78,315.43,239.06,311.17Zm-2.32-1c-.3,4.28-.82,6.68-7.6,7.8a6.21,6.21,0,0,1,1.18,2c7.54-1.44,8.52-4.62,8.92-9.8ZM233,311.49a5.22,5.22,0,0,1-2.46,3.12l1.7,1.24a6,6,0,0,0,2.66-3.72Zm10-.06a19.16,19.16,0,0,1-2.08,3.26l1.9.62A32.44,32.44,0,0,0,245.3,312Zm-10.16,8.46a5.65,5.65,0,0,1-2.56,3.36l1.78,1.16a6.26,6.26,0,0,0,2.72-3.88Zm10,0a18.22,18.22,0,0,1-2.12,3.26l2,.7a30.22,30.22,0,0,0,2.54-3.22Zm8.14-6.54v2.1h4v9.26h-4v2.12h6.14V313.39Zm-1.4,0v15h2.18v-15Zm1.3,5.34v2.08H256v-2.08Zm1.54-8.6a24.85,24.85,0,0,1-.66,3.68l1.92.42c.4-.94.9-2.36,1.36-3.72Zm7.34,3.12v2.18h5.84v-2.18Zm5,0v.46c-.22,8.34-.48,11.78-1.12,12.46a1,1,0,0,1-.88.36c-.5,0-1.7,0-3-.12a5.28,5.28,0,0,1,.8,2.32,17.64,17.64,0,0,0,3.14,0,2.51,2.51,0,0,0,1.94-1.12c.82-1.06,1.06-4.24,1.32-13.24,0-.3,0-1.08,0-1.08Zm-5-3.1a19.29,19.29,0,0,1-3.12,7.06,14.58,14.58,0,0,1,2,1.4,26.34,26.34,0,0,0,3.44-7.92Zm-1,8.86a42.61,42.61,0,0,1,2.76,4.66l2-1.24a49.45,49.45,0,0,0-2.92-4.48Zm16.3-3v2h11.72v-2Zm6,4.76v2h5.48v-2Zm-7.4,5.6v2.08h13.8v-2.08Zm6.28-9.5v10.7h2.3v-10.7Zm-4.22,3.2v7.4H278v-7.4Zm-2.62-7.72v2.14H287.5v-2.14Zm-1.3,0v6c0,2.82-.22,6.48-2.68,9a8.18,8.18,0,0,1,1.72,1.6c2.8-2.74,3.24-7.36,3.24-10.56v-6Zm5.94-2.22v3.56h2.54v-3.56Zm-9,4.72a17,17,0,0,1,1.36,3.82l1.84-1a13.73,13.73,0,0,0-1.48-3.7Zm-.18,6.84.7,2.26c1.16-.66,2.4-1.4,3.56-2.14L272.3,320C270.92,320.65,269.56,321.31,268.6,321.71Zm27.92-5.94v2.38h10.94v-2.38Zm6.58-4.24a16.94,16.94,0,0,1,2.14,3.66l2-1a17.22,17.22,0,0,0-2.28-3.54Zm-12.62,4.14v2.14h4.08v-2.14ZM288.8,320v2.14h5.34V320Zm4.82-9.84v18.78h2.24V310.15Zm-4.12.88v6.76h2.18V311Zm.52,9.78v1.64c0,1.26-.18,3.52-1.48,5a9.18,9.18,0,0,1,1.82,1.1c1.56-1.68,1.82-4.44,1.82-6v-1.7Zm10.32-10.64v5.94c0,3.68-.46,8.1-4.84,11a8.38,8.38,0,0,1,1.6,1.86c5-3.4,5.54-8.5,5.54-12.88v-5.94Zm2.64,6.44-2.22.16c.28,3.14.88,9.06,5.26,12.06a6.8,6.8,0,0,1,1.76-2C303.64,324.25,303.14,319.33,303,316.61Z"
                                    transform="translate(-17.58 -31.09)" />
                                <path class="cls-7"
                                    d="M262.32,149.25v2.1h11.46v-2.1Zm4.5-12.12a18.14,18.14,0,0,1-.58,2.34l2.1.44c.36-.6.82-1.48,1.26-2.42ZM270,148.21a16.79,16.79,0,0,1,1.46,1.56l1.36-1a14.67,14.67,0,0,0-1.48-1.46Zm-1,2.6-1.86.52a9,9,0,0,0,5.94,4.5,8.93,8.93,0,0,1,1.44-1.92A8.19,8.19,0,0,1,269,150.81Zm-3.46-8h5v.92h-5Zm0,2.22h5V146h-5Zm0-4.42h5v.9h-5ZM263.18,139v8.7H273V139Zm-5.78.16v2.3h2.24v7.38H257.4v2.32h4.32v-12Zm-1.24,0v13.62h2.1V139.11Zm10.88,8.6c-.38,3.74-2.1,5.6-5.68,6.32a8.64,8.64,0,0,1,1.26,2c4.16-1,6.14-3.42,6.66-8Zm14.28,1h7v.66h-7Zm0,1.84h7v.68h-7Zm0-3.66h7v.66h-7ZM279,145.65v6.8h11.62v-6.8Zm6.7,6.16v1.54c0,1.8.6,2.34,3,2.34h3c1.74,0,2.36-.56,2.58-2.66a5.75,5.75,0,0,1-2-.72c-.1,1.36-.22,1.58-.86,1.58H289c-.8,0-1-.06-1-.54v-1.54Zm-4.4.1c-.4,1.4-1.36,2-5.84,2.22a6.22,6.22,0,0,1,1,1.8c5.26-.52,6.64-1.66,7.14-4Zm-5.18-8.36v3h2.1v-1.52h13.22v1.52h2.2v-3Zm1.76-5.56.34,6.34h2.08l-.3-5.5c.32-.06.46-.14.5-.3Zm11.88-.22c0,2.1-.18,4.76-.38,6.46h2.16c.16-1.66.3-4.32.36-6.46Zm-2.46,0v1.4h2.92v-1.4Zm-5.66-.62a27.12,27.12,0,0,1-3.06,1.42l1,.88a19.24,19.24,0,0,0,3.3-1.32Zm-2.74,2.64v1.26h3.34v-1.26Zm0,1.86v1.28h3.4v-1.28Zm8.64-1.86v1.26h3.36v-1.26Zm0,1.86v1.28h3.38v-1.28Zm-1.86-4.36a8.15,8.15,0,0,1-3.18,2.34,7.36,7.36,0,0,1,1,.94,9.72,9.72,0,0,0,3.48-2.92Zm-2.6,1.1a12.91,12.91,0,0,1,2.8,2l.92-.88a13.55,13.55,0,0,0-2.82-1.88Zm2.72,1.92a8.5,8.5,0,0,1-3.32,2.54,7.8,7.8,0,0,1,1,1,10.5,10.5,0,0,0,3.6-3.14Zm-2.74,1.06a14.79,14.79,0,0,1,3,2.24l1-.88a15.33,15.33,0,0,0-3.1-2.16Zm12.72,5.14v2.1H314.1v-2.1Zm.7-8v2.06h17v-2.06Zm-.08,14.94.54,2.24c2.44-.38,5.76-.88,8.86-1.42l-.12-2.16C302.34,152.67,298.74,153.19,296.4,153.49Zm9.18-6-2.12.52c1.68,4.28,4.5,6.86,9.46,7.94a9.16,9.16,0,0,1,1.46-2.1C309.76,153.11,306.9,150.93,305.58,147.53Zm5.42.66a24.9,24.9,0,0,1-4,3l1.52,1.28a30.72,30.72,0,0,0,4.34-2.88Zm-7.3-11.06v10.54h2.38V137.13Zm-4.5,5.66h1.86v1.48H299.2Zm-1.66-1.4v4.26h5.3v-4.26Zm11.08,1.4h1.86v1.48h-1.86Zm-1.68-1.4v4.26h5.32v-4.26Zm-7.72,6.12v7.06l2.36-.26v-6.8Zm16.66-1.58v2.42H334v-2.42Zm3.12-8.56a15.89,15.89,0,0,1-3.26,6.72,17.25,17.25,0,0,1,2.32,1.28,21.91,21.91,0,0,0,3.48-7.46Zm.58,2.94-1.22,2.44h13.88v-2.44Zm6.56,6.12-2.28.52c1.56,4.72,4.14,7.68,9.08,9a10.81,10.81,0,0,1,1.62-2.26C330,152.71,327.34,150.19,326.14,146.43Zm-2.58-9.28v6.36c0,3.82-.84,8.14-8.06,10.28a9.17,9.17,0,0,1,1.52,2.12c8-2.5,9.06-7.7,9.06-12.38v-6.38Z"
                                    transform="translate(-17.58 -31.09)" />
                                <path class="cls-7"
                                    d="M721.36,363.87v9.56c0,2.52.72,3.3,3.28,3.3h3.26c2.4,0,3.06-1.18,3.34-4.94a6.56,6.56,0,0,1-2.24-1c-.16,3.14-.32,3.8-1.3,3.8H725c-.94,0-1.1-.14-1.1-1.12v-9.56Zm.08-3.8a27,27,0,0,1,6.68,3.76l1.6-2.12a30.18,30.18,0,0,0-6.72-3.5Zm-3.68,5.22a15.62,15.62,0,0,1-2,7l2.24,1.28c1.32-2,1.84-5,2.14-7.82Zm11.52.32a21.3,21.3,0,0,1,3.4,7.34l2.44-1.2a20.72,20.72,0,0,0-3.64-7.24Zm6.74,8V376H754.8v-2.36Zm7.64-15.46a24.6,24.6,0,0,1-1.6,4.56l2.26.64c.66-1.16,1.5-2.9,2.24-4.56Zm-5.72,3.76v12.66h2.34V364.21h1.9v10.36h2.22V364.21h1.94v10.36h2.22V364.21h1.94v10.36H753V361.91Zm23.38,12.74v1.76h9.76v-1.76Zm2.86-12.3v2.4h2.32v-2.4Zm-7.38,1.38v4h2.26v-2.18h12.8v2.18h2.34v-4Zm4.44,2.64v1.72h7.4v1h-7.4v1.72H771v-4.48Zm.1,5.38v1.76h8.82V377h2.4v-5.2Zm-1.42-5.38V377h2.28v-10.6Zm-1.1-6.82v1.88h6.3v-1.88Zm8.1,0v1.88h7.76v-1.88Zm-8-1.56a11.07,11.07,0,0,1-3,4.08,16.52,16.52,0,0,1,2,1.28,15.85,15.85,0,0,0,3.24-4.76Zm8.14,0a9.07,9.07,0,0,1-3,3.84,13.14,13.14,0,0,1,2.1,1.14,12.65,12.65,0,0,0,3.16-4.42Zm-7.48,3a10.38,10.38,0,0,1,1.18,2.36l2.16-.62a11.16,11.16,0,0,0-1.3-2.28Zm8.94.06a12.66,12.66,0,0,1,1.48,2.32l2.22-.62a12.75,12.75,0,0,0-1.6-2.26Zm18-.62h4.6v1.3h-4.6Zm-2.18-1.64v4.58h9.12v-4.58Zm5,15.48a17.18,17.18,0,0,1,3.18,2.68l2.42-1.14a22.89,22.89,0,0,0-3.78-2.78ZM786,373a13.9,13.9,0,0,1-4.26,2.4,12.79,12.79,0,0,1,1.66,1.62,17.3,17.3,0,0,0,4.64-2.68Zm.16-4.68h5.38v1h-5.38Zm0,2.52h5.38v1h-5.38Zm0-5h5.38v.92h-5.38Zm-2.26-1.68v9.3h10v-9.3Zm-8.06,4.24.58,2.3c2-.52,4.56-1.18,6.94-1.86l-.28-2.2C780.44,367.27,777.68,368,775.82,368.35Zm.32-6.44v2.24H783v-2.24Zm2.52-3.76v16.2c0,.28-.1.36-.38.38s-1.08,0-1.86,0a7.57,7.57,0,0,1,.66,2.18,6.58,6.58,0,0,0,3.06-.42c.68-.36.88-1,.88-2.12v-16.2Zm27.26,7.36h4.86v.78h-4.86Zm0-1.94h4.86v.76h-4.86Zm-2.16-1.32v5.36h9.3v-5.36Zm.54-4.12a14.08,14.08,0,0,1-3.12,5,15.72,15.72,0,0,1,1.76,1.44,20,20,0,0,0,3.5-5.88Zm.56,1.62-.86,1.74h10.5v-1.74Zm-3.5,8.52V370h13.56v-1.74Zm3.54.74a11.53,11.53,0,0,1-4,3.62,11.72,11.72,0,0,1,1.4,1.42,15.71,15.71,0,0,0,4.46-4.44Zm1.46,2.38a11.66,11.66,0,0,1-4.3,4.06,11.59,11.59,0,0,1,1.46,1.32,15.43,15.43,0,0,0,4.66-4.78Zm3.34-.06a10.07,10.07,0,0,1-3.72,4.52,14.16,14.16,0,0,1,1.56,1.24,13.23,13.23,0,0,0,4-5.28Zm-5.38-.52-1.3,1.62h10v-1.62Zm8,0v.26c-.26,2.56-.56,3.64-.9,3.94a.64.64,0,0,1-.56.2,11,11,0,0,1-1.44-.08,4.41,4.41,0,0,1,.5,1.8,17.33,17.33,0,0,0,1.9,0,1.82,1.82,0,0,0,1.28-.58c.52-.54.88-1.84,1.2-4.72,0-.26.08-.78.08-.78Zm-12.2-12.58a21.31,21.31,0,0,1-4.58,7.52,14.63,14.63,0,0,1,1.28,2.48,29.41,29.41,0,0,0,5.56-9.3Zm-1.94,5.52v13.16h2.3V361.49l0,0Zm29,8.88v2.26h5.6v-2.26Zm-1.32-12.42v16.18h2.28V362.47h3.54v13.6h2.38V360.21Zm-9.72,1.9v2.3h7.18v-2.3Zm3-4c-.7,4-1.88,9.36-2.82,12.56l2,1c1-3.58,2.26-9,3.12-13.26Zm-2,11.88a29.86,29.86,0,0,1,6.76,5.46l1.38-2.06a30,30,0,0,0-6.9-5.16Zm5.44-7.9v.46c-.44,6.58-2.48,10.74-6.36,12.38a9.93,9.93,0,0,1,1.42,2c4.48-2.28,6.7-6.52,7.24-14.6l-1.48-.26-.42,0Zm18.7,1.76v9.56c0,2.52.72,3.3,3.28,3.3h3.26c2.4,0,3.06-1.18,3.34-4.94a6.56,6.56,0,0,1-2.24-1c-.16,3.14-.32,3.8-1.3,3.8H845c-.94,0-1.1-.14-1.1-1.12v-9.56Zm.08-3.8a27,27,0,0,1,6.68,3.76l1.6-2.12a30.18,30.18,0,0,0-6.72-3.5Zm-3.68,5.22a15.62,15.62,0,0,1-2,7l2.24,1.28c1.32-2,1.84-5,2.14-7.82Zm11.52.32a21.3,21.3,0,0,1,3.4,7.34l2.44-1.2a20.72,20.72,0,0,0-3.64-7.24ZM863,360.07V362h8.3v4.1h-8.38v1.94H873.6v-8Zm3.88-1.94v18.78h2.3V358.13Zm-4.68,4.9v2h12.6v-2Zm-.36,9.06v2.06H874.6v-2.06Zm.8-3v2H873.8v-2Zm-2.16-6.46a19.43,19.43,0,0,1-4.7,5.16,18,18,0,0,1,1.1,2.42,29,29,0,0,0,5.64-6.72Zm-.46-4.4a14.11,14.11,0,0,1-4.06,3.92,11.44,11.44,0,0,1,1.2,2,21.2,21.2,0,0,0,5.14-5Zm-1.42,8.86v9.88h2.24V365l-.1-.06Zm18.08-7.56V362h17.44v-2.46Zm9.66,6.7a49.44,49.44,0,0,1,6.5,5.74l2-1.84a53.77,53.77,0,0,0-6.68-5.46Zm-.8-5.8a20.85,20.85,0,0,1-9.48,9.46,15.93,15.93,0,0,1,1.64,2.18,26.16,26.16,0,0,0,10.52-10.7Zm-1.46,4.84v11.66h2.64V362.61ZM737.48,393.11V395h15.86v-1.88Zm-1-9.94v1.6h9.26v-1.6Zm9,12.76v1.76h6.24v-1.76Zm-9.2,2.76v1.94H754.6v-1.94Zm7.9-4.82v5.76h2.38v-5.76ZM740,382.15v10.54h2.1V382.15Zm-.8,13.52v4.14h2.28v-4.14Zm-.48-8.8h4.7v1.06h-4.7Zm-1.86-1.42v3.9h8.54v-3.9Zm5.32,3.56-1.14.92a36.36,36.36,0,0,1,3.2,2.22l1.16-1.48C744.9,390.35,742.86,389.29,742.22,389Zm5.66-6.84A9.65,9.65,0,0,1,745,387a10.83,10.83,0,0,1,1.54,1.66,13.49,13.49,0,0,0,3.46-6Zm0,2-.92,1.86h7.5v-1.86Zm3.22.86c-.62,3.28-2.68,5.14-6.1,6.08a7.8,7.8,0,0,1,1.36,1.72c3.7-1.32,6-3.54,7-7.6Zm-2.84.24-1.54.86a11.07,11.07,0,0,0,6.74,6.7,9,9,0,0,1,1.34-1.86A9.37,9.37,0,0,1,748.3,385.29Zm-8.46,3.44a10.83,10.83,0,0,1-3.8,2.58,7.34,7.34,0,0,1,1.36,1.48,13.23,13.23,0,0,0,3.94-3.44Zm20.68,11.78,2.14-1.84a37.37,37.37,0,0,0-4.36-4.36l-2.1,1.8A39.1,39.1,0,0,1,760.52,400.51Zm15.5-2.9V400H794.8v-2.36Zm7.64-15.46a24.6,24.6,0,0,1-1.6,4.56l2.26.64c.66-1.16,1.5-2.9,2.24-4.56Zm-5.72,3.76v12.66h2.34V388.21h1.9v10.36h2.22V388.21h1.94v10.36h2.22V388.21h1.94v10.36H793V385.91Zm23.38,12.74v1.76h9.76v-1.76Zm2.86-12.3v2.4h2.32v-2.4Zm-7.38,1.38v4h2.26v-2.18h12.8v2.18h2.34v-4Zm4.44,2.64v1.72h7.4v1h-7.4v1.72H811v-4.48Zm.1,5.38v1.76h8.82V401h2.4v-5.2Zm-1.42-5.38V401h2.28v-10.6Zm-1.1-6.82v1.88h6.3v-1.88Zm8.1,0v1.88h7.76v-1.88Zm-8-1.56a11.07,11.07,0,0,1-3,4.08,16.52,16.52,0,0,1,2,1.28,15.85,15.85,0,0,0,3.24-4.76Zm8.14,0a9.07,9.07,0,0,1-3,3.84,13.14,13.14,0,0,1,2.1,1.14,12.65,12.65,0,0,0,3.16-4.42Zm-7.48,3a10.38,10.38,0,0,1,1.18,2.36l2.16-.62a11.16,11.16,0,0,0-1.3-2.28Zm8.94.06a12.66,12.66,0,0,1,1.48,2.32l2.22-.62a12.75,12.75,0,0,0-1.6-2.26ZM824.36,389v2.14H833V389Zm-1.44,9.12v2.16h11.7v-2.16Zm1.16-4.74v2.14h9.34v-2.14Zm3.36-3.24v9.36h2.4v-9.36Zm1.16-5.6a19.5,19.5,0,0,0,5.12,5.46,13.53,13.53,0,0,1,1.36-2.2,16.26,16.26,0,0,1-5.42-5.62h-2.28a15.8,15.8,0,0,1-5.12,5.86,11.52,11.52,0,0,1,1.26,2.08A18.19,18.19,0,0,0,828.6,384.55Zm-12.3,1.72v2.24h7v-2.24Zm2.56-4.12v18.78h2.22V382.15Zm0,5.66a20.5,20.5,0,0,1-3,7.42,12.37,12.37,0,0,1,1.1,2.18c1.46-2.06,2.66-5.92,3.24-9.12Zm2.16,1.6-1,1c.58,1,1.84,3.36,2.34,4.6l1.3-1.8C823.2,392.61,821.46,390,821,389.41Zm23.14-7.24V385h2.48v-2.84Zm.18,12.08v5h2.28v-5Zm-7.68-10.92v3.86H839v-1.84h12.78v1.84h2.46v-3.86Zm4.78,2.42v6.92h2.26v-6.92Zm5.76,0v6.92h2.3v-6.92Zm-8.64.9v1.7h13.72v-1.7Zm2.32,8.84v1.82h9.3v-1.82Zm-2.86,3.1v1.94h15v-1.94Zm.76-9.36v1.64h13.38v-1.64Zm-2.18,2.54v2h17.72v-2Zm5.12,1A12.08,12.08,0,0,1,836,396a12,12,0,0,1,1.52,1.84,13.71,13.71,0,0,0,6.16-4.26Zm7.54-.16-1.92.76a12.93,12.93,0,0,0,6,4.26,11.1,11.1,0,0,1,1.56-1.92A11.62,11.62,0,0,1,849.22,392.59Zm14.92-5.66v5.34h2.48v-5.34Zm-5.84,1v2h14.42v-2Zm-2,3.12v2h18.3v-2Zm.74,3.22v2h17v-2Zm11.08-1.46v5.62c0,.26-.1.32-.44.32s-1.52,0-2.54,0a8.24,8.24,0,0,1,.86,2.24,10.45,10.45,0,0,0,3.48-.36c.86-.36,1.12-1,1.12-2.12v-5.68Zm-9.28-9.18v2h6.38v-2Zm7.94,0v2h7.7v-2ZM859,382a12.19,12.19,0,0,1-3.22,4.52,14,14,0,0,1,2,1.34,17,17,0,0,0,3.5-5.24Zm8.08,0a9.78,9.78,0,0,1-2.88,4.24,15,15,0,0,1,2,1.34,14.08,14.08,0,0,0,3.2-5Zm-7.48,3.12a12.25,12.25,0,0,1,1.18,2.54l2.06-.84a12.28,12.28,0,0,0-1.3-2.46Zm8.72,0a14,14,0,0,1,1.56,2.52l2-.84a14,14,0,0,0-1.66-2.46Zm-8.62,11.94a13.47,13.47,0,0,1,3,3l1.86-1.5a14.27,14.27,0,0,0-3.14-2.88Z"
                                    transform="translate(-17.58 -31.09)" />
                                <path class="cls-7"
                                    d="M103.76,610.49v9.42h2.44v-7.7h8.64v-1.72Zm-2.24-8.64V609h2.14v-5.74h6.08v-1.42Zm12.08,8.64v7.18c0,.28-.1.36-.46.38s-1.6,0-2.58,0a8.2,8.2,0,0,1,.76,1.9,11.47,11.47,0,0,0,3.64-.3c.82-.3,1.12-.82,1.12-1.94v-7.2ZM105,613.05v1.54h9.84v-1.54Zm5.34-11.14v1.86H117v-1.86Zm-8.84,6.4v1.46h8.3v-1.46Zm3.5,7.14v1.6h9.84v-1.6Zm.14-12.92v2.16h2v-2.16Zm0,4.08v2.2h2v-2.2Zm11.1-4.7v.32a9.15,9.15,0,0,1-6.46,6.18,7.07,7.07,0,0,1,1.18,1.68,11,11,0,0,0,7.5-7.74l-1.42-.52-.4.08Zm-3.76,1.88-1.84.46a10.22,10.22,0,0,0,7.18,6.18,8.89,8.89,0,0,1,1.36-1.86C115.92,607.91,113.6,606.21,112.5,603.79Zm-9.74.3v1.22h4.76v.86h-4.76v1.22h6.94v-3.3Zm18-.78v2.26h7.54v-2.26Zm7.84,2.1v2.3h9v-2.3Zm-5.24-1.18v10.06h2.36V604.23Zm13.08,1.18v.48c-.18,7.6-.4,10.56-.94,11.18a.89.89,0,0,1-.8.34c-.46,0-1.42,0-2.48-.1a5.6,5.6,0,0,1,.74,2.36,16.23,16.23,0,0,0,2.88-.06,2.36,2.36,0,0,0,1.78-1.06c.72-1,.94-3.92,1.16-12.06,0-.3,0-1.08,0-1.08Zm-16,8.62.56,2.5c2.22-.6,5.1-1.42,7.78-2.2l-.32-2.28C125.58,612.81,122.46,613.61,120.44,614Zm10.94-12.56c0,7.74.2,13.44-5.32,16.54a7.2,7.2,0,0,1,1.7,2c6-3.58,6-10.16,6.06-18.5Zm12.16-.42a27,27,0,0,1-2,5.08l2.08.54a38.2,38.2,0,0,0,2.38-5.08Zm-3,4.1.18,2.28c2.28-.14,5.36-.32,8.3-.54l0-2.08C145.92,605,142.68,605.09,140.52,605.15Zm1.18,3.22v11.54h2.22v-9.56h4.14v-2Zm5.22,0v9.08c0,.26-.08.32-.32.32s-1.06,0-1.76,0a9.1,9.1,0,0,1,.76,2.14,6.29,6.29,0,0,0,2.82-.4c.68-.36.88-1,.88-2v-9.14Zm-4.2,3v1.78h5.54v-1.78Zm0,2.94v1.78h5.54v-1.78Zm8.14-13.1v6c0,2.22.58,2.9,2.94,2.9h2.76c1.86,0,2.5-.72,2.76-3.32a6.36,6.36,0,0,1-2.14-.88c-.08,1.76-.2,2.06-.86,2.06h-2.18c-.76,0-.88-.1-.88-.8v-6Zm6,1.18a28.64,28.64,0,0,1-5.24,2.24,6.92,6.92,0,0,1,.68,1.66,37.73,37.73,0,0,0,6.08-2.16Zm-6,8.16v6.32c0,2.22.6,2.9,3,2.9h2.84c1.92,0,2.56-.8,2.82-3.62a6.69,6.69,0,0,1-2.12-.88c-.1,2-.22,2.4-.92,2.4h-2.28c-.78,0-.92-.08-.92-.82v-6.3Zm6.16.84a25,25,0,0,1-5.44,2.48,10,10,0,0,1,.7,1.68,33.07,33.07,0,0,0,6.3-2.4Zm-10.76-8.16a20,20,0,0,1,2.26,4.78l2.18-.88a19.17,19.17,0,0,0-2.4-4.66Zm22.42-2.1v2.66h2.38v-2.66Zm-7.5,1.58v1.88h17.3v-1.88Zm5,4.7h7.6v3.5h-7.6Zm-2.28-1.78v7.06h12.3v-7.06Zm4.52,5.66c-1.64,1.62-4.88,2.94-8,3.56a10,10,0,0,1,1.44,1.88,18.18,18.18,0,0,0,8.52-4.56Zm3.42.28-2.16.48c1.44,4.14,3.88,6.74,8.3,7.88a8.83,8.83,0,0,1,1.48-2.06C175.38,617.07,172.92,614.87,171.8,611.59Zm4.78.94a21.18,21.18,0,0,1-3.42,2.74l1.38,1.12a34.38,34.38,0,0,0,3.92-2.52Zm-13.74,5.08.34,2.14c2.32-.34,5.52-.82,8.54-1.3l-.12-2C168.44,616.87,165.08,617.37,162.84,617.61Zm-2-9.38v1.88H179v-1.88Zm4.4,6.52v3.42h2.3v-4.7l-.8-.24Zm25.8-8.46h4.72v1.06H191Zm0-2.7h4.72v1H191Zm-2.26-1.8v7.36h9.32v-7.36Zm1.5,6.5a10.19,10.19,0,0,1-3.52,4.48,12.59,12.59,0,0,1,1.44,2,14.32,14.32,0,0,0,4.28-5.82Zm0,1.9-.92,1.84h8v-1.84Zm6.36,0v.4c-.18,5-.4,6.76-.74,7.2a.6.6,0,0,1-.58.26c-.3,0-.82,0-1.44-.06a5,5,0,0,1,.52,1.92,13.69,13.69,0,0,0,2.14-.06,1.9,1.9,0,0,0,1.36-.78c.52-.68.76-2.66,1-8,0-.26,0-.88,0-.88Zm-4.08,1.9a4.06,4.06,0,0,1-1.92,3,6.68,6.68,0,0,1,1.12,1.28,5.79,5.79,0,0,0,2.52-4.06Zm-.12,2.2a13.54,13.54,0,0,1,2.18,2l1.12-1.24a17.21,17.21,0,0,0-2.22-1.84Zm-3.68-1.4v5.92h1.94v-5.92Zm.78,3.44v1.76h5.8v-1.76ZM180.74,605v2.18h6.8V605Zm2.44-3.44V606h2.18v-4.48Zm-2.8,13.9.42,2.38c2-.5,4.58-1.14,7-1.78l-.26-2.12C184.94,614.47,182.2,615.09,180.38,615.41Zm.72-7.38a32.82,32.82,0,0,1,.56,5.84l2-.34a33,33,0,0,0-.72-5.82Zm3.9-.46a49.13,49.13,0,0,1-1,6.8l1.78.44c.48-1.7,1-4.5,1.48-6.8Z"
                                    transform="translate(-17.58 -31.09)" />
                                <path class="cls-7"
                                    d="M18.2,429.49V432H35.64v-2.46Zm9.66,6.7a49.44,49.44,0,0,1,6.5,5.74l2-1.84a53.77,53.77,0,0,0-6.68-5.46Zm-.8-5.8a20.85,20.85,0,0,1-9.48,9.46A15.93,15.93,0,0,1,19.22,442a26.16,26.16,0,0,0,10.52-10.7Zm-1.46,4.84v11.66h2.64V432.61Zm16.3-2.44v2h10v-2Zm.94,3.54v8.06H45v-8.06Zm1.2,0v2H48.8v2.78H44v2h7v-6.74Zm-5.62-7.24V447h2.32V431.37H54.42v-2.28Zm14.66,0v15.06c0,.34-.12.46-.46.48s-1.5,0-2.56,0a7.33,7.33,0,0,1,.8,2.36,8.13,8.13,0,0,0,3.56-.46c.78-.38,1-1.06,1-2.3v-15.1Zm16.36,8.68v8.08h2.38v-8.08Zm-4-.86V439H75.86v-2.06Zm-.76,7.5v2.08H76.3v-2.08Zm1.24-3.78v2h9.44v-2Zm2.38-9.72H73v2.76H68.3Zm-2.22-2v6.8h9.24v-6.8ZM60.6,430v16.9h2.34V430Zm-2.88,3.76V436h7.34v-2.24Zm3,.9a20,20,0,0,1-3.44,6.72,11.66,11.66,0,0,1,1.12,2.3,26.46,26.46,0,0,0,3.72-8.4Zm3-6.32A28.67,28.67,0,0,1,57.48,430a7.2,7.2,0,0,1,.68,1.82,33.7,33.7,0,0,0,7.16-1.62Zm-.84,8.2-1,.94a33.63,33.63,0,0,1,2.3,3.62l1.36-1.88C65.12,438.77,63.38,437,62.88,436.55Zm19-2.78v1.9h13.9v-1.9Zm.16,5.84v1.88h11v-1.88Zm2.56-7.16v6.36h8.28v-6.36H90.56V437H86.9v-4.54Zm7.8,7.16v.3c-1.62,3.2-6.12,4.62-11.24,5.06a7.5,7.5,0,0,1,1,2c5.62-.7,10.46-2.36,12.62-6.7l-1.5-.76-.42.1Zm-6.26,1.46-2.06.74c2.24,3,5.94,4.58,10.8,5.18a9.37,9.37,0,0,1,1.4-2.06C91.72,444.53,88,443.31,86.18,441.07Zm.12-12.92v3h2.5v-3Zm-6,1.8v2.14H95.92V430Zm-1.18,0v5.64c0,2.94-.12,7.12-1.8,10a9.76,9.76,0,0,1,2,1.32c1.82-3.1,2.12-8,2.12-11.28V430Zm20.66,1.44v2.1h4v9.26h-4v2.12h6.14V431.39Zm-1.4,0v15h2.18v-15Zm1.3,5.34v2.08h5.12v-2.08Zm1.54-8.6a24.85,24.85,0,0,1-.66,3.68l1.92.42c.4-.94.9-2.36,1.36-3.72Zm7.34,3.12v2.18h5.84v-2.18Zm5,0v.46c-.22,8.34-.48,11.78-1.12,12.46a1,1,0,0,1-.88.36c-.5,0-1.7,0-3-.12a5.28,5.28,0,0,1,.8,2.32,17.64,17.64,0,0,0,3.14,0,2.51,2.51,0,0,0,1.94-1.12c.82-1.06,1.06-4.24,1.32-13.24,0-.3,0-1.08,0-1.08Zm-5-3.1a19.29,19.29,0,0,1-3.12,7.06,14.58,14.58,0,0,1,2,1.4,26.34,26.34,0,0,0,3.44-7.92Zm-1,8.86a42.61,42.61,0,0,1,2.76,4.66l2-1.24a49.45,49.45,0,0,0-2.92-4.48Zm11.94-8.16V431h4v-2.16Zm-.16,4.56v2.18h3.7v-2.18Zm0,4.66v2.22h3.72v-2.22Zm-.88-9.22v7.26c0,2.94-.08,7-1.16,9.76a7.48,7.48,0,0,1,1.84,1c1.18-3,1.36-7.62,1.36-10.78v-7.26Zm3.58,0v15.52c0,.24-.06.32-.28.32s-.78,0-1.36,0a7.6,7.6,0,0,1,.58,2.22,4.4,4.4,0,0,0,2.46-.44c.58-.38.72-1,.72-2V428.85Zm2.6,1v1.94h11.36v-1.94Zm5.5-1.54h-1.1v11.16c0,1.38-1.14,4-4.94,5.5a13.23,13.23,0,0,1,1.22,2,8,8,0,0,0,4.82-4.5,8.3,8.3,0,0,0,4.84,4.52,12.71,12.71,0,0,1,1.28-2.12c-3.86-1.52-5-4-5-5.44V428.27Zm-4,7.48v1.84h9.32v-4.8h-10.4v1.84h8.16v1.12Zm-.72,0c-.24,1.72-.62,3.88-1,5.28l2,.24c.34-1.44.74-3.68,1-5.52Zm.92,2.78-.56,1.88h8.76v-1.88Zm7.62,0v.26a10,10,0,0,1-.16,2.72.35.35,0,0,1-.34.16,3.2,3.2,0,0,1-.68-.06,5.53,5.53,0,0,1,.42,1.62,7.74,7.74,0,0,0,1.46-.06,1.36,1.36,0,0,0,1-.54c.32-.44.38-1.4.42-3.48v-.62Zm5.16-9.68V431h3.4v-2.16Zm4.54.74v2H156.3v-2Zm4.64,13.54v1.42h3.34v-1.42Zm-2.2-9.42v1.9h10.16v-1.9Zm-7.12-.3v2.18h3.54v-2.18Zm0,4.66v2.22h3.56v-2.22Zm-.68-9.22v7.36c0,2.92,0,7-1,9.84A8.54,8.54,0,0,1,139,447c1-3,1.16-7.64,1.16-10.78v-7.34Zm2.82,0v15.78c0,.2-.06.28-.24.28a8.73,8.73,0,0,1-1.22,0,7.06,7.06,0,0,1,.54,2,3.77,3.77,0,0,0,2.18-.4c.48-.34.62-1,.62-1.86v-15.8Zm2.14,10.8v1.6h3v-1.6Zm3.14-11.5v4.78h2.14v-4.78Zm4.56,0v4.78h2.18v-4.78Zm-1.36,9v2.36h1.18v-2.36Zm0,4.6v2.16h1.18v-2.16Zm-4-8v5.2c0,2.18-.08,5.16-1.06,7.26a9.3,9.3,0,0,1,1.62.78c1-2.2,1.16-5.6,1.16-8v-5.22Zm2.1,2.72v8.82H149v-7.42h2.7v-1.4Zm.54,2.2V440h2.1v.86h-2.1v1.4h3.46v-3.66Zm-4.68-4.72v4.76h3V437H145v-3.12Zm11.08,2.74c-.78,4-2.52,7.2-4.68,9a6.83,6.83,0,0,1,1.18,1.08,16.87,16.87,0,0,0,5.06-9.26Zm-2.8-4.38c.08,8.52.58,14.64,3,14.68.62,0,1.36-.62,1.78-3.14a5.18,5.18,0,0,1-1.28-1.08c-.1,1.24-.24,2-.44,2-.84,0-1.28-5.58-1.26-12.44Zm1.74,0a8,8,0,0,1,1.44,1.6l1.34-.86a7.16,7.16,0,0,0-1.5-1.52Zm-9.88,8.22a10,10,0,0,1-.78,4.32,6.36,6.36,0,0,1,1.22.64,12.17,12.17,0,0,0,.92-4.78Zm18.26,6,2.14-1.84a37.37,37.37,0,0,0-4.36-4.36l-2.1,1.8A39.1,39.1,0,0,1,162,446.51Zm24.14-17.34v2.44h9.58v-2.44Zm-.48,6.88v2.44h10.64v-2.44Zm4-6.24v17.1h2.52v-17.1Zm-10-1v2.22h4.5v-2.22Zm0,4.54v2.22h4.58v-2.22Zm0,4.64v2.26h4.52V438Zm-.92-9.18v7.28c0,2.94-.1,7-1.36,9.74a8,8,0,0,1,1.94,1.1c1.38-3,1.58-7.62,1.58-10.84v-7.28Zm4.26,0v15.28c0,.24-.08.34-.32.34s-1,0-1.72,0a8.07,8.07,0,0,1,.64,2.3,5.65,5.65,0,0,0,2.82-.44c.62-.4.78-1.08.78-2.16v-15.3Zm16.2,0V431h3.4v-2.16Zm4.54.74v2H216.3v-2Zm4.64,13.54v1.42h3.34v-1.42Zm-2.2-9.42v1.9h10.16v-1.9Zm-7.12-.3v2.18h3.54v-2.18Zm0,4.66v2.22h3.56v-2.22Zm-.68-9.22v7.36c0,2.92,0,7-1,9.84A8.54,8.54,0,0,1,199,447c1-3,1.16-7.64,1.16-10.78v-7.34Zm2.82,0v15.78c0,.2-.06.28-.24.28a8.73,8.73,0,0,1-1.22,0,7.06,7.06,0,0,1,.54,2,3.77,3.77,0,0,0,2.18-.4c.48-.34.62-1,.62-1.86v-15.8Zm2.14,10.8v1.6h3v-1.6Zm3.14-11.5v4.78h2.14v-4.78Zm4.56,0v4.78h2.18v-4.78Zm-1.36,9v2.36h1.18v-2.36Zm0,4.6v2.16h1.18v-2.16Zm-4-8v5.2c0,2.18-.08,5.16-1.06,7.26a9.3,9.3,0,0,1,1.62.78c1-2.2,1.16-5.6,1.16-8v-5.22Zm2.1,2.72v8.82H209v-7.42h2.7v-1.4Zm.54,2.2V440h2.1v.86h-2.1v1.4h3.46v-3.66Zm-4.68-4.72v4.76h3V437H205v-3.12Zm11.08,2.74c-.78,4-2.52,7.2-4.68,9a6.83,6.83,0,0,1,1.18,1.08,16.87,16.87,0,0,0,5.06-9.26Zm-2.8-4.38c.08,8.52.58,14.64,3,14.68.62,0,1.36-.62,1.78-3.14a5.18,5.18,0,0,1-1.28-1.08c-.1,1.24-.24,2-.44,2-.84,0-1.28-5.58-1.26-12.44Zm1.74,0a8,8,0,0,1,1.44,1.6l1.34-.86a7.16,7.16,0,0,0-1.5-1.52Zm-9.88,8.22a10,10,0,0,1-.78,4.32,6.36,6.36,0,0,1,1.22.64,12.17,12.17,0,0,0,.92-4.78Zm21.88-7.6v5.34h2.48v-5.34Zm-5.84,1v2h14.42v-2Zm-2,3.12v2h18.3v-2Zm.74,3.22v2h17v-2Zm11.08-1.46v5.62c0,.26-.1.32-.44.32s-1.52,0-2.54,0a8.24,8.24,0,0,1,.86,2.24,10.45,10.45,0,0,0,3.48-.36c.86-.36,1.12-1,1.12-2.12v-5.68Zm-9.28-9.18v2h6.38v-2Zm7.94,0v2H236v-2Zm-7.78-1.6a12.19,12.19,0,0,1-3.22,4.52,14,14,0,0,1,2,1.34,17,17,0,0,0,3.5-5.24Zm8.08,0a9.78,9.78,0,0,1-2.88,4.24,15,15,0,0,1,2,1.34,14.08,14.08,0,0,0,3.2-5Zm-7.48,3.12a12.25,12.25,0,0,1,1.18,2.54l2.06-.84a12.28,12.28,0,0,0-1.3-2.46Zm8.72,0a14,14,0,0,1,1.56,2.52l2-.84a14,14,0,0,0-1.66-2.46Zm-8.62,11.94a13.47,13.47,0,0,1,3,3l1.86-1.5a14.27,14.27,0,0,0-3.14-2.88Zm20.08-12.3h2.42v2.1h-2.42Zm-2.18-1.86v5.82H246v-5.82ZM250,430.79h2.42v2.1H250Zm-2.18-1.86v5.82h6.9v-5.82Zm-10,6.94V438H256v-2.1Zm2.72,8.48v2H245v-2Zm8.2,0v2h4.42v-2Zm1.16-7.94-2.22.82a13.77,13.77,0,0,0,7.54,5.14,9.81,9.81,0,0,1,1.5-1.9C253.82,439.77,251.16,438.25,249.9,436.41Zm-10.48,3.78V447h2.08v-4.8h2.4V447h2.18v-6.76Zm8.22,0V447h2.1v-4.8h2.4V447h2.2v-6.76Zm-2.1-6.28c-1.4,3-4.48,5.3-8.4,6.56a9.1,9.1,0,0,1,1.44,1.86c4.22-1.48,7.54-3.94,9.28-7.64Zm15.9-.68v13.66h2.38V433.23Zm1.24,0v2.06h7.22v1.54h-7.22v2.06h9.62v-5.66Zm-.06,6.94v2.1h8.48v4.54h2.4v-6.64Zm.06,3.84v2.1h9.82V444Zm2.9-15.8v3.54h2.56v-3.54Zm-7.32,1.44v5h2.34v-2.7h12.46v2.7h2.44v-5Zm25.86,2-2.16.48c1.9,7.72,5.2,12.76,12.86,14.78a10,10,0,0,1,1.68-2.34C289.18,443,285.7,438.35,284.12,431.67Zm-5.52-2.52v2.34h10.74v-2.34Zm14.14,4.76v.44a13.49,13.49,0,0,1-10.26,10.44,9.4,9.4,0,0,1,1.4,2.14c5.68-1.86,9.84-5.5,11.4-12.46l-1.66-.66-.42.1Zm-3.94-4.76v.26c-.32,1.72-1,4.86-1.68,7.26l2.52.36c.62-2.38,1.3-5.3,1.74-7.68l-1.86-.3-.42.1Zm.4,4.76-.46,2.26h4.5v-2.26Zm-7.4-4.12v3.06c0,3.26-.42,8.3-4.4,11.7a9.6,9.6,0,0,1,1.74,2.06c4.6-4,5.12-9.86,5.12-13.76v-3.06ZM115,460.29v2.06h11.4v-2.06Zm1.84,3v1.9h7.72v-1.9Zm.42-1.78a10.9,10.9,0,0,1-3.32,4.4,14,14,0,0,1,1.66,1.28,15.61,15.61,0,0,0,3.66-5.12Zm6.56,1.78v.32c-.14,3.54-.32,4.84-.6,5.18a.55.55,0,0,1-.54.22,12.73,12.73,0,0,1-1.34-.06,4.51,4.51,0,0,1,.52,1.92,11.2,11.2,0,0,0,1.94-.06,1.64,1.64,0,0,0,1.26-.68c.5-.58.72-2.16.9-6,0-.26,0-.8,0-.8Zm-5.48-6.34h4.54v.92H118.3Zm0-2.46h4.54v.92H118.3Zm-2.16-1.66v6.7h9v-6.7Zm-6.56.06V455h4.06v-2.16Zm.1,4.56v2.18h3.72v-2.18Zm0,4.66v2.22h3.72v-2.22Zm-1-9.22v7.32c0,2.94-.08,7-1.26,9.76a8.76,8.76,0,0,1,1.9,1.06c1.26-3,1.44-7.64,1.44-10.84v-7.3Zm3.74,0v15.46c0,.24-.06.32-.28.32s-.9,0-1.54,0a7.2,7.2,0,0,1,.62,2.26,4.69,4.69,0,0,0,2.62-.46c.6-.38.76-1,.76-2.08v-15.5Zm6.52,10.94a13.19,13.19,0,0,1-4,5.26,6.84,6.84,0,0,1,1.58,1.34,16.29,16.29,0,0,0,4-5.74Zm2.64.3a14.42,14.42,0,0,1-3.18,5.58,7.12,7.12,0,0,1,1.68,1.22,17.47,17.47,0,0,0,3.08-6Zm11.62-9.76v1.94H146v-1.94Zm5,.94a22,22,0,0,1-.5,2.7l1.94.34a25.25,25.25,0,0,0,1.32-2.88Zm3.38-3.14a16.44,16.44,0,0,1-1.12,2.32l2,.5c.44-.58,1-1.42,1.54-2.3Zm-6.52.74a7.63,7.63,0,0,1,1.22,2.14l2-.78a6.62,6.62,0,0,0-1.32-2.06ZM132.46,460h-4.68v2.22h2.34v5.14h2.34Zm0,6.32h-2.2a34,34,0,0,1-2.9,2l1.18,2.5c1.08-.88,2-1.64,2.86-2.42,1.3,1.56,3,2.14,5.42,2.24s6.44.06,8.86-.06a10.89,10.89,0,0,1,.76-2.44c-2.7.22-7.24.28-9.58.18C134.78,468.17,133.26,467.59,132.46,466.27Zm-4.64-12.22a15.68,15.68,0,0,1,3.22,3.18l1.92-1.58a16.74,16.74,0,0,0-3.36-3Zm9,7.66h5.46v1h-5.46Zm0,2.64h5.46v1.06h-5.46Zm0-5.28h5.46v1h-5.46Zm-2.26-1.74v9.82H144.6v-9.82Zm15.26-1.94v2.1h4v9.26h-4v2.12h6.14V455.39Zm-1.4,0v15h2.18v-15Zm1.3,5.34v2.08h5.12v-2.08Zm1.54-8.6a24.85,24.85,0,0,1-.66,3.68l1.92.42c.4-.94.9-2.36,1.36-3.72Zm7.34,3.12v2.18h5.84v-2.18Zm5,0v.46c-.22,8.34-.48,11.78-1.12,12.46a1,1,0,0,1-.88.36c-.5,0-1.7,0-3-.12a5.28,5.28,0,0,1,.8,2.32,17.64,17.64,0,0,0,3.14,0,2.51,2.51,0,0,0,1.94-1.12c.82-1.06,1.06-4.24,1.32-13.24,0-.3,0-1.08,0-1.08Zm-5-3.1a19.29,19.29,0,0,1-3.12,7.06,14.58,14.58,0,0,1,2,1.4,26.34,26.34,0,0,0,3.44-7.92Zm-1,8.86a42.61,42.61,0,0,1,2.76,4.66l2-1.24a49.45,49.45,0,0,0-2.92-4.48Zm20.4-6.56h4.6v1.3H178Zm-2.18-1.64v4.58H185v-4.58Zm5,15.48A17.18,17.18,0,0,1,184,471l2.42-1.14a22.89,22.89,0,0,0-3.78-2.78ZM177.48,467a13.9,13.9,0,0,1-4.26,2.4,12.79,12.79,0,0,1,1.66,1.62,17.3,17.3,0,0,0,4.64-2.68Zm.16-4.68H183v1h-5.38Zm0,2.52H183v1h-5.38Zm0-5H183v.92h-5.38Zm-2.26-1.68v9.3h10v-9.3Zm-8.06,4.24.58,2.3c2-.52,4.56-1.18,6.94-1.86l-.28-2.2C171.94,461.27,169.18,462,167.32,462.35Zm.32-6.44v2.24h6.9v-2.24Zm2.52-3.76v16.2c0,.28-.1.36-.38.38s-1.08,0-1.86,0a7.57,7.57,0,0,1,.66,2.18,6.58,6.58,0,0,0,3.06-.42c.68-.36.88-1,.88-2.12v-16.2Zm27.26,7.36h4.86v.78h-4.86Zm0-1.94h4.86v.76h-4.86Zm-2.16-1.32v5.36h9.3v-5.36Zm.54-4.12a14.08,14.08,0,0,1-3.12,5,15.72,15.72,0,0,1,1.76,1.44,20,20,0,0,0,3.5-5.88Zm.56,1.62-.86,1.74H206v-1.74Zm-3.5,8.52V464h13.56v-1.74Zm3.54.74a11.53,11.53,0,0,1-4,3.62,11.72,11.72,0,0,1,1.4,1.42,15.71,15.71,0,0,0,4.46-4.44Zm1.46,2.38a11.66,11.66,0,0,1-4.3,4.06,11.59,11.59,0,0,1,1.46,1.32,15.43,15.43,0,0,0,4.66-4.78Zm3.34-.06a10.07,10.07,0,0,1-3.72,4.52,14.16,14.16,0,0,1,1.56,1.24,13.23,13.23,0,0,0,4-5.28Zm-5.38-.52-1.3,1.62h10v-1.62Zm8,0v.26c-.26,2.56-.56,3.64-.9,3.94a.64.64,0,0,1-.56.2,11,11,0,0,1-1.44-.08,4.41,4.41,0,0,1,.5,1.8,17.33,17.33,0,0,0,1.9,0,1.82,1.82,0,0,0,1.28-.58c.52-.54.88-1.84,1.2-4.72,0-.26.08-.78.08-.78Zm-12.2-12.58a21.31,21.31,0,0,1-4.58,7.52,14.63,14.63,0,0,1,1.28,2.48,29.41,29.41,0,0,0,5.56-9.3Zm-1.94,5.52v13.16H192V455.49l0,0Z"
                                    transform="translate(-17.58 -31.09)" />
                            </g>
                            <g id="BIGT" data-name="圖層 5">
                                <path class="cls-7"
                                    d="M842.73,49.69v3.84H832.12V49.69Zm15,0v3.84H847.12V49.69ZM875.48,34A52,52,0,0,1,872,40.17a33.29,33.29,0,0,1,4,6.66l3.14-1.35a39.3,39.3,0,0,0-3.52-5.34c1-1.63,2.24-3.52,3.2-5.34Zm5.6,0a47.32,47.32,0,0,1-3.59,6,34.17,34.17,0,0,1,4.26,6.5l3.07-1.31A33.57,33.57,0,0,0,881.14,40c1.06-1.6,2.27-3.42,3.27-5.21Zm5.76,0a50.42,50.42,0,0,1-3.78,6.08,35.61,35.61,0,0,1,4.77,6.59L891,45.2A36.92,36.92,0,0,0,886.93,40c1.12-1.56,2.37-3.36,3.43-5.18ZM873.11,47.85V64h3.42V51h10.08V63.88h3.56v-16Zm1.54,11.87v3.11h13.56V59.72Zm4.67-14.4a26.78,26.78,0,0,1-1.22,4.16l3.39.68a45.83,45.83,0,0,0,2.28-4.26Zm3.87,5.54a20.42,20.42,0,0,1-6.69,6.78,15.62,15.62,0,0,1,2,2,24.59,24.59,0,0,0,7.29-7.49ZM877,53.55a44.22,44.22,0,0,1,7.23,5.69l2.15-2.17A45.75,45.75,0,0,0,879,51.66ZM864.15,35.12v3.45h6.4V35.12Zm-.22,7.29V45.9h5.85V42.41Zm0,7.46v3.55h5.88V49.87Zm-1.41-14.75V46.73c0,4.71-.13,11.17-1.86,15.62a12.24,12.24,0,0,1,3,1.63c1.88-4.77,2.14-12.19,2.14-17.25V35.12Zm5.69,0V60c0,.41-.12.54-.48.54a20.67,20.67,0,0,1-2.3,0,13.51,13.51,0,0,1,1,3.52c1.86,0,3.07-.06,4-.67s1.15-1.67,1.15-3.27V35.12Zm42.34.7V64h3.74V39.44h5.57V35.82Zm-16.86,1.25V40.4h15.48V37.07ZM893,46v3.45h16.55V46Zm6.56-11.81v4.93h3.72V34.22Zm-4,7.07a20.15,20.15,0,0,1,1.12,4.8l3.36-.8a20.14,20.14,0,0,0-1.31-4.67Zm8.58-.8a30.18,30.18,0,0,1-1.35,4.87l3,.73c.58-1.21,1.22-3,1.92-4.83Zm-8,18.66v3.33H906V59.15Zm-1.31-7.55V64.08h3.55V54.92h6v9h3.71V51.6Zm24-15.78v1.34c-.7,2.24-2.18,7.2-3.46,10.28,2.6,2.49,3.27,4.83,3.3,6.56,0,1.12-.22,1.82-.77,2.17a2.32,2.32,0,0,1-1.18.29c-.48,0-1.12,0-1.83,0a8.94,8.94,0,0,1,1,3.74,17.5,17.5,0,0,0,2.56-.06,5.22,5.22,0,0,0,2.21-.83c1.22-.84,1.76-2.4,1.76-4.77a10.55,10.55,0,0,0-3.2-7.52c1.25-2.75,2.66-6.43,3.81-9.54l-2.82-1.76-.6.13Zm17.86,13.87v3.84H926.12V49.69Zm15,0v3.84H941.12V49.69Z"
                                    transform="translate(-17.58 -31.09)" />
                                <path class="cls-7"
                                    d="M712.23,717.69v3.84H701.62v-3.84Zm15,0v3.84H716.62v-3.84Zm10.45-5.81H753v2.24H737.68Zm0-5.15H753v2.21H737.68Zm-3.84-3.17v13.76H757V703.56Zm9.51,1.54v10.59h3.87V705.1Zm-11.68,14.43V723h24.22v-3.46Zm22.49,0,0,.51c-.38,5.19-.93,7.59-1.66,8.2a2,2,0,0,1-1.44.35c-.84,0-2.88,0-4.84-.19a8,8,0,0,1,1.22,3.48c2.05.07,4,.07,5.12,0a4.78,4.78,0,0,0,3.2-1.24c1.06-1.09,1.7-3.72,2.21-9.6.06-.48.13-1.51.13-1.51Zm-11.39-2.85c-.67,5.76-1.76,10-12.45,12a10.55,10.55,0,0,1,2,3.33c11.77-2.56,13.63-8,14.43-15.33ZM766.16,702v30H770V702Zm-2.69,6.14a37.25,37.25,0,0,1-1.56,8.42l2.84,1a42.38,42.38,0,0,0,1.48-9Zm5.8.26a27.31,27.31,0,0,1,2,5.37l2.75-1.31a25.83,25.83,0,0,0-2.14-5.18Zm6.08-4.93c-.52,4.29-1.57,8.64-3.27,11.33a22.13,22.13,0,0,1,3.43,1.76c1.66-3,2.91-7.75,3.55-12.52Zm1.12,5-1.09,3.65h15.87v-3.65Zm4.38-6.27v27.29h3.84V702.19Zm-6.21,15.17v3.58h15.94v-3.58Zm-2.4,10V731h20v-3.65Zm27.81-19.58v3.74h22.27v-3.74Zm-1.31,9.44v3.68h22.37v-3.68ZM795,727.37v3.75H824v-3.75ZM807.47,702v27.23h4V702Zm-7.39.38c-1.15,4.42-3.2,8.83-5.73,11.52a23.79,23.79,0,0,1,3.46,2.34,38.55,38.55,0,0,0,6.24-13ZM839.6,705v3.23H856V705Zm.77,22.17v3.36h16.1v-3.36Zm-2.08-14.75V732h3.46V712.46Zm8.35,4.58h4.9v1.63h-4.9Zm0,4.22h4.9v1.6h-4.9Zm0-8.42h4.9v1.6h-4.9Zm-3.33-2.75v15.55H855V710.09Zm3.3-8.06c-.16,2.91-.45,6.59-.83,8.93h3.55c.42-2.28.9-5.83,1.18-8.74ZM827,703.53V707h11.71v-3.46Zm4.22,6.79v3.42h5.28v-3.42Zm-2,8.57a17.37,17.37,0,0,1,4,3.59l2-3.11a17.11,17.11,0,0,0-4.13-3.26Zm1.35-14.21c-.71,5.51-2.08,10.76-4.61,14a20.63,20.63,0,0,1,2.72,2.62c2.82-3.78,4.58-9.7,5.47-16Zm4.73,5.64v.76c-.89,8.9-3.64,15.17-8.22,18.47a13.09,13.09,0,0,1,2.66,2.65c4.73-3.68,7.9-10.91,9-21.37l-2.18-.64-.6.13Zm29.06-4.1h3.87v3.36h-3.87Zm-3.49-3v9.32h11v-9.32Zm17.51,3h3.87v3.36h-3.87Zm-3.49-3v9.32h11v-9.32Zm-16,11.11v3.36H888v-3.36Zm4.35,13.57v3.16h7.07v-3.16Zm13.12,0v3.16h7.07v-3.16Zm1.85-12.71-3.55,1.31a22,22,0,0,0,12.07,8.23,15.31,15.31,0,0,1,2.4-3C884.47,720.59,880.21,718.16,878.19,715.21Zm-16.76,6v10.85h3.32v-7.68h3.84v7.65h3.49V721.26Zm13.15,0v10.85h3.36v-7.68h3.84v7.65h3.52V721.26Zm-3.36-10c-2.24,4.87-7.17,8.48-13.44,10.5a14.79,14.79,0,0,1,2.3,3c6.75-2.36,12.07-6.3,14.85-12.22Zm31,6.48v3.84H891.62v-3.84Zm15,0v3.84H906.62v-3.84Z"
                                    transform="translate(-17.58 -31.09)" />
                                <path class="cls-7"
                                    d="M99.23,570.69v3.84H88.62v-3.84Zm15,0v3.84H103.62v-3.84Zm8.34-.75V585h3.9V572.69H140.3v-2.75ZM119,556.12v11.45h3.42v-9.18h9.73v-2.27Zm19.32,13.82v11.49c0,.45-.16.57-.73.61s-2.56,0-4.13,0a13.71,13.71,0,0,1,1.22,3,18.08,18.08,0,0,0,5.82-.48c1.31-.48,1.79-1.31,1.79-3.1V569.94ZM124.59,574v2.46h15.74V574Zm8.54-17.83v3h10.59v-3ZM119,566.45v2.34h13.28v-2.34Zm5.6,11.43v2.56h15.74v-2.56Zm.22-20.68v3.46H128V557.2Zm0,6.53v3.52H128v-3.52Zm17.76-7.52v.51a14.62,14.62,0,0,1-10.34,9.89,11.25,11.25,0,0,1,1.89,2.69c5.73-2,10.11-5.7,12-12.38l-2.27-.84-.64.13Zm-6,3-2.94.74a16.34,16.34,0,0,0,11.49,9.88,14.42,14.42,0,0,1,2.17-3C142,565.81,138.31,563.09,136.55,559.22ZM121,559.7v1.95h7.62V563H121v2h11.1V559.7Zm31.1-3.58v3.45h5.44v-3.45Zm7.27,1.18v3.17h20.09V557.3ZM166.76,579v2.28h5.35V579Zm-3.52-15.07v3H179.5v-3Zm-11.39-.48v3.49h5.66v-3.49Zm0,7.46v3.55h5.69v-3.55Zm-1.09-14.75v11.77c0,4.67-.06,11.23-1.6,15.75a13.21,13.21,0,0,1,2.69,1.47c1.63-4.87,1.85-12.23,1.85-17.25V556.12Zm4.51,0v25.24c0,.32-.09.45-.38.45a14.87,14.87,0,0,1-2,0,11.32,11.32,0,0,1,.86,3.23,6,6,0,0,0,3.49-.64c.77-.54,1-1.53,1-3V556.12Zm3.43,17.28V576h4.73V573.4Zm5-18.4v7.64h3.42V555Zm7.3,0v7.64h3.48V555Zm-2.18,14.4v3.77h1.89V569.4Zm0,7.36v3.45h1.89v-3.45Zm-6.4-12.87v8.32c0,3.49-.13,8.26-1.7,11.62a14.15,14.15,0,0,1,2.6,1.25c1.63-3.52,1.85-9,1.85-12.84v-8.35Zm3.36,4.35v14.12h2V570.48h4.32v-2.24Zm.86,3.52V574H170v1.38h-3.36v2.24h5.54v-5.86Zm-7.48-7.55v7.62h4.76V569.2h-2.52v-5Zm17.72,4.39c-1.24,6.46-4,11.52-7.48,14.4a10.75,10.75,0,0,1,1.88,1.72c3.65-3,6.63-8.28,8.1-14.81Zm-4.48-7c.13,13.63.93,23.42,4.8,23.49,1,0,2.18-1,2.85-5a8.39,8.39,0,0,1-2-1.73c-.16,2-.38,3.17-.7,3.17-1.34-.06-2-8.93-2-19.9Zm2.79.06a13.24,13.24,0,0,1,2.3,2.56l2.15-1.37a11.73,11.73,0,0,0-2.4-2.44ZM159.37,574.8c-.1,2.63-.26,5.16-1.25,6.92a9.66,9.66,0,0,1,1.95,1c1-1.92,1.35-4.7,1.48-7.65Zm33.86-4.11v3.84H182.62v-3.84Zm15,0v3.84H197.62v-3.84Z"
                                    transform="translate(-17.58 -31.09)" />
                                <path class="cls-7"
                                    d="M80.23,401.69v3.84H69.62v-3.84Zm15,0v3.84H84.62v-3.84Zm16.72-.81v3.23h12.68v-3.23Zm0,5.63v3.2h12.71v-3.2Zm12.39-19.78a35.62,35.62,0,0,1-2.82,6.11l3.33,1.25a57.26,57.26,0,0,0,3.23-6ZM108.4,388.4a22.26,22.26,0,0,1,2.91,6l3.46-1.63a22.29,22.29,0,0,0-3.14-5.76Zm1,6.52V416h3.78v-17.5h11.52v-3.59Zm13.51,0v16.93c0,.42-.16.55-.64.58s-2.18,0-3.65-.07a15.15,15.15,0,0,1,1.15,3.59c2.4,0,4.13,0,5.35-.61s1.53-1.63,1.53-3.46v-17Zm-6.69-9v11.36h3.87V386Zm-16.42,3a25.74,25.74,0,0,1,5.6,3.94l2.4-2.95a25.38,25.38,0,0,0-5.76-3.68Zm-1.47,8.51a26.08,26.08,0,0,1,5.76,4l2.31-3a25.81,25.81,0,0,0-5.89-3.68Zm.9,16,3.36,2.46c1.73-3.23,3.52-6.94,5-10.4l-2.82-2.3A93.54,93.54,0,0,1,99.22,413.42Zm45.47-26.59v23c0,4.54,1.18,5.82,5.22,5.82h5.5c3.78,0,4.8-2.05,5.28-7.58a11,11,0,0,1-3.58-1.6c-.23,4.51-.48,5.63-2.05,5.63h-4.67c-1.57,0-1.8-.32-1.8-2.24v-23Zm12,5.34a54.79,54.79,0,0,1-11.07,7.2,13.75,13.75,0,0,1,1.53,3.07,84.12,84.12,0,0,0,12.36-6.91Zm-18.18-5.76a34.83,34.83,0,0,1-8.8,12.55,23.46,23.46,0,0,1,2.21,4.06,46.74,46.74,0,0,0,10.37-15.33Zm-3.39,9V416H139V391.72l-.06-.06Zm34.15,11.9a23,23,0,0,1-7.08,5.63,24.11,24.11,0,0,1,3.49,2.66,35.15,35.15,0,0,0,7.59-6.79Zm11.93,2a44.2,44.2,0,0,1,7.39,6.17l3.49-2.46a50.5,50.5,0,0,0-7.65-5.89Zm-16-13.19a38.64,38.64,0,0,1,7.72,6l2.88-2.79a41,41,0,0,0-7.94-5.69Zm16.64,4a48.43,48.43,0,0,1,7.27,7.84l3.45-2.27a51,51,0,0,0-7.58-7.55Zm-6.59,4.35V416h4.1V404.49Zm-12.41-1.76.38,3.84c6.53-.16,16.29-.45,25.38-.86l.19-3.46C179.6,402.44,169.36,402.67,162.87,402.73ZM182,391.6a74.28,74.28,0,0,1-13.31,11.68l3,2a95.53,95.53,0,0,0,14-11.68Zm-8.1-2.21a37.58,37.58,0,0,1-5.72,6.53l3.13,1.69a60.17,60.17,0,0,0,6.37-6.4Zm13.38-3.11c-5.73,1.19-15.14,1.83-23.39,2a15.34,15.34,0,0,1,.89,3.45c8.32-.09,18.12-.73,25.22-2.17Zm25.66-.28v5.28h3.91V386ZM211,392a38.44,38.44,0,0,1-2.37,6.75l3.17,1c1-1.66,2.14-4.28,3.2-6.68Zm5.82,3.1a37.15,37.15,0,0,1,4.61,7.52l3.2-1.76a37.15,37.15,0,0,0-4.87-7.29Zm-10.5-5.31v3.42H224v-3.42Zm.2,8.13.32,3.45c3.84-.28,9.15-.7,14.14-1.15v-3.29C215.79,397.29,210.23,397.68,206.55,397.87Zm9.28,4.35v9.22c0,3.29.6,4.41,3.42,4.41h2.14c2.31,0,3.17-1.28,3.49-5.92a9.6,9.6,0,0,1-3.2-1.44c-.09,3.46-.19,4-.67,4h-1.09c-.45,0-.51-.1-.51-1v-9.22ZM199.19,386a40.33,40.33,0,0,1-3.27,7.2l2.56,1.12c1.25-1.79,2.72-4.64,4-7.07Zm3.68,3.77a65.11,65.11,0,0,1-7,11.08l2.21,1.24A95.44,95.44,0,0,0,206,391.21Zm-8.61,3.81a23.87,23.87,0,0,1,4.35,5.31l2-3a23.29,23.29,0,0,0-4.51-5Zm7.65,3.84a27.35,27.35,0,0,1,2.65,7l2.72-1.22a26.34,26.34,0,0,0-2.85-6.81Zm-7.68,2.66.32,3.36c3.1-.23,7.2-.48,11.13-.77l0-3C201.49,399.85,197.17,400,194.23,400.11Zm8.38,5.31a46.86,46.86,0,0,1,1.86,5.95l2.81-1a35.47,35.47,0,0,0-2-5.82Zm-7-.61a23.37,23.37,0,0,1-1.69,7.46,23.78,23.78,0,0,1,2.91,1.41,29.44,29.44,0,0,0,2-8.32Zm3.59-3v14.28h3.36V401.8Zm10.72.42c-.2,5.57-.61,9-5.48,11a9.93,9.93,0,0,1,2.18,2.88c5.82-2.56,6.69-7.1,6.94-13.92Zm28.32-.53v3.84H227.62v-3.84Zm15,0v3.84H242.62v-3.84Z"
                                    transform="translate(-17.58 -31.09)" />
                                <path class="cls-7"
                                    d="M750.73,325.69v3.84H740.12v-3.84Zm15,0v3.84H755.12v-3.84Zm11.7-6.54v15.29c0,4,1.15,5.28,5.25,5.28h5.21c3.84,0,4.9-1.88,5.35-7.9a10.7,10.7,0,0,1-3.59-1.66c-.25,5-.51,6.08-2.08,6.08h-4.38c-1.5,0-1.76-.23-1.76-1.8V319.15Zm.13-6.08a43.73,43.73,0,0,1,10.69,6l2.56-3.39a48.77,48.77,0,0,0-10.76-5.6Zm-5.89,8.35c-.42,4.29-1.34,8.48-3.23,11.23L772,334.7c2.11-3.14,3-8.06,3.43-12.51Zm18.43.51a34.07,34.07,0,0,1,5.44,11.75l3.91-1.92a33.27,33.27,0,0,0-5.83-11.59Zm13.47-10.81v3.45H809v-3.45Zm7.27,1.18v3.17h20.09V312.3ZM818.26,334v2.28h5.35V334Zm-3.52-15.07v3H831v-3Zm-11.39-.48v3.49H809v-3.49Zm0,7.46v3.55H809v-3.55Zm-1.09-14.75v11.77c0,4.67-.06,11.23-1.6,15.75a13.21,13.21,0,0,1,2.69,1.47c1.63-4.87,1.85-12.23,1.85-17.25V311.12Zm4.51,0v25.24c0,.32-.09.45-.38.45a14.87,14.87,0,0,1-2,0,11.32,11.32,0,0,1,.86,3.23,6,6,0,0,0,3.49-.64c.77-.54,1-1.53,1-3V311.12Zm3.43,17.28V331h4.73V328.4Zm5-18.4v7.64h3.42V310Zm7.3,0v7.64H826V310Zm-2.18,14.4v3.77h1.89V324.4Zm0,7.36v3.45h1.89v-3.45Zm-6.4-12.87v8.32c0,3.49-.13,8.26-1.7,11.62a14.15,14.15,0,0,1,2.6,1.25c1.63-3.52,1.85-9,1.85-12.84v-8.35Zm3.36,4.35v14.12h2.05V325.48h4.32v-2.24Zm.86,3.52V329h3.36v1.38h-3.36v2.24h5.54v-5.86Zm-7.48-7.55v7.62h4.76V324.2h-2.52v-5Zm17.72,4.39c-1.24,6.46-4,11.52-7.48,14.4a10.75,10.75,0,0,1,1.88,1.72c3.65-3,6.63-8.28,8.1-14.81Zm-4.48-7c.13,13.63.93,23.42,4.8,23.49,1,0,2.18-1,2.85-5a8.39,8.39,0,0,1-2-1.73c-.16,2-.38,3.17-.7,3.17-1.34-.06-2-8.93-2-19.9Zm2.79.06a13.24,13.24,0,0,1,2.3,2.56l2.15-1.37a11.73,11.73,0,0,0-2.4-2.44ZM810.87,329.8c-.1,2.63-.26,5.16-1.25,6.92a9.66,9.66,0,0,1,2,1c1-1.92,1.35-4.7,1.48-7.65Zm33.86-4.11v3.84H834.12v-3.84Zm15,0v3.84H849.12v-3.84Z"
                                    transform="translate(-17.58 -31.09)" />
                                <path class="cls-7"
                                    d="M89.5,256.69v3.84H78.89v-3.84Zm15,0v3.84H93.89v-3.84Zm10.13-12.94v2.88h21.85v-2.88Zm.29,4.09v2.79h18.81v-2.79Zm-3.68,4.07v2.91h18.49v-2.91Zm-2.08,8.38v2.91h19v-2.91ZM114.37,241a21.45,21.45,0,0,1-7,9.92,28.64,28.64,0,0,1,3.62,2.44,30.9,30.9,0,0,0,7.52-11.3Zm14.18,10.95c.13,10.46.64,19.07,5.82,19.07,2.4,0,3.14-1.79,3.39-5.89a12.75,12.75,0,0,1-2.46-2.43c0,2.75-.19,4.51-.64,4.51-1.79,0-2.27-7.1-2.24-15.26Zm-17.63,4.93a13.36,13.36,0,0,1,2,3.8l3.07-1.21a14.51,14.51,0,0,0-2.17-3.75Zm7.61,8a52.45,52.45,0,0,1,7.11,5l2.56-2.27a60.27,60.27,0,0,0-7.27-4.7Zm-1.44-9.34V271h3.62V255.46Zm6.79.13a25.92,25.92,0,0,1-2.24,4l2.46.93c.86-1,2-2.47,3.17-3.91Zm-7.56,6a19.64,19.64,0,0,1-8.25,6.24,15.78,15.78,0,0,1,2.4,2.82,23.26,23.26,0,0,0,8.7-8Zm31.81,5.83v2.81h15.62V267.4Zm4.58-19.68v3.84h3.71v-3.84Zm-11.81,2.2v6.37h3.62V252.8H165v3.49h3.74v-6.37Zm7.1,4.23v2.75h11.84v1.66H148v2.76h15.68v-7.17Zm.16,8.61v2.81h14.12v5.51h3.84v-8.32Zm-2.27-8.61v17h3.65v-17Zm-1.76-10.91v3h10.08v-3Zm13,0v3h12.42v-3Zm-12.83-2.5a17.73,17.73,0,0,1-4.74,6.53,26.08,26.08,0,0,1,3.14,2,25.26,25.26,0,0,0,5.18-7.62Zm13,0a14.45,14.45,0,0,1-4.76,6.14,21.12,21.12,0,0,1,3.36,1.83,20.27,20.27,0,0,0,5.05-7.07Zm-12,4.83a16.57,16.57,0,0,1,1.88,3.78l3.46-1a17.58,17.58,0,0,0-2.08-3.65Zm14.3.1a20.26,20.26,0,0,1,2.37,3.71l3.55-1a20.15,20.15,0,0,0-2.56-3.62Zm23.14-1.87-7.5,27.86h-4.17l7.5-27.86Zm4.66-1.68v3.45h6.49v-3.45Zm8.57,2.62v3.58h18.15v-3.58Zm-8.41,4.67v3.49h5.95v-3.49Zm0,7.46v3.55h5.95v-3.55Zm-1.67-14.75v11.71c0,4.7-.13,11.17-2,15.61a14.5,14.5,0,0,1,3,1.7c2-4.77,2.3-12.22,2.3-17.34V242.12Zm6,0v24.73c0,.39-.1.51-.45.51a24.48,24.48,0,0,1-2.47,0,11.73,11.73,0,0,1,1,3.62c2,0,3.23-.1,4.19-.74s1.21-1.66,1.21-3.32v-24.8Zm11.07-.74v5.44h3.84v-5.44Zm.13,7.46V271h3.61V248.84ZM197,251v15.26h3.49V254.47h10.66V251Zm12.77,0v11.42c0,.29-.09.39-.38.39s-1.22,0-2.15,0a13.3,13.3,0,0,1,1,3.77,7,7,0,0,0,3.87-.7c1-.64,1.22-1.76,1.22-3.36V251Zm24-8.13V271h3.75v-24.6h5.57v-3.62Zm-16.86,1.25v3.33h15.49v-3.33Zm-.67,9v3.45h16.54V253Zm6.56-11.81v4.93h3.71v-4.93Zm-4,7.07a21.17,21.17,0,0,1,1.12,4.8l3.36-.8a20.7,20.7,0,0,0-1.32-4.67Zm8.57-.8a30.15,30.15,0,0,1-1.34,4.87l3,.73c.57-1.21,1.21-3,1.92-4.83Zm-8,18.66v3.33h9.89v-3.33Zm-1.31-7.55v12.48h3.55v-9.16h6v9h3.71V258.6Zm24-15.78v1.34c-.7,2.24-2.17,7.2-3.45,10.28,2.59,2.49,3.26,4.83,3.29,6.56,0,1.12-.22,1.82-.76,2.17a2.36,2.36,0,0,1-1.19.29c-.48,0-1.12,0-1.82,0a8.94,8.94,0,0,1,1,3.74,17.54,17.54,0,0,0,2.56-.06,5.27,5.27,0,0,0,2.21-.83c1.21-.84,1.76-2.4,1.76-4.77a10.64,10.64,0,0,0-3.2-7.52c1.24-2.75,2.65-6.43,3.8-9.54l-2.81-1.76-.61.13ZM260,256.69v3.84H249.35v-3.84Zm15,0v3.84H264.35v-3.84Z"
                                    transform="translate(-17.58 -31.09)" />
                                <path class="cls-7"
                                    d="M686.73,187.69v3.84H676.12v-3.84Zm15,0v3.84H691.12v-3.84Zm14.68-3.25v3.65h18.4v-3.65Zm1-7.64v3.64h16.35V176.8Zm5.89-4.55V202h3.87v-29.7Zm-.39,14.43A20.72,20.72,0,0,1,714,197.05a15.87,15.87,0,0,1,2.59,3c4.09-2.59,7.42-7.29,9.37-12.51Zm4.58-.12-2.88.92c1.7,4.87,4.54,9.83,7.74,12.68a14.79,14.79,0,0,1,2.85-3.2A24.36,24.36,0,0,1,727.51,186.56Zm-19.65-11.78v3.68h4.23v11.81h-4.23V194h7.71v-19.2Zm-2,0v21.79h3.49V174.78Zm40.26,15.71h11.16v1.06H746.17Zm0,2.95h11.16v1.08H746.17Zm0-5.86h11.16v1.06H746.17Zm-3.65-2v10.88h18.59V185.6Zm10.72,9.85v2.47c0,2.88,1,3.74,4.8,3.74h4.73c2.79,0,3.78-.9,4.13-4.26a9.16,9.16,0,0,1-3.13-1.15c-.16,2.18-.36,2.53-1.38,2.53h-3.87c-1.28,0-1.54-.1-1.54-.86v-2.47Zm-7,.16c-.64,2.24-2.18,3.14-9.35,3.55a10.14,10.14,0,0,1,1.64,2.88c8.41-.83,10.62-2.65,11.42-6.43Zm-8.29-13.37v4.83h3.36v-2.43h21.15v2.43h3.52v-4.83Zm2.82-8.9.54,10.14h3.33l-.48-8.8c.51-.09.73-.22.8-.48Zm19-.35c-.06,3.36-.28,7.61-.6,10.33h3.45c.26-2.65.48-6.91.58-10.33Zm-3.93,0v2.24h4.67V173Zm-9.06-1a45.26,45.26,0,0,1-4.89,2.27l1.66,1.41a30.33,30.33,0,0,0,5.28-2.12Zm-4.38,4.22v2h5.34v-2Zm0,3v2h5.44v-2Zm13.82-3v2h5.38v-2Zm-.06,3v2h5.41v-2Zm-3-7a12.93,12.93,0,0,1-5.09,3.74,12,12,0,0,1,1.57,1.51,15.68,15.68,0,0,0,5.57-4.67ZM749,174a20.62,20.62,0,0,1,4.48,3.14l1.47-1.41a21.56,21.56,0,0,0-4.51-3Zm4.35,3.07a13.72,13.72,0,0,1-5.31,4.07,12.57,12.57,0,0,1,1.63,1.53,16.74,16.74,0,0,0,5.76-5Zm-4.38,1.7a23.38,23.38,0,0,1,4.86,3.58l1.54-1.41a24.92,24.92,0,0,0-5-3.45Zm31.78,8.94v3.84H770.12v-3.84Zm15,0v3.84H785.12v-3.84Z"
                                    transform="translate(-17.58 -31.09)" />
                                <path class="cls-7"
                                    d="M244.23,110.69v3.84H233.62v-3.84Zm15,0v3.84H248.62v-3.84Zm14,3.67v3.36H291.6v-3.36Zm7.2-19.4a29.29,29.29,0,0,1-.93,3.75l3.36.7c.57-1,1.31-2.37,2-3.87Zm5,17.73a28.65,28.65,0,0,1,2.34,2.5l2.17-1.67a22.87,22.87,0,0,0-2.37-2.33Zm-1.6,4.16-3,.83a14.46,14.46,0,0,0,9.51,7.2,14.49,14.49,0,0,1,2.3-3.07C288.75,121.11,285.49,119.32,283.89,116.85Zm-5.54-12.77h8v1.48h-8Zm0,3.56h8v1.47h-8Zm0-7.08h8V102h-8Zm-3.71-2.68V111.8h15.68V97.88Zm-9.25.25v3.68H269v11.81h-3.59v3.71h6.92V98.13Zm-2,0v21.79h3.36V98.13Zm17.41,13.76c-.61,6-3.36,9-9.09,10.11a14.17,14.17,0,0,1,2,3.14c6.65-1.6,9.82-5.47,10.65-12.86Zm22.85,1.6h11.16v1.06H303.67Zm0,3h11.16v1.08H303.67Zm0-5.86h11.16v1.06H303.67Zm-3.65-2v10.88h18.59V108.6Zm10.72,9.85v2.47c0,2.88,1,3.74,4.8,3.74h4.73c2.79,0,3.78-.9,4.13-4.26a9.16,9.16,0,0,1-3.13-1.15c-.16,2.18-.36,2.53-1.38,2.53H316c-1.28,0-1.54-.1-1.54-.86v-2.47Zm-7,.16c-.64,2.24-2.18,3.14-9.35,3.55A10.14,10.14,0,0,1,296,125c8.41-.83,10.62-2.65,11.42-6.43Zm-8.29-13.37v4.83h3.36v-2.43h21.15v2.43h3.52v-4.83Zm2.82-8.9.54,10.14h3.33l-.48-8.8c.51-.09.73-.22.8-.48Zm19-.35c-.06,3.36-.28,7.61-.6,10.33h3.45c.26-2.65.48-6.91.58-10.33Zm-3.93,0v2.24H318V96Zm-9.06-1a45.26,45.26,0,0,1-4.89,2.27L301,98.68a30.33,30.33,0,0,0,5.28-2.12Zm-4.38,4.22v2h5.34v-2Zm0,3v2h5.44v-2Zm13.82-3v2h5.38v-2Zm-.06,3v2H319v-2Zm-3-7A12.93,12.93,0,0,1,305.55,99a12,12,0,0,1,1.57,1.51,15.68,15.68,0,0,0,5.57-4.67ZM306.48,97a20.62,20.62,0,0,1,4.48,3.14l1.47-1.41a21.56,21.56,0,0,0-4.51-3Zm4.35,3.07a13.72,13.72,0,0,1-5.31,4.07,12.57,12.57,0,0,1,1.63,1.53,16.74,16.74,0,0,0,5.76-5Zm-4.38,1.7a23.38,23.38,0,0,1,4.86,3.58l1.54-1.41a24.92,24.92,0,0,0-5-3.45Zm31.78,8.94v3.84H327.62v-3.84Zm15,0v3.84H342.62v-3.84Z"
                                    transform="translate(-17.58 -31.09)" />
                            </g>
                        </svg>
    `
});

const vm = app.mount('#app');