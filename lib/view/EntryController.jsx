import {shell} from "electron";

import React from "react";
import AppTheme from "./AppTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ModeEditAsset from "material-ui/svg-icons/editor/mode-edit";
import FolderOpenAsset from "material-ui/svg-icons/file/folder-open";
import RefreshAsset from "material-ui/svg-icons/navigation/refresh";
import helper from "../script/helper";

const buttonStyle = {
        marginRight: 24,
        opacity: 0.7
      };

export class MarkdownController extends React.Component {
  entryUrl() {
    return "#!/open-file?path=" + this.props.path;
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={AppTheme}>
        <div className="entryConntroller">
          <FloatingActionButton
            style={buttonStyle}
            onTouchTap={
              function() {
                shell.openItem( this[ "data-path" ] );
              }
            }
            data-path={this.props.path}
          >
            <ModeEditAsset />
          </FloatingActionButton>

          <FloatingActionButton
            style={buttonStyle}
            onTouchTap={
              function() {
                shell.showItemInFolder( this[ "data-path" ] );
              }
            }
            data-path={this.props.path}
          >
            <FolderOpenAsset />
          </FloatingActionButton>

          <FloatingActionButton
            style={buttonStyle}
            onTouchTap={
              function( e ) {
                helper.hashChange( e.currentTarget );
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

export class ProgramSourceController extends React.Component {
  entryUrl() {
    return "#!/open-file?path=" + this.props.path;
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={AppTheme}>
        <div className="entryConntroller">
          <FloatingActionButton
            style={buttonStyle}
            onTouchTap={
              function() {
                shell.openItem( this[ "data-path" ] );
              }
            }
            data-path={this.props.path}
          >
            <ModeEditAsset />
          </FloatingActionButton>

          <FloatingActionButton
            style={buttonStyle}
            onTouchTap={
              function() {
                shell.showItemInFolder( this[ "data-path" ] );
              }
            }
            data-path={this.props.path}
          >
            <FolderOpenAsset />
          </FloatingActionButton>

          <FloatingActionButton
            style={buttonStyle}
            onTouchTap={
              function( e ) {
                helper.hashChange( e.currentTarget );
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
