import {shell} from "electron";

import React from "react";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ModeEditAsset from "material-ui/svg-icons/editor/mode-edit";
import RefreshAsset from "material-ui/svg-icons/navigation/refresh";
import helper from "../script/helper";

const buttonStyle = {
        marginRight: 24
      };

export class MarkdownController extends React.Component {
  entryUrl() {
    return "#!/open-file?path=" + this.props.path;
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div className="entryConntroller">
          <FloatingActionButton
            style={buttonStyle}
            onTouchTap={
              function() {
                shell.openExternal( "file://" + this[ "data-path" ] );
              }
            }
            data-path={this.props.path}
          >
            <ModeEditAsset />
          </FloatingActionButton>

          <FloatingActionButton
            secondary={true}
            style={buttonStyle}
            onTouchTap={
              function() {
                helper.hashChange( this );
              }
            }
            data-hash={this.entryUrl()}
          >
            <RefreshAsset />
          </FloatingActionButton>
        </div>
      </MuiThemeProvider>
    )
  }
}

export class ImageController extends React.Component {
  render() {
    return <div />
  }
}
