import {inject} from 'aurelia-framework';
import {DataRepository} from 'services/dataRepository';

@inject(DataRepository)
export class Jobs {
	constructor(dataRepository) {
		this.dataRepository = dataRepository;
	}

	activate(params, routeConfig, navigationInstruction) {
		this.jobs = [];
		this.router = navigationInstruction.router;

		console.log('this.dataRepository='+this.dataRepository);
		return this.dataRepository.getJobs().then( jobs => {
			this.jobs = jobs; 
		});
	}

	addJob() {
		this.router.navigateToRoute("addJob");
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
