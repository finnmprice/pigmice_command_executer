bclasses = {
    0: '',
    1: 'enabled-button',
    2: 'changing-button',
    3: 'disabled-button'
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
            $('#c-middle-diagram').css('transform', 'translateY(-100px)');
            $('#c-top-diagram').css('transform', 'translateY(-200px)');
            break;

        case 1:
            updateButton('climb', 0);
            $('#c-middle-diagram').css('transform', 'translateY(0px)');
            $('#c-top-diagram').css('transform', 'translateY(0px)');
            break;
    }
})

$('#intake-button').on('click', e => {
    switch(currentState.intake) {
        case 0:
            updateButton('intake', 1, 3);
            $('#intake-diagram').css('transform', 'rotate(0deg)');
            break;

        case 1:
            updateButton('intake', 0);
            $('#intake-diagram').css('transform', 'rotate(88deg)');
            break;
    }
})

$('#speaker-button').on('click', e => {
    switch(currentState.speaker) {
        case 0:
            updateButton('speaker', 1);
            updateButton('amp', 0);
            $('#arm-holder').css('transform', 'rotate(0deg)');
            $('#box-holder').css('transform', 'rotate(0deg)');
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
            $('#arm-holder').css('transform', 'rotate(40deg)');
            $('#box-holder').css('transform', 'rotate(-130deg)');
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
    $('#arm-holder').css('transform', 'rotate(-70deg)');
    $('#box-holder').css('transform', 'rotate(120deg)');
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