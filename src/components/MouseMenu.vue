<template>
    <div class="menu" v-if="showMenu" :style="{top:`${menuPos.y}px`,left:`${menuPos.x}px`}">
        <a href v-if="links.dlName" @click.prevent="download">下載</a>
        <a href @click.prevent="deleteFile">刪除</a>
    </div>
</template>

<script>
export default {
    props: {
        menuPos: {
            type: Object
        },
        links: {
            type: Object
        },
    },
    computed: {
        showMenu() {
            return this.$store.state.showMenu;
        },
    },
    methods: {
        download() {
            this.$emit('download', this.links);
        },
        deleteFile() {
            this.$emit('deleteFile', this.links);
        },
    },
}
</script>

<style lang="scss" scoped>
.menu {
    position: absolute;
    padding: 1em 0;
    width: 160px;
    border-radius: 3px;
    background-color: #fff;
    color: #2f3136;
}
a {
    display: block;
    padding: 10px 1em;
    color: #2f3136;
    & + a {
        border-top: 1px solid rgba(#2f3136, .1);
    }
}
</style>