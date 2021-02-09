const ca = require('win-ca/api')
const withOut = require('without')
const forge = require('node-forge')


fetch().then(render)

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

function render(list) {
    //cert = forge.pki.certificateFromPem(pem)
    //document.body.innerHTML = withOut(button(pem))
    document.body.innerHTML = withOut(t)(list)
}

let cert
let subject
let msg
var obj
    //let count = 0;

function t(roots) {
    for (let pem of roots) {
        //msg = forge.pem.decode(pem)[count]
        // convert DER to ASN.1 object
        //obj = forge.asn1.fromDer(msg.body);
        cert = forge.pki.certificateFromPem(pem)
        subject = cert.subject.attributes
            .map(attr => [attr.shortname, attr.value].join('='))
            .join(', ');
        button(subject)
            //count++
            //textarea(pem)
    }
}