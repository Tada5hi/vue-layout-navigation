// https://v3.nuxtjs.org/api/configuration/nuxt.config

import { defineNuxtConfig } from 'nuxt/config';
import path from 'path';

export default defineNuxtConfig({
    css: [
        '@fortawesome/fontawesome-free/css/all.css',
        'bootstrap/dist/css/bootstrap.css',
        '@myAssets/css/basic.css',
        '@myAssets/css/root.css',
        '@myAssets/css/core/header.css',
        '@myAssets/css/core/navbar.css',
        '@myAssets/css/core/body.css',
        '@myAssets/css/core/sidebar.css',
        '@myAssets/css/core/footer.css',
        '@myAssets/css/domain.css',
        '@myAssets/css/root.css',
        '@myAssets/css/form.css',
        '@myAssets/css/generics.css',
        '@myAssets/css/bootstrap-override.css',
    ],
    alias: {
        '@myAssets': path.join(__dirname, '..', '..', 'assets'),
        '@vue-layout/basic': path.join(__dirname, '..', '..', 'packages', 'basic', 'src'),
        '@vue-layout/core': path.join(__dirname, '..', '..', 'packages', 'core', 'src'),
        '@vue-layout/hyperscript': path.join(__dirname, '..', '..', 'packages', 'hyperscript', 'src'),
    },
    modules: [
        '@pinia/nuxt',
    ],
});