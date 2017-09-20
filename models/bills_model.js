class Bills {
  constructor(params, bioguide_id) {
    this.bill = params.bill,
    this.billId = this.bill.bill_id,
    this.legislatorId = bioguide_id,
    this.legislatorVote = this.billParser(params.voter_ids, bioguide_id),
    this.summary = this.bill.official_title,
    this.congress = this.bill.congress,
    this.number = this.bill.number,
    this.bill_type = this.bill.bill_type


    /*for (var field in params.bill) {
      console.log("Field: " + field);
    }
    
    Field: bill_id
    Field: bill_type
    Field: chamber
    Field: committee_ids
    Field: congress
    Field: cosponsors_count
    Field: enacted_as
    Field: history
    Field: introduced_on
    Field: last_action_at
    Field: last_version
    Field: last_version_on
    Field: last_vote_at
    Field: number
    Field: official_title
    Field: popular_title
    Field: related_bill_ids
    Field: short_title
    Field: sponsor
    Field: sponsor_id
    Field: urls
    Field: withdrawn_cosponsors_count
    */
  };


  billParser(voterIds, bioguide_id){
    switch (voterIds[bioguide_id]) {
      case 'Yea':
        return 'vote-Yea'
        break;
      case 'Nay':
          return 'vote-Nay'
          break;
      default:
       return voterIds[bioguide_id];
    }
  };

} 

module.exports = Bills;