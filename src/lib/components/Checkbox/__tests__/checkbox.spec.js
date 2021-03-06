import { Form } from 'informed';

import React from 'react';
import { act } from 'react-test-renderer';

import { createTestInstance } from '@magento/peregrine';

import Checkbox from '../checkbox';

const icon = 'icon';
const field = 'a';
const label = 'b';
const classes = ['icon', 'input', 'label', 'message', 'root'].reduce(
    (acc, key) => ({ ...acc, [key]: key }),
    {}
);

const props = { classes, field, label, icon };

jest.mock('react-feather/dist/icons/check', () => 'icon');

test('renders the correct tree', () => {
    const tree = createTestInstance(
        <Form>
            <Checkbox {...props} />
        </Form>
    ).toJSON();

    expect(tree).toMatchSnapshot();
});

test('applies `props.id` to both label and input', () => {
    const id = 'c';

    const { root } = createTestInstance(
        <Form>
            <Checkbox {...props} id={id} />
        </Form>
    );

    const labelInstance = root.findByProps({ className: 'root' });
    const checkboxInstance = root.findByProps({ className: 'input' });

    expect(checkboxInstance.props.id).toBe(id);
    expect(labelInstance.props.htmlFor).toBe(id);
    expect(labelInstance.props.id).toBeUndefined();
});

test('applies `checked` based on `initialValue`', () => {
    const { root } = createTestInstance(
        <Form>
            <Checkbox {...props} field={'a.x'} initialValue={true} />
            <Checkbox {...props} field={'a.y'} initialValue={false} />
        </Form>
    );

    const [x, y] = root.findAllByType('input');

    expect(x.props.checked).toBe(true);
    expect(y.props.checked).toBe(false);
});

test('renders an error message if it exists', () => {
    const error = { id: 'checkbox.id', defaultMessage: 'error' };
    let formApi;
    const setFormApi = api => (formApi = api);

    const { root } = createTestInstance(
        <Form getApi={setFormApi}>
            <Checkbox {...props} />
        </Form>
    );

    act(() => {
        formApi.setError(field, error.defaultMessage);
    });

    const messageInstance = root.findByProps({
        children: error.defaultMessage
    });

    expect(messageInstance.props.children).toBe(error.defaultMessage);
});
