import {eventsData} from 'services/eventsData';
import {jobsData, states, jobTypes, jobSkills} from 'services/jobsData';
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

	getEvents(pastOrFuture) {
		var promise = new Promise((resolve, reject) => {
			if (!this.events) {
				setTimeout(() => {
					this.events = eventsData.sort((a,b) =>
					 a.dateTime >= b.dateTime ? 1 : -1);
					resolve(filterAndFormat(pastOrFuture, this.events));					
				},10);
			}
			else {
				resolve(filterAndFormat(pastOrFuture, this.events));
			}
		});
		return promise;
	}

	getEvent(eventId) {
		return this.events.find(item => item.id == eventId);
	}

	addJob(job) {
		console.log('inside add job');
		var promise = new Promise((resolve, reject) => {
			this.jobs.push(job);
			resolve(job);
		});
		return promise;
	}

	getJobs() {
		console.log("inside get jobs")
		var promise = new Promise((resolve, reject) => {
			if (!this.jobs) {
				this.jobs = jobsData;
			}
			resolve(this.jobs);
		});
		return promise;
	}

	getStates() {
		var promise = new Promise((resolve, reject) => {
			if (!this.states) {
				this.states = states;
			}
			resolve(this.states);
		});
		return promise;
	}

	getJobTypes() {
		var promise = new Promise((resolve, reject) => {
			if (!this.jobTypes) {
				this.jobTypes = jobTypes;
			}
			resolve(this.jobTypes);
		});
		return promise;
	}
	
	getJobSkills() {
		var promise = new Promise((resolve, reject) => {
			if (!this.jobSkills) {
				this.jobSkills = jobSkills;
			}
			resolve(this.jobSkills);
		});
		return promise;
	}

}