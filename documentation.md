# What Have You Done Project
This project uses info from the Sunlight Foundation API in an app where you can look up members of the Senate and House by zip code and see how they voted on certain bills.

Demo:
https://what-have-you-done.herokuapp.com

Viking Assignment Page:
https://www.vikingcodeschool.com/dashboard#/professional-development-with-javascript/project-walkthrough-professional-javascript

Viking Repo:
https://github.com/vikingeducation/project_what_have_you_done

My Heroku Deployment:
https://frozen-brushlands-61850.herokuapp.com



## Sunlight Foundation API info
https://sunlightlabs.github.io/congress/index.html
Though the docs say we need an API key, this is no longer true


### Legislators
Documentation:
https://sunlightlabs.github.io/congress/legislators.html#fields

API Call:
https://congress.api.sunlightfoundation.com/legislators/locate?zip=${zip}

Images:
https://theunitedstates.io/images/congress/225x275/${legislator.bioguide_id}.jpg


### Bills
Documentation:
https://sunlightlabs.github.io/congress/bills.html

API Call:
https://congress.api.sunlightfoundation.com/bills?fields=bill_id,congress,number,official_title,summary



### Votes
Documentation:
https://sunlightlabs.github.io/congress/votes.html

API Calls:
https://congress.api.sunlightfoundation.com/votes?fields=bill_id,congress,vote_zipUri,year,question,result,voter_ids&vote_type=passage&voter_ids.${legislator.bioguide_id}__exists=true



## Additional Data Sources
https://github.com/unitedstates/