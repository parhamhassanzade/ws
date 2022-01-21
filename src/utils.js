export const formatData = (data) => {
    let finalData = {
      labels: [],
      datasets: [
        {
          label: "Price",
          data: [],
          backgroundColor: "rgba(0, 0, 255, 0.8)",
          borderColor: "rgba(0, 0, 255, 0.3)",
          fill: false
        }
      ]
    };
  
    let dates = data.map((val) => {
      const ts = val[0];
      let date = new Date(ts * 1000);
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
  
      let final = `${month}-${day}-${year}`;
      return final;
    });
  
    let priceArr = data.map((val) => {
      return val[4];
    });
  
    priceArr.reverse();
    dates.reverse();
    finalData.labels = dates;
    finalData.datasets[0].data = priceArr;

    return finalData;
  };
  