import React from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import RaisedButton from "material-ui/RaisedButton";

const buttonStyle = {
  margin: 12,
};

export const App = () => (
  <MuiThemeProvider>
    <div>
      <MySideLayout />
      <MyMainLayout />
    </div>
  </MuiThemeProvider>
);

export const MySideLayout = () => (
  <section className="side">
    <MyHeaderLayout />
    <MyEntryListLayout />
  </section>
);

export const MyHeaderLayout = () => (
  <section className="header">
    <RaisedButton label="OPEN" style={buttonStyle}/>
    <RaisedButton label="PARENT" style={buttonStyle}/>
  </section>
);

export const MyEntryListLayout = () => (
  <section className="entrylist" />
);

export const MyMainLayout = () => (
  <section className="main" />
);
