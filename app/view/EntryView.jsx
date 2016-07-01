import React from "react";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import fs from "fs";

export class TextView extends React.Component {
  content() {
    const content = fs.readFileSync( this.props.path, "utf8" );
    return <pre>{content}</pre>;
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div className="entryContent textview">
          {this.content()}
        </div>
      </MuiThemeProvider>
    )
  }
}

export class ImageView extends React.Component {
  content() {
    return <img src={this.props.path} />
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div className="entryContent imageview">
          {this.content()}
        </div>
      </MuiThemeProvider>
    )
  }
}
