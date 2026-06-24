import * as React from 'react';

import DynamicStackNavigator from './src/navigator/stack/DynamicStackNavigator';
import StaticStackNavigator from './src/navigator/stack/StaticStackNavigator';

export default function App() {
  // return <StaticStackNavigator />;
  return <DynamicStackNavigator />;
}