import * as React from 'react';
import * as ReactDOM from 'react-dom';
import '@svgdotjs/svg.draggable.js';

import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';

import AddIcon from '@material-ui/icons/Add';

import Workspace from './components/Workspace';

import "./main.scss";

class App extends React.Component {
    render() {
        return (
            <Paper>
                <AppBar
                    position="static"
                    style={{
                        borderTopLeftRadius: 4,
                        borderTopRightRadius: 4,
                        display: "flex"
                    }}
                >
                    <Toolbar>
                        <IconButton color="inherit">
                            <AddIcon/>
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <div
                    style={{
                        padding: 30
                    }}
                >
                    <Workspace 
                        joints={[]}
                    />
                </div>
            </Paper>
        );
    } 
}

ReactDOM.render(<App />, document.getElementById("app"));