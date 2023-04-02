import axios from 'axios';

const URL = 'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary'

const options = {
  params: {
    bl_latitude: '48.1081743',
    tr_latitude: '48.2081743',
    bl_longitude: '16.27381890000006',
    tr_longitude: '16.37381890000006',
  },
  headers: {
    'X-RapidAPI-Key': '7e7bb7ea80mshd53d388127c8dc8p18546cjsn0c85ae8310d8',
    'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
  }
};

axios.request(options).then(function (response) {
	console.log(response.data);
}).catch(function (error) {
	console.error(error);
});

export const getPlacesData = async () => {
  try {
    const {data : { data }} = await axios.get(URL, options);
    return data;
  } catch (error) {
    console.log(error);
  }
}
