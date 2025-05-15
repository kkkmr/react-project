function closure(){
    var sample=3;
    return function(){
        console.log(sample);
    }
}
closure();

function debounce(){}