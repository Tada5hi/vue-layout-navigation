/*
 * Copyright (c) 2022-2022.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import type { VNodeChild } from 'vue';
import { h, mergeProps } from 'vue';
import {
    hasNormalizedSlot,
    normalizeSlot,
} from '@vue-layout/core';
import { Component, SlotName } from '../constants';
import { buildListBaseOptions, buildListBaseSlotProps } from '../list-base';
import type { ListLoadingBuildOptions, ListLoadingBuildOptionsInput, ListLoadingSlotProps } from './type';

export function buildListLoadingOptions<T>(
    input: ListLoadingBuildOptionsInput<T>,
) : ListLoadingBuildOptions<T> {
    const options = buildListBaseOptions(input, Component.ListLoading, {
        class: 'list-loading',
    });

    return {
        ...options,
    };
}

export function buildListLoading<T>(
    input?: ListLoadingBuildOptionsInput<T>,
) : VNodeChild {
    input = input || {};

    const options = buildListLoadingOptions(input);

    let slotProps : ListLoadingSlotProps<T>;
    if (options.slotPropsBuilt) {
        slotProps = options.slotProps;
    } else {
        slotProps = {
            ...buildListBaseSlotProps<T>(options),
            ...options.slotProps,
        };
    }

    if (!options.busy) {
        return [];
    }

    let content : VNodeChild | undefined;

    if (hasNormalizedSlot(SlotName.LOADING, options.slotItems)) {
        content = normalizeSlot(SlotName.LOADING, slotProps, options.slotItems);
    } if (options.content) {
        if (typeof options.content === 'function') {
            content = [options.content(slotProps)];
        } else {
            content = [options.content];
        }
    }

    if (content) {
        return h(
            options.tag,
            mergeProps({ class: options.class }, options.props),
            [
                content,
            ],
        );
    }

    return [];
}
