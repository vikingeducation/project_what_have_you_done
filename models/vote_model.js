class Vote {
  // Take the full results object and parse it into useful fields for the views
  constructor(params, bioguide_id) {
    this.billId = params.bill_id,
    this.result = this.resultConverter(params.result),
    this.legislatorId = bioguide_id,
    this.legislatorVote = this.voteParser(params.voter_ids, bioguide_id)
  };

  voteParser(voterIds, bioguide_id){
    switch (voterIds[bioguide_id]) {
      case 'Yea':
        return 'Yes'
        break;
      case 'Nay':
          return 'No'
          break;
      default:
       return voterIds[bioguide_id];
    }
  };

  resultConverter(apiResult){
    apiResult = apiResult.toLowerCase();
    if (apiResult.includes('pass') || apiResult.includes('agree')) {
      return 'Passed'
    } else if (apiResult.includes('fail')) {
      return 'Failed'
    } else {
      return apiResult
    }
  };

} // close Vote


// return the class for use in other files
module.exports = {
  Vote
};