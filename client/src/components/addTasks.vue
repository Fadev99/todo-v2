<template>
    <div class="q-pa-md q-gutter-sm">
        <q-btn label="Add New Task" color="primary" @click="currentMode = 'Add', canShow = true" />

        <DialogTasks :canShow="canShow" @closeDialog="closeDialog" :mode="currentMode" />
    </div>
</template>

<script>
import { ref } from "vue";
import { mapMutations } from "vuex";
import DialogTasks from "./dialogTasks.vue";

export default {
    setup() {
        return {
            canShow: ref(false),
            currentMode: ref(""),
        };
    },

    components: {
        DialogTasks,
    },

    methods: {
        ...mapMutations(['setTask']),

        closeDialog(value) {
            this.canShow = value;
        },
    }
};
</script>
<style scoped>
</style>
