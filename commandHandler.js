commands = [
  {name: 'shoot in amp', id: 0},
  {name: 'shoot in speaker', id: 1},
  {name: 'pick up note', id: 2},
  {name: 'climb', id: 3}
]

queue = []

active = []

const genRanHex = size => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');

commands.forEach((command) => {
    commandItem = 
   `<div class="command_item">
      <h3>{{commandName}}</h3>
      <p class="hide" id="commandId">{{id}}</p>
    </div>`
    .replace('{{commandName}}', command.name)
    .replace('{{id}}', command.id);

    $('#commandHolder').append(commandItem);
});

$(document).on("click",".command_item", function () {
    const cmdId = $(this).find('p').html();
    addCommandToQueue(cmdId)
});

$(document).on("click","#delete_queue_item", function () {
    id = $(this).find('p').html();
    console.log(`delete ${id}`)
});

function addCommandToQueue(cmdId) {
    let command = commands.find(o => o.id === Number(cmdId));
    queueItem = 
   `<div class="queue_item ${queue.length == 0 ? 'running' : ''}">
        <h3>{{commandName}}</h3>
        <div id="delete_queue_item">
            <img src="/style/img/x.svg" class="icon24"></img>
            <p class="hide">{{id}}</p>
        </div>
    </div>`
    .replace('{{commandName}}', command.name)
    .replace('{{id}}', genRanHex(24)) //TODO array of existing keys to check key doesn't exist
  
    queue.push(command);  
    $('#queueHolder').append(queueItem)
}