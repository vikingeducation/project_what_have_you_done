class Vote {
    constructor(bill_id, official_title, url, question, vote){
        this.bill_id = bill_id
        this.official_title = official_title
        this.url = url
        this.question = question
        this.vote = vote
    }
}

module.exports = Vote