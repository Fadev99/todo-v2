<template>
    <q-layout view="lhr Lpr lfr">
        <q-header elevated class="bg-primary text-white">
            <q-toolbar>
                <q-toolbar-title>
                    <q-avatar>
                        <img
                            src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg"
                            alt=""
                        />
                    </q-avatar>
                    Todo Lists
                </q-toolbar-title>
            </q-toolbar>
        </q-header>
        <q-page-container>
            <AddTasks/>
            <ListTasks/>
        </q-page-container>
    </q-layout>
</template>

<script>
import { ref } from "vue";
import AddTasks from "./components/addTasks.vue"
import ListTasks from "./components/listTasks.vue"

export default {
    name: "LayoutDefault",

    components: {
        AddTasks,
        ListTasks
    },

    setup() {
        return {
            leftDrawerOpen: ref(false),
        };
    },
};
</script>

<style>
#app {
    max-width: 824px;
    margin: auto;
    background-color: aliceblue;
}
</style>
