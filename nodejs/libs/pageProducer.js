var DiceRoller = require('../libs/roller.js');
var url = require('url');

var roller = function(qs){
    var num = 0;
    var nsides =0;

     if (qs != null){ 
      var queryArray = qs.split('&');
      var qa0 = queryArray[0].split('=');
      var qa1 = queryArray[1].split('=');
      num = parseInt(qa0[1], 10);
      nsides = parseInt(qa1[1], 10);
    } 
    else {
      num=1;
      nsides=2;
    } 
    let dice = new DiceRoller(num,nsides);
    console.log(dice.responseString);
    var result = dice.responseString;

    return result;
}

var header = function(){
    
    var str = `
    <!DOCTYPE html>
    <html>
    <head>
    <title>diceRoller | LBS+NAT</title> 
    <link rel="stylesheet" href="../inc/style.css">
    </head>
    `;
    return str;
}

var footer = function(){
    var str=`
    <div class="footer">
    <a href="https://www.flaticon.com/free-icons/open-menu" title="open menu icons">Open menu icons created by Pixel perfect - Flaticon</a>
    </div>
    <body>
    </html>
    `;
    return str;
}

var navbar = function(){
    var str=`
    <body>
    <div class="collapsible">
        <input type="checkbox" id="menu">
        <label for="menu">Menu</label>
        <div class="menu-content">
            <ul>
                <li><a href="/">Roller Options</a></li>
                <li><a href="/about">About</a></li>
            </ul>
        </div>
    </div>
    <br />
    `;
    return str;
}

exports.home =function(){
    var str = header() + navbar()+`
    <div id="mainContainer">
    <h3>Dice Options</h3>
    <form id="diceOptionsFrm" action="/diceRoller" method="GET">
    <label for="num">Number of Dice:</label>
    <select id="num" name="num" type="number">
        <option value="1">1</option>
        <option value="5" selected>5</option>
        <option value="10">10</option>
        <option value="20">20</option>
    </select>
    <br />
    <label for="nsides">Number of Sides:</label>
    <select id="nsides" name="nsides" type="number">
        <option value="2">2</option>
        <option value="6">6</option>
        <option value="12">12</option>
        <option value="20" selected>20</option>
    </select><br />
    <input id="submitBtn" type="submit" value="Roll Dice!">
    </form></div>
    ` + footer();
    return str;
}

exports.diceRoller = function(qs){
    var result = roller(qs);
    result = result.slice(1);
    result = result.slice(0, result.length - 1);
    const resultArray = result.split(',');
    console.log(resultArray); 
    var resultDisplay = "";
    var dieStr ="";
    var rollStr="";
    
    for (let i = 0; i < resultArray.length; i++) {
        dieStr += "<td>"+ (i+1) +"</td>";
        rollStr += "<td>"+resultArray[i]+"</td>";
    }

    var str = header() + navbar()+`
    <div id="mainContainer">
    <h3>Die Roll Results</h3>
    <table id="diceResultsTbl">
        <tr id="trDie">
        <td>Die</td>`+dieStr+`
        </tr>
        <tr id="trRoll">
        <td>Roll</td>`+rollStr+`
        </tr>
    </table>
    <br>
    <a class="linkBtn" href="`+qs+`">Roll Again</a>
    <a class="linkBtn" href="/">Back to options</a>
    </div>
    `+footer();
    return str;
}

exports.about = function(){
    var str= header()+navbar()+ `
    <h3>About diceRoller</h3>
    <p>This dice rolling app was built by Lloyd Business Services LLC as a demonstration of a (very) basic node.js web app.  </p>
    <p>It implements some basic routing to serve the relevant files and code.</p>
    <p> Open menu icons created by: <a href="https://www.flaticon.com/free-icons/open-menu" title="open menu icons">Pixel perfect - Flaticon</a></p>
    <p id="rollBtn"><a href="/">Back to home</a></p>
    `+footer();
    return str;
}