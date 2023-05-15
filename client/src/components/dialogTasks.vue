<template>
    <q-dialog
        v-model="show"
        transition-show="rotate"
        transition-hide="rotate"
        persistent
    >
        <q-card style="width: 500px; max-width: 80vw">
            <q-card-section>
                <div class="text-h6">{{ mode }}</div>
            </q-card-section>

            <q-card-section class="q-pt-none cus__content">
                <!-- Name -->
                <q-input
                    v-model="nameTask"
                    label="Name Task"
                    stack-label
                    class="cus__content__name"
                />
                <!-- end name -->

                <!-- category -->
                <div class="cus__content__category">
                    <q-radio
                        v-model="category"
                        checked-icon="task_alt"
                        unchecked-icon="panorama_fish_eye"
                        val="company"
                        label="Company"
                    />
                    <q-radio
                        v-model="category"
                        checked-icon="task_alt"
                        unchecked-icon="panorama_fish_eye"
                        val="personal"
                        label="Personal"
                    />
                </div>
                <!-- end category -->

                <!-- due date -->
                <q-input
                    v-model="dueDate"
                    mask="date"
                    :rules="['date']"
                    name="event"
                    class="cursor-pointer cus__content__due"
                    label="Due date"
                    stack-label
                    readonly
                >
                    <q-popup-proxy
                        cover
                        transition-show="scale"
                        transition-hide="scale"
                    >
                        <q-date v-model="dueDate" minimal>
                            <div class="row items-center justify-end">
                                <q-btn
                                    v-close-popup
                                    label="OK"
                                    color="primary"
                                    flat
                                />
                            </div>
                        </q-date>
                    </q-popup-proxy>
                    <template v-slot:append>
                        <q-icon name="event" class="cursor-pointer" />
                    </template>
                </q-input>
                <!-- end due date -->

                <!-- priority -->
                <q-select
                    label="Priority"
                    transition-show="scale"
                    transition-hide="scale"
                    stack-label
                    v-model="priority"
                    :options="optionsPriority"
                    class="cus__content__priority"
                />
                <!-- end priority -->
            </q-card-section>

            <q-card-actions align="right">
                <q-btn
                    flat
                    label="OK"
                    :disable="validateFields()"
                    v-close-popup
                    @click="save"
                    class="bg-white text-teal"
                />
                <q-btn
                    flat
                    label="Cancel"
                    @click="resetFields()"
                    v-close-popup
                    class="bg-white text-primary"
                />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script>
import { ref } from "vue";
import { mapState, mapActions } from "vuex"

export default {
    setup() {
        return {
            show: ref(false),
            dueDate: ref(""),
            showDatePicker: ref(false),
            priority: ref("Medium"),
            optionsPriority: ["Urgent", "Important", "Medium", "Low"],
            category: ref(""),
            nameTask: ref(""),
        };
    },

    props: {
        canShow: {
            type: Boolean,
            default: false
        },
        mode: {
            type: String,
            default: ""
        }

    },

    computed: {
        ...mapState(['taskLists', 'task'])
    },

    watch: {
        task(value) {
            if (value) {
                const convertPriority = value.priority.charAt(0).toUpperCase() + value.priority.slice(1);

                this.priority = convertPriority;
                this.dueDate = value.dueDate;
                this.nameTask = value.nameTask;
                this.category = value.category;
            } else {
                this.priority = 'Medium';
                this.dueDate = this.dateBuilder();
                this.nameTask = '';
                this.category = '';
            }
        },
        canShow(value) {
            this.show = value;
        }
    },

    beforeMount() {
        this.dueDate = this.dateBuilder();
    },

    methods: {
        ...mapActions(['saveTask']),
        
        dateBuilder() {
            const day   = new Date();
            const date  = day.getDate() < 10 ? `0${ day.getDate() }` : day.getDate();
            const month = day.getMonth() + 1 < 10 ? `0${ day.getMonth() + 1 }` : day.getMonth() + 1;
            const year  = day.getFullYear();

            return `${year}/${month}/${date}`;
        },

        save() {
            const trimNameTask = this.nameTask.trim();

            if (trimNameTask) {
                const data = {
                    task: {
                        nameTask : trimNameTask,
                        category : this.category,
                        dueDate  : this.dueDate,
                        priority : this.priority,
                        done     : false
                    },
                    mode: this.mode
                }

                data.task._id = this.task?._id && this.task._id;

                this.saveTask(data);
            }

            this.resetFields();
        },

        resetFields() {
            this.dueDate  = this.dateBuilder();
            this.priority = "Medium";
            this.category = '';
            this.nameTask = '';

            this.$emit('closeDialog', false);
        },

        validateFields() {
            return (this.category === '' || this.nameTask === '');
        },
    },
};
</script>
<style scoped>
.cus__content {
    display: flex;
    flex-wrap: wrap;
}
.cus__content__name {
    width: 48%;
    margin-bottom: 20px;
    margin-right: 2%;
}
.cus__content__category {
    width: 48%;
    margin-right: 2%;
    margin-bottom: 20px;
    display: flex;
}
.cus__content__due {
    width: 48%;
    margin-right: 2%;
}
.cus__content__priority {
    width: 48%;
    margin-left: 2%;
}
.cursor-pointer {
    cursor: pointer !important;
}
</style>
