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
    let position = data.map(i => i.Position);

    //buildTable(data);

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
        //.map(i => i.PassingYards)
        .filter(i => i.TotalFantasyPoints >= 300);
    // .sort((a, b) => a - b);
    //.reduce((a,b) => a+b, 0);

    // console.log(combined);

    //let qbname = positionQB.map(i => i.Player);
    let qbpoints = qbname.map(i => i.TotalFantasyPoints);
    let positions = ['WR', 'QB', 'RB', 'TE'];
    let positionTotals = [totalWR, totalQB, totalRB, totalTE];
    let positionCount = [countWR, countQB, countRB, countTE];

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

    const grouped = groupBy(data, data => data.Team);
    
    console.log(grouped.get("BAL"));

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
        width: 600,
        height: 500
    }

    Plotly.newPlot('myDiv', data3, layout2);

});