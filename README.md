# change.OrgPetitionSignBot
Using a temporary Email, we can run a bot that will sign a petition. Apparently they dont check the validity of the email.

# INSTALL
Install Node.js , version > 7.6
We are using Async/Await whose support comes in 7.6 version.

Run `npm install`

On linux, the default executable name is `nodejs`. Run script accordingly.

Run `node app.js YOUR_PETITION_URL NUM_OF_TIMES`

Example `node app.js http://chn.ge/asdwu33 5` will sign the petition at http://chn.ge/asdwu33 5 times.
