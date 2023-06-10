if("undefined"==typeof jQuery)throw new Error("jQuery is not loaded. Make sure you have included the jQuery library before.");
jQuery( document ).ready(function() {

  $('#submit-login-form-button').on('click', (async () => {
    const value = {
      username: $("#login-user-name-input").val(),
      password: $("#login-password-input").val()
    };
    if (!value.username || !value.password) return Promise.reject('Creds are empty.');
    axios.post('/api/login', value).then(async (response) => {
      if (response.status !== 200) return Promise.reject(response);
      window.location.href = `/lobby`;
    }).catch((error) => {
      alert(error.response?.data.error || error.message);
    });
  }));
});
