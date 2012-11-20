describe('force.oauth.js', function() {

  beforeEach(function() {
  
    //authorization hash responses
    successHash = 
      '#access_token=00Dx0000000BV7z%21AR8AQBM8J_xr9kLqmZIRyQxZgLcM4' + 
      'HVi41aGtW0qW3JCzf5xdTGGGSoVim8FfJkZEqxbjaFbberKGk8v8AnYrvChG' + 
      '4qJbQo8&refresh_token=5Aep8614iLM.Dq661ePDmPEgaAW9Oh_L3JKkDp' + 
      'B4xReb54_pZfVti1dPEk8aimw4Hr9ne7VXXVSIQ%3D%3D&expires_in=720' + 
      '0&state=mystate';
    successAuthResponse = {
      access_token : '00Dx0000000BV7z!AR8AQBM8J_xr9kLqmZIRyQxZgLcM4' + 
        'HVi41aGtW0qW3JCzf5xdTGGGSoVim8FfJkZEqxbjaFbberKGk8v8AnYrvChG' + 
        '4qJbQo8', 
      refresh_token : '5Aep8614iLM.Dq661ePDmPEgaAW9Oh_L3JKkDpB4xReb' + 
        '54_pZfVti1dPEk8aimw4Hr9ne7VXXVSIQ==', 
      expires_in: '7200',
      state: 'mystate'      
    }
    errorHash = '#error=access_denied&state=mystate';
    errorAuthResponse = {error: 'access_denied',state: 'mystate'};
    emptyResponseHash = '#foo=bar&abc=123';

  });

  describe('Unit Tests', function(){

    describe('ready()', function(){

      describe('throws error when', function(){

        it('config is undefined', function() {
          expect(force.oauth.ready).toThrow('No config!');
        });

        it('config.clientId is undefined', function() {
          expect(function(){force.oauth.ready({});}).toThrow('No clientId property in config!');
        });

        it('config.authorized is undefined', function() {
          expect(function(){
            force.oauth.ready({
              clientId: 'abc'
            });
          }).toThrow('No authorized property in config!');
        });

        it('config.authorized is not a function', function() {
          expect(function(){
            force.oauth.ready({
              clientId: 'abc',
              authorized: 'abc'
            });
          }).toThrow('authorized config property must be a function!');
        });

        it('config.unauthorized is not a function', function() {
          expect(function(){
            force.oauth.ready({
              clientId: 'abc',
              authorized: function(){},
              unauthorized: 'abc'
            });
          }).toThrow('unauthorized config property must be a function!');
        });
        
        it('config.popup is false and config.cacheTokenInSessionStorage is false', function() {
          expect(function(){
            force.oauth.ready({
              clientId: 'abc',
              authorized: function(){},
              cacheTokenInSessionStorage: false,
              popup: false
            });
          }).toThrow('popup must be enabled if cacheTokenInSessionStorage is enabled');
        });

      });

    });

    describe('external functions defined', function(){
      it('force', function() {
        expect(force).toBeDefined();
      });

      it('force.oauth', function() {
        expect(force.oauth).toBeDefined();
      });

      it('ready', function() {
        expect(force.oauth.ready).toBeDefined();
      });
  
      it('hasAuthorizationResponse', function() {
        expect(force.oauth.hasAuthorizationResponse).toBeDefined();
      });
  
    });
  
    describe('hasAuthorizationResponse() unit tests', function(){

      it('hasAuthorizationResponse(successHash)', function() {
        expect(force.oauth.hasAuthorizationResponse(successHash)).toEqual(true);
      });

      it('hasAuthorizationResponse(successHash w/o pound)', function() {
        expect(force.oauth.hasAuthorizationResponse(successHash.substr(1))).toEqual(true);
      });

      it('hasAuthorizationResponse(errorHash)', function() {
        expect(force.oauth.hasAuthorizationResponse(errorHash)).toEqual(true);
      });

      it('hasAuthorizationResponse(errorHash w/o pound)', function() {
        expect(force.oauth.hasAuthorizationResponse(errorHash.substr(1))).toEqual(true);
      });

      it('!hasAuthorizationResponse(emptyResponseHash)', function() {
        expect(force.oauth.hasAuthorizationResponse(emptyResponseHash)).toEqual(false);
      });

      it('!hasAuthorizationResponse(undefined)', function() {
        expect(force.oauth.hasAuthorizationResponse(undefined)).toEqual(false);
      });

      it('!hasAuthorizationResponse(null)', function() {
        expect(force.oauth.hasAuthorizationResponse(null)).toEqual(false);
      });

      it('!hasAuthorizationResponse("")', function() {
        expect(force.oauth.hasAuthorizationResponse('')).toEqual(false);
      });

      it('!hasAuthorizationResponse("x")', function() {
        expect(force.oauth.hasAuthorizationResponse('x')).toEqual(false);
      });

      it('!hasAuthorizationResponse("#")', function() {
        expect(force.oauth.hasAuthorizationResponse('#')).toEqual(false);
      });

      it('!hasAuthorizationResponse("#x")', function() {
        expect(force.oauth.hasAuthorizationResponse('#x')).toEqual(false);
      });

    });
  
    describe('parseAuthorizationResponse() unit tests', function(){

      it('parseAuthorizationResponse(successHash)', function() {
        expect(force.oauth.parseAuthorizationResponse(successHash)).not.toEqual(undefined);
      });

      it('parseAuthorizationResponse(successHash w/o pound)', function() {
        expect(force.oauth.parseAuthorizationResponse(successHash.substr(1))).not.toEqual(undefined);
      });

      it('parseAuthorizationResponse(errorHash)', function() {
        expect(force.oauth.parseAuthorizationResponse(errorHash)).not.toEqual(undefined);
      });

      it('parseAuthorizationResponse(errorHash w/o pound)', function() {
        expect(force.oauth.parseAuthorizationResponse(errorHash.substr(1))).not.toEqual(undefined);
      });

      it('!parseAuthorizationResponse(emptyResponseHash)', function() {
        expect(force.oauth.parseAuthorizationResponse(emptyResponseHash)).toEqual(undefined);
      });

      it('!parseAuthorizationResponse(undefined)', function() {
        expect(force.oauth.parseAuthorizationResponse(undefined)).toEqual(undefined);
      });

      it('!parseAuthorizationResponse(null)', function() {
        expect(force.oauth.parseAuthorizationResponse(null)).toEqual(undefined);
      });

      it('!parseAuthorizationResponse("")', function() {
        expect(force.oauth.parseAuthorizationResponse('')).toEqual(undefined);
      });

      it('!parseAuthorizationResponse("x")', function() {
        expect(force.oauth.parseAuthorizationResponse('x')).toEqual(undefined);
      });

      it('!parseAuthorizationResponse("#")', function() {
        expect(force.oauth.parseAuthorizationResponse('#')).toEqual(undefined);
      });

      it('!parseAuthorizationResponse("#x")', function() {
        expect(force.oauth.parseAuthorizationResponse('#x')).toEqual(undefined);
      });

    });
  
  });

  describe('Scenarios', function(){

    beforeEach(function() {
      
      //expected url values
      expectedClientId = '3MVG9lKcPoNINVBKV6EgVJiF.snSDwh6_2wSS7BrOhHGEJkC_';
      expectedCallbackHref = 'http://localhost/foo/bar';
      expectedAuthorizeUrlParams = {
        response_type: 'token',
        display:       'page',
        scope:         'id',
        client_id:     expectedClientId,
        redirect_uri:  expectedCallbackHref,
        state:         expectedCallbackHref
      }
      expectedAuthorizeUrl = 'https://login.salesforce.com/services/oauth2/authorize?'
        + _.reduce(_.keys(expectedAuthorizeUrlParams), function(memo, key, index){ 
          return memo + (index > 0 ? '&' : '') + key + '=' + escape(expectedAuthorizeUrlParams[key]); }, ''
        );
      
      //mock popup object
      popup = {
        focus: function(){},
        close: function(){},
        location: {hash: successHash}
      };

      //jasmine spies
      spyOn(window, 'open' ).andCallFake(function(){ return popup; });
      spyOn(popup, 'focus');
      spyOn(popup, 'close');
      spyOn(force.oauth, 'setWindowLocationHref');
      spyOn(force.oauth, 'getWindowLocationHref').andCallFake(function(){ return expectedCallbackHref; });
      spyOn(force.oauth, 'replaceWindowLocation');
      spyOn(force.oauth, 'getRedirectUrl').andCallFake(function(){ return expectedCallbackHref; });
      authorized = jasmine.createSpy('authorized');
      unauthorized = jasmine.createSpy('unauthorized');
      error = jasmine.createSpy('error');

      //base config, beforeEach inside each scenario describe should elaborate
      config = {
        clientId: expectedClientId,
        authorized: authorized
      };

      //make sure session token is empty
      force.oauth.clearSessionToken();
    });

    describe('A: Popup window, without sessionStorage, fire on page load', function(){

      beforeEach(function() {
        config.cacheTokenInSessionStorage = false;
        config.popup = true;
        force.oauth.ready(config);
        force.oauth._callback(popup);
      });

      describe('page load', function(){

        it('window.open should have been called', function() {
          expect(window.open).toHaveBeenCalled();
        });

        it('popup url should be', function() {
          expect(window.open.mostRecentCall.args[0]).not.toBeUndefined();
        });

        it('popup.focus should have been called', function() {
          expect(popup.focus).toHaveBeenCalled();
        });

        it('authorized should have been called', function() {
          expect(authorized).toHaveBeenCalled();
        });

        it('authorized should have received token', function() {
          expect(authorized.mostRecentCall.args[0]).toEqual(successAuthResponse);
        });

        it('popup.close should have been called', function() {
          expect(popup.close).toHaveBeenCalled();
        });

        it('token should not have been saved in sessionStorage', function() {
          expect(force.oauth.getSessionToken()).toBeUndefined();
        });

        it('setWindowLocationHref should NOT have been called', function() {
          expect(force.oauth.setWindowLocationHref).not.toHaveBeenCalled();
        });

      });

    });
  
    describe('B: Popup window, without sessionStorage, fire on user action', function(){
    
      beforeEach(function() {
        config.cacheTokenInSessionStorage = false;
        config.popup = true;
        config.unauthorized = unauthorized;
        force.oauth.ready(config);
      });

      describe('page load', function(){

        it('window.open should NOT have been called', function() {
          expect(window.open).not.toHaveBeenCalled();
        });

        it('popup.focus should NOT have been called', function() {
          expect(popup.focus).not.toHaveBeenCalled();
        });

        it('authorized should NOT have been called', function() {
          expect(authorized).not.toHaveBeenCalled();
        });

        it('unauthorized should have been called', function() {
          expect(unauthorized).toHaveBeenCalled();
        });
      
        it('setWindowLocationHref should NOT have been called', function() {
          expect(force.oauth.setWindowLocationHref).not.toHaveBeenCalled();
        });

      });

      describe('user action', function(){
        
        beforeEach(function() {
          force.oauth.authorize();
          force.oauth._callback(popup);
        });

        it('window.open should have been called', function() {
          expect(window.open).toHaveBeenCalled();
        });

        it('popup url should be', function() {
          expect(window.open.mostRecentCall.args[0]).not.toBeUndefined();
        });

        it('popup.focus should have been called', function() {
          expect(popup.focus).toHaveBeenCalled();
        });

        it('authorized should have been called', function() {
          expect(authorized).toHaveBeenCalled();
        });

        it('authorized should have received token', function() {
          expect(authorized.mostRecentCall.args[0]).toEqual(successAuthResponse);
        });

        it('popup.close should have been called', function() {
          expect(popup.close).toHaveBeenCalled();
        });

        it('token should not have been saved in sessionStorage', function() {
          expect(force.oauth.getSessionToken()).toBeUndefined();
        });

      });

    });
  
    describe('C: Popup window, with sessionStorage, fire on page load', function(){
      
      beforeEach(function() {
        config.cacheTokenInSessionStorage = true;
      });

      describe('page load', function(){
        
        beforeEach(function() {
          force.oauth.clearSessionToken();
          force.oauth.ready(config);
          force.oauth._callback(popup);
        });

        it('window.open should have been called', function() {
          expect(window.open).toHaveBeenCalled();
        });

        it('popup url should be', function() {
          expect(window.open.mostRecentCall.args[0]).not.toBeUndefined();
        });

        it('popup.focus should have been called', function() {
          expect(popup.focus).toHaveBeenCalled();
        });

        it('authorized should have been called', function() {
          expect(authorized).toHaveBeenCalled();
        });

        it('authorized should have received token', function() {
          expect(authorized.mostRecentCall.args[0]).toEqual(successAuthResponse);
        });

        it('popup.close should have been called', function() {
          expect(popup.close).toHaveBeenCalled();
        });

        it('token should have been saved in sessionStorage', function() {
          expect(force.oauth.getSessionToken()).toEqual(successAuthResponse);
        });

        it('setWindowLocationHref should NOT have been called', function() {
          expect(force.oauth.setWindowLocationHref).not.toHaveBeenCalled();
        });

      });

      describe('subsequent load', function(){

        beforeEach(function() {
          force.oauth.setSessionToken(successAuthResponse);
          force.oauth.ready(config);
        });

        it('window.open should NOT have been called', function() {
          expect(window.open).not.toHaveBeenCalled();
        });

        it('authorized should have been called', function() {
          expect(authorized).toHaveBeenCalled();
        });

        it('authorized should have received token', function() {
          expect(authorized.mostRecentCall.args[0]).toEqual(successAuthResponse);
        });

      });
    
    });
  
    describe('D: Popup window, with sessionStorage, fire on user action', function(){
    
      beforeEach(function() {
        config.cacheTokenInSessionStorage = true;
        config.unauthorized = unauthorized;
        force.oauth.clearSessionToken();
        force.oauth.ready(config);
      });

      describe('page load', function(){
        
        it('window.open should NOT have been called', function() {
          expect(window.open).not.toHaveBeenCalled();
        });

        it('popup.focus should NOT have been called', function() {
          expect(popup.focus).not.toHaveBeenCalled();
        });

        it('authorized should NOT have been called', function() {
          expect(authorized).not.toHaveBeenCalled();
        });

        it('unauthorized should have been called', function() {
          expect(unauthorized).toHaveBeenCalled();
        });

        it('setWindowLocationHref should NOT have been called', function() {
          expect(force.oauth.setWindowLocationHref).not.toHaveBeenCalled();
        });

      });

      describe('user action', function(){
        
        beforeEach(function() {
          force.oauth.authorize();
          force.oauth._callback(popup);
        });

        it('window.open should have been called', function() {
          expect(window.open).toHaveBeenCalled();
        });

        it('popup url should be', function() {
          expect(window.open.mostRecentCall.args[0]).not.toBeUndefined();
        });

        it('popup.focus should have been called', function() {
          expect(popup.focus).toHaveBeenCalled();
        });

        it('authorized should have been called', function() {
          expect(authorized).toHaveBeenCalled();
        });

        it('authorized should have received token', function() {
          expect(authorized.mostRecentCall.args[0]).toEqual(successAuthResponse);
        });

        it('popup.close should have been called', function() {
          expect(popup.close).toHaveBeenCalled();
        });

        it('token should have been saved in sessionStorage', function() {
          expect(force.oauth.getSessionToken()).toEqual(successAuthResponse);
        });

      });

      describe('subsequent load', function(){

        beforeEach(function() {
          force.oauth.setSessionToken(successAuthResponse);
          force.oauth.ready(config);
        });

        it('window.open should NOT have been called', function() {
          expect(window.open).not.toHaveBeenCalled();
        });

        it('authorized should have been called', function() {
          expect(authorized).toHaveBeenCalled();
        });

        it('authorized should have received token', function() {
          expect(authorized.mostRecentCall.args[0]).toEqual(successAuthResponse);
        });

      });
    
    
    });
  
    describe('E: Same window, with sessionStorage, fire on page load', function(){

      beforeEach(function() {
        config.popup = false;
        config.cacheTokenInSessionStorage = true;
        force.oauth.ready(config);
      });

      describe('page load', function(){
        
        it('setWindowLocationHref should have been called', function() {
          expect(force.oauth.setWindowLocationHref).toHaveBeenCalled();
        });

        it('setWindowLocationHref url should be', function() {
          expect(force.oauth.setWindowLocationHref.mostRecentCall.args[0]).toEqual(expectedAuthorizeUrl);
        });

        it('window.open should NOT have been called', function() {
          expect(window.open).not.toHaveBeenCalled();
        });

        it('popup.focus should NOT have been called', function() {
          expect(popup.focus).not.toHaveBeenCalled();
        });

        it('authorized should NOT have been called', function() {
          expect(authorized).not.toHaveBeenCalled();
        });

      }); 
         
      describe('callback', function(){
        
        beforeEach(function() {
          spyOn(force.oauth, 'getWindowLocationHash').andReturn(successHash);
          force.oauth.ready(config);
        });

        it('replaceWindowLocation should have been called', function() {
          expect(force.oauth.replaceWindowLocation).toHaveBeenCalled();
        });

        it('token should have been saved in sessionStorage', function() {
          expect(force.oauth.getSessionToken()).toEqual(successAuthResponse);
        });

        it('authorized should NOT have been called', function() {
          expect(authorized).not.toHaveBeenCalled();
        });

        describe('re-load', function(){

          beforeEach(function() {
            force.oauth.getWindowLocationHash.andReturn(undefined);
            force.oauth.ready(config);
          });

          it('authorized should have been called', function() {
            expect(authorized).toHaveBeenCalled();
          });

          it('authorized should have received token', function() {
            expect(authorized.mostRecentCall.args[0]).toEqual(successAuthResponse);
          });

        }); 

      }); 
         
    });
  
    describe('F: Same window, with sessionStorage, fire on user action', function(){
    
      beforeEach(function() {
        config.popup = false;
        config.cacheTokenInSessionStorage = true;
        config.unauthorized = unauthorized;
        force.oauth.ready(config);
      });

      describe('page load', function(){
        
        it('window.open should NOT have been called', function() {
          expect(window.open).not.toHaveBeenCalled();
        });

        it('authorized should NOT have been called', function() {
          expect(authorized).not.toHaveBeenCalled();
        });

        it('unauthorized should have been called', function() {
          expect(unauthorized).toHaveBeenCalled();
        });

        it('setWindowLocationHref should NOT have been called', function() {
          expect(force.oauth.setWindowLocationHref).not.toHaveBeenCalled();
        });

      });

      describe('user action', function(){
        
        beforeEach(function() {
          force.oauth.authorize();
        });

        it('setWindowLocationHref should have been called', function() {
          expect(force.oauth.setWindowLocationHref).toHaveBeenCalled();
        });

        it('setWindowLocationHref url should be', function() {
          expect(force.oauth.setWindowLocationHref.mostRecentCall.args[0]).toEqual(expectedAuthorizeUrl);
        });

        it('window.open should NOT have been called', function() {
          expect(window.open).not.toHaveBeenCalled();
        });

        it('authorized should NOT have been called', function() {
          expect(authorized).not.toHaveBeenCalled();
        });

        describe('normal callback', function(){

          beforeEach(function() {
            spyOn(force.oauth, 'getWindowLocationHash').andReturn(successHash);
            force.oauth.ready(config);
          });

          it('replaceWindowLocation should have been called', function() {
            expect(force.oauth.replaceWindowLocation).toHaveBeenCalled();
          });

          it('token should have been saved in sessionStorage', function() {
            expect(force.oauth.getSessionToken()).toEqual(successAuthResponse);
          });

          it('authorized should NOT have been called', function() {
            expect(authorized).not.toHaveBeenCalled();
          });

          describe('re-load', function(){

            beforeEach(function() {
              force.oauth.getWindowLocationHash.andReturn(undefined);
              force.oauth.ready(config);
            });

            it('authorized should have been called', function() {
              expect(authorized).toHaveBeenCalled();
            });

            it('authorized should have received token', function() {
              expect(authorized.mostRecentCall.args[0]).toEqual(successAuthResponse);
            });

          }); 

        });

        describe('error callback', function(){

          beforeEach(function() {
            spyOn(force.oauth, 'getWindowLocationHash').andReturn(errorHash);
          });

          it('without handler should throw error', function() {
            expect(function(){force.oauth.ready(config);}).toThrow(errorAuthResponse);
          });

          describe('with handler', function(){

            beforeEach(function() {
              config.error = error;
              force.oauth.ready(config);
            });

            it('should call handler', function() {
              expect(error).toHaveBeenCalled();
            });

            it('should call handler with error response', function() {
              expect(error.mostRecentCall.args[0]).toEqual(errorAuthResponse);
            });

          });

        });

      });

    });

  });

});