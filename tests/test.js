const prepaid = require('../index');


async function test() {
    prepaid.signInWithApi("", "").then(function() {
        setInterval(testBalance, 10000);
    }).catch((err) => {
        console.log(err);
    });
}


async function testBalance() {
    prepaid.getBalance().then(function(balance) {
        console.log(balance);
    }).catch((err) => {
        console.log(err);
    });
}
test();