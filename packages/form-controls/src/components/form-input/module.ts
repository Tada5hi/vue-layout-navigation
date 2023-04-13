/*
 * Copyright (c) 2022-2022.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import type { VNode, VNodeChild } from 'vue';
import { h, mergeProps, unref } from 'vue';
import { createComponentOptionBuilder } from '@vue-layout/core';
import { Component } from '../constants';
import { buildFormBaseOptions, handleFormValueChanged } from '../form-base';
import { buildValidationGroup } from '../validation-group';
import type { FormInputBuildOptions, FormInputBuildOptionsInput } from './type';

export function buildFormInputOptions(
    input: FormInputBuildOptionsInput,
    component?: Component.FormInput | Component.FormInputText,
) : FormInputBuildOptions {
    component = component || Component.FormInput;
    const options = buildFormBaseOptions(input, component);

    const { build, buildOrFail } = createComponentOptionBuilder<FormInputBuildOptions>(
        component,
    );

    return {
        ...options,

        type: buildOrFail({
            key: 'type',
            value: unref(options.type),
            alt: 'text',
        }),

        groupClass: buildOrFail({
            key: 'groupClass',
            value: unref(options.groupClass),
            alt: [],
        }),

        groupAppend: buildOrFail({
            key: 'groupAppend',
            value: unref(options.groupAppend),
            alt: false,
        }),
        groupAppendClass: build({
            key: 'groupAppendClass',
            value: unref(options.groupAppendClass),
            alt: '',
        }),
        groupAppendContent: build({
            key: 'groupAppendContent',
            value: unref(options.groupAppendContent),
            alt: '',
        }),

        groupPrepend: buildOrFail({
            key: 'groupPrepend',
            value: unref(options.groupPrepend),
            alt: false,

        }),
        groupPrependClass: build({
            key: 'groupPrependClass',
            value: unref(options.groupPrependClass),
            alt: '',
        }),
        groupPrependContent: build({
            key: 'groupPrependContent',
            value: unref(options.groupPrependContent),
            alt: '',
        }),
    };
}

export function buildFormInput(
    input: FormInputBuildOptionsInput,
) : VNode {
    const options = buildFormInputOptions(input);

    return buildFormInputFromOptions(options);
}

export function buildFormInputFromOptions(
    options: FormInputBuildOptions,
) {
    const children : VNodeChild = [];

    if (options.label) {
        children.push(h('label', { class: options.labelClass }, [options.labelContent]));
    }

    const inputGroupChildren : VNodeChild = [];

    if (options.groupPrepend) {
        inputGroupChildren.push(
            h('span', { class: options.groupPrependClass }, [options.groupPrependContent]),
        );
    }

    const rawValue = unref(options.value);

    inputGroupChildren.push(h(
        'input',
        mergeProps(
            {
                type: options.type,
                class: options.class,
                onInput($event: any) {
                    if ($event.target.composing) {
                        return;
                    }

                    handleFormValueChanged(options, $event.target.value);
                },
                ...(typeof rawValue !== 'undefined' ? { value: rawValue } : {}),
            },
            options.props,
        ),
    ));

    if (options.groupAppend) {
        inputGroupChildren.push(
            h('span', { class: options.groupAppendClass }, [options.groupAppendContent]),
        );
    }

    children.push(h(
        'div',
        {
            class: options.groupClass,
        },
        inputGroupChildren,
    ));

    return buildValidationGroup({
        content: children,
        hint: options.hint,
        validationResult: options.validationResult,
        validationMessages: options.validationMessages,
        validationTranslator: options.validationTranslator,
    });
}