let fs = require("fs");
var request = require('sync-request');
let s = fs.readFileSync("pages.txt","UTF-8");

let ar = s.split("^^^^");

let D = {};
for(let i = 0; i < 11; i++) {
  D[i] = new Set();
}
let ans = "";
let cnt = 0;
let VALUES = new Set();
for(let i = 0; i < ar.length-2; i++) {

  let t = ar[i].split('style="cursor: pointer;"');
  for(let j = 1; j < 11; j++) {

    //console.log(t[j]);
    let vi = t[j].indexOf('value')
    let orti = t[j].indexOf('<td style="width:260px;">');

    let ve = t[j].indexOf('"',vi+7);
    let value = t[j].substring(vi+7, ve);
    let ortb = orti+35+8;
    let ii = t[j].indexOf( "</td>",ortb);
    let ort = t[j].substring(ortb,ii-13);
    if(VALUES.has(value)) continue;
    try {
      var res = request('GET', 'https://e-mehkeme.gov.az/Public/CaseDetail?caseId='+value,{
        timeout:3000
      });
      let s = res.getBody()+"";
      ans += s + "@@@@@@"+ort+"^^^^";
      cnt++;
      VALUES.add(value);
      console.log(cnt + " " + value);
      if(cnt % 100 == 0) {
        fs.appendFileSync("data.txt", ans, function(err) {
            if(err) {
                return console.log(err);
            }

            console.log("The file was saved!");
        });
        ans = "";
      }
    } catch (e) {
      j--;
      //console.log(e);
    } finally {

    }


  }
}
