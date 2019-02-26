const express = require('express');
const bp = require('body-parser');
const Twitter = require('twitter');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(bp.urlencoded({ extended: false }));
app.use(bp.json());

const twitterAPI = new Twitter({
  consumer_key: 'ffb8Sc2OmYPsCVi0O9xa8fC7U',
  consumer_secret: 'vzbagOURxzDmI55g1C6lU7rI1BQAYjpZUZXwEUA5TL5rVuR5As',
  access_token_key: '175254675-zf1n7VzVCk30MYMt6VyrD9gVV3UAFdKQP9vRpyvb',
  access_token_secret: 'ZJH4XCevAN2qh6cxfCWVsth57PZusXgiirIZWeOLHIcXp'
});

// Routes
app.post('/api/friends', async (req, res) => {
  const { userHandle, targetHandle } = req.body;
  const friendsToUnfollow = [];

  const params = { screen_name: userHandle };
  const friendsResp = await twitterAPI
    .get('friends/list', params)
    .catch(err => {
      console.log('GET friends/list error', err);
    });
  let friends = friendsResp.users;

  // Loop through friends
  friends.forEach(async friend => {
    const params = {
      source_screen_name: friend.screen_name,
      target_screen_name: targetHandle
    };
    // Determine relationship w/ target user
    const friendshipsResp = await twitterAPI
      .get('friendships/show', params)
      .catch(err => {
        console.log('GET friendships/show error', err);
      });
    const relationship = friendshipsResp.relationship;
    // If friend follows target, add them to unfollow list
    if (relationship.target.followed_by === true) {
      friendsToUnfollow.push(friend);
      res.send(friendsToUnfollow); //TODO: Move res.send outside forEach loop
    }
  });

  // res.send(friendsToUnfollow); // sends empty []
});

// Start server
const port = process.env.PORT || 8001;

app.listen(port, () => {
  console.log('Server listening on port', port);
});

// app.get('/api/auth/twitter/callback', twitterAuth, async (req, res) => {
//   req.user.friendsToUnfollow = []; // req.user === auth'd Twitter user

//   // Get user's friends
//   const params = { user_id: req.user.id, count: 200 };
//   const friendsResp = await twitter.get('friends/list', params).catch(err => {
//     console.log('GET friends/list error', err);
//   });
//   let friends = friendsResp.users;

//   // Loop through friends
//   friends.forEach(async friend => {
//     const params = {
//       source_screen_name: friend.screen_name,
//       target_screen_name: 'realDonaldTrump'
//     };
//     // Determine relationship w/ target celebrity
//     const friendshipsResp = await twitter
//       .get('friendships/show', params)
//       .catch(err => {
//         console.log('GET friendships/show error', err);
//       });
//     const relationship = friendshipsResp.relationship;
//     // If friend follows target, add them to unfollow list
//     if (relationship.target.followed_by === true) {
//       req.user.friendsToUnfollow.push(friend);
//       io.emit('user', req.user);
//     }
//   });

//   res.end();
// });
