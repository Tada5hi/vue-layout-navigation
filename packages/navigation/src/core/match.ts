import type { NavigationItemNormalized } from '../type';

type ParentMatch = {
    score: number
};

type ItemMatchesFindOptions = {
    url?: string
};

function findItemMatchesByScoreIF(
    items: NavigationItemNormalized[],
    options: ItemMatchesFindOptions,
    parent: ParentMatch,
) {
    const output : {
        data: NavigationItemNormalized,
        score: number
    }[] = [];

    for (let i = 0; i < items.length; i++) {
        const item = items[i];

        let { score } = parent;

        if (options.url) {
            if (item.activeMatch) {
                if (item.activeMatch === options.url) {
                    score += 3;
                } else if (options.url.startsWith(item.activeMatch)) {
                    score += 2;
                }
            }

            if (item.url && item.url !== '/') {
                if (item.url === options.url) {
                    score += 3;
                } else if (options.url.startsWith(item.url)) {
                    score += 2;
                }
            }
        }

        if (item.default) {
            score += 1;
        }

        if (item.children) {
            const childMatches = findItemMatchesByScoreIF(item.children, options, {
                score,
            });

            output.push(...childMatches);
        }

        output.push({ data: item, score });
    }

    return output.sort((a, b) => b.score - a.score);
}

export function findBestItemMatches(
    items: NavigationItemNormalized[],
    options: ItemMatchesFindOptions = {},
) : NavigationItemNormalized[] {
    const result = findItemMatchesByScoreIF(items, options, { score: 0 });
    const [first] = result;
    if (!first) {
        return [];
    }

    return result.filter((match) => match.score === first.score).map((match) => match.data);
}
