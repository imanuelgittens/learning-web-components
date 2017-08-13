(function() {
	function getCompaniesFromAPI() {
		let apiURL = `https://developer.nrel.gov/api/energy-innovations/v1/marketingSummaries/search/technologyCategory?categoryName=Solar%20Photovoltaic&api_key=eK3lLfihVPMN0FVCdM4WkJtkCWmvk7lP57g63x7V`;
		let xhr = new XMLHttpRequest();
		xhr.onload = () => {
			//handle response
			if (xhr.status === 200) {
				let data = JSON.parse(xhr.response);
				console.log(data);
				let company;
				let marketingSummaries = data._embedded.marketingSummaries;
				for (company of marketingSummaries) {
					insertCompanyOnPage(company);
				}
			}
		};
		xhr.open('GET', apiURL);
		xhr.send();
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
			console.log('yes');
			return true;
		}
		return false;
	}

	//HTML Element Variables

	let getCompaniesBtn = document.getElementById('getCompanies');
	let companyListArea = document.querySelector('.solar-companies__listing .container');

	//Event Listensers

	getCompaniesBtn.addEventListener('click', () => {
		//get companies when button is clicked
		//check if database exists
		databaseExists('solar', dbexists => {
			if (dbexists) {
				getCompaniesFromIndexedDB();
				return true;
			}
			getCompaniesFromAPI();
			return false;
		});
	});
})();
