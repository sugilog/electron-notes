import React from "react";
import List from "material-ui/List";
import ListItem from "material-ui/List/ListItem";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import helper from "../script/helper";

import FolderAsset from "material-ui/svg-icons/file/folder";
import DescriptionAsset from "material-ui/svg-icons/action/description";
import ErrorAsset from "material-ui/svg-icons/alert/error";

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

  itemIcon() {
    switch( this.props.type ) {
    case "directory":
      return <FolderAsset />
    case "file":
      return <DescriptionAsset />
    default:
      return <ErrorAsset />
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
        leftIcon={this.itemIcon()}
        primaryText={this.primaryText()}
        secondaryText={this.secondaryText()}
        secondaryTextLines={2}
        onTouchTap={
          function( e ) {
            helper.hashChange( e.currentTarget );
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
      <MuiThemeProvider>
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
