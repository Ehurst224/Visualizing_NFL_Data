// read in data from website
const url = "../../EDA/nfl copy.csv"

function top5players() {
    d3.csv(url).then((data) => {
        console.log(data);
    }
    )}
