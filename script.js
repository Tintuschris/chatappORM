const form = document.querySelector('#form');
const input = document.querySelector('#input');
const messagesList = document.querySelector('#messages');

form.addEventListener('submit', (event) => {
  event.preventDefault();
 
  const message = input.value;
  input.value = '';

  fetch('/message', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text: message }),
  });
});

const loadMessages = () => {
  fetch('/messages')
    .then((response) => response.json())
    .then((data) => {
      messagesList.innerHTML = '';

      data.messages.forEach((message) => {
        const li = document.createElement('li');
        li.innerHTML = message.text;
        li.classList.add('message');
        messagesList.appendChild(li);
      });

      setTimeout(loadMessages, 1000);
    });
};

loadMessages();
