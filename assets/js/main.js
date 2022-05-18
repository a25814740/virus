const App = {
    data() {
        return {

        }
    },
    beforeCreate() {
    },
    created() {

    },
    beforeMount() {
    },
    mounted() {
        this.$nextTick(function () {
            // 仅在整个视图都被渲染之后才会运行的代码
            this.myFullpage();

        })
    },
    beforeUpdate() {

    },
    updated() {

    },
    methods: {
        myFullpage() {
            new fullpage('#fullpage', {
                //options here
                autoScrolling: true,
                scrollHorizontally: true,
            });
        }
    }
}

Vue.createApp(App).mount('#app');
