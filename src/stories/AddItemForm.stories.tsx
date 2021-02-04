import React from 'react';
import {Story, Meta} from '@storybook/react/types-6-0';
import AddItemForm, {addItemFormType} from "../AddItemForm";
import {action} from "@storybook/addon-actions";


export default {
    title: 'Todolist/AddItemFormStories',
    component: AddItemForm,
} as Meta;

const Template: Story<addItemFormType> = (args) => <AddItemForm {...args} />;

export const AddItemFormTypeExample = Template.bind({})
AddItemFormTypeExample.args = {
    addItem: action('Button inside form clicked')
}