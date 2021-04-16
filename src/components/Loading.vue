<template>
    <transition name="slide-fade">
        <div v-if="loading" class="cover">
            <img src="loading.svg" class="loading" alt />
            <p class="uploadProgress">{{displayProgress}}</p>
        </div>
    </transition>
</template>

<script>
export default {
    computed: {
        loading() {
            return this.$store.state.loading;
        },
        uploadProgress() {
            return this.$store.state.uploadProgress;
        },
        displayProgress() {
            return this.uploadProgress ? this.uploadProgress + '%' : '';
        }
    },
}
</script>

<style lang="scss" scoped>
.cover {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    background-color: rgba(#000, .5);
    color: #fff;
    font-size: 20px;
    justify-content: center;
    align-items: center;
}
.loading {
    margin: .5em;
    width: 50px;
}
.uploadProgress {
    height: 1em;
}
</style>