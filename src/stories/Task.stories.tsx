import React from 'react';
import {Meta, Story} from '@storybook/react/types-6-0';
import Task, {taskPropsType} from "../Task";
import {action} from "@storybook/addon-actions";
import {taskPriorities, taskStatuses} from "../api/task-api";

export default {
    title: 'Todolist/Task',
    component: Task,
    // args: {
    //     changeTaskStatusCallback: action('Status changed inside Task'),
    //     changeTaskTitleCallback: action('Title changed inside Task'),
    //     removeTaskCallback: action('Remove Button inside Task clicked')
    // }
} as Meta;

const changeTaskStatusCallback = action('Status changed inside Task')
const changeTaskTitleCallback = action('Title changed inside Task')
const removeTaskCallback = action('Remove Button inside Task clicked')

const Template: Story<taskPropsType> = (args) => <Task {...args} />;

const argsBase = {
    changeTaskStatusCallback: changeTaskStatusCallback,
    changeTaskTitleCallback: changeTaskTitleCallback,
    removeTaskCallback: removeTaskCallback
}

export const TaskIsDoneExample = Template.bind({})
TaskIsDoneExample.args = {
    ...argsBase,
    task: {
        id: '1',
        status: taskStatuses.Completed,
        title: 'JS',
        startDate: '',
        priority: taskPriorities.Low,
        order: 0,
        description: '',
        deadline: '',
        addedDate: '',
        todoListId: 'todolistId1'
    },
    todolistId: 'todolistId1'
}
export const TaskNotDoneExample = Template.bind({})
TaskNotDoneExample.args = {
    ...argsBase,
    task: {
        id: '2',
        status: taskStatuses.New,
        title: 'React',
        startDate: '',
        priority: taskPriorities.Low,
        order: 0,
        description: '',
        deadline: '',
        addedDate: '',
        todoListId: 'todolistId2'
    },
    todolistId: 'todolistId2'
}
