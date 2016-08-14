/**
 * @providesModule components/NavigationBarPostTitle
 */

import React, { PropTypes, Component } from 'react';
import Relay from 'react-relay';

import NavigationBarTitle from 'components/NavigationBarTitle';

class NavigationBarPostTitle extends Component {
  static propTypes = {
    post: PropTypes.object.isRequired
  }

  render() {
    let { post } = this.props;

    return (
      <NavigationBarTitle>{post.title}</NavigationBarTitle>
    );
  }
}

export default Relay.createContainer(NavigationBarPostTitle, {
  fragments: {
    post: () => Relay.QL`
      fragment on Post {
        title
      }
    `
  }
});
