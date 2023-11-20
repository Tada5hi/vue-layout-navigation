/*
 * Copyright (c) 2022-2022.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import { readFileSync } from 'node:fs';

import { createConfig } from '../../rollup.config.mjs';

export default {
    ...createConfig({
        pkg: JSON.parse(readFileSync(new URL('./package.json', import.meta.url), {encoding: 'utf-8'})),
        vuePlugin: true
    }),
    input: 'src/index.ts'
};