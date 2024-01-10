commands = [
  {name: 'AMP', iconName: "amp", id: 0},
  {name: 'SPEAKER', iconName: "speaker", id: 1},
  {name: 'NOTE', iconName: "note", id: 2},
  {name: 'CLIMB', iconName: "climb", id: 3}
]

queue = []

active = []

const genRanHex = size => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');

commands.forEach((command) => {
    commandItem = 
   `<div class="command_item">
        <img src="/style/icons/${command.iconName}.svg"></img>
        <h2>{{commandName}}</h2>
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

$(document).on("click","#clearQueue", function () {
    queue = [];
    $('#queueHolder').empty();
    $(this).fadeOut(200);
});

$(document).on("click","#delete_queue_item", function () {
    id = $(this).find('p').html();
    $(`#queue_item_${id}`).remove();

    const index = queue.indexOf(id);
    if (index > -1) { 
        queue.splice(index, 1); 
    }

    if(queue.length == 0) {
        $('#clearQueue').fadeOut(200);
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
            <svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512"><path opacity="1" fill="currentColor" d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>
            <p class="hide">{{id}}</p>
        </div>
    </div>`
    .replace('{{commandName}}', command.name)
    .replace('{{id}}', id)
  
    queue.push(id);

    $('#clearQueue').fadeIn(200);
    $('#queueHolder').append(queueItem)
}