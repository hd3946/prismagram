import { searchTopic , searchUser } from "../../twitterapi";

//console.log(searchTopic('twice',1234));

export default {
    Query: {
        searchU:(_, { q }) => searchUser(q),
        search:(_, { q,count }) => searchTopic(q,count)
      }
  };
