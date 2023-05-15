import { createStore } from 'vuex';
import axios from '../plugins/axios';
import { CATEGORY, PRIORITY } from '@/common/consts/index';

export const tasks = createStore({
    state() {
        return {
            taskLists: [],
            task: null
        };
    },
    mutations: {
        setTaskLists(state, tasksPayload) {
            state.taskLists = tasksPayload;
        },
        setTask(state, taskPayLoad) {
            state.task = taskPayLoad;
        }
    },
    actions: {
        async saveTask({ dispatch }, data) {
            const body = {
                ...data.task
            }

            for ( const item in CATEGORY ) {
                if ( data.task.category.toUpperCase() === item.toUpperCase() )
                    body.category = CATEGORY[item];
            }

            for ( const item in PRIORITY ) {
                if ( data.task.priority.toUpperCase() === item.toUpperCase() )
                    body.priority = PRIORITY[item];
            }

            body.dueDate = body.dueDate.replaceAll('/', '-');

            if (data.mode === 'Add') await axios.post('/create', body);
            else await axios.post('/update', body);

            dispatch("getListTasks");
        },

        getListTasks({ commit }) {
            axios.get('/lists').then((response) => {
                const listsData = response.data.map(item => {
                    const convertDueDate = item.dueDate.replaceAll('-', '/').split("T")[0];
                    let colorBadge;
                    switch ( item.priority ) {
                        case 'low':
                            colorBadge = 'info';
                            break;
                        case 'medium':
                            colorBadge = 'teal';
                            break;
                        case 'important':
                            colorBadge = 'orange';
                            break;
                        case 'urgent':
                            colorBadge = 'red';
                            break;
                    }

                    return {
                        ...item,
                        dueDate: convertDueDate,
                        colorBadge
                    }
                })
                commit('setTaskLists', listsData);
            });
        },

        async removeTask({ dispatch }, taskId) {
            const body = {
                _id: taskId
            }
            await axios.post('/remove', body);

            dispatch('getListTasks');
        },

        async doneTask({ dispatch }, task) {
            const body = {
                ...task,
                done: !task.done
            }
            await axios.post('/update', body);

            dispatch('getListTasks');
        },

        getTaskById({ commit }, taskId) {
            const body = {
                _id: taskId
            }
            axios.post('/find', body)
                .then(response => {
                    const result = {
                        ...response.data
                    }
                    commit('setTask', result)
                });
        }
    },
});
