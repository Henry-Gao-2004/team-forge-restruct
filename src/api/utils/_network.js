const { search } = require("./_search.js");
var adj = 0;
var groupResult = [];

// sample user object
const user = {
    id: 0,
    name: '',
    skills: {},
    interests: [],
    availability: [], // "hh:mm-hh:mm;hh:mm-hh:mm;hh:mm-hh:mm"
    relation: [] // the id of the users who the user wants to work with
}

// forms a group of {size} for user {id}
// param users: Map: contains all information with the id as the key
// param id: int: id of the user
// param size: int: size of group
// param pref: Pref: user's preference
// filter filter: Filter: the search filter
// return list: array: the id of the students in the group
function group(users, id, size, pref) {
    if (adj === 0)
        preprocess(users);
    var list = groupByRelation(id, size);
    if (list.length == size) return getInfo(list);
    console.log("continue");
    var res = search(users, adj.get(id), pref);
    console.log(JSON.stringify(res));
    for (var i = 0; i < res.length && list.length < size; i++) {
        if (list.includes(res[i].id)) continue;
        list.push(res[i].id);
    }
    return getInfo(list);
}

// forms a group of {size} for user {id} (based on relations)
// if there are not enough people, return an array of smaller size
function groupByRelation(id, size) {
    var visited = [];
    var queue = [];
    visited.push(id);
    queue.push(id);

    while (queue.length != 0) {
        var cur = queue.shift(); // pop the first element
        console.log(cur);
        console.log(JSON.stringify(adj.get(cur)));
        for (var dest of adj.get(cur).relation) {
            // adds unvisited nodes
            if (!visited.includes(dest.id)) {
                visited.push(dest.id);
                queue.push(dest.id);
                if (visited.length == size)
                    return visited;
            }
        }
    }
    return visited;
}

// preprocess: 
//  builds the adj map
function preprocess(users) {
    adj = build(users);
}

// builds the user map
function build(users) {
    console.log("users: " + JSON.stringify(users));
    console.log("preprocess");
    var adj = new Map(); // adjacent matrix

    // map each user with the id
    for (var idx = 0; idx < users.length; idx++) {
        var user = users[idx];
        adj.set(user.id, user);
        console.log("connect " + user.id);
    }
    for (var user of users.values()) {
        // go through all users the current user wants to work with
        for (var id of user.relation) {
            if (!adj.get(id).relation.includes(user.id))
                adj.get(id).relation.push(user.id);
        }
    }
    return adj;
}

// get the info using the id
function getInfo(ids) {
    var infoList = []; // the list of user informations
    for (var id of ids) {
        infoList.push(adj.get(id));     // adj is a map, so this does not take long
    }
    return infoList;
}


module.exports = {
    group,
};
