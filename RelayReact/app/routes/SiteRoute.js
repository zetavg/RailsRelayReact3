/**
 * @providesModule routes/SiteRoute
 */

import Relay, { Route } from 'react-relay';

export default class SiteRoute extends Route {
  static queries = {
    site: () => Relay.QL`query { site }`
  };

  static routeName = 'SiteRoute';
}
