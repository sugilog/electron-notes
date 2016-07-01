import React from "react";
import List from "material-ui/List";
import ListItem from "material-ui/List/ListItem";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import helper from "../script/helper";

export class EntryInfo extends React.Component {
  humanizedSize() {
    return helper.humanizedSize( this.props.size );
  }

  entryUrl() {
    switch( this.props.type ) {
    case "directory":
      return "#!/open-directory?path=" + this.props.path;
    case "file":
      return "#!/open-file?path=" + this.props.path;
    default:
      return "#!"
    }
  }

  primaryText() {
    return this.props.name;
  }

  secondaryText() {
    return (
      <div>
        <div>{this.props.updatedAt}</div>
        <div>{this.props.type === "file" ? this.humanizedSize() : ""}</div>
      </div>
    )
  }

  render() {
    return (
      <ListItem
        primaryText={this.primaryText()}
        secondaryText={this.secondaryText()}
        secondaryTextLines={2}
        onTouchTap={
          function() {
            helper.hashChange( this );
          }
        }
        data-hash={this.entryUrl()}
      />
    )
  }
}
EntryInfo.defaultProps = {
  type: "file",
  name: "",
  path: ".",
  size: 0,
  updatedAt: new Date().toLocaleString()
}

export class EntryList extends React.Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <List>
          {
            this.props.entries.map( (entry) => {
              return <EntryInfo key={entry.ino} type={entry.type} size={entry.size} name={entry.name} path={entry.path} />
            })
          }
        </List>
      </MuiThemeProvider>
    )
  }
}
