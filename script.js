$('body').css({
    'background-color': 'black'
    , 'color': 'white'
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
        type: 'POST'
        , data: JSON.stringify({
            message: m
            , score: sc
        })
        , contentType: 'application/json'
        , url: '/'
        , success: function (data) {
            console.log('success');
        }
    });
    
    $("#allTimeHighScore").html(sc)
    $("#message").html(m)
}
init();