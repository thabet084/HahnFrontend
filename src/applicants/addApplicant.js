import {inject} from 'aurelia-framework';
import {DataRepository} from 'services/dataRepository';
import {ValidationRules, ValidationController, validateTrigger} from 'aurelia-validation';
import {BootstrapFormRenderer} from 'common/bootstrap-form-renderer';
import {DialogService} from 'aurelia-dialog';
import {Prompt} from 'components/modal/my-modal';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(DataRepository, ValidationController,DialogService)
export class AddApplicant {
	
    static inject = [DialogService,EventAggregator];
	constructor(dataRepository, controller,dialogService,eventAggregator) {
        this.dataRepository = dataRepository;
        this.dialogService = dialogService;
        this.eventAggregator = eventAggregator;
		
console.log('testtttt',dataRepository);
        this.controller = controller;
        console.log('1');
        this.controller.validateTrigger = validateTrigger.change;
        console.log('2');
		this.controller.addRenderer(new BootstrapFormRenderer());
        console.log('3');

		

        // ValidationRules
		// .ensure('name')
		// .required()
		// .minLength(5)	
        // .on(this.applicant);

        // ValidationRules
		// .ensure('familyName')
		// .required()
		// .minLength(5)	
        // .on(this.applicant);

          // ValidationRules
		// .ensure('address')
		// .required()
		// .minLength(10)	
        // .on(this.applicant);

        // ValidationRules
        // .ensure('emailAddress')
        //   .email()
        //   .required();

         // ValidationRules
        // .ensure('age')
        //.required()
        //.satisfiesRule('integerRange', 20, 60);
    
  

        // ValidationRules.customRule(
        //     'integerRange',
        //     (value, obj, min, max) => value === null || value === undefined
        //       || Number.isInteger(value) && value >= min && value <= max,
        //     `\${$displayName} must be an integer between \${$config.min} and \${$config.max}.`,
        //     (min, max) => ({ min, max })
        //   );
      
    
        
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

reset() {
    console.log('Inside reset');
    this.dialogService.open( {viewModel: Prompt, model: 'Are you sure to reset data?' }).whenClosed().then(response => {
       console.log(response);
          
       if (!response.wasCancelled) {
          console.log('OK');
          return;
       } else {
          console.log('cancelled');
       }
       console.log(response.output);
    });
 
}

get canReset(){
console.log(this.Applicantt);
    return this.Applicant.Name;
    //console.log('canReset');
    //var x= this.applicant.Name ;
    //console.log(this.AddApplicant);
    //console.log(x);
   // return true;
 } 

}