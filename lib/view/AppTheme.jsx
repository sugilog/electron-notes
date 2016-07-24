import getMuiTheme from "material-ui/styles/getMuiTheme";
import {
  white,
  grey400, blueGrey300, blueGrey500

} from 'material-ui/styles/colors';


const appTheme = getMuiTheme({
  floatingActionButton: {
    color: white,
    iconColor: blueGrey500,
    secondaryColor: white,
    secondaryIconColor: blueGrey300,
    disabledTextColor: grey400,
    disabledColor: white,
  },
});

export default appTheme
