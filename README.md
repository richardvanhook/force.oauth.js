JS Library for apps wishing to authenticate with force.com using OAuth 2.0 User-Agent flow.

[Run Unit Tests](https://force-oauth-js.herokuapp.com/test.html)

### Usage

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

### Configuration Properties

* **`clientId` (required)**

  Values must be generated via salesforce.com at Setup > App Setup > Develop > Remote Access. Only one remote access application is needed for production, sandbox, or pre-release; separate entries are not necessary for My Domain.

* **`authorized` (required)**

  Function to be called once user is authorized.

* **`popup`**  (optional)

  Do OAuth handshake in popup window.

  *Default:* true

* **`unauthorized`**  (optional)

  Function to be called if authorization shouldn't happen immediately.  For example, if you'd like wait until the user clicks a button before authorizing:

  Example:
  ```html
    unauthorized: function(){
      var signInButton = $('<button></button>').html('Authenticate');
      signInButton.click(function(){force.oauth.authorize();});
      $('#mydiv').append(signInButton);
    }
  ```

  *Default:* undefined

* **`cacheTokenInSessionStorage`**  (optional)

  Enabling this will persist the OAuth token in HTML5 sessionStorage.  **Please, please only enable this if you're positive your app has zero XSS/CSRF risks.**  The benefit, of course, is DOM reloads won't re-initiate OAuth hand-shake.

  *Default:* false

* **`scope`**  (optional)

  See [Scope Parameter Values](https://login.salesforce.com/help/doc/en/remoteaccess_oauth_scopes.htm)

  *Default:* 'id'
  
* **`loginUrl`**  (optional)

  If you're testing against a sandbox, change this to https://test.salesforce.com

  *Default:* 'https://login.salesforce.com'

* **`callbackPath`**  (optional)

  If you'd like one path in your app to handle all callbacks, set this to that path.  Prevents the need for multiple clientIds for a single app.

  *Default:* undefined

* **`error`**  (optional)

  Function to receive callback errors if they occur; otherwise, errors will simply be thrown.

  *Default:* undefined


### Scenarios

<table>
  <tr>
    <th>Scenario</th>
    <th>Popup or Same window?</th>
    <th>Cache Token in sessionStorage</th>
    <th>Fire on page load or user action</th>
  </tr>
  <tr>
    <td>A</td>
    <td>Popup</td>
    <td>Yes</td>
    <td>page load</td>
  </tr>
  <tr>
    <td>B</td>
    <td>Popup</td>
    <td>Yes</td>
    <td>user action</td>
  </tr>
</table>

The following screenshots diagram the scenarios enabled by this JS library.

![ScreenShot](https://raw.github.com/richardvanhook/force.oauth.js/master/scenarios/a.png)
![ScreenShot](https://raw.github.com/richardvanhook/force.oauth.js/master/scenarios/b.png)
![ScreenShot](https://raw.github.com/richardvanhook/force.oauth.js/master/scenarios/c.png)
![ScreenShot](https://raw.github.com/richardvanhook/force.oauth.js/master/scenarios/d.png)
![ScreenShot](https://raw.github.com/richardvanhook/force.oauth.js/master/scenarios/e.png)
![ScreenShot](https://raw.github.com/richardvanhook/force.oauth.js/master/scenarios/f.png)


