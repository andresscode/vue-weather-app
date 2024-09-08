# Vue Weather App

The application is not production-ready and was developed following a pragmatic approach to deliver as much functionality as possible in the least amount of time. Please keep in mind that the components were not tested due to time constraints, and most of the testing effort was focused on handling the API data.

The UI was designed and built with a mobile-first approach. If you install this app on your local machine, I suggest you test it on Chrome using the mobile view mode and not full-screen mode.

**Important**: Before running the application locally, please create a `.env.local` file inside the project's root directory using the API key.

```
VITE_API_KEY=<API_KEY_HERE>
```

## Features

* Hourly Forecast: Next 24 hours.
* Daily Forecast: Next *n* days.
* Users can refresh the forecast data.
* Simple city search.

### Hourly Forecast

 The hourly forecast is shown in intervals of 3 hours because that's how the data comes from the API. The hour seen in the app for each city corresponds to the city's local time, not the local time of the person using the application. Users can see up to the next 24 hours.

 ### Daily Forecast

 The daily forecast displays information about the weather for the next five or four days. The number of days displayed depends on the initial day received. If the initial day is at midnight we don't have more than five days in total meaning that we can display more than four days in the future. The dates correspond to the city's local time as well. The most important part here was determining what message and icon to show for each day.
 In this case, I found the longest subsequence of similar weather conditions using the weather's icon code (ignoring days and nights). For example, given the following sequence:

```
01d - 01d - 04d - 04d - 04n - 04n - 01n - 01d
```

In the example above, we can find 01X and 04X four times, but because 04X has the longest subsequence, it's considered the best forecast for that particular day due to its continuous nature.

All daily forecast icons use the day version, not the night one.

### Refresh Data

Tapping the refresh button in the header requests data from the API for all the cities. In the footer, you can see when the app last fetched data from the API.

### Simple City Search

Users can tap the search icon in the header to enter a city's name and add it to the available cities tab. A successful search opens a new tab and triggers a request to fetch the forecast for that particular city automatically. This feature
uses a straightforward search mechanism based on HashTables and Keys. To find a city, you need an exact match with any of the keys in the hashtable. The list of cities was generated from the metadata `.csv` file suggested. A bit of
processing was done to make the search case insensitive. Diacritical marks and accents were removed to make the search easier.
