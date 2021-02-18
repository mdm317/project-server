/// ="/[]
exports.insertPath = function(path){
    const convert = (match,p1,p2)=>{
        return p1+path+'/'+p2;
    }
    return convert;
}