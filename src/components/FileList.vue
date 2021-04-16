<template>
    <div class="fileList">
        <div class="nav">
            <h1>
                <img src="@/assets/images/logo.svg" alt="Cloud" />
            </h1>
            <label>
                <input type="file" ref="file" @change="changeHandler" />上傳檔案
            </label>
            <a href v-show="!id" @click.prevent="newFolder">新增資料夾</a>
        </div>

        <div class="content">
            <div class="top">
                <input type="text" class="search" placeholder="搜尋您的檔案" v-model="searchText" />
            </div>

            <div class="list">
                <div class="list-row" v-show="folders">
                    <p class="list-title">資料夾</p>
                    <ul>
                        <li
                            v-for="(folder,key) in folders"
                            :key="key"
                            :data-del-key="`/folders/${key}`"
                            @click.right.prevent="showMenu"
                            @dblclick.prevent="enterFolder(key)"
                        >{{key}}</li>
                    </ul>
                </div>

                <div class="list-row" v-show="files.length">
                    <p class="list-title">檔案：</p>
                    <ul>
                        <!--
                            data-del-key: 資料庫key（刪除用）
                            data-del-name: 資料庫檔名（刪除用）
                            data-dl-name: 資料庫檔名（下載用）
                            data-dl-ulname: 原始上傳檔名（下載用）
                        -->
                        <li
                            v-for="file in files"
                            :key="file.createTime"
                            :data-del-key="file.key"
                            :data-del-name="file.name"
                            :data-dl-name="file.name"
                            :data-dl-ulname="file.uploadName"
                            @click.right.prevent="showMenu"
                        >{{file.uploadName}}</li>
                    </ul>
                </div>
            </div>
        </div>

        <MouseMenu
            :menuPos="menuPos"
            :links="menuLinks"
            @deleteFile="deleteFile"
            @download="download"
        ></MouseMenu>
    </div>
</template>

<script>
const firebaseConfig = {
    apiKey: "AIzaSyCFQrK8G78IGKJ0cwHYez1P3WSOQyDNA3c",
    authDomain: "test-abea4.firebaseapp.com",
    databaseURL: "https://test-abea4.firebaseio.com",
    projectId: "test-abea4",
    storageBucket: "test-abea4.appspot.com",
    messagingSenderId: "942650617694",
    appId: "1:942650617694:web:6d938b4bdd578ac8"
};
let storage, contentRef, storageRef;

import MouseMenu from '@/components/MouseMenu.vue';
export default {
    components: {
        MouseMenu,
    },
    data() {
        return {
            rootFiles: null,
            searchText: '',
            menuPos: { x: 0, y: 0 },
            menuLinks: {
                delKey: '',
                delName: '',
                dlName: '',
                dlUlname: '',
            }
        }
    },
    computed: {
        id() {
            return this.$route.params.id;
        },
        files() {
            let files = [];
            for (const key in this.rootFiles) {
                if (this.rootFiles.hasOwnProperty(key) && key !== 'folders' && this.rootFiles[key].uploadName !== 'README.md') {
                    let newObj = {
                        key,
                        ...this.rootFiles[key]
                    };
                    files.push(newObj);
                }
            }

            // filter
            if (this.searchText) {
                return files.filter(val => val.uploadName.indexOf(this.searchText) !== -1);
            }

            return files;
        },
        folders() {
            let folders;
            for (const key in this.rootFiles) {
                if (this.rootFiles.hasOwnProperty(key) && key === 'folders') {
                    folders = this.rootFiles[key];
                }
            }

            // filter
            if (this.searchText) {
                let result = {};
                for (const key in folders) {
                    if (folders.hasOwnProperty(key) && key.indexOf(this.searchText) !== -1) {
                        result[key] = folders[key];
                    }
                }
                return result;
            }

            return folders;
        },
    },
    watch: {
        rootFiles(val) {
            if (val) {
                this.$store.commit('setLoadingState', false);
            }
        },
    },
    methods: {
        init() {
            if (firebase.apps.length === 0) {
                firebase.initializeApp(firebaseConfig);
            }
            storage = firebase.storage();
        },
        getList() {
            this.$store.commit('setLoadingState', true);

            if (this.id) {
                contentRef = firebase.database().ref(`w8/folders/${this.id}`);
            }
            else {
                contentRef = firebase.database().ref('w8');
            }

            contentRef.on('value', snapshot => {
                this.rootFiles = snapshot.val();
                if (this.rootFiles === null) {
                    this.$store.commit('setLoadingState', false);
                }
            });
        },
        changeHandler(e) {
            this.$store.commit('setLoadingState', true);
            let file = e.target.files.item(0);

            // 組合檔名＋副檔名
            let fileName = new Date().getTime();
            let ext = file.name.split('.')[file.name.split('.').length - 1];

            if (this.id) {
                storageRef = storage.ref(`w8/folders/${this.id}/${fileName}.${ext}`);
            }
            else {
                storageRef = storage.ref(`w8/${fileName}.${ext}`);
            }

            // 上傳進度
            let task = storageRef.put(file);
            task.on(
                'state_changed',
                next => {
                    let progress = Math.floor(next.bytesTransferred / next.totalBytes * 100);
                    this.$store.commit('setProgress', progress);
                },
                error => console.error('上傳失敗'),
                complete => this.submitHandler(`${fileName}.${ext}`, file.name)
            );
        },
        newFolder() {
            let folderName = prompt('資料夾名稱');
            if (!folderName) return;
            contentRef = firebase.database().ref(`w8/folders/${folderName}`);

            let fullFileName = 'README.md';
            let storageRef = storage.ref(`w8/folders/${folderName}/${fullFileName}`);
            let file = new File([''], 'README.md');
            storageRef.put(file).then(snapshot => {
                this.submitHandler(fullFileName, file.name);
            });
        },
        submitHandler(name, uploadName) {
            contentRef.push({
                name,
                uploadName,
                createTime: new Date().getTime(),
            });
            this.getList();
            this.$refs.file.value = '';
            this.$store.commit('setProgress', 0);
        },
        deleteFile({ delKey: fileKey, delName: fileName }) {
            if (!confirm('確定刪除？')) return;

            name = fileName || fileKey; // 刪資料夾使用 fileKey、刪檔案使用 fileName

            let storageRef;
            if (this.id) {
                storageRef = storage.ref(`w8/folders/${this.id}/${name}`);
            }
            else {
                storageRef = storage.ref(`w8/${name}`);
            }

            storageRef.listAll().then(res => {
                let fileList = res.items;
                if (fileList.length > 0) {
                    // 刪除資料夾底下所有檔案
                    fileList.forEach(el => {
                        storageRef = storage.ref(`w8/${name}/${el.name}`);
                        storageRef.delete();
                    });
                }
                else {
                    storageRef.delete();
                }
                contentRef.child(fileKey).remove();
            });

        },
        download({ dlName: name, dlUlname: uploadName }) {
            if (this.id) {
                storageRef = storage.ref(`w8/folders/${this.id}/${name}`);
            }
            else {
                storageRef = storage.ref(`w8/${name}`);
            }
            storageRef.getDownloadURL().then(url => {
                fetch(url)
                    .then(res => res.blob())
                    .then(blob => {
                        let blobUrl = URL.createObjectURL(blob);
                        let link = document.createElement('a');
                        link.href = blobUrl;
                        link.download = uploadName;

                        // for firefox
                        link.style.display = 'none';
                        document.body.appendChild(link);

                        link.click();

                        // clean
                        URL.revokeObjectURL(blob);
                        document.body.removeChild(link);
                    });
            });
        },
        enterFolder(key) {
            this.$router.push({ path: `folders/${key}` });
        },
        showMenu(e) {
            this.$store.commit('toggleMenu', true);
            this.$set(this.menuPos, 'x', e.pageX);
            this.$set(this.menuPos, 'y', e.pageY);
            this.$set(this.menuLinks, 'delKey', e.target.dataset.delKey);
            this.$set(this.menuLinks, 'delName', e.target.dataset.delName);
            this.$set(this.menuLinks, 'dlName', e.target.dataset.dlName);
            this.$set(this.menuLinks, 'dlUlname', e.target.dataset.dlUlname);
        },
    },
    created() {
        this.init();
        this.getList();
    }
}
</script>

<style lang="scss" scoped>
.fileList {
    display: flex;
    min-height: 100vh;
}
a {
    color: #fff;
}
.nav {
    display: flex;
    flex-direction: column;
    padding-top: 40px;
    width: 200px;
    background-color: #2f3136;
    color: #fff;
    align-items: center;
    flex-shrink: 0;
    img {
        width: 120px;
    }
    label {
        margin: 40px 0;
        cursor: pointer;
    }
    [type="file"] {
        display: none;
    }
}
.content {
    padding: 40px 30px;
    background-color: #25272c;
    color: #fff;
    flex-grow: 1;
}
.top {
    margin-bottom: 30px;
}
.search {
    display: block;
    padding: 0 1.5em;
    width: 400px;
    height: 52px;
    border: none;
    border-radius: 7px;
    background-color: #2f3136;
    color: #fff;
    font-size: 16px;
}
.list {
    ul {
        display: flex;
        margin: 0 -10px;
        flex-wrap: wrap;
    }
    li {
        display: flex;
        flex-direction: column;
        margin: 10px;
        width: 260px;
        height: 100px;
        border-radius: 7px;
        background-color: #2f3136;
        font-size: 14px;
        justify-content: center;
        align-items: center;
        user-select: none;
    }
    &-row + .list-row {
        margin-top: 30px;
    }
    &-title {
        margin-bottom: 10px;
    }
}
</style>