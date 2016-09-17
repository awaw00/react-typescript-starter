import HomeContainer from 'containers/HomeContainer';
import welcome from './Welcome';
import counter from './Counter';

export default {
  path: '/',
  component: HomeContainer,
  indexRoute: {
    component: welcome.component
  },
  childRoutes: [
    welcome,
    counter
  ]
};
