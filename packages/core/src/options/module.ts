import { StoreName } from '../store';
import { injectStoreManager } from '../store-manager';
import { hasOwnProperty } from '../utils';
import type {
    OptionBuildContext,
} from './type';
import {
    isOptionInputConfig,
    isOptionInputConfigWithDefaults,
    isOptionInputConfigWithPresets,
    mergeOption,
} from './utils';

function buildOption<
    O extends Record<string, any>,
    K extends keyof O,
>(context: OptionBuildContext<K, O[K]>) : O[K] | undefined {
    let value : O[K] | undefined;

    const presetConfig : Record<string, boolean> = {};

    if (isOptionInputConfigWithPresets(context.value)) {
        const keys = Object.keys(context.value.presets);
        for (let i = 0; i < keys.length; i++) {
            presetConfig[keys[i]] = context.value.presets[keys[i]];
        }

        if (typeof context.value.value !== 'undefined') {
            value = context.value.value;
        }
    }

    if (!isOptionInputConfig(context.value)) {
        value = context.value;
    }

    const storeManager = injectStoreManager();

    if (typeof value === 'undefined') {
        if (!isOptionInputConfigWithDefaults(context.value) || context.value.defaults) {
            const store = storeManager.use(StoreName.DEFAULT);
            if (store.hasOption(context.component, context.key as string)) {
                value = store.getOption(context.component, context.key as string);
            }
        }
    }

    const keys = storeManager.keys();
    for (let i = 0; i < keys.length; i++) {
        if (keys[i] === StoreName.DEFAULT) {
            continue;
        }

        if (
            hasOwnProperty(presetConfig, keys[i]) &&
            !presetConfig[keys[i]]
        ) {
            continue;
        }

        const presetStore = storeManager.use(keys[i]);
        if (presetStore.hasOption(context.component, context.key as string)) {
            value = mergeOption(
                context.key as string,
                value,
                presetStore.getOption(context.component, context.key as string),
            );
        }
    }

    if (typeof value === 'undefined') {
        return context.alt;
    }

    return value;
}

function buildOptionOrFail<
    O extends Record<string, any>,
    K extends keyof O = keyof O,
    >(context: OptionBuildContext<K, O[K]>) : O[K] {
    const target = buildOption(context);

    if (
        typeof target === 'undefined' &&
        !hasOwnProperty(context, 'alt')
    ) {
        throw new Error(`A value for option ${context.key as string} of component ${context.component} is required.`);
    }

    return target as O[K];
}

export function createOptionBuilder<O extends Record<string, any>>(
    component: string,
) {
    const build = <K extends keyof O>(
        context: Omit<OptionBuildContext<K, O[K]>, 'component'>,
    ) : O[K] | undefined => buildOption({
            ...context,
            component,
        });

    const buildOrFail = <K extends keyof O>(
        context: Omit<OptionBuildContext<K, O[K]>, 'component'>,
    ) : O[K] => buildOptionOrFail({
            ...context,
            component,
        });

    return {
        build,
        buildOrFail,
    };
}
