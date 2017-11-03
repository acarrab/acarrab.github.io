import React from 'react';
import { withRouter } from 'react-router-dom';

interface History {
    location: string
}
interface ScrollToTopProps {
    history?: History;
}

class ScrollToTop extends React.Component<ScrollToTopProps> {
    componentDidUpdate(prevProps) {
    
      if (this.props.history !== undefined && this.props.history.location !== prevProps.location) {
        window.scrollTo(0, 0)
      }
    }
  
    render() {
      return (<div>{this.props.children}</div>)
    }
  }
  
  export default withRouter(ScrollToTop)