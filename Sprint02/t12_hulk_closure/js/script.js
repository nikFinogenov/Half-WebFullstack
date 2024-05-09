function concat(string1, string2){
    singleConcat.count = 0;
    function singleConcat(){
        singleConcat.count++;
        let second = prompt("Enter second string");
        if(second == null) return string1;
        else return string1 + " " + string2;    
    }
    if(string2 == undefined) return singleConcat;
    else return string1 + " " + string2;   
}
