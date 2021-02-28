const ca = require('win-ca/api')
const forge = require('node-forge')
 
fetch()
    //  .then(returnData)
    .then(render)
 
function fetch() {
    var list = []
    return new Promise(resolve => {
            ca({
                store: 'My',
                async: true,
                //format: ca.der2.txt,
                format: ca.der2.pem,
                //format: ca.der2.der,
                ondata: list,
                onend: resolve
            })
        })
        .then(_ => list)
}
 
function returnData(list) {
    //cert = forge.pki.certificateFromPem(pem)
    //document.body.innerHTML = withOut(button(pem))
    return returnCerts(list)
}
 
function render(list) {
 
    //cert = forge.pki.certificateFromPem(pem)
    //document.body.innerHTML = withOut(button(pem))
    // document.body.innerHTML = withOut(t)(list)
    return t(list)
 
}
 
let cert
let subject
let msg
var obj
    //let count = 0;
 
function returnCerts(roots) {
    for (let pem of roots) {
        //msg = forge.pem.decode(pem)[count]
        // convert DER to ASN.1 object
        //obj = forge.asn1.fromDer(msg.body);
        cert = forge.pki.certificateFromPem(pem)
        console.log({ cert })
 
        issuer = cert.issuer.attributes
            .map(attr => ['', attr.value].join(': '))
            .join(', ');
 
        subject = cert.subject.attributes
            .map(attr => [attr.shortName ? attr.shortName.toString() : null, attr.value].join('='))
            .join(', ');
        //var json = JSON.stringify(issuer);
 
        //   console.log(subject)
 
        //return json
        //count++
        //textarea(pem)
    }
}
 
function t(roots) {
    for (let pem of roots) {
        //msg = forge.pem.decode(pem)[count]
        // convert DER to ASN.1 object
        //obj = forge.asn1.fromDer(msg.body);
        cert = forge.pki.certificateFromPem(pem)
        issuer = cert.issuer.attributes
            .map(attr => ['', attr.value].join(': '))
            .join(', ');
 
        // subject = cert.subject.attributes
        //     .map(attr => [attr.shortName ? attr.shortName.toString() : null, attr.value].join('='))
        //     .join(', ');
        subject = cert.subject.attributes
            .map(attr => ['', attr.value].join('='))
            .join(', ');
        //        console.log("issuer typer: ", typeof issuer);
        filterStrSub = subject.includes("affiliate")
        filterStrIss = issuer.includes("Veterans")
        regex = /\d{10,}/g; //look for 10 or more consecutive digits --> source: https://riptutorial.com/regex/example/5023/matching-various-numbers
        filterbigNums = subject.match(regex)
        feduid = ''
        if (filterStrSub && filterStrIss && filterbigNums) {
            // var json = JSON.stringify(subject);
            // console.log(json)
            // return json
            //button(subject)
            console.log(subject)
            
            console.log('regex match for large #s: ', filterbigNums) //regex .match returns array, get 1st val in arr
            // console.log(issuer)
            feduid = filterbigNums[0] //regex .match returns array, get 1st val in arr
            console.log('feduid: ', feduid)
        }
        
        //count++
        //textarea(pem)
    }
}