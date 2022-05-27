
const App = {
    delimiters: ['{{', '}}'],
    data() {
        return {
            banner: [
                {
                    title: 'Slide 1',
                    description: '2019年末，始於中國武漢的第一起未知病毒感染檢測報告被曝光，而後被WHO命名為Covid-19的病毒席捲向全球人類社會......',
                    imgUrl: 'https://picsum.photos/id/600/1920/1024',
                }, {
                    title: 'Slide 2',
                    description: '面對疫情<br>最大的敵人不是病毒，<br>而是我們自己內心的恐懼',
                    imgUrl: 'https://picsum.photos/id/650/1920/1024',
                }, {
                    title: 'Slide 3',
                    description: '對於未知的事物<br>人類往往抱著恐懼的眼光看待<br>而我們想讓你知道你無需害怕',
                    imgUrl: 'https://picsum.photos/id/700/1920/1024',
                }
            ],
            s3_l_active: false,
            s3_r_active: false,
            isMenuHovering: true,
            isMenuActive: false,
            menuAnimation_active: false,
            menuAnimationB_active: false,
        }
    },
    beforeCreate() { },
    created() {
        window.addEventListener("scroll", this.handleScroll);
    },
    beforeMount() { },
    mounted() {
        this.$nextTick(function () {

            console.log(this.isMenuActive);
            // 仅在整个视图都被渲染之后才会运行的代码
            this.myFullpage();
            this.bannerSwiper();
            this.situationChart();
            this.situationNumEffect();
            this.introScene();
            this.introWheel();
            this.vaccineScene();

            this.post_pandemicSwiper();
            this.about_usSwiper();

            this.s9_sceneSymptom();

        })
    },
    beforeUpdate() {

    },
    updated() {

    },
    methods: {
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
            new fullpage('#fullpage', {
                // Navigation
                menu: '#menu',
                lockAnchors: true,
                anchors: ['首頁', '全球確診情形', '台灣確診情形', '台灣疫苗施打情形', '病毒結構與病毒增值', '變異株起源', '感染症狀', '傳統疫苗與新型疫苗', '新冠疫苗開發歷程', '目前台灣施打新冠疫苗種類', '後疫情時代', '關於我們'],
                // anchors: [
                //     '首頁', 
                //     '全球確診情形', 
                //     '台灣確診情形',
                //     '台灣疫苗施打情形',
                //     '病毒結構與病毒增值',
                //     '變異株起源',
                //     '感染症狀',
                //     '傳統疫苗與新型疫苗'
                // ],
                navigation: false,
                navigationPosition: 'right',
                navigationTooltips: ['slide 1', 'slide 2', 'slide 3', 'slide 4', 'slide 5', 'slide 6', 'slide 7', 'slide 8', 'slide 9', 'slide 10', 'slide 11'],
                showActiveTooltip: true,
                slidesNavigation: false,
                slidesNavPosition: 'bottom',
                //options here
                autoScrolling: true,
                // autoScrolling: false,
                scrollHorizontally: true,
                // sectionsColor: ['#f2f2f2', '#4BBFC3', '#7BAABE', 'whitesmoke', '#000'],
                // Custom selectors
                sectionSelector: '.section',
                // slideSelector: '.slide',
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
                // speed: 600,
                autoplay: {
                    delay: 5000
                },
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
                    data: [65, 59, 80, 81],
                    barPercentage: 0.5,

                    backgroundColor: [
                        '#616161',
                        '#d6d6d6',
                        '#616161',
                        '#d6d6d6',
                    ],
                    color: ['#FFF', '#FFF', '#FFF', '#FFF',]
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
            }
            )


        },
    }
}


Vue.createApp(App).mount('#app');




var map;
var InforObj = [];

/* map deafult Coordinates loaction */
var centerCords = {
    // lat: -25.344,
    lat: 40.940158512491735,
    lng: 131.036
};
var markersOnMap = [
    // 印度
    {
        virusNum: "B.617.2//",
        virusName: "Delta",
        virusLocation: "印度",
        virusContent: "Beijing Station W St, Dongcheng Qu, Beijing Shi, China, 100021",
        LatLng: [
            {
                lat: 22.940158512491735,
                lng: 79.70995021888635
            }
        ]
    },
    // 巴西
    {
        virusNum: "P.1//",
        virusName: "Gamma",
        virusLocation: "巴西",
        virusContent: "3015 St Charles St Ste. B",
        LatLng: [
            {
                lat: -8.510013450198832,
                lng: -52.434523278800185
            }
        ]
    },
];



function addMarker() {
    var image = {
        /* marker url */
        url: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
        // This marker is 20 pixels wide by 32 pixels high.
        size: new google.maps.Size(20, 32),
        // The origin for this image is (0, 0).
        origin: new google.maps.Point(0, 0),
        // The anchor for this image is the base of the flagpole at (0, 32).
        anchor: new google.maps.Point(0, 32),
        labelOrigin: new google.maps.Point(0, 42)
    };

    /* Create markers loop */
    for (var i = 0; i < markersOnMap.length; i++) {
        /* A. Create html data for the markers */
        var contentString =
            '<div id="content">' +
            '<label>' + markersOnMap[i].virusNum + '</label>' +
            '<h2>' + markersOnMap[i].virusName + '</h2>' +
            '<p>' + markersOnMap[i].virusContent + '</p>' +
            '</div>';

        /* B. generate markers position and label */
        const marker = new google.maps.Marker({
            position: markersOnMap[i].LatLng[0],
            map: map,
            label: {
                text: markersOnMap[i].virusLocation,
                color: "white",
                fontSize: "17px"
            },
            icon: 'none'
        });

        const infowindow = new google.maps.InfoWindow({
            content: contentString
        });

        marker.addListener("click", function () {
            closeOtherInfo();
            infowindow.open(marker.get("map"), marker);
            InforObj[0] = infowindow;
        });

        google.maps.event.addListener(map, "click", function (event) {
            infowindow.close();
        });
    }/* end marker loop */
}

function closeOtherInfo() {
    if (InforObj.length > 0) {
        /* detach the info-window from the marker ... undocumented in the API docs */
        InforObj[0].set("marker", null);
        /* and close it */
        InforObj[0].close();
        /* blank the array */
        InforObj.length = 0;
    }
}

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        restriction: {
            latLngBounds: {
                north: 85,
                south: -85,
                west: -180,
                east: 180
            }
        },
        zoom: 2.5,
        maxZoom: 4,
        minZoom: 2.5,
        disableDefaultUI: true, // a way to quickly hide all controls
        center: centerCords,
        // backgroundColor: 'hsla(0, 0%, 0%, 0)',
        // backgroundColor: '#212121',
        backgroundColor: '#000',
        // fullScreenControl: false,
        styles: [
            {
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#212121"
                    }
                ]
            },
            {
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#757575"
                    }
                ]
            },
            {
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "color": "#212121"
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#757575"
                    },
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "administrative.country",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#9e9e9e"
                    }
                ]
            },
            {
                "featureType": "administrative.land_parcel",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "administrative.locality",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#bdbdbd"
                    }
                ]
            },
            {
                "featureType": "administrative.neighborhood",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "labels.text",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#757575"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#181818"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#616161"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "color": "#1b1b1b"
                    }
                ]
            },
            {
                "featureType": "road",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#2c2c2c"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "labels",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#8a8a8a"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#373737"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#3c3c3c"
                    }
                ]
            },
            {
                "featureType": "road.highway.controlled_access",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#4e4e4e"
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#616161"
                    }
                ]
            },
            {
                "featureType": "transit",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#757575"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#000000"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "labels.text",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#3d3d3d"
                    }
                ]
            }
        ]
    });

    addMarker();
}

window.onload = function () {
    initMap();
};
