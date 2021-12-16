import './App.css';
import { Route, Switch, withRouter } from 'react-router-dom';
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
