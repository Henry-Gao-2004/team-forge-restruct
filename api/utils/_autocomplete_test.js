import * as process from 'process';
import { autocomplete } from "./_autocomplete.js";
import { getDict } from './_dict.js';


// tests autocomplete on several words
function testAutocomplete() {
    var dict = getDict("skills");
    var argi = 2;
    while (process.argv[argi] != null) {
        console.log("test autocomplete on " + process.argv[argi] + ": " + autocomplete(dict, process.argv[argi++]) + "\n");
    }
}

// test the functions
testAutocomplete();