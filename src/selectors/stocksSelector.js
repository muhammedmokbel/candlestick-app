/*eslint-disable */
export default (state) => {
    return state.map(item => {
        // convert date to timestamp 
       const myDate = item.Date.split("-");
       const newDate = new Date( myDate[0], myDate[1] - 1, myDate[2]);
        return ({
            x: newDate,
            y: [item.Open, item.High, item.Low, item.Close]
        });
    });
}; 