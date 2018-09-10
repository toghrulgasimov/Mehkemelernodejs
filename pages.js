// var request = require('request');
//
// function doRequest(url) {
//   return new Promise(function (resolve, reject) {
//     request(url, function (error, res, body) {
//       if (!error && res.statusCode == 200) {
//         resolve(body);
//       } else {
//         reject(error);
//       }
//     });
//   });
// }
// async function main(url, i) {
//   console.log(i);
//   let res = await doRequest(url);
//   console.log(i);
// }
//
// for(let i = 10; i <= 20; i++) {
//   main('https://e-mehkeme.gov.az/Public/Cases?page='+i, i);
// }

var request = require('sync-request');
var fs = require('fs');
let ans = "";
let bound = 6101;
for(let i = 1; i <= bound; i++) {
  try {
    var res = request('GET', 'https://e-mehkeme.gov.az/Public/Cases?page='+i,{
      timeout:2000
    });
    let s = res.getBody()+"";
    //let indexb = s.indexOf('<table class="table table-stripped table-bordered table-condenced table-hover" id="Cases">')
    let indexb = 33634;
    let indexe = s.indexOf('<div id="CasesPager" class="centered">');
    ans += s.substring(indexb, indexe) + i+"^^^^";
    console.log(indexe + "---------------------" +i+"-------");
    if(i % 100 == 0) {
      fs.appendFileSync("pages.txt", ans, function(err) {
          if(err) {
              return console.log(err);
          }

          console.log("The file was saved!");
      });
      ans = "";
    }
  } catch (e) {
    i--;
  } finally {

  }

}
