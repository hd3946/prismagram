import { searchTopic } from "../../twitterapi";

//console.log(searchTopic('twice',1234));

export default {
    Query: {
        search:(_, { q,count }) => searchTopic(q,count)
      }
  };
