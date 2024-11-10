
async function getRawData(){
    const response = await fetch('data/force-on-hand.csv');
    if (!response.ok) {
        console.error('Failed to fetch CSV:', response.statusText);
        return;
    }
    const data = await response.text();
    console.log('Fetched Data:', data);  // Check the raw CSV data
    //console.log(data);

    const xTrials = [];     //x-axis labels
    const yDBND = [];     //y-axis Condition 1: Dead Ball No Dampener
    const yNBND = [];   //y-axis Condition 2: New Ball No Dampener
    const yDBWD = [];   //y-axis Condition 3: Dead Ball With Dampener
    const yNBWD = [];   //y-axis Condition 4: New Ball With Dampener

    // \n - new l9ine character
    // split('\n') separate the table into an array of indiv. rows.
    // slice(start, end) - return a new array starting at index 'start' up to but not including 'end'
    const table = data.split('\n').slice(1);
    console.log(table);

    table.forEach(row  => {
        const columns = row.split(','); // split row into columns using comma 
        const trial = parseFloat(columns[0]);        //assign trial value 
        xTrials.push(trial);  //push year values into xTrials

        const dbnd = parseFloat((columns[1])) //condition 1 value
        yDBND.push(dbnd);

        const nbnd = parseFloat((columns[2])) //condition 2 value
        yNBND.push(nbnd);

        const dbwd = parseFloat((columns[3])) //condition 3 value
        yDBWD.push(dbwd);

        const nbwd = parseFloat((columns[4])) //condition 4 value
        yNBWD.push(nbwd);

    });
    return{xTrials, yDBND, yNBND, yDBWD, yNBWD}    //return multiple values as objects 
}  

async function createDataChart(){
    const data = await getRawData();      //wait for getData() to send
    const lineChart = document.getElementById('lineChart-data');

    const myChart = new Chart(lineChart, {
        type: 'line',
        data: {
            labels: data.xTrials,           //x-axis labels
            datasets: [
                {
                    label: `Condition 1: No Vibration Dampener with Old Balls`,
                    data: data.yDBND,
                    fill: false,
                    backgroundColor: 'rgba(255,0,132,0.2)',
                    borderColor: 'rgba(255,0,132,1)',
                    borderWidth: 1
                },
                {
                    label: `Condition 2: No Vibration Dampener with New Balls`,
                    data: data.yNBND,
                    fill: false,
                    backgroundColor: 'rgba(0,102,255,0.2)',
                    borderColor: 'rgba(0,102,255,1)',
                    borderWidth: 1
                },
                {
                    label: `Condition 3: Vibration Dampener with Old Balls`,
                    data: data.yDBWD,
                    fill: false,
                    backgroundColor: 'rgba(0,153,51,0.2)',
                    borderColor: 'rgba(0,153,51,1)',
                    borderWidth: 1
                },
                {
                    label: `Condition 4: Vibration Dampener with New Balls`,
                    data: data.yNBWD,
                    fill: false,
                    backgroundColor: 'rgba(243, 225, 107,0.2)',
                    borderColor: 'rgba(243, 225, 107,1)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,                   // re-size babsed on screen size
            maintainAspectRatio: false,         
            scales: {                           // display iptions for x & y axes
                x: {
                    title: {
                        display: true,
                        text: 'Trials',          // x-axis title
                        font: {                 // font-properties
                            size: 14
                        }
                    },
                    tick: {
                        font: {
                            size: 14
                        }
                    },
                    grid: {
                        color: '#6c767e'
                    }
                },

                y: {
                    title: {
                        display: true,
                        text: 'Force on Hand (N)',          // xyaxis title
                        font: {                 // font-properties
                            size: 14
                        }
                    },
                    tick: {
                        font: {
                            size: 12
                        }
                    },
                    grid: {
                        color: '#6c767e'
                    }
                }
            },
            plugins: {                       // display options for title and legent
                title: {
                    display: true,      //display chart title
                    text: 'Force on the Hand for Different Trial Conditions',
                    font: {
                        size: 24, 
                    },
                    color: '#black',
                    padding: {
                        top: 10,
                        bottom: 30
                    }

                },
                legend: {
                    align: 'start',
                    position: 'bottom',
                }
            }
        }
    });
}


createDataChart();