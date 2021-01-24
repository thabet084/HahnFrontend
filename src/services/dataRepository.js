
import moment from 'moment';
import {BindingSignaler} from 'aurelia-templating-resources';
import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-http-client';
import {HttpClient as HttpFetch, json} from 'aurelia-fetch-client';

function filterAndFormat(pastOrFuture, events) {
	var results = JSON.parse(JSON.stringify(events));
	if (pastOrFuture == 'past') {
		results = results.filter(item => moment(item.dateTime) < moment());
	}
	else if (pastOrFuture == 'future') {
		results = results.filter(item => moment(item.dateTime) > moment());
	}
	else {
		results = results;
	}

	// results.forEach(item => {
	// 	var dateTime = moment(item.dateTime)
	// 		.format("MM/DD/YYYY HH:mm");
	// 		item.dateTime = dateTime;
	// });

	return results;
}

@inject(BindingSignaler,HttpClient,'apiRoot', HttpFetch)
export class DataRepository {
constructor(bindingSignaler, httpClient, apiRoot, httpFetch) {
	this.apiRoot = apiRoot;
		this.httpClient = httpClient;
		this.httpFetch = httpFetch;
	setInterval(()=> { bindingSignaler.signal('check-freshness'); },1000);
}

addApplicant(applicant) {
	console.log('inside addApplicant');
	var promise = new Promise((resolve, reject) => {
		this.httpFetch.fetch(this.apiRoot +'Applicant/Add',{
			method: 'POST',
			body: json(applicant)
		}).then(response => response.json())
		.then(data => {
			this.applicants.push(data);
			resolve(data);
		}).catch(err=>reject(err));
	});
	return promise;
}

getApplicants() {
	var promise = new Promise((resolve, reject) => {
		if (!this.applicants) {
			this.httpFetch.fetch(this.apiRoot + 'Applicant/GetAll')
			.then(response => response.json())
			.then( data => {
				this.applicants = data;
				resolve(this.applicants);
			}).catch(err => reject(err));
		}
		else
			resolve(this.applicants);
	});
	return promise;
}


}