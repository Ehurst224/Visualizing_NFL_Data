// read in data from website
const url = "http://127.0.0.1:5000/api/nfl";

d3.json(url).then(function(data) {
    console.log(data);
    let players = data.map(i => i.Player);
    console.log(players);
});


// // );
// // d3.json("api/nfl").then((data) => {

// //     console.log(data)
  
// //     // $(document).ready(function() {
// //     $('#example').DataTable( {
// //         data: data['table'],
// //         columns: [
// //             { title: "Player" },
// //             { title: "Position" },
// //         ]
// //     } );
  
// //   })
// d3.json("api/nfl").then((data) => {
//     console.log(data)
// });