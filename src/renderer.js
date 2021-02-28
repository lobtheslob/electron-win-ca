module.exports = function getCerts(tick) {
    const ca = require('win-ca/api')
    const withOut = require('without')
    const forge = require('node-forge')
    const $ = require('jquery')



    fetch()
        .then(render)
        .then(returnData)

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
        console.log(list)
            //cert = forge.pki.certificateFromPem(pem)
            //document.body.innerHTML = withOut(button(pem))
        return returnCerts(list)
    }

    function render(list) {
        document.body.innerHTML = withOut(renderButtons)(list)
    }

    let cert
    let subject
    let msg
    var obj
        //let count = 0;

    function returnCerts(roots) {
        for (let pem of roots) {
            cert = forge.pki.certificateFromPem(pem)
            issurer = cert.issuer.attributes
                .map(attr => ['', attr.value].join(': '))
                .join(', ');

            subject = cert.subject.attributes
                .map(attr => [attr.shortName ? attr.shortName.toString() : null, attr.value].join('='))
                .join(', ');
            var json = JSON.stringify(issurer);
            console.log(json)
            return json
        }
    }

    function renderButtons(roots) {
        for (let pem of roots) {
            //msg = forge.pem.decode(pem)[count]
            // convert DER to ASN.1 object
            //obj = forge.asn1.fromDer(msg.body);
            cert = forge.pki.certificateFromPem(pem)
            issurer = cert.issuer.attributes
                .map(attr => ['', attr.value].join(': '))
                .join(', ');

            subject = cert.subject.attributes
                .map(attr => [attr.shortName ? attr.shortName.toString() : null, attr.value].join('='))
                .join(', ');
            //        console.log("issuer typer: ", typeof issurer);
            filterStrSub = subject.includes("affiliate")
            filterStrIss = issurer.includes("Veterans")
            if (filterStrSub && filterStrIss) {
                button(subject)
            }
        }
    }
}