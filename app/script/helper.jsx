let helper = {};

helper.hashChange = ( self ) => {
  location.hash = self[ "data-hash" ];
  return false;
}

export default helper;
