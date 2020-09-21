var lastContinent;

function getContinents() {
    showLoader();
    var promise = fetch("http://localhost:8080/world/continents");
    promise.then(response => {
        var promiseBody = response.json();
        promiseBody.then(body => {
            //console.log(body);
            var table = '<h3>Continents</h3><table class="table table-striped table-hover">' +
                '<thead><tr><th>Continent</th></tr></thead><tbody>';
            for (var continent of body) {
                table += '<tr><td><a onclick="getCountries(\'' + continent +
                    '\');" href="javascript:void(0);">' + continent + '</a></td></tr>';
            }
            table += '</tbody></thead></table>';
            document.getElementById("table").innerHTML = table;
            hideLoader();
        });
    });
}

function getCountries(continent) {
    showLoader();
    lastContinent = continent;
    var promise = fetch("http://localhost:8080/world/countries?continent=" + continent);
    promise.then(response => {
        var promiseBody = response.json();
        promiseBody.then(body => {
            //console.log(body);
            var table = '<h3>Countries</h3><table class="table table-striped table-hover">' +
                '<thead><tr><th>Country</th><th>Population</th></tr></thead><tbody>';
            for (var country of body) {
                table += '<tr><td><a onclick="getCities(\'' + country.code +
                    '\');" href="javascript:void(0);">' + country.name +
                    '</a></td><td>' + country.population + '</td></tr>';
            }
            table += '</tbody></thead></table>';
            document.getElementById("table").innerHTML = table +
                '<a onclick="getContinents();" href="javascript:void(0);" class="btn btn-primary m-1" role="button">' +
                'back</a>';
            hideLoader();
        });
    });
}

function getCities(countrycode) {
    showLoader();
    var promise = fetch("http://localhost:8080/world/cities?countrycode=" + countrycode);
    promise.then(response => {
        var promiseBody = response.json();
        promiseBody.then(body => {
            //console.log(body);
            var table = '<h3>Cities</h3><table class="table table-striped table-hover">' +
                '<thead><tr><th>City</th><th>Population</th></tr></thead><tbody>';
            for (var city of body) {
                table += '<tr><td>' + city.name +
                    '</td><td>' + city.population + '</td></tr>';
            }
            table += '</tbody></thead></table>';
            document.getElementById("table").innerHTML = table +
                '<a onclick="getCountries(\'' + lastContinent + '\');" href="javascript:void(0);" class="btn btn-primary m-1" role="button">' +
                'back</a>';
            hideLoader();
        });
    });
}

function loadAllCountries() {
    showLoader();
    var promise = fetch("http://localhost:8080/world/continents");
    var promise = fetch("http://localhost:8080/world/get-all-countries");
    promise.then(response => {
        var promiseBody = response.json();
        promiseBody.then(body => {
            results = '<option value="">None selected</option>';
            for (var country of body) {
                results += '<option value="' + country.code + '">' + country.name + '</option>';
            }
            document.getElementById("countrycode").innerHTML = results;
            hideLoader();
        });
    });
}

function searchCities() {
    showLoader();
    var promise = fetch("http://localhost:8080/world/continents");
    var searchStr = document.forms["searchform"]["searchstr"].value;
    var countrycode = document.forms["searchform"]["countrycode"].value;
    var promise = fetch("http://localhost:8080/world/search?searchStr=" + searchStr +
        "&countrycode=" + countrycode);
    promise.then(response => {
        var promiseBody = response.json();
        promiseBody.then(body => {
            var table = '<h3>Cities</h3><table class="table table-striped table-hover">' +
                '<thead><tr><th>City</th><th>Population</th></tr></thead><tbody>';
            for (var city of body) {
                table += '<tr><td>' + city.name +
                    '</td><td>' + city.population + '</td></tr>';
            }
            table += '</tbody></thead></table>';
            document.getElementById("table").innerHTML = table;
            hideLoader();
        });
    });
}

function showLoader() {
    document.getElementById("loader").innerHTML = '<div class="row">' +
        '<div class="spinner-border" role="status"><span class="sr-only">Loading...</span>' +
        '</div></div><div class="row"><strong>Loading...</strong></div>';
}

function hideLoader() {
    document.getElementById("loader").innerHTML = "";
}