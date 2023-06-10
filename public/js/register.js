if("undefined"==typeof jQuery)throw new Error("jQuery is not loaded. Make sure you have included the jQuery library before.");
jQuery( document ).ready(function() {

  $('#submit-register-form-button').on('click', (async () => {
    const value = {
      username: $("#register-user-name-input").val(),
      password: $("#register-password-input").val()
    };
    if (!value.username || !value.password) return Promise.reject('Creds are empty.');
    axios.post('/api/register', value).then(async (response) => {
      alert(response.data.message);
      if (response.status !== 201) return;
      window.location.href = `/lobby`;
    }).catch(async (error) => {
      console.error(error);
    });
  }));
});
