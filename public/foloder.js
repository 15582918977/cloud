export default class Floder{
    constructor(id,floderName='',floderSize='-',floderDate='',floderPath='/',isinputshow=true,isrename=false) {
        this.id = id;
        this.floderName = floderName;
        this.floderSize = floderSize;
        this.floderDate = floderDate;
        this.isinputshow = isinputshow;
        this.floderPath = floderPath;
        this.isrename = isrename;
    }
}