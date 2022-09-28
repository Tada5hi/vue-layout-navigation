/*
 * Copyright (c) 2022-2022.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import {
    VNode, VNodeArrayChildren, VNodeChild, h, mergeProps, unref,
} from 'vue';
import {
    Preset, createOptionValueBuilder, hasNormalizedSlot, hasOwnProperty,
    normalizeSlot, unrefWithDefault,
} from '@vue-layout/core';
import { Component, SlotName } from '../constants';
import { buildListBaseOptions } from '../list-base';
import { ListItemBuildOptions, ListItemBuildOptionsInput } from './type';

export function buildListItemOptions<T extends Record<string, any>>(
    input: ListItemBuildOptionsInput<T>,
) : ListItemBuildOptions<T> {
    const options = buildListBaseOptions(input, Component.ListItem, {
        class: {
            alt: 'list-item',
            preset: {
                [Preset.BOOTSTRAP]: {
                    value: 'd-flex flex-row align-items-center',
                },
                [Preset.BOOTSTRAP_V5]: {
                    value: 'd-flex flex-row align-items-center',
                },
            },
        },
    });

    const { buildOrFail } = createOptionValueBuilder<ListItemBuildOptions<T>>(
        Component.ListItem,
    );

    return {
        ...options,

        icon: buildOrFail({
            key: 'icon',
            value: unref(options.icon),
            alt: true,
        }),
        iconClass: buildOrFail({
            key: 'iconClass',
            value: unref(options.iconClass),
            alt: [],
            preset: {
                [Preset.BOOTSTRAP]: {
                    value: 'pr-1',
                },
                [Preset.BOOTSTRAP_V5]: {
                    value: 'pe-1',
                },
                [Preset.FONT_AWESOME]: {
                    value: 'fa fa-bars',
                },
            },
        }),
        iconProps: unrefWithDefault(options.iconProps, {}),

        textFn: options.textFn,
        textPropName: buildOrFail({
            key: 'textPropName',
            value: unref(options.textPropName),
            alt: 'name',
        }),

        index: unref(options.index),
        key: unref(options.key),

        data: unref(options.data),

        actions: buildOrFail({
            key: 'actions',
            value: unref(options.actions),
            alt: [],
        }),
        busy: unrefWithDefault(options.busy, false),

    };
}

export function buildListItem<T extends Record<string, any>>(
    input: ListItemBuildOptionsInput<T>,
) : VNode | VNode[] {
    const options = buildListItemOptions(input);

    const slotProps = {
        itemBusy: options.busy,
        data: options.data,
        busy: options.busy,
        index: options.index,
        ...(options.slotProps || {}),
    };

    if (hasNormalizedSlot(SlotName.ITEM, options.slotItems)) {
        return normalizeSlot(SlotName.ITEM, slotProps, options.slotItems);
    }

    // todo: maybe wrap item :)
    if (typeof options.fn === 'function') {
        return options.fn(options.data, options.index);
    }

    const children : VNodeArrayChildren = [];
    if (options.icon) {
        // class: pr-1
        children.push(h('div', [h('i', mergeProps({ class: options.iconClass }, options.iconProps))]));
    }

    let itemText : string | VNode | undefined | (string | VNode)[];

    if (options.textFn) {
        itemText = options.textFn(options.data);
    } else if (hasOwnProperty(options.data, options.textPropName)) {
        itemText = options.data[options.textPropName];
    }
    if (itemText) {
        children.push(itemText);
    }

    let actions : VNodeChild[] = [];
    if (hasNormalizedSlot(SlotName.ITEM_ACTIONS, options.slotItems)) {
        actions = [
            normalizeSlot(SlotName.ITEM_ACTIONS, slotProps, options.slotItems),
        ];
    } else if (options.actions) {
        actions = [
            ...(Array.isArray(options.actions) ? options.actions : [options.actions]) as VNode[],
        ];

        if (hasNormalizedSlot(SlotName.ITEM_ACTIONS_EXTRA, options.slotItems)) {
            actions.push(normalizeSlot(SlotName.ITEM_ACTIONS_EXTRA, slotProps, options.slotItems));
        }
    }
    if (
        actions &&
        actions.length > 0
    ) {
        // todo: make VNode-class an option
        children.push(h('div', { class: 'ms-auto ml-auto' }, actions));
    }

    return h(options.tag, mergeProps({ key: options.index }, { class: options.class }, options.props), children);
}