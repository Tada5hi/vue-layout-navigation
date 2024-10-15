import type {
    NavigationItem,
} from '@vuecs/navigation';
import {
    defineNavigationProvider,
} from '@vuecs/navigation';

const primaryItems : NavigationItem[] = [
    {
        id: 'default', name: 'Home', icon: 'fa fa-home', default: true,
    },
    {
        id: 'admin', name: 'Admin', icon: 'fas fa-cog', activeMatch: '/admin/',
    },
];

const secondaryDefaultItems : NavigationItem[] = [
    {
        name: 'Home', type: 'link', icon: 'fas fa-home', url: '/', root: true,
    },
    {
        name: 'Countdown', type: 'link', icon: 'fa-solid fa-clock', url: '/countdown',
    },
    {
        name: 'Form Controls',
        type: 'link',
        icon: 'fa-solid fa-bars',
        children: [
            { name: 'Input Checkbox', url: '/form-controls/input-checkbox' },
            { name: 'Input Text', url: '/form-controls/input-text' },
            { name: 'Range Multi Slider', url: '/form-controls/range-multi-slider' },
            { name: 'Select', url: '/form-controls/select' },
            { name: 'Select Search', url: '/form-controls/select-search' },
            { name: 'Submit', url: '/form-controls/submit' },
            { name: 'Textarea', url: '/form-controls/textarea' },
        ],
    },
    {
        name: 'List Controls',
        type: 'link',
        icon: 'fa-solid fa-bars',
        children: [
            { name: 'default', url: '/list-controls/list' },
            { name: 'Slot', url: '/list-controls/list-slot' },
        ],
    },
    {
        name: 'Pagination', type: 'link', icon: 'fa-solid fa-road', url: '/pagination',
    },
    {
        name: 'Timeago', type: 'link', icon: 'fa-solid fa-clock', url: '/timeago',
    },
];

const secondaryAdminItems : NavigationItem[] = [
    {
        name: 'Auth',
        children: [
            {
                name: 'Realms', type: 'link', url: '/admin/realms', icon: 'fas fa-university',
            },
        ],
    },

];

export const navigationProvider = defineNavigationProvider({
    async getItems(tier: number, itemsActive: NavigationItem[]) {
        if (tier > 1) {
            return undefined;
        }

        let items : NavigationItem[] = [];

        switch (tier) {
            case 0:
                items = primaryItems;
                break;
            case 1: {
                const parentActive = itemsActive.filter((item) => item.tier === 0);
                let component : NavigationItem;
                if (parentActive.length > 0) {
                    [component] = parentActive;
                } else {
                    component = { id: 'default' };
                }

                switch (component.id) {
                    case 'default':
                        items = secondaryDefaultItems;
                        break;
                    case 'admin':
                        items = secondaryAdminItems;
                        break;
                }

                break;
            }
        }

        return items;
    },
});
