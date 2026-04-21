# exercise-log-js

A js refresher project.

## Summary 

I have a personal project (in Ruby) for tracking my workouts: https://github.com/jordanmarchetto/exercise-log

This repo is an api (node.js) and a frontend (react-native) for that same app/db.  The node server from this repo gets deployed on my webserver, where it has access to the same DB from the other app.  

On push to main, the api gets deployed to my webserver via a docker image, and then via `mydomain.com -> cloudflared -> webserver -> reverseproxy`, the api is publicly available. The mobile app can be built with expo and then use that public api route to pull the data for its view.

There's absolutely nothing remarkable about this.  I just wanted to remember how to write JS apis, and learn how to deploy a react-native app to my actual phone.  The react part is a tad vibe-coded, cause it's a brand new technology to me.

**Note**: it turns out that learning new stuff is actually kind of annoying now.  Everything has AI/autocomplete stuff built-in already, so it's hard to actually _learn_.  I was very intentional about what I let my AI-pals do here: speed up stuff I know well, give examples for new stuff, let me struggle through stuff I'm hazy on.
