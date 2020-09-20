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
    const month = [
        'Січня', 
        'Лютого', 
        'Березня', 
        'Квітня', 
        'Травня', 
        'Червня', 
        'Липня', 
        'Серпня', 
        'Вересня', 
        'Жовтня',
        'Листопада',
        'Грудня'
    ];
    let date = current_date.toJSON().slice(8,10) + " "
    +month[parseInt(current_date.toJSON().slice(6,8))-1]+" "
    + current_date.toJSON().slice(0,4)+" "
    + current_date.toLocaleTimeString();
    // new Date().toLocaleString('ukr', {       
    //     month: 'long'       
    // });
    return date;
}

function correctStr(myStr) {
    let help="";
    for (let i=0; i<myStr.length; i++){
        if (myStr[i]=='<') {help+= '&lt;'}
        else if (myStr[i]=='>') {help+= '&gt;'}
        else if (myStr[i]=='"') {help+= '&quot;'}
        else if (myStr[i]=='&') {help+= '&amp;'}
        else {help+=myStr[i];}
    }
    return help;
}