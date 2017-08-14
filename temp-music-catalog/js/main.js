(function() {
	function getCompaniesFromAPI() {
		let apiURL = `https://developer.nrel.gov/api/energy-innovations/v1/marketingSummaries/search/technologyCategory?categoryName=Solar%20Photovoltaic&api_key=eK3lLfihVPMN0FVCdM4WkJtkCWmvk7lP57g63x7V`;
		let xhr = new XMLHttpRequest();
		xhr.onload = () => {
			//handle response
			if (xhr.status === 200) {
				let data = JSON.parse(xhr.response);
				//console.log(data);
				let company;
				let marketingSummaries = data._embedded.marketingSummaries;
				for (company of marketingSummaries) {
					insertCompanyOnPage(company);
				}
				saveDataToDB(marketingSummaries);
			}
		};
		xhr.open('GET', apiURL);
		xhr.send();
	}

	function saveDataToDB(company) {
		if ('indexedDB' in window) {
			let db;
			let request = window.indexedDB.open('solar', 1);

			request.onerror = event => {
				alert(`Database error! ${event.target.errorCode}`);
			};

			request.onsucces = event => {
				db = event.target.result;
				console.log('db opened');
			};

			request.onupgradeneeded = event => {
				let db = event.target.result;
				let objectStore = db.createObjectStore('summaries', { autoIncrement: true });
			};
		}
	}

	function insertCompanyOnPage(company) {
		let companyContainer = document.createElement('div');
		companyContainer.classList.add('company-information');
		let companyHTML = `
        <div class="panel panel-default">
				  <div class="panel-heading">
				    <h2 class="panel-title">${company.title}</h2>
				  </div>
				  <div class="panel-body">
				    <div class="company-summary">
               ${company.summary}
				    </div>
				    <div class="company-applications">
 								<h4>Applications</h4>
 								${company.applications}
				    </div>
				    <div class="company-benefits">
 								<h4>Benefits</h4>
 								${company.benefits}
				    </div>
				  </div>
				</div>
		`;
		companyContainer.innerHTML = companyHTML;
		companyListArea.appendChild(companyContainer);
	}

	function databaseExists(name, callback) {
		let dbExists = true;
		let request = window.indexedDB.open(name);
		request.onupgradeneeded = () => {
			if (request.result.version === 1) {
				dbExists = false;
				window.indexedDB.deleteDatabase(name);
				if (callback) {
					callback(dbExists);
				}
			}
		};
		request.onsuccess = () => {
			if (dbExists) {
				if (callback) {
					callback(dbExists);
				}
			}
		};
	}

	function getCompaniesFromIndexedDB() {
		if ('indexedDB' in window) {
			let openRequest = window.indexedDB.open('solar', 1);
			//console.log(openRequest);
			openRequest.onsuccess = function(event) {
				// work with the db
				let db = event.target.result;

				let transaction = db.transaction('solar', 'readonly'),
					objectStore = transaction.objectStore('summaries'),
					getRequest = objectStore.get(1);

				getRequest.onsuccess = () => {
					console.log('success', event.target.result);
				};
				//console.log('db Opened!');
			};
		}
		return false;
	}

	//HTML Element Variables

	let getCompaniesBtn = document.getElementById('getCompanies');
	let dbBtn = document.getElementById('getDB');
	let companyListArea = document.querySelector('.solar-companies__listing .container');

	//Event Listensers

	dbBtn.addEventListener('click', () => {
		getCompaniesFromIndexedDB();
	});

	getCompaniesBtn.addEventListener('click', () => {
		//get companies when button is clicked
		//check if database exists
		// databaseExists('solar', dbexists => {
		// 	if (dbexists) {
		// 		getCompaniesFromIndexedDB();
		// 		return true;
		// 	}
		// 	getCompaniesFromAPI();
		// 	return false;
		// });
		getCompaniesFromAPI();
	});
})();
