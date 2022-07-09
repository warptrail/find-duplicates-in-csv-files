const fs = require("fs");
const csv = require("csv-parser");



 function compareLists() {
  const a = [];
  const b = [];

  // a is the kessik drive from Mac OS
  fs.createReadStream("./data_a.csv")
  .pipe(csv())
  .on("data", function(data){
    try {
      a.push(data.directory);
      console.log("directory is:", data.directory);
    } catch (err) {
      console.error(err);
    }
  }).on("end", function(){
    // do nothing
    // go to next parse
  });

  // b is from windows with the root file directory
  // we need to slice the first 10 characters off to get the proper directory names
  fs.createReadStream("./data_b.csv")
  .pipe(csv())
  .on("data", function(data){
    try {
      b.push(data.directory.slice(10));
      console.log("directory is:", data.directory.slice(10));
    } catch (err) {
      console.error(err);
    }
  }).on("end", function(){

    // find the dublicates
    // const duplicates = a.filter((val) => b.indexOf(val) != -1);

    // one way intersections comparing a to b
    // const intersection = a.filter((val) => !b.includes(val));

    // two way intersection finding what is not equal of the two arrays
    const difference = a.filter(x => !b.includes(x))
    .concat(b.filter(x => !a.includes(x)));
    console.log(difference);
  });


}


compareLists();


