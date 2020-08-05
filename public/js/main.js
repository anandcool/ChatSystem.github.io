const chartForm = document.getElementById('chat-form')
const  chatMessages = document.querySelector('.chat-messages');

//Get username and room from URL
const {username,room} = Qs.parse(location.search,{
  ignoreQueryPrefix:true
})


const socket = io();

//Join chat room
socket.emit('joinRoom',{username,room})

//Message from server
socket.on('message',message =>{
  console.log(message);
  outputMessage(message);

  //Scroll Down
  chatMessages.scrollTop = chatMessages.scrollHeight;
})

//Messaage Submit
chartForm.addEventListener('submit',(e)=>{
  e.preventDefault()

  //Get message text from the user
  const msg = e.target.elements.msg.value;

  // Emit message to server
  socket.emit('chatMessage',msg)

  // Clear Input
  e.target.elements.msg.value = '';
  e.target.elements.msg.focus(); 
})

//Output message to DOM
function outputMessage(message){
  const div = document.createElement('div');
  div.classList.add('message');
  div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
                      <p class='text'>
                      ${message.text}
                      </p>`
  document.querySelector('.chat-messages').appendChild(div)
}