const request = require('request')

const Legislator = require('../models/legislators')

const URI = 'https://congress.api.sunlightfoundation.com'

const capitalize = (text) => {
    return text.charAt(0).toUpperCase() + text.slice(1)
}

const formatParty = (party) => {
    switch (party) {
        case 'R':
            return 'Republican'
            break
        case 'D':
            return 'Democrat'
            break
        case 'I':
            return 'Independent'
            break
        default:
            return 'No associated party'
    }
}

const getRecentVotes = (id) => {
    return new Promise((resolve, reject) => {
        let options = {
            url: `${URI}/votes?fields=voter_ids,question,bill&voter_ids.${id}__exists=true&bill_id__exists=true`,
            headers: {
                'User-Agent': 'request'
            }
        }
        class Vote {
            constructor(bill_id, official_title, url, question, vote){
                this.bill_id = bill_id
                this.official_title = official_title
                this.url = url
                this.question = question
                this.vote = vote
            }
        }
        let voteInfo = []

        request(options, (error, response, body) => {
            if (!error && response.statusCode == 200) {
                let results = JSON.parse(body)
                results.results.map((voteData) => {
                    voteInfo.push(
                        new Vote(
                            voteData.bill.bill_id,
                            voteData.bill.official_title,
                            voteData.bill.urls.congress,
                            voteData.question,
                            voteData.voter_ids[id]
                        )
                    )
                })
                resolve(voteInfo)
            } else {
                reject(error)
            }
        })
    })
}

const mapLegislators = (legislator) => {
    return new Promise((resolve, reject) => {
        // results.results.map((legislators) => {
            getRecentVotes(legislator.bioguide_id)
                .then((voteResults) => {
                    return new Legislator(
                        `https://theunitedstates.io/images/congress/original/${legislator.bioguide_id}.jpg`,
                        `${legislator.first_name} ${legislator.last_name}`,
                        capitalize(legislator.chamber),
                        formatParty(legislator.party),
                        voteResults
                    )
                })
                .then((mappedLegislator) => resolve(mappedLegislator))
        // })
    })
}

const sunlightAPI = {
    getLegistlatorByZip: (zip) => {
        return new Promise((resolve, reject) => {
            if (!(/^\d{5}(?:[-\s]\d{4})?$/.test(zip))) {
                reject('Not a valid zip!')
            } else {
                let options = {
                        url: `${URI}/legislators/locate?zip=${zip}`,
                        headers: {
                            'User-Agent': 'request'
                        }
                    }

                    request(options, (error, response, body) => {
                        if (!error && response.statusCode == 200) {
                            let results = JSON.parse(body)
                            let legislatorList = []

                            results.results.map((legislator) => {
                                getRecentVotes(legislator.bioguide_id)
                                    .then((votes) => {
                                        legislatorList.push(
                                            legislator,
                                            votes
                                        )
                                    })
                                    .then(() => resolve(legislatorList))
                                // legislatorList.push(
                                //     legislator,
                                //     getRecentVotes(legislator.bioguide_id)
                                // )
                                // mapLegislators(legislator)
                                //     .then((result) => {
                                //         resolve(result)
                                //     })
                            })
                            // resolve(legislatorList)

                            // results.results.map((legislatorResult) => {
                            //     getRecentVotes(legislatorResult.bioguide_id)
                            //         .then((voteResults) => {
                            //             legislatorList.push(
                            //                 new Legislator(
                            //                     `https://theunitedstates.io/images/congress/original/${legislatorResult.bioguide_id}.jpg`,
                            //                     `${legislatorResult.first_name} ${legislatorResult.last_name}`,
                            //                     capitalize(legislatorResult.chamber),
                            //                     formatParty(legislatorResult.party),
                            //                     voteResults
                            //                 )
                            //             )
                            //             console.log(legislatorList.length)
                            //         })
                            // })
                        } else {
                            reject(error)
                        }
                    })
            }
        })
    },
    getLegislatorByID: (id) => {
        return new Promise((resolve, reject) => {
            let options = {
                url: `${URI}/legislators?bioguide_id=${id}`,
                headers: {
                    'User-Agent': 'request'
                }
            }

            request(options, (error, response, body) => {
                if (!error && response.statusCode == 200) {
                    let results = JSON.parse(body)
                    resolve(results)
                } else {
                    reject(error)
                }
            })
        })
    },
    getRecentVotesByID: (id) => {
        return new Promise((resolve, reject) => {
            let options = {
                url: `${URI}/votes?fields=voter_ids,question,bill&voter_ids.${id}__exists=true&bill_id__exists=true`,
                headers: {
                    'User-Agent': 'request'
                }
            }

            request(options, (error, response, body) => {
                if (!error && response.statusCode == 200) {
                    let results = JSON.parse(body)
                    resolve(results)
                } else {
                    reject(error)
                }
            })
        })
    }
}

module.exports = sunlightAPI