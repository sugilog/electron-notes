import React from "react";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import fs from "fs";

export class TextView extends React.Component {
  content() {
    return fs.readFileSync( this.props.path, "utf8" );
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div className="entryContent textview">
          <pre>{this.content()}</pre>
        </div>
      </MuiThemeProvider>
    )
  }
}
