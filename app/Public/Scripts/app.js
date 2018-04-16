$(() => {

  const pinNumberInput = $("#pin-number-input");
  const pinValueInput = $("#pin-value-input");

  $('form').on('submit', (event) => { 
    event.preventDefault();
    makeRequest(urlPath, postData(pinNumberInput.val(), pinValueInput.val()))
    .then(() => console.log("Success"))
    .catch((e) => console.log("Error", e));
  });

  /// AJAX

  const urlPath = "http://192.168.2.2:3000/pin";

  function postData(pinNumber, pinValue) {
    return {pinNumber, pinValue};
  }
  function url(endpoint) {
    return urlPath + "/" + endpoint;
  }
  function makeRequest(url, data) {
    return new Promise((resolve, reject) => {
    $.ajax({
      type: "POST",
      url: url,
      data: data,
      success: resolve,
      error: reject,
      dataType: 'json'
    });
  });
  }

});