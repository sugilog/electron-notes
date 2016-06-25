import React from "react";
import List from "material-ui/List";
import ListItem from "material-ui/List/ListItem";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

export class EntryInfo extends React.Component {
  humanizedSize() {
    const units = [
      "B",
      "KB",
      "MB",
      "GB"
    ]

    function precision( size, digit ) {
      let nums = size.toString().split( "." ),
          before = nums[ 0 ],
          after  = ( nums[ 1 ] || "" );
      after = after.split( "" ).splice( 0, digit ).join( "" );

      if ( after.length < digit ) {
        after = after + ( "0" * ( digit - after.length ) );
      }

      return before + "." + after;
    }

    function convert( size, index ) {
      index = typeof index === "undefined" ? 0 : index;
      let hsize = size / 1024

      if ( hsize < 1 ) {
        return precision( size, 3 ) + units[ index ];
      }
      else if ( typeof units[ index + 1 ] === "undefined" ) {
        return precision( size, 3 ) + units[ index ]
      }
      else {
        return convert( hsize, ++index );
      }
    }

    return convert( this.props.size );
  }

  entryUrl() {
    switch( this.props.type ) {
    case "directory":
      return "#!/open-directory?path=" + this.props.path;
    case "file":
      return "#!"
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
          function( event ) {
            location.hash= this[ "data-hash" ];
            return false;
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
