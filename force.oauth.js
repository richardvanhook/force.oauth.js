(function(){

  window.force = window.force || {}
  
  force.oauth = force.oauth || {
    
    defaults: {
      scope:                      'id',
      loginUrl:                   'https://login.salesforce.com',
      callbackPath:               undefined,
      popup:                      true,
      cacheTokenInSessionStorage: false,
      unauthorized:               undefined,
      error:                      undefined
    },

    configure: function(config){
      for(var prop in this.defaults) this[prop] = this.defaults[prop];
      for(var prop in config       ) this[prop] = config[prop];
    },
    
    ready: function(config){
      if(!config) 
        throw 'No config!';
      if(!config.clientId) 
        throw 'No clientId property in config!';
      if(!config.authorized) 
        throw 'No authorized property in config!';
      if(!(typeof config.authorized === 'function')) 
        throw 'authorized config property must be a function!';
      if(config.unauthorized && !(typeof config.unauthorized === 'function')) 
        throw 'unauthorized config property must be a function!';
      if(!config.popup && !config.cacheTokenInSessionStorage)
        throw 'popup must be enabled if cacheTokenInSessionStorage is enabled';
      
      this.configure(config);

           if(this.hasAuthorizationResponse()) this.callback();
      else if(this.hasSessionToken()         ) this.authorized(this.getSessionToken());
      else if(this.unauthorized              ) this.unauthorized();
      else                                     this.authorize();
    },
    
    authorize: function(){
      if(this.popup) this.openPopup(this.getAuthorizeUrl('popup'));            
      else           this.setWindowLocationHref( this.getAuthorizeUrl('page' ));
    },

    callback: function(config){
      if(config) this.configure(config);
      if(opener) opener.force.oauth._callback(window);
      else       this._callback();
    },
    
    _callback: function(popup){
      authorizationResponse = this.parseAuthorizationResponse((popup ? popup.location.hash : this.getWindowLocationHash()));
      if(authorizationResponse.error){
        if(this.error) this.error(authorizationResponse);
        else           throw authorizationResponse;
      } 
      this.setSessionToken(authorizationResponse);
      if(popup){
        popup.close();
        this.authorized(authorizationResponse);
      } else {
        this.replaceWindowLocation(authorizationResponse.state);
      }
    },
    
    clearSessionToken: function(token){
      sessionStorage.setItem('token',undefined);
    },
    
    setSessionToken: function(token){
      if(this.cacheTokenInSessionStorage)
        sessionStorage.setItem('token',JSON.stringify(token));
    },
    
    getSessionToken: function(){
      var token = undefined;
      try{ token = JSON.parse(sessionStorage.getItem('token')); }catch(err){}
      return token;
    },
    
    hasSessionToken: function(){
      return this.getSessionToken() && this.getSessionToken() != null;
    },
    
    parseAuthorizationResponse: function(hashFragment){
      var authorizationResponse = {};
      if(hashFragment) {
		    if(hashFragment[0] === '#') hashFragment = hashFragment.substr(1);
				var nvps = hashFragment.split('&');
				for (var nvp in nvps) {
			    var parts = nvps[nvp].split('=');
					authorizationResponse[parts[0]] = unescape(parts[1]);
				}
      }
      if(!authorizationResponse.access_token && !authorizationResponse.error) 
        authorizationResponse = undefined;
      return authorizationResponse;
    },
    
    hasAuthorizationResponse: function(hashFragment){
      if(!hashFragment) hashFragment = this.getWindowLocationHash();
      if(hashFragment) {
		    if(hashFragment[0] === '#') hashFragment = hashFragment.substr(1);
				var nvps = hashFragment.split('&');
				for (var nvp in nvps) {
			    var part = nvps[nvp].split('=');
			    if(part) part = part[0];
			    if(part && (part === 'access_token' || part === 'error')) return true;
				}
      }
      return false;
    },
    
    getAuthorizeUrl: function(display){
      var returnValue = this.loginUrl + 
        '/services/oauth2/authorize?response_type=token' + 
        '&display=' + escape(display) + 
        '&scope=' + escape(this.scope) +
        '&client_id=' + escape(this.clientId) + 
        '&redirect_uri=' + escape(this.getRedirectUrl()) + 
        '&state=' + escape(this.getWindowLocationHref());
      return returnValue;
    },

    openPopup: function(url){
      window.open(url, 'Connect', 'height=524,width=675,toolbar=0,scrollbars=0' 
        + ',status=0,resizable=0,location=0,menuBar=0,left=' 
        + window.screenX + (((window.outerWidth/2) - (675/2)))
        + ',top=' 
        + window.screenY + (((window.outerHeight/2) - (524/2)))
      ).focus();
    },
    
    getRedirectUrl: function(){
      return window.location.protocol + '//' + window.location.host + 
        (this.callbackPath ? this.callbackPath : window.location.pathname);
    },
    
    getCurrentUrl: function(){
      return window.location.protocol + '//' + window.location.host + window.location.pathname;
    },
    setWindowLocationHref: function(url){ window.location.href = url  ;},
    getWindowLocationHref: function(   ){ return window.location.href ;},
    replaceWindowLocation: function(url){ window.location.replace(url);},
    getWindowLocationHash: function(   ){ return window.location.hash ;}
    
  }
  
})();