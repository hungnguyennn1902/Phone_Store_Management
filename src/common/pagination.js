module.exports = (page, totalPage, delta = 2) => {
    let pages = [];
    let left = page - delta;
    let right = page + delta        
    for (let i = 1; i <= totalPage; i++) {
        if (
            i === 1 ||
            i === totalPage ||
            i === page ||
            (i >= left) && (i <= right)

        ) {
            pages.push(i);
        }else if(
            i === left -1 ||
            i === right +1
        ){
            pages.push("...");
        }
    }
    return pages;
};
