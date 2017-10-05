import { AsyncStorage } from 'react-native';

import parse, {ParseModel} from '../lib/parse';

// Configure network requests for Parse Server
parse.initialize({
  'serverURL': 'https://dietz-server.herokuapp.com',
  'appId': 'dietz',
  'restApiKey': 'kepler'
});

var User = ParseModel.extend({
  urlRoot: 'https://dietz-server.herokuapp.com/users'
}, {
  login: async function(creds){
    let qs = Object.keys(creds).map(k => k + '=' + encodeURIComponent(creds[k])).join('&');
    let url = 'https://dietz-server.herokuapp.com/login?' + qs;
    let headers = await parse.getHeaders();

    try {
      let response = await fetch(url, {headers: headers});
      let responseJson = await response.json();

      var newUser = new User(responseJson);
      await User.store(newUser);

      return newUser;
    } catch(error) {
      console.error(error);
    }
  },
  logout: function(callback){
    var url = 'https://dietz-server.herokuapp.com/logout';

    parse.initialize();

    $.post(url).then(data => {
      localStorage.removeItem('user');
      callback();
    });

    parse.deinitialize();
  },
  signup: function(creds, callback){
    var newUser = new User(creds);
    return newUser.save().then(() => {
      User.store(newUser);
      callback(newUser);
    });
    // return newUser;
  },
  store: async function(user){
    await AsyncStorage.setItem('user', JSON.stringify(user.toJSON()));
  },
  current: async function(){
    var user = await AsyncStorage.getItem('user');

    // if no user in local storage, bail
    if(!user){
      return false;
    }

    var currentUser = new User(JSON.parse(user));

    // If we don't have a token, bail
    if(!currentUser.get('sessionToken')){
      return false;
    }

    return currentUser;
  }
});

export default User;
