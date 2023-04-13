/*
 * Copyright (c) 2022.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import type {
    OptionsInput,
} from '@vue-layout/core';
import type { ExpectFormBaseOptions, FormBaseOptions, FormBaseOptionsInput } from '../form-base';

export type FormTextareaBuildOptions = FormBaseOptions;

export type FormTextareaBuildOptionsInput = FormBaseOptionsInput &
OptionsInput<ExpectFormBaseOptions<FormTextareaBuildOptions>>;