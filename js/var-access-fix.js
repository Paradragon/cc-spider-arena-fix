// A stand-alone function is defined, because we didn't manage to 
// call the obfuscated one, available in the game engine 
// The logic is slightly different, but output is the same
function convertToLocaleString(str) {
    
    var delimiter = ig.LANG_DETAILS[ig.currentLang] 
    && ig.LANG_DETAILS[ig.currentLang].commaDigits 
    ? "." : ",";

    var rgx = /(\d+)(\d{3})/;
    
    str = str.toString(); // Ensures that we have a string object
    while (rgx.test(str)) {
        str = str.replace(rgx, "$1" + delimiter + "$2");
    }

    return str;
}

sc.MenuModel.inject({
    onVarAccess(d, c) {
        // We need to run our code before parent() to ensure that fixed 
        // variable access logic is executed first
        if (c[0] == "misc") {
            switch (c[1]) {
                case "localNumTempVar":
                    return c[2] ? convertToLocaleString(Math.round(ig.vars.get("tmp." + c[2]))) : "";
                default:
                    break;
            }
        }
        
        return this.parent(d, c);
    } 
});
