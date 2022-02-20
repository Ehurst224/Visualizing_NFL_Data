// read in data from website
const url = "http://127.0.0.1:5000/api/nfl";

d3.json(url).then(function (data) {
    // console.log(data);
    let players = data.map(i => i.Player);
    let total = data.map(i => i.TotalFantasyPoints);
    let team = data.map(i => i.Team);
    let position = data.map(i => i.Position);

    var qbs = [];
    for (let i = 0; i < data.length; i++) { 
        qbs.push(data[i].Player) 
    };
    console.log(qbs)


    let trace1 = {
        x: players[1],
        y: total[1],
        type: 'bar',
        // orientation: "h",
        // transforms: [{
        //     type:'sort',
        //     target: 'x',
        //     order: 'descending'
        // }]
    };

    let data2 = [trace1];

    let layout = {
        title: '<b>Top 10 Players</b>'
    };

    Plotly.newPlot("bar", data2, layout);

    var gd = document.getElementById('myDiv');
    var data3 = [{
        type: 'funnel',
        y: position,
        x: total,
        hoverinfo: 'x+percent previous+percent initial'
    }];

    var layout2 = {
        margin: {
            l: 150
        },
        width: 600,
        height: 500
    }

    Plotly.newPlot('myDiv', data3, layout2);

});