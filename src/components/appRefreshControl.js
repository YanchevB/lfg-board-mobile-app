import { RefreshControl } from 'react-native';

import { colors } from '../theme';

// A function, not a component: ScrollView needs a real RefreshControl element in its refreshControl prop
export function appRefreshControl(isRefreshing, onRefresh) {
    return (
        <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            tintColor={colors.accent}
            colors={[colors.accent]}
            progressBackgroundColor={colors.surface}
        />
    );
}
