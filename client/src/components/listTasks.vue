<template>
    <div class="row">
        <q-card class="my-card col-5" v-for="task in taskLists" :key="task._id">
            <q-card-section horizontal>
                <q-card-section
                    class="text-dark c-card__content"
                >
                    <div class="c-card__content--badge">
                        <q-badge color="yellow-6" text-color="black">
                            <q-icon
                                v-if="task.category === CATEGORY.COMPANY"
                                name="business"
                                size="14px"
                            />
                            <q-icon
                                v-else
                                name="person_outline"
                                size="14px"
                            />
                        </q-badge>
                        <q-badge
                            rounded
                            class="capitalize"
                            :color="task.colorBadge"
                            :label="task.priority"
                        />
                    </div>
                    <div class="text-h6 c-card__content--title"
                         :class="{ 'text-green-13': task.done }"
                    >
                        {{ task.nameTask }}
                    </div>
                    <div class="text-subtitle2 cus__flex">
                        <span class="material-icons"> event </span> &nbsp;Due Date: &nbsp;
                        <q-badge outline color="red-10" :label="task.dueDate"/>
                    </div>
                </q-card-section>

                <q-card-actions class="justify-around c-card__actions" vertical>
                    <!--btn re-open-->
                    <q-btn
                        v-if="task.done"
                        flat
                        round
                        color="pink-4"
                        @click="doneTask(task)"
                        icon="settings_backup_restore"
                    >
                        <q-tooltip>
                            Reopen
                        </q-tooltip>
                    </q-btn>
                    <!--end btn re-open-->

                    <!--btn done-->
                    <q-btn
                        v-else
                        flat
                        round
                        color="green-13"
                        @click="doneTask(task)"
                        icon="done"
                    >
                        <q-tooltip>
                            Done
                        </q-tooltip>
                    </q-btn>
                    <!--end btn done-->

                    <!--btn detail-->
                    <q-btn
                        flat
                        round
                        color="light-blue-13"
                        icon="edit_note"
                        @click="editTask(task._id)"
                    >
                        <q-tooltip>
                            Edit
                        </q-tooltip>
                    </q-btn>
                    <!--end btn detail-->

                    <!--btn remove-->
                    <q-btn
                        flat
                        round
                        color="red"
                        icon="delete"
                        @click="removeTask(task._id)"
                    >
                        <q-tooltip>
                            Remove
                        </q-tooltip>
                    </q-btn>
                    <!--end btn remove-->
                </q-card-actions>
            </q-card-section>
        </q-card>
        <DialogTasks :canShow="canShow" @closeDialog="closeDialog" :mode="currentMode" />
    </div>
</template>

<script>
import { ref } from "vue";
import { mapState, mapActions, mapMutations } from "vuex";
import { CATEGORY } from '@/common/consts/index';
import DialogTasks from "./dialogTasks.vue";

export default {
    setup() {
        return {
            canShow: ref(false),
            currentMode: ref('')
        }
    },

    components: {
        DialogTasks,
    },

    computed: {
        CATEGORY() {
            return CATEGORY
        },
        ...mapState([ "taskLists", 'task' ]),
    },

    created() {
        this.getListTasks();
    },

    methods: {
        ...mapActions([ "getListTasks", "removeTask", "doneTask", "getTaskById" ]),
        ...mapMutations([ "setTask" ]),

        closeDialog(value) {
            this.canShow = value;
            this.setTask(null);
        },

        async editTask(taskId) {
            this.canShow = true;
            await this.getTaskById(taskId);
            this.currentMode = 'Edit';
        }
    },
};
</script>

<style lang="scss" scoped>
.my-card {
    margin: 16px 0 0 16px;
}

.cus__flex {
    display: flex;
    align-items: center;
    margin-top: 9px;
}

.text-h6 {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    display: flex;
    align-items: center;
}

.capitalize {
    text-transform: capitalize;
}

.row {
    justify-content: center;
}

.c-card {
    &__content {
        width: calc(100% - 58px);

        &--title {
            height: 99px;
            align-items: flex-start;
            white-space: break-spaces;
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            line-clamp: 3;
            -webkit-box-orient: vertical;
        }

        &--badge {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 9px;
        }
    }

    &__actions {
        width: 58px;
    }
}
</style>
