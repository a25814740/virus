const App = {
    data() {
        return {

        }
    },
    beforeCreate() {
    },
    created() {
        window.addEventListener("scroll", this.handleScroll);
    },
    beforeMount() {
    },
    mounted() {
        this.$nextTick(function () {
            // 仅在整个视图都被渲染之后才会运行的代码
            this.myFullpage();
            this.bannerSwiper();
            this.situationChart();
            this.situationNumEffect();
            this.situationNumEffect();
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
                onLeave: function (origin, destination, direction, trigger) {
                    console.log(destination);
                    let navbar = document.querySelector('.navbar');
                    //after leaving section 0
                    // if (destination.index !== 0) {
                    //     navbar.classList.remove('fixed-bottom');
                    //     navbar.classList.add('fixed-top');
                    // } else {
                    //     navbar.classList.add('fixed-bottom');
                    //     navbar.classList.remove('fixed-top');
                    // }
                },
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
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                pagination: {
                    el: '.swiper-pagination',
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
            Splitting({ target: counterSelector })

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
    }
}

Vue.createApp(App).mount('#app');
