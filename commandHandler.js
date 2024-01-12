commands = [
    {
        name: 'AMP',
        iconName: "amp",
        id: 0
    },
    {
        name: 'SPEAKER',
        iconName: "speaker",
        id: 1,
    },
    {
        name: 'NOTE',
        iconName: "note",
        id: 2, 
        subCommands: [
        {
            name: 'NOTE FROM FLOOR',
            iconName: 'noteFloor',
            id: 2.1
        },
        {
            name: 'NOTE FROM PLAYER',
            iconName: 'notePlayer',
            id: 2.2
        }
    ]},
    {
        name: 'CLIMB',
        iconName: "climb",
        id: 3
    }
]

queue = []

active = []

const genRanHex = size => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');

generateBaseCommands();

function generateBaseCommands() {
    $('#commandHolder').empty();
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
}

function generateSubCommands(commands) {
    $('#commandHolder').empty();
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
    backButton = 
    `<div class="command_item">
        <img src="/style/icons/back.svg"></img>
        <h2>back</h2></h2>
        <p class="hide" id="commandId">back</p>
    </div>`
    $('#commandHolder').append(backButton);
}

$(document).on("click",".command_item", function () {
    const cmdId = $(this).find('p').html().split('.');
    command = commands.find(o => o.id === Number(cmdId[0]));
    if(cmdId == 'back') {
        generateBaseCommands();
        return;
    }

    if(!command.subCommands) {
        addCommandToQueue(command)
    }
    else {
        subCommands = command.subCommands
        if(cmdId[1]) {
            subcommand = command.subCommands[cmdId[1]-1]
            addCommandToQueue(subcommand)
            generateBaseCommands();
            return;
        }
        generateSubCommands(subCommands)
    }
});

$(document).on("click","#clearQueue", function () {
    queue = [];
    $('#queueHolder').empty();
    $(this).fadeOut(200);
});

$(document).on("click","#moveDown", function () {
    key = $(this).parent().parent().find('p').html();
    const object = queue.find(obj => {
        return obj.key === key;
    })

    index = queue.indexOf(object);

    if (queue.length  - 1 <= index) {
        console.log('stopped')
        return;
    }
    else {
        console.log(index)
        swapArray(queue, index, index + 1);
        updateQueueItems();
    }
});

$(document).on("click","#play", function () {
    key = $(this).parent().parent().find('p').html();
    const object = queue.find(obj => {
        return obj.key === key;
    })

    index = queue.indexOf(object);

    swapArray(queue, index, 0);
    updateQueueItems();

});


$(document).on("click","#moveUp", function () {
    key = $(this).parent().parent().find('p').html();
    const object = queue.find(obj => {
        return obj.key === key;
    })

    index = queue.indexOf(object);

    console.log(queue.length, index)
    if (index <= 0) {
        console.log('stopped')
        return;
    }
    else {
        console.log(index)
        swapArray(queue, index, index - 1);
        updateQueueItems();
    }
});

function updateQueueItems() {
    $('#queueHolder').empty();
    queue.forEach((item) => {
        queueItem = 
        `<div id="queue_item_${item.key}" class="queue_item ${queue.length == 0 ? 'running' : ''}">
            <img src="/style/icons/${item.command.iconName}.svg" style="margin-right: 20px;"></img>
            <h3>${item.command.name}</h3>
            <div id="reorderHolder">
                <img id="play" style="${queue.indexOf(item) == 0 ? 'display: none' : ''}" src="/style/icons/play.svg"></img>
                <img id="moveDown" src="/style/icons/down.svg"></img>
                <img id="moveUp" src="/style/icons/up.svg"></img>
            </div>
            <div id="delete_queue_item">
                <svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512"><path opacity="1" fill="currentColor" d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>
            </div>
            <p class="hide">${item.key}</p>
        </div>`

    $('#queueHolder').append(queueItem)

    $('#queue_item_' + item.key).css({"border-color": item.color, 
                "border-width":"1px", 
                "border-style":"solid"});
    });

    if(queue.length == 0) {
        $('#clearQueue').fadeOut(200);
    }
    else {
        $('#clearQueue').fadeIn(200);
    }

    $(`#queue_item_${queue[0].key}`).addClass('running');
}

function swapArray(array, from, to) {
    var tmp = array[from];
    array[from] = array[to];
    array[to] = tmp;
}

$(document).on("click","#delete_queue_item", function () {
    key = $(this).parent().find('p').html();

    $(`#queue_item_${key}`).remove();

    const object = queue.find(obj => {
        return obj.key === key;
    })

    const index = queue.indexOf(object);

    if (index > -1) {
        queue.splice(index, 1); 
    }

    if(queue.length == 0) {
        $('#clearQueue').fadeOut(200);
    }

    $(`#queue_item_${queue[0].key}`).addClass('running');
});

function addCommandToQueue(command) {
    const key = genRanHex(24) //TODO array of existing keys to check key doesn't exist
    const color = getRandomColor();  
    queue.push({key: key, command: command, color: color});
    updateQueueItems();
}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}