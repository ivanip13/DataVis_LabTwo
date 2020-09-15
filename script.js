// TODO: load the dataset


async function fetchJson(){
  let response = await fetch('attractions.json');
  let attractions = await response.json();

  function filterData(category) {
    let filteredArray = attractions;
    function sortDesc(a, b) {
      return b.Visitors-a.Visitors;
    };
    function filterbyCategory(item){
      if (item.Category == category) {
        return true
      }
    };
    console.log(filteredArray);

    console.log(attractions.filter(filterbyCategory));
    if (category !== 'all'){
      filteredArray = attractions.filter(filterbyCategory);
      console.log('sad');
  };
    console.log(filteredArray);
    console.log('Top 5 attractions by Visitors + Category', filteredArray.sort(sortDesc).slice(0,5));
    let data = filteredArray.sort(sortDesc).slice(0,5);
    // console.log('Top 5 attractions by Visitors', attractions.sort(sortDesc).slice(0,5));
    // console.log('Top 5 attractions by Visitors + Category', attractions.sort(sortDesc).slice(0,5));

  	/* **************************************************
  	 *
  	 * TODO: filter attractions by the selected category
  	 * TODO: filter top 5 attractions
  	 *
  	 * CALL THE FOLLOWING FUNCTION TO RENDER THE BAR-CHART:
  	 *
  	 * renderBarChart(data)
  	 *
  	 * - 'data' must be an array of JSON objects
  	 * - the max. length of 'data' is 5
  	 *
  	 * **************************************************/
     //
     // let data = attractions.filter(filterbyCategory).sort(sort).slice(0,5);
     console.log(data);
     renderBarChart(data);
  };

  // TODO: Define an event listener for the dropdown menu
  //       Call filterData with the selected category

  let select = document.querySelector("#attraction-category");
  select.addEventListener('change', (event) => {
      let category = event.target.value;
      console.log(category);
      filterData(category);
    });


};

fetchJson();
