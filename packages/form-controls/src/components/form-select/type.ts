import type {
    OptionsInputValue, OptionsOverride, PartialPick,
} from '@vuecs/core';
import type { ExpectFormBaseOptions, FormBaseOptions, FormBaseOptionsInput } from '../form-base';

export type FormSelectOption = {
    id: string | number,
    value: any
};
export type FormSelectBuildOptions = FormBaseOptions & {
    options: FormSelectOption[],
    optionDefault: boolean,
    optionDefaultId: string | number,
    optionDefaultValue: string
};

export type FormSelectBuildOptionsInput =
    FormBaseOptionsInput
    & OptionsOverride<
    ExpectFormBaseOptions<FormSelectBuildOptions>,
    OptionsInputValue<PartialPick<FormSelectBuildOptions, 'optionDefault' | 'optionDefaultId' | 'optionDefaultValue'>>
    >;
