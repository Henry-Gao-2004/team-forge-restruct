
import { autocomplete } from "./autocomplete.js";
import { dtos, getDict } from "./dict.js";
import { select } from "./select.js";

function testSelect() {
    var dict = getDict("skills");
    console.log("Dictionary: \n" + dtos(dict));
    console.log("autocomplete j: " + autocomplete(dict, "j"));
    console.log("select JavaScript");
    select(dict, "JavaScript");
    console.log("autocomplete j: " + autocomplete(dict, "j"));
    console.log("select Java");
    select(dict, "Java");
    console.log("autocomplete j: " + autocomplete(dict, "j"));
    console.log("\nDictionary: \n" + dtos(dict));
}

// test the functions
testSelect();