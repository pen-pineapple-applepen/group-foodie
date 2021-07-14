import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

function RouterContainer() {
  return (
    <Router>
    <Navbar />
    <div className="RouterContainer">
      <Switch>
        <Route exact path="/posts/:postId" component={SinglePostPage} />
        <Route exact path="/editPost/:postId" component={EditPostForm} />
        <Redirect to="/" />
      </Switch>
    </div>
  </Router>
  )
}


export default RouterContainer;