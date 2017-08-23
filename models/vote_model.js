class Vote {
  // Take the full results object and parse it into useful fields for the views
  constructor(params, bioguide_id) {
    this.billId = params.bill_id,
    this.result = params.result,
    this.legislatorId = bioguide_id,
    this.legislatorVote = this.voteParser(params.voter_ids, bioguide_id)
  };

  voteParser(voterIds, bioguide_id){
    return voterIds[bioguide_id];
  }

} // close Vote


// return the class for use in other files
module.exports = {
  Vote
};