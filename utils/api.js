const request = require('request')

const Legislator = require('../models/legislators')
const Vote = require('../models/votes')

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

const addLegislator = (legislator) => {
    return new Legislator(
        legislator.bioguide_id,
        `https://theunitedstates.io/images/congress/original/${legislator.bioguide_id}.jpg`,
        `${legislator.first_name} ${legislator.last_name}`,
        capitalize(legislator.chamber),
        formatParty(legislator.party),
        legislator.phone,
        legislator.website
    )
}

const sunlightAPI = {
    getLegistlatorByZip: (zip) => {
        return new Promise((resolve, reject) => {
            if (!(/^\d{5}(?:[-\s]\d{4})?$/.test(zip))) {
                reject('Not a valid zip!')
            }
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

                    // Format the fields
                    results.results.map((legislator) => {
                        legislatorList.push(
                            addLegislator(legislator)
                        )
                    })

                    resolve(legislatorList)
                } else {
                    reject(error)
                }
            })
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
                    
                    // Format the fields
                    let legislator = addLegislator(results.results[0])

                    resolve(legislator)
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

                    let voteInfo = []

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
}

module.exports = sunlightAPI