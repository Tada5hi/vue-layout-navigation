/*
 * Copyright (c) 2023.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import type { Timeago } from './component';

declare module '@vue/runtime-core' {
    export interface GlobalComponents {
        Timeago: typeof Timeago;
    }
}
