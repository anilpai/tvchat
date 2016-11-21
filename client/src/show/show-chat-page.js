import React, {
  Component,
} from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import ChatRoom from '../chat-room/chat-room';
import Error404 from '../error/error-404';

class ShowChatPage extends Component {
  render() {
    const { data } = this.props;
    if (data.loading) {
      return <div>Loading</div>;
    }
    if (data.loading === false && data.shows && data.shows.length === 0) {
      return <Error404 />;
    }

    const show = data.shows[0];

    return (
      <div className="container">
        <h1 style={{ textAlign: 'center' }}>{show.name}</h1>
        <ChatRoom showId={show.id} />
      </div>
    );
  }
}

export default graphql(gql`
  query getShow($slug: String!) {
    shows(slug: $slug) {
      id
      name
      slug
      dateCreated
    }
  }
`, {
  options: (ownProps) => ({
    variables: { slug: ownProps.params.showSlug },
  }),
})(ShowChatPage);
