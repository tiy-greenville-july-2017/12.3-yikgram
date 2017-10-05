/**
 * Parse API setup utility
 */
import User from '../models/User';
var Model = require('backbone-model').Model;
var Collection = require('backbone-collection').Collection;


var parse = {
  _serverURL: '',
  _appId: '',
  _restApiKey: '',

  initialize: function(config){
    config = config || {};
    this._serverURL = config.serverURL;
    this._appId = config.appId;
    this._restApiKey = config.restApiKey;
  },

  getServerURL: function(){
    return this._serverURL;
  },

  getHeaders: async function(config){
    config = config || {};

    let currentUser = await User.current();
    let defaults = {
      sessionId: currentUser ? currentUser.get('sessionToken') : null
    };

    let settings = Object.assign({}, defaults, config);

    headers = {
      "X-Parse-Application-Id": this._appId,
      "X-Parse-REST-API-Key": this._restApiKey
    };

    if(settings.sessionId){
      headers["X-Parse-Session-Token"] = settings.sessionId;
    }

    return headers;
  }
};

var ParseModel = Model.extend({
  idAttribute: 'objectId',
  sync: function(){
    parse.initialize();
    var xhr = Backbone.Model.prototype.sync.apply(this, arguments);
    parse.deinitialize();

    return xhr;
  },
  save: function(key, val, options){
    delete this.attributes.createdAt;
    delete this.attributes.updatedAt;

    return Backbone.Model.prototype.save.apply(this, arguments);
  },
  setPointer: function(field, parseClass, objectId){
    var pointerObject = {
      "__type": "Pointer",
      "className": parseClass,
      "objectId": objectId
    };

    this.set(field, pointerObject);

    return this;
  }
});


var ParseCollection = Collection.extend({
  whereClause: {},
  parseWhere: function(field, value, objectId){
    // If an objectId is passed in then we are building a pointer where
    if(objectId){
      value = {
        className: value,
        objectId: objectId,
        '__type': 'Pointer'
      };
    }

    // Check if the field has a search option set
    if(field.indexOf('$') !== -1){
      var search = field.split('$');
      field = search[0];
      var comparison = '$' + search[1];

      var clause = {};
      clause[comparison] = value;
      value = clause;
    }

    this.whereClause[field] = value;

    return this;
  },
  url: function(){
    var url = this.baseUrl;

    if(Object.keys(this.whereClause).length > 0){
      url += '?where=' + JSON.stringify(this.whereClause);
      this.whereClause = {};
    }

    return url;
  },
  parse: function(data){
    return data.results;
  },
  sync: function(){
    parse.initialize();
    var xhr = Backbone.Collection.prototype.sync.apply(this, arguments);
    parse.deinitialize();

    return xhr;
  },
});

export {parse as default, ParseModel, ParseCollection};
