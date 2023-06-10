if("undefined"==typeof jQuery)throw new Error("jQuery is not loaded. Make sure you have included the jQuery library before.");
jQuery( document ).ready(function() {

  axios.get('/api/rooms').then((response) => {
    const {rooms} = response.data;
    const roomNodes = rooms.map(({roomId, roomName}) => {
      return `<a href="/chat-room/${roomId}" class="list-group-item">${roomName}</a>`;
    });
    $('#room-list').html(roomNodes.join(''));
  })
    .catch((error) => {});

  $('#create-room-submit-button').on('click', (() => {
    const roomName = $('#create-room-input').val();
    if (!roomName) return;

    axios.post('/api/create-room', {roomName}).then((response) => {
      if (response.status !== 201) return;
      const {newRoom} = response.data;
      const node = `<a href="/chat-room/${newRoom.roomId}" class="list-group-item">${newRoom.roomName}</a>`
      $('#room-list').prepend(node);
      $('#create-room-input').val('');
    }).catch((error) => {
      console.error(error);
    });
  }));
});
