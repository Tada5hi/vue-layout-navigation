import type {
    OptionsInputValue,
    OptionsOverride,
    PartialPick,
} from '@vuecs/core';
import type { VNodeChild } from 'vue';
import type {
    ExpectListBaseOptions, ListBaseOptions, ListBaseOptionsInput, ListBaseSlotProps,
} from '../list-base';

export type ListNoMoreSlotProps<T, M = any> = ListBaseSlotProps<T, M>;

type Fn<T, M = any> = (props: ListNoMoreSlotProps<T, M>) => VNodeChild;

export type ListNoMoreBuildOptions<T, M = any> = ListBaseOptions<T, M> & {
    content?: VNodeChild | Fn<T, M>
};

export type ListNoMoreBuildOptionsInput<T, M = any> = ListBaseOptionsInput<T, M> &
OptionsOverride<
ExpectListBaseOptions<ListNoMoreBuildOptions<T, M>>,
OptionsInputValue<Pick<ListNoMoreBuildOptions<T, M>, 'content'>
>>;
