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
let ans = "";
for(let i = 1; i <= 6101; i++) {
  try {
    var res = request('GET', 'https://e-mehkeme.gov.az/Public/Cases?page='+i,{
      timeout:2000
    });
    let s = res.getBody()+"";
    //let indexb = s.indexOf('<table class="table table-stripped table-bordered table-condenced table-hover" id="Cases">')
    let indexb = 33634;
    let indexe = s.indexOf('<td colspan="2">');
    ans += s.substring(indexb, indexe) + i+"^^^^";
    console.log(indexe + "---------------------" +i+"-------");
  } catch (e) {
    i--;
  } finally {

  }

}
var fs = require('fs');
fs.writeFile("pages.txt", ans, function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
});
