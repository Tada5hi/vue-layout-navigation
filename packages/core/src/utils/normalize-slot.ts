/*
 * Copyright (c) 2022-2022.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import type { Slot, Slots, VNode } from 'vue';
import { hasOwnProperty } from './has-own-property';

/**
 * Returns true if either scoped or unscoped named slot exists
 *
 * @returns bool
 *
 * @param name
 * @param $slots
 */
export function hasNormalizedSlot(
    name : string,
    $slots : Slots = {},
) : boolean {
    return hasOwnProperty($slots, name);
}

/**
 * Returns VNodes for named slot either scoped or unscoped
 *
 * @param name
 * @param scope
 * @param $slots
 *
 * @returns {Array} VNodes
 */
export function normalizeSlot(
    name : string,
    scope: Record<string, any> = {},
    $slots : Slots = {},
) : VNode[] {
    if (hasOwnProperty($slots, name)) {
        return ($slots[name] as Slot)(scope);
    }

    return [];
}
