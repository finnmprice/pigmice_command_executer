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
    $(`#queue_item_${id}`).remove();

    const index = queue.indexOf(id);
    if (index > -1) { 
        queue.splice(index, 1); 
    }


    $(`#queue_item_${queue[0]}`).addClass('running');
});

function addCommandToQueue(cmdId) {
    const id = genRanHex(24) //TODO array of existing keys to check key doesn't exist
    let command = commands.find(o => o.id === Number(cmdId));
    queueItem = 
   `<div id="queue_item_${id}" class="queue_item ${queue.length == 0 ? 'running' : ''}">
        <h3>{{commandName}}</h3>
        <div id="delete_queue_item">
            <img src="/style/icons/trash.svg"></img>
            <p class="hide">{{id}}</p>
        </div>
    </div>`
    .replace('{{commandName}}', command.name)
    .replace('{{id}}', id)
  
    queue.push(id);  
    $('#queueHolder').append(queueItem)
}