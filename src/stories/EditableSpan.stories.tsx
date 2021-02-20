import React from 'react';
import {Story, Meta} from '@storybook/react/types-6-0';

import EditableSpan, {editableSpanType} from "../components/EditableSpan/EditableSpan";
import {action} from "@storybook/addon-actions";

export default {
    title: 'Todolist/EditableSpan',
    component: EditableSpan,
    argTypes: {
        onChange: {
            description: 'change title'
        },
        title: {
            defaultValue: 'qqqqqq'
        }
    },
    args: {
        title: 'asdasdasd'
    }
} as Meta;

const Template: Story<editableSpanType> = (args) => <EditableSpan {...args}/>

export const EditableSpanExamples = Template.bind({})
EditableSpanExamples.args = {
    title: '',
    onChange: action('value EditableSpan changed')
}