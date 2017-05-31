$('body').css({
    'background-color': 'black',
    'color': 'white'
});

function init() {
    $.get("/api/trophies", function (data) {
        $('#allTimeHighScore').html(data["score"])
        allTimeHighScore = parseInt(data["score"])
        $('#message').html(data["message"])
    });
}

function updateAllTimeHighScore(m, sc) {
    $.ajax({
        type: 'POST',
        data: JSON.stringify({
            message: m,
            score: sc
        }),
        contentType: 'application/json',
        url: '/',
        success: function (data) {
            console.log('success');
        }
    });

    $("#allTimeHighScore").html(sc)
    allTimeHighScore = sc
    $("#message").html(m)
}


function resetScore() {
    console.log("attempting reset score")
    $.ajax({
        type: 'POST',
        contentType: 'application/json',
        url: '/reset',
        success: function (data) {
            console.log('success');
            $("#allTimeHighScore").html('0')
            $("#localHighScore").html('0')
            $("#message").html('reset')
            

        }
    });
}

init();
