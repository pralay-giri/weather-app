const getLiveDate = () =>{
    let date = new Date();
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
};

module.exports = getLiveDate;