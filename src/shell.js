import toastr from 'toastr';
import moment from 'moment';

export class Shell {
	constructor() {
		setInterval(()=>this.timeIs = moment().format("hh:mm:ss.SSS"),100);
	}
	configureRouter(config, router) {
		this.router = router;
		config.title = "Hahn app";
		config.addPipelineStep('authorize', ToastNavResult);
		//config.options.pushState = true;
		config.map([
				
					{ route: 'applicants', name: 'applicants', viewPorts: { mainContent: {moduleId: 'applicants/applicants'}, 
					},  
					title: 'applicants', nav: true },
					
				{ route: 'addApplicant', name: 'addApplicant', viewPorts: 
					{ mainContent: {moduleId: 'applicants/addApplicant'}}}
	
		]);
	}
}

	class ToastNavResult {
	  run(navigationInstruction, next) {
	    return next().then(a=>  { if (a.status != "completed") { toastr.info(a.status); } return a; });
	  }
	}
