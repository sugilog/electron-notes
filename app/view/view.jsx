import React from "react";

export class FileInfo extends React.Component {
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

  render() {
    return (
      <div>
        <div>
          <span>
            {this.props.type}
          </span>
        </div>
        <div>
          <strong>
            {this.props.name}
            ({this.humanizedSize()})
            <small>
              {this.props.path}
            </small>
          </strong>
        </div>
        <div>
          <span>
            {this.props.updatedAt}
          </span>
        </div>
      </div>
    )
  }
}
FileInfo.defaultProps = {
  type: "file",
  name: "",
  size: 0,
  path: ".",
  updatedAt: new Date().toLocaleString()
}

export class FileList extends React.Component {
  render() {
    return (
      <section class="files">
        {
          this.props.entries.map( (entry) => {
            return <FileInfo key={entry.ino} type={entry.type} size={entry.size} name={entry.name} />
          })
        }
      </section>
    )
  }
}
