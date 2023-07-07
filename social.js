// Implement the SocialNetwork class here
class SocialNetwork {
  constructor() {
    this.users = {};
    this.follows = {};
    this.currentID = 0;
  }

  addUser(name) {
    let user = {};
    this.currentID++;

    user["id"] = this.currentID;
    user["name"] = name;

    this.follows[this.currentID] = new Set();
    this.users[this.currentID] = user;

    return user["id"];
  }

  getUser(userID) {
    if (this.users[userID]) return this.users[userID];

    return null;
  }

  follow(userID1, userID2) {
    if (this.users[userID1] && this.users[userID2]) {
      this.follows[userID1].add(userID2);
      return true;
    } else {
      return false;
    }
  }

  getFollows(userID) {
    return this.follows[userID];
  }

  getFollowers(userID) {
    let result = new Set();

    for (let user in this.follows) {
      let followsSet = this.follows[user];
      if (followsSet.has(userID)) {
        result.add(Number(user));
      }
    }

    return result;
  }

  getRecommendedFollows(userID, degrees) {
    let queue = [[userID]]; // [[1]]
    let distance = 0;
    let visited = new Set();
    let result = [];

    while (queue.length > 0) {
      let currPath = queue.shift(); // [1]
      let lastNode = currPath[currPath.length - 1]; // 1

      if (!visited.has(lastNode)) {
        visited.add(lastNode);

        if (distance > 1 && distance <= degrees + 1) {
          result.push(lastNode);
        }

        let followsList = this.getFollows(userID);

        for (let follow of followsList) {
          console.log('hey')
          let newPath = currPath.concat(follow);
          queue.push(newPath);
          distance++;
          console.log(distance)
        }
      }
    }

    return result;
  }
}

module.exports = SocialNetwork;
let facebook = new SocialNetwork();

facebook.addUser("mary");
facebook.addUser("jack");
facebook.addUser("mark");
facebook.addUser("elton");
facebook.addUser("kelly");
facebook.addUser("keiran");

facebook.follow(1, 2);
facebook.follow(2, 3);
facebook.follow(3, 4);
facebook.follow(3, 5);
facebook.follow(4, 1);
facebook.follow(4, 2);
facebook.follow(5, 6);

facebook.getFollows(1); // [2]
facebook.getFollows(2); // [3]
facebook.getFollows(3); // [4, 5]
facebook.getFollows(4); // [1, 2]
facebook.getFollows(5); // [6]

// console.log(facebook.getRecommendedFollows(1, 1)); // [3]
// console.log(facebook.getRecommendedFollows(1, 2)); // [3, 4, 5]
console.log(facebook.getRecommendedFollows(1, 3)); // [3, 4, 5, 6]
