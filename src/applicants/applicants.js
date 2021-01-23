import {inject} from 'aurelia-framework';
import {DataRepository} from 'services/dataRepository';

@inject(DataRepository)
export class Applicants {
	constructor(dataRepository) {
		this.dataRepository = dataRepository;
	}

	activate(params, routeConfig, navigationInstruction) {
		console.log('this.dataRepository='+this.dataRepository);
		this.applicants = [];
		this.router = navigationInstruction.router;
		return this.dataRepository.getApplicants().then( applicants => {
			console.log('applicants',applicants);
			this.applicants = applicants; 
		});
		
	}

	addApplicant() {
		this.router.navigateToRoute("addApplicant");
	}

}

	// canActivate(params, routeConfig, navigationInstruction) {
	// 	var promise = new Promise((resolve, reject) => {
	// 		setTimeout(_ => {
	// 			resolve(false);
	// 		},3000);
	// 	});
	// 	return promise;
	// }
