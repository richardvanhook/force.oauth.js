JS Library for apps wishing to authenticate with force.com using OAuth 2.0 User-Agent flow.

[Run Unit Tests](https://force-oauth-js.herokuapp.com/test.html)

Usage
------------------------------

```html
<script src='jquery.js' type='text/javascript'></script>
<script src='force.oauth.js' type='text/javascript'></script>
<script type='text/javascript'>
  $(function(){
    var config = {
      //required
      clientId: 'replace_me_with_value_from_force_com_remote_access_screen',
      authorized: function(token){
        //do something with token!
      }
      //optional (default values shown)
      scope:                      'id',
      loginUrl:                   'https://login.salesforce.com',
      popup:                      true,
      cacheTokenInSessionStorage: false,
      callbackPath:               undefined,
      unauthorized:               undefined,
      error:                      undefined
    };
    force.oauth.ready(config); 
  });
</script>
```

Configuration Properties
------------------------------

* **`:clientId`**

  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

* **`:authorized`**

  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.


Scenarios
------------------------------

![ScreenShot](https://raw.github.com/richardvanhook/force.oauth.js/master/scenarios/a.png)
![ScreenShot](https://raw.github.com/richardvanhook/force.oauth.js/master/scenarios/b.png)
![ScreenShot](https://raw.github.com/richardvanhook/force.oauth.js/master/scenarios/c.png)
![ScreenShot](https://raw.github.com/richardvanhook/force.oauth.js/master/scenarios/d.png)
![ScreenShot](https://raw.github.com/richardvanhook/force.oauth.js/master/scenarios/e.png)
![ScreenShot](https://raw.github.com/richardvanhook/force.oauth.js/master/scenarios/f.png)


