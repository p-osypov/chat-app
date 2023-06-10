if("undefined"==typeof jQuery)throw new Error("jQuery is not loaded. Make sure you have included the jQuery library before.");
jQuery( document ).ready(function() {
  const url = window.location.pathname;
  const roomId = url.substring(url.lastIndexOf('/') + 1);
  const generateMessageNode = ({userColor, type, content, createdBy }) => {
    const contentNode = type === 'file' ? `<img src="${content}" width="100" alt="">` : content;
    return `<div class="message"><span class="user" style="color: ${userColor || '#0A6'}">${createdBy}: </span>${contentNode}</div>`
  };
  axios.get(`/api/chat-room/${roomId}`).then(async (response) => {
    const {roomName, messages} = await response.data;
    $('#room-name').html(roomName);
    $('#list-messages').html((messages || []).reverse().map(({createdBy, content, type, userColor}) => {
      return generateMessageNode({userColor, type, content, createdBy});
    }));
  })
    .catch(async (error) => {});

  const socket = io('http://localhost:3000');
  socket.on('connect', () => {
    console.log('Connected to server');
  });
  socket.on('disconnect', () => {
    console.log('Disconnected from server');
  });

  $('#form-send-message-button').on('click', async () => {
    const text = $('#form-input-message').val().trim();
    const file = $('#form-input-file')[0].files[0];
    if (!file && !text) return;
    const type = file ? 'file' : 'text';
    let content = text;
    if (file){
      let formData = new FormData();
      formData.append('image', file);
      const {data: {filePath}} = await axios.post('/api/upload', formData, {});
      content = filePath;
    }
    socket.emit('create message', {content, type, roomId});
  });
  socket.on('message created', ({createdBy, content, userColor, type}) => {
    const node = generateMessageNode({userColor, type, content, createdBy});
    if (type === 'text') {
      $('#form-input-message').val('');
    }else if (type === 'file') {
      $('#form-input-file').val(null);
    }
    $('#list-messages').prepend(node);
  });
});
