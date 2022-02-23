// read in data from website
const url = "http://127.0.0.1:5000/api/nfl";


// (async ($d3) => {
//     const mainContainer = $d3
//         .select('body')
//         .append('div')
//         .attr('id', mainContainer)
//         .attr('class', 'container');
// })(d3);

d3.json(url).then(function (data) {
    // console.log(data);
    let players = data.map(i => i.Player);
    let total = data.map(i => i.TotalFantasyPoints);
    let team = data.map(i => i.Team);
    let Age = data.map(i => i.Age);
    let Completions = data.map(i => i.Completions);
    let Fumbles = data.map(i => i.Fumbles);
    let FumblesLost = data.map(i => i.FumblesLost);
    let Interceptions = data.map(i => i.Interceptions);
    let Overallrank = data.map(i => i.OverallRank);
    let PassingAttempts = data.map(i => i.PassingAttempts);
    let PassingTDs = data.map(i => i.PassingTDs);
    let position = data.map(i => i.Position);
    let PassingYards = data.map(i => i.PassingYards);
    let PointsPerReception = data.map(i => i.PointsPerReception);
    let PositionRank = data.map(i => i.PositionRank);
    let ReceivingTDs = data.map(i => i.ReceivingTDs);
    let ReceivingYards = data.map(i => i.ReceivingYards);
    let ReceivingYardsperReception = data.map(i => i.ReceivingYardsperReception);
    let Receptions = data.map(i => i.Receptions);
    let RushAttempts = data.map(i => i.RushAttempts);
    let RushTDs = data.map(i => i.RushTDs);
    let RushingYards = data.map(i => i.RushingYards);
    let RushingYardsperAttempt = data.map(i => i.RushingYardsperAttempt);
    let Targets = data.map(i => i.Targets);
    let TotalTDs = data.map(i => i.TotalTDs);

    const totalPassAttempts = data.reduce((total, data) => total + data.PassingAttempts, 0);
    const totalRushAttempts = data.reduce((total, data) => total + data.RushAttempts, 0);
    const totalPassingYards = data.reduce((total, data) => total + data.PassingYards, 0);
    const totalRushingYards = data.reduce((total, data) => total + data.RushingYards, 0);
    const totalRushTDs = data.reduce((total, data) => total + data.RushTDs, 0);
    const totalPassingTDs = data.reduce((total, data) => total + data.PassingTDs, 0);
    // const total = data.reduce((total, data) => total + data., 0);
    // const total = data.reduce((total, data) => total + data., 0);
    // const total = data.reduce((total, data) => total + data., 0);

    //buildTable(data);
    //const uniqueAge = Array.from(new Set(Age));
    //console.log(uniqueAge);
    const uniqueTeam = Array.from(new Set(team));
    console.log(uniqueTeam);
    
    let passTotals = [totalPassAttempts, totalPassingYards, totalPassingTDs];
    //let passTNames = ['Total Pass Attempts', 'Total Passing Yards', 'Total Passing TDs'];
    let rushTotals = [totalRushAttempts, totalRushingYards, totalRushTDs];
    let statNames = ['Total Attempts', 'Total Yards', 'Total TDs'];

    // function buildTable(data) {
    //     var table = document.getElementById('myTable')

    //     table.innerHTML = ''
    //     for (let i = 0; i < data.length; i++) {
    //         const row = "<tr><td> ${data[i].Player} </td><td> ${data[i].Team} </td><td> ${data[i].TotalFantasyPoints} </td></tr>"
    //         table.innerHTML += row <= 5
    //     }

    // };


    // const sortedRank = data.sort(function(c1,c2){
    //     if(c1.TotalFantasyPoints > c2.TotalFantasyPoints) {
    //         return 1; 
    //     } else {
    //         return -1;
    //     }
    // });

    //sort data
    // const sortedRank = positionRB.sort((a,b) => (a.TotalFantasyPoints < b.TotalFantasyPoints ? -1: 1));

    // console.log(sortedRank)



    //filter

    const positionQB = data.filter(data => data.Position === 'QB');
    const positionRB = data.filter(data => data.Position === 'RB');
    const positionTE = data.filter(data => data.Position === 'TE');
    const positionWR = data.filter(data => data.Position === 'WR');

    // const top5QB = positionQB.sort((a,b) => )

    // const positionF = data.filter(data.TotalFantasyPoints => data.TotalFantasyPoints >= 350);


    //SUM OF
    const totalQB = positionQB.reduce((total, positionQB) => total + positionQB.TotalFantasyPoints, 0);
    const totalRB = positionRB.reduce((total, positionRB) => total + positionRB.TotalFantasyPoints, 0);
    const totalTE = positionTE.reduce((total, positionTE) => total + positionTE.TotalFantasyPoints, 0);
    const totalWR = positionWR.reduce((total, positionWR) => total + positionWR.TotalFantasyPoints, 0);

    const countQB = totalQB / positionQB.length;
    const countRB = totalRB / positionRB.length;
    const countTE = totalTE / positionTE.length;
    const countWR = totalWR / positionWR.length;

    const qbname = positionQB
        .map(i => i.Player);
    //.filter(i => i.TotalFantasyPoints >= 300);
    // .sort((a, b) => a - b);
    //.reduce((a,b) => a+b, 0);

    // console.log(combined);
    const rbname = positionRB.map(i => i.Player);
    const rbpoints = positionRB.map(i => i.TotalFantasyPoints);
    const tename = positionTE.map(i => i.Player);
    const tepoints = positionTE.map(i => i.TotalFantasyPoints);
    const wrname = positionWR.map(i => i.Player);
    const wrpoints = positionWR.map(i => i.TotalFantasyPoints);

    //let qbname = positionQB.map(i => i.Player);
    let qbpoints = positionQB.map(i => i.TotalFantasyPoints);
    let positions = ['QB', 'WR', 'RB', 'TE'];
    let positionTotals = [totalQB, totalWR, totalRB, totalTE];
    let positionCount = [countQB, countWR, countRB, countTE];

    // let metric = 'length';

    // function metricMean(data, position, metric){
    //     let count = 0;
    //     let totall = 0;
    //     for (let i = 0; i < data.length; i++) {
    //         row = data[i];
    //         if (row.Position == rating) {
    //             totall += row[metric];
    //             count += 1;
    //         }
    //     }
    //     let meanValue = total / count;

    //     return meanValue;
    // }

    // let metricQB = metricMean(positionQB.TotalFantasyPoints, 'QB', metric)
    // let metricRB = metricMean(positionRB.TotalFantasyPoints, 'RB', metric)
    // let metricWR = metricMean(positionWR.TotalFantasyPoints, 'WR', metric)
    // let metricTE = metricMean(positionTE.TotalFantasyPoints, 'TE', metric)

    // let metricArrayPosition = [metricWR, metricQB, metricRB, metricTE]

    function groupBy(list, keyGetter) {
        const map = new Map();
        list.forEach((item) => {
            const key = keyGetter(item);
            const collection = map.get(key);
            if (!collection) {
                map.set(key, [item]);
            } else {
                collection.push(item);
            }
        });
        return map;
    }

    const groupedTeam = groupBy(data, data => data.Team);
    const groupedAge = groupBy(data, data => data.Age);

    //console.log(grouped.get("BUF"));
    console.log(groupedTeam);

    // for (let i = 0; i < array.length; i++) {
    //     const element = array[i];



    // function onlyUnique(value, index, self) {
    //     return self.indexOf(value) === index;
    //   }

    //   // usage example:
    //   var a = ['a', 1, 'a', 2, '1'];
    //   var unique = data.filter(onlyUnique);
    //let unique = [...new Set(data, data => data.Team)];

    //console.log(unique);

    // let layerColumn = "Positions";
    // let yColumn = "TotalFantasyPoints"
    // let xColumn = "Team"

    // function render(groupedTeam){
    //     var nested = d3.nest()
    //         .key(function (d){ return d[layerColumn]; })
    //         .entries(groupedTeam);
    //     var stack = d3.layout.stack()
    //         .y(function (d) { return d[yColumn]; })
    //         .values(function (d) { return d.values; });

    //     var layers = stack(nested);

    //     d3.select("body").append("pre")
    //         .text(JSON.stringify(layers,null,2));
    // }

    // function type(d){

    // }


    let trace30 = {
        x: qbpoints,
        y: qbname,
        type: 'bar',
        orientation: "h",
        name: "Quarterbacks",
        // transforms: [{   
        //      type:'sort',
        //      target: 'x',
        //      order: 'descending'
        //  }]
        text: '',
        textposition: 'auto',
        hoverinfo: 'none',
        marker: {
            color: 'rgb(158,202,225)',
            opacity: 0.6,
            line: {
                color: 'rgb(158,202,225)',
                width: 1.5
            }
        }
    };

    let trace40 = {
        x: rbpoints,
        y: rbname,
        type: 'bar',
        orientation: "h",
        name: "Running Backs",
        // transforms: [{   
        //      type:'sort',
        //      target: 'x',
        //      order: 'descending'
        //  }]
        text: '',
        textposition: 'auto',
        hoverinfo: "none",
        marker: {
            color: 'rgb(8,148,17)',
            opacity: 0.6,
            line: {
                color: 'rgb(8,148,17)',
                width: 1.5
            }
        }
    };

    let trace41 = {
        x: wrpoints,
        y: wrname,
        type: 'bar',
        orientation: "h",
        name: "Wide Receivers",
        // transforms: [{   
        //      type:'sort',
        //      target: 'x',
        //      order: 'descending'
        //  }]
        text: '',
        textposition: 'auto',
        hoverinfo: "none",
        marker: {
            color: 'rgb(138,134,117)',
            opacity: 0.6,
            line: {
                color: 'rgb(138,134,117)',
                width: 1.5
            }
        }
    };

    let trace42 = {
        x: tepoints,
        y: tename,
        type: 'bar',
        orientation: "h",
        name: "Tight Ends",
        // transforms: [{   
        //      type:'sort',
        //      target: 'TotalFantasyPoints',
        //      order: 'descending'
        //  }]
        text: '',
        textposition: 'auto',
        hoverinfo: "none",
        marker: {
            color: 'rgb(180,142,127)',
            opacity: 0.6,
            line: {
                color: 'rgb(180,142,127)',
                width: 1.5
            }
        }
    };

    let data30 = [trace30, trace40, trace41, trace42];

    let layout30 = {
        barmode: 'grouped',
        title: '<b>All Player Total Fantasy Points Grouped by Position</b>'
    };


    Plotly.newPlot("bar3", data30, layout30);


    let trace20 = {
        x: statNames,
        y: rushTotals,
        type: 'bar',
        //orientation: "h",
        name: "Rushing",
        // transforms: [{   
        //      type:'sort',
        //      target: 'x',
        //      order: 'descending'
        //  }]
        text: rushTotals.map(String),
        textposition: 'auto',
        hoverinfo: 'none',
        marker: {
            color: 'rgb(158,202,225)',
            opacity: 0.6,
            line: {
                color: 'rgb(8,48,107)',
                width: 1.5
            }
        }
    };

    let trace10 = {
        x: statNames,
        y: passTotals,
        type: 'bar',
        //orientation: "h",
        name: "Passing",
        // transforms: [{   
        //      type:'sort',
        //      target: 'x',
        //      order: 'descending'
        //  }]
        text: passTotals.map(String),
        textposition: 'auto',
        hoverinfo: "none",
        marker: {
            color: 'rgb(158,202,25)',
            opacity: 0.6,
            line: {
                color: 'rgb(8,148,17)',
                width: 1.5
            }
        }
    };

    let data10 = [trace20, trace10];

    let layout10 = {
        barmode: 'grouped',
        title: '<b>Rushing vs. Passing</b>'
    };

    Plotly.newPlot("bar2", data10, layout10);

    let trace1 = {
        x: positionTotals,
        y: positions,
        type: 'bar',
        orientation: "h",
        name: "Fantasy Total for Position",
        // transforms: [{   
        //      type:'sort',
        //      target: 'x',
        //      order: 'descending'
        //  }]
        text: positionTotals.map(String),
        textposition: 'auto',
        hoverinfo: 'none',
        marker: {
            color: 'rgb(158,202,225)',
            opacity: 0.6,
            line: {
                color: 'rgb(8,48,107)',
                width: 1.5
            }
        }
    };

    let trace2 = {
        x: positionCount,
        y: positions,
        type: 'bar',
        orientation: "h",
        name: "Total Average",
        // transforms: [{   
        //      type:'sort',
        //      target: 'x',
        //      order: 'descending'
        //  }]
        text: positionCount.map(String),
        textposition: 'auto',
        hoverinfo: "none",
        marker: {
            color: 'rgb(158,202,25)',
            opacity: 0.6,
            line: {
                color: 'rgb(8,148,17)',
                width: 1.5
            }
        }
    };

    let data2 = [trace1, trace2];

    let layout = {
        barmode: 'stack',
        title: '<b>Stats by Position</b>'
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
        width: 'auto',
        height: 'auto'
    }

    Plotly.newPlot('myDiv', data3, layout2);

});

