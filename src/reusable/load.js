function clickMe(el) {
    isLoading = !isLoading;
    let thisBtn = el;
    if(isLoading) {
        thisBtn.classList.add('btn-loader')
    }else {
        thisBtn.classList.remove('btn-loader')
    }
    console.log(thisBtn.classList)
}
// export clickMe(el)