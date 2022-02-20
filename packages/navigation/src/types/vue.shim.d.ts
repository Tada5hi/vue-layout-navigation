/*
 * Copyright (c) 2021.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import Router, { Route } from 'vue-router';

declare module '*.vue' {
    import Vue from 'vue';

    export default Vue;
}

declare module 'vue/types/vue' {
    // Global properties can be declared
    // on the `VueConstructor` interface
    interface VueConstructor {
        $router: Router
        $route: Route
    }

    interface Vue {
        $router: Router
        $route: Route
    }
}
