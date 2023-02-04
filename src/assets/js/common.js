function debounce(fn, delay = 500) {
    let timer = null;
    return function() {
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            fn.apply(this, arguments)
            timer = null
        }, delay)
    }
}

let throttle = function(fn,delay){
    let flag = true
    return function(){
        if(flag){
            setTimeout(()=>{
                fn.apply(this,arguments)
                flag=true
            },delay)
        }
        flag = false
    }
}

export {debounce,throttle}