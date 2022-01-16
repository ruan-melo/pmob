export function timeConverter(milis: number){
    var minutes = Math.floor(milis / 60000);
    var seconds = ((milis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (Number(seconds) < 10 ? '0' : '') + seconds;
}