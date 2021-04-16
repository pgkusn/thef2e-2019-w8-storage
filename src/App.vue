<template>
    <div class="app" @click="clickHandler">
        <router-view></router-view>
        <Loading></Loading>
    </div>
</template>

<script>
import Loading from '@/components/Loading.vue';
export default {
    components: {
        Loading,
    },
    computed: {
        componentId() {
            return this.$store.state.route.name;
        },
    },
    methods: {
        clickHandler(e) {
            if (e.target.className !== 'menu') {
                this.$store.commit('toggleMenu', false);
            }
        },
    }
}
</script>

<style lang="scss">
@import '@/assets/reset.scss';
@import '@/assets/all.scss';
</style>
