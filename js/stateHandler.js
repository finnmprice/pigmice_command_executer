bclasses = {
    0: '',
    1: 'enabled-button',
    2: 'changing-button',
    3: 'disabled-button'
}

buttonLabels = {
    climb: {
        0: 'raise climber',
        1: 'lower climber'
    },
    intake: {
        0: 'lower intake',
        1: 'raise intake'
    },
    amp: {
        0: 'shoot amp',
        1: 'stow'
    },
    speaker: {
        0: 'shoot speaker',
        1: 'stow'
    },
    note: {
        0: 'add note',
        1: 'remove note'
    }
}

currentState = {
    climb: 0,
    speaker: 0,
    amp: 0,
    intake: 0,
    note: 0
}

$('#climb-button').on('click', e => {
    switch(currentState.climb) {
        case 0:
            updateButton('climb', 1, 3);
            updatePosition('#c-middle-diagram', 0, -12);
            updatePosition('#c-top-diagram', 0, -24);
            break;

        case 1:
            updateButton('climb', 0);        
            updatePosition('#c-middle-diagram', 0, 0);
            updatePosition('#c-top-diagram', 0, 0);
            break;
    }
})

$('#intake-button').on('click', e => {
    switch(currentState.intake) {
        case 0:
            updateButton('intake', 1, 3);
            updatePosition('#intake-diagram', 0);

            break;

        case 1:
            updateButton('intake', 0);
            updatePosition('#intake-diagram', 88);

            break;
    }
})

$('#speaker-button').on('click', e => {
    switch(currentState.speaker) {
        case 0:
            updateButton('speaker', 1);
            updateButton('amp', 0);

            updatePosition('#arm-holder', 0);
            updatePosition('#box-holder', 0);

            setTimeout(() => {
                shoot();
            }, 1100);
            break;

        case 1:
            stowArm();
    }
})

$('#amp-button').on('click', e => {
    switch(currentState.amp) {
        case 0:
            updateButton('amp', 1);
            updateButton('speaker', 0);

            updatePosition('#arm-holder', 40);
            updatePosition('#box-holder', -130);

            setTimeout(() => {
                shoot();
            }, 1100);
            break;
        case 1:
            stowArm();
    }
})


$('#note-button').on('click', e => {
    shoot();
})


// only for testing
$('#update-note').on('click', e => {
    $('#note-diagram').css('transform', 'translate(0px, 0px)')
    switch(currentState.note) {
        case 0:
            updateNote(1)

            break;
        case 1:
            updateNote(0)
            break;
    }
})

function updateButton(id, value, color) {
    e = `#${id}-button`;

    $(e).removeClass();
    $(e).addClass(bclasses[(color != null) ? color : value])
    $(e).html(`<p>${buttonLabels[id][value]}</p>`)
    currentState[id] = value;
}

function updateNote(value, time) {
    time = (time == undefined) ? 100 : time
    updateButton('note', value);
    if(value == 1) {
        $('#note-diagram').fadeIn(time)
    }
    else {
        $('#note-diagram').fadeOut(time)
    }
}

function stowArm() {
    updateButton('amp', 0);
    updateButton('speaker', 0);

    updatePosition('#arm-holder', -70);
    updatePosition('#box-holder', 120);
}

function shoot() {
    if((currentState.note == 1) && ((currentState.amp == 1) || (currentState.speaker == 1))) {
        $('#note-diagram').css('transform', `translate(${currentState.amp == 1 ? "-" : ""}400px, ${currentState.speaker == 1 ? "-" : ""}400px)`)
        updateNote(0, 300)
        setTimeout(e => {
            stowArm();
        }, 300)
    }
}

function updatePosition(e, rotation, transform) {
    $(e).css('transform', `rotate(${rotation}deg)`);
    if(transform != undefined) {
        $(e).css('transform', `translateY(${transform}%)`);
    }
}