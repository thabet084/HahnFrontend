import {inject} from 'aurelia-framework';
import {DataRepository} from 'services/dataRepository';
import {ValidationRules, ValidationController, validateTrigger} from 'aurelia-validation';
import {BootstrapFormRenderer} from 'common/bootstrap-form-renderer';

@inject(DataRepository, ValidationController)
export class AddApplicant {
	

	constructor(dataRepository, controller) {
        this.dataRepository = dataRepository;
		
console.log('testtttt',dataRepository);
        this.controller = controller;
        console.log('1');
        this.controller.validateTrigger = validateTrigger.change;
        console.log('2');
		this.controller.addRenderer(new BootstrapFormRenderer());
        console.log('3');

		// ValidationRules
		// .ensure(j => j.title)
		// .required()
		// .minLength(3)
	
        // .on(this.applicant);

        // ValidationRules
		// .ensure(j => j.name)
		// .required()
		// .minLength(3)
	
        // .on(this.applicant);
        
        console.log('testtttt end');

    }
    
activate(params, routeConfig, navigationInstruction) {
    this.router = navigationInstruction.router;
}

save() {
    if (this.controller.errors && this.controller.errors.length > 0) return;
    console.log("Applicant=",this.applicant);
    console.log("dataRepository=",this.dataRepository);
   
    this.dataRepository.addApplicant(this.applicant).then(applicant=> this.router.navigateToRoute('applicants'));
}
}