import React from 'react';
import ReactDOM from 'react-dom';
import SignIn from './SignIn';
import Nav from './Nav';
import PlayLists from './PlayLists';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import Upload from "./Upload";
import PlaylistsDetails from "./PlaylistsDetails";
import SignUp from "./SignUp";
import { CookiesProvider } from 'react-cookie';
import Logout from "./Logout";

ReactDOM.render(
    <CookiesProvider>
        <BrowserRouter>
            <div>
                <Route component={Nav} />
                <Switch>
                    <Route exact path="/" component={SignIn} />
                    <Route path="/signUp" component={SignUp}/>
                    <Route path="/playlist/upload" component={Upload}/>
                    <Route path="/playlists" component={PlayLists} />
                    <Route path="/playlist/details" component={PlaylistsDetails} />
                    <Route path="/logout" component={Logout} />
                </Switch>
            </div>
        </BrowserRouter>
    </CookiesProvider>,
    document.getElementById('root')
);

serviceWorker.unregister();
