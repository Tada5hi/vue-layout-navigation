/*
 * Copyright (c) 2023.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import type { NavigationStore } from '../store';
import type { NavigationItem } from '../type';
import { buildNavigationForTier } from './build';
import { isNavigationItemMatch } from './match';
import { refreshNavigationTierItems } from './refresh';
import { replaceNavigationTierItemActive } from './replace';
import { calculateNavigationTiers, findNavigationItemForTier } from './tier';

export async function selectNavigationTierItem(
    store: NavigationStore,
    tier: number,
    component: NavigationItem,
) {
    const isMatch = isNavigationItemMatch(
        findNavigationItemForTier(store.itemsActive.value, tier),
        component,
    );

    if (isMatch) {
        return;
    }

    replaceNavigationTierItemActive(store, tier, component);
    refreshNavigationTierItems(store, tier);

    const tiers = await calculateNavigationTiers(store);

    let tierStartIndex = tier + 1;

    while (tierStartIndex <= tiers) {
        await buildNavigationForTier(store, tierStartIndex);

        tierStartIndex++;
    }
}