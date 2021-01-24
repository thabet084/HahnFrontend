import 'bootstrap';

import {I18N, TCustomAttribute} from 'aurelia-i18n'; // <------------ 1
import Backend from 'i18next-xhr-backend'; // <------------ 2


export function configure(aurelia) {
	aurelia.use.instance('apiRoot', 'https://localhost:44355/');
	aurelia.use.globalResources('common/dateFormat');
	aurelia.use.standardConfiguration().developmentLogging()
	.plugin('aurelia-dialog')
	.plugin('aurelia-validation')
	.plugin('aurelia-i18n', (instance) => {
        let aliases = ['t', 'i18n'];
        // add aliases for 't' attribute
        TCustomAttribute.configureAliases(aliases);
  
          // register backend plugin
		  instance.i18next.use(Backend);
		  
        // adapt options to your needs (see http://i18next.com/docs/options/)
        // make sure to return the promise of the setup method, in order to guarantee proper loading
        return instance.setup({
          backend: {                                  // <-- configure backend settings
            loadPath: './src/locales/{{lng}}/translation.json', // <-- XHR settings for where to get the files from
          },
          attributes: aliases,
          lng : 'en',
          fallbackLng : 'en',
          debug : false,
		  
		});
		
	  
      });

	aurelia.start().then(a=>a.setRoot("shell"));
	
}