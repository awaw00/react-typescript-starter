import welcome from './Welcome';
import counter from './Counter';
import HomeContainer from 'containers/HomeContainer';

export default {
  path: '/',
  component: HomeContainer,
  indexRoute: {
    component: welcome.component
  },
  childRoutes: [
    counter,
    welcome
  ]
};
