class Note {
    constructor(id, name, text, isHold, element, time){
        this.id=id;
        this.name=name;
        this.text=text;
        this.isHold=isHold;
        this.element=element;
        this.time=time;
    };
    setStatus(isHold) {
        this.isHold=isHold;
    };
}

function dateToStr ()  {
    const current_date = new Date();
    const year= current_date.getFullYear();
    const month = current_date.getMonth()+1;
    const day = current_date.getDate();
    const hour = current_date.getHours();
    const minute = current_date.getMinutes();
    const sec = current_date.getSeconds();
    let helpStr = year + '.';
    if (month < 10) {helpStr += '0'}
    helpStr = helpStr + month + '.';
    if (day < 10) {helpStr += '0'}
    helpStr = helpStr + day + ' ';
    if (hour < 10) {helpStr += '0'}
    helpStr = helpStr + hour + ':';
    if (minute < 10) {helpStr += '0'}
    helpStr = helpStr + minute + ':';
    if (sec < 10) {helpStr += '0'}
    helpStr = helpStr + sec;
    return helpStr;
    // const current_date = new Date();
    // console.log(current_date.toJSON());
    // let date=current_date.toJSON().slice(0,10).replaceAll('-', '.');
    // date+=" ";
    // date+=current_date.toJSON().slice(11,19);
    // return date;
}