function getCerts() {

    const ca = require('win-ca/api')
    const forge = require('node-forge')

    fetch()
        .then(passList)

    function fetch() {
        var list = []
        return new Promise(resolve => {
                ca({
                    store: 'My',
                    async: true,

                    format: ca.der2.pem,
                    ondata: list,
                    onend: resolve
                })
            })
            .then(_ => list)
    }


    function passList(list) {
        let timer = setInterval(_ => {
            clearInterval(timer)
        }, 1000)
        return scrapeCerts(list)
    }

    function scrapeCerts(roots) {
        for (let pem of roots) {
            cert = forge.pki.certificateFromPem(pem)

            issuer = cert.issuer.attributes
                .map(attr => ['', attr.value].join(': '))
                .join(', ');

            subject = cert.subject.attributes
                .map(attr => ['', attr.value].join('='))
                .join(', ');

            filterStrSub = subject.includes("affiliate")
            filterStrIss = issuer.includes("Veterans")
            regex = /\d{10,}/g; //look for 10 or more consecutive digits --> source: https://riptutorial.com/regex/example/5023/matching-various-numbers
            filterbigNums = subject.match(regex)
            feduid = ''
            if (filterStrSub && filterStrIss && filterbigNums) {
                console.log(subject)

                console.log('regex match for large #s: ', filterbigNums) //regex .match returns array, get 1st val in arr
                    // console.log(issuer)
                feduid = filterbigNums[0] //regex .match returns array, get 1st val in arr
                console.log('feduid: ', feduid)
            }
        }
    }
}

module.exports = getCerts;