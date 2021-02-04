import React from 'react';
import {Story, Meta} from '@storybook/react/types-6-0';
import Task, {taskPropsType} from "../Task";
import {action} from "@storybook/addon-actions";

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
    task: {id: '1', isDone: true, title: 'JS'},
    todolistId: 'todolistId1'
}
export const TaskNotDoneExample = Template.bind({})
TaskNotDoneExample.args = {
    ...argsBase,
    task: {id: '2', isDone: false, title: 'React'},
    todolistId: 'todolistId2'
}
