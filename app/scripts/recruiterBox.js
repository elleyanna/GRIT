class RecruiterBox {
  constructor() {
    this.recruiterBoxBaseUrl = 'https://jsapi.recruiterbox.com/v1/';
    this.recruiterBoxClient = 'tonic';
  }

  fetchAllOpenings() {
    var api = 'openings/';
    return this.get(api);
  }

  fetchOpening(id) {
    var api = 'openings/' + id;
    return this.get(api);
  }

  fetchApplicationFields(id) {
    var api = 'openings/' + id + '/application_form';
    return this.get(api);
  }

  submitApplication(id, data) {
    var api = 'openings/' + id + '/apply';
    return this.post(api, data);
  }

  get(api) {
    return $.ajax({
      url: this.recruiterBoxBaseUrl + api + '/?client_name=' + this.recruiterBoxClient,
      contentType: 'application/json'
    }).promise();
  }

  post(api, payLoad) {
    return $.ajax({
      url: this.recruiterBoxBaseUrl + api + '/?client_name=' + this.recruiterBoxClient,
      data: JSON.stringify(payLoad),
      contentType: 'application/json',
      dataType: 'json',
      type: 'POST'
    }).promise();
  }
}

export { RecruiterBox }
