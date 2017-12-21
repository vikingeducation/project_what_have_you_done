class Vote {
  constructor(obj, i) {
    this.billNumber = obj.results[0].votes[i].bill.number;
    this.description = obj.results[0].votes[i].description;
    this.question = obj.results[0].votes[i].question;
    this.result = obj.results[0].votes[i].result;
    this.date = obj.results[0].votes[i].date;
    this.time = obj.results[0].votes[i].time;
    this.totalYes = obj.results[0].votes[i].total.yes;
    this.totalNo = obj.results[0].votes[i].total.no;
    this.notVoting = obj.results[0].votes[i].total.not_voting;
    this.position = obj.results[0].votes[i].position;
  }
}

module.exports = {
  Vote
}
