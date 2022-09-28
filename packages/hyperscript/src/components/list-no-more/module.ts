/*
 * Copyright (c) 2022-2022.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import { h, mergeProps, unref } from 'vue';
import {
    Preset, createOptionValueBuilder, hasNormalizedSlot, normalizeSlot, unrefWithDefault,
} from '@vue-layout/core';
import { Component, SlotName } from '../constants';
import { buildListBaseOptions } from '../list-base';
import { ListNoMoreBuildOptions, ListNoMoreBuildOptionsInput } from './type';

export function buildListNoMoreOptions<T extends Record<string, any>>(
    input: ListNoMoreBuildOptionsInput<T>,
) : ListNoMoreBuildOptions<T> {
    const options = buildListBaseOptions(input, Component.ListNoMore, {
        class: {
            alt: 'list-no-more',
            preset: {
                [Preset.BOOTSTRAP]: {
                    value: 'alert alert-warning alert-sm',
                },
                [Preset.BOOTSTRAP_V5]: {
                    value: 'alert alert-warning alert-sm',
                },
            },
        },
    });

    const { buildOrFail } = createOptionValueBuilder<ListNoMoreBuildOptions<T>>(
        Component.ListNoMore,
    );

    return {
        ...options,

        textContent: buildOrFail({
            key: 'textContent',
            value: unref(options.textContent),
            alt: 'No more items available...',
        }),

        busy: unrefWithDefault(options.busy, false),
        total: unrefWithDefault(options.total, 0),
    };
}

export function buildListNoMore<T extends Record<string, any>>(
    input?: ListNoMoreBuildOptionsInput<T>,
) {
    input = input || {};
    const options = buildListNoMoreOptions(input);

    if (
        options.busy ||
        options.total > 0
    ) {
        return [];
    }

    if (hasNormalizedSlot(SlotName.ITEMS_NO_MORE, options.slotItems)) {
        return normalizeSlot(SlotName.ITEMS_NO_MORE, {
            ...options.slotProps,
            busy: options.busy,
            total: options.total,
        }, options.slotItems);
    }

    return h(
        options.tag,
        mergeProps({ class: options.class }, options.props),
        [
            options.textContent,
        ],
    );
}