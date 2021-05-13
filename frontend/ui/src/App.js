import logo from './logo.svg';
import './App.css';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import TeamListPage from './list.jsx';
import TeamDetailPage from './detail.jsx';

function App() {
  return (
    <Switch>
      <Route exact path="/team/:teamMemberId/" component={TeamDetailPage} />
      <Route exact path="/team/" component={TeamListPage} />
      <Route path="/" component={TeamListPage} />
    </Switch>
  );
}

export default withRouter(App);
