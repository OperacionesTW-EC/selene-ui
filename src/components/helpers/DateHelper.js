const convertDate = (inputFormat) => {
    function pad(s) { return (s < 10) ? '0' + s : s; }
    var date = new Date(inputFormat);
    if(isNaN(date.getTime()) || inputFormat == null)
        return 'No registrada';
    return [pad(date.getUTCMonth()+1), pad(date.getUTCDate()), date.getUTCFullYear()].join('-')
};

export default convertDate;
