import type {
    OptionsInputValue,
    OptionsOverride, PartialPick,
    VNodeClass,
    VNodeProperties,
} from '@vuecs/core';
import type { MaybeRef, Slots } from 'vue';

export type FormBaseOptions = {
    slotItems: Slots,

    class: VNodeClass,
    props: VNodeProperties,

    value?: MaybeRef<unknown>,

    onChange?: (input: any) => void
};

export type FormBaseOptionsInput = OptionsOverride<
FormBaseOptions,
OptionsInputValue<PartialPick<FormBaseOptions, 'class' | 'props'>> &
PartialPick<FormBaseOptions, 'slotItems'>
>;

export type ExpectFormBaseOptions<T> = Omit<T, keyof FormBaseOptions>;

export type FormBaseOptionsDefaults = {
    [K in keyof FormBaseOptions]?: FormBaseOptions[K]
};
