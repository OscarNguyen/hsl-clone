## Getting Started

First, run the development server: `npm run dev`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deploy on Vercel

https://corsearch-assignment.vercel.app/

## Approach explanation

- create react app with typescript template by using npx create-react-app [app-name] --template typescript
- install apollo client by using npm install @apollo/client graphql
- setup apollo client by using ApolloProvider in index.tsx
- create graphql query by using gql from @apollo/client
- use useQuery hook to fetch data
- use mapbox-gl.js to create a map by creating an account and getting an access token
- change styles to maximize the map size to the whole screen
- track user current location by using GeolocateControl from mapbox-gl.js
- install sass by using npm install sass and establish a module.scss file to style the app
- install react-hook-form by using npm install react-hook-form to create a form and use the useForm hook to manage the form state of the search bar
- use @toolpad/core to create a dashboard but suspended it because of conflicts with material ui components imports
- use @mui/material to create a drawer
- use @mui/material to create a list of cards

- In the end to speed up the development process I migrated my project to a Toolpad template which has a dashboard layout out of the box and dark theme already implemented so that I can focus on the main functionality of the app.

- I started brainstorming about how to implement the main functionality of the app by thinking about the user flow and the data that I need to fetch from the API, which took a while.

- I fetched the data from the HSL API by using GraphQL and Apollo Client and found which one was useful. Some of them were deprecated and some of them were not useful for the task.

- At the end of the day I came up with the idea to fetch, filter, search the ticket price based on the zone. Unfortunatelly the customer target and the duration were not included in the payload so only the price and zone were used.

- I used Autocomplete from @mui/material to create a search bar and display the results in a list of cards. The search text is kept as chip in the search bar, which can be removed by clicking on the X icon.

- Next step was to display the map and the markers, popups. I had to do some research to understand how to use mapbox-gl.js to create a map and display the markers, popups. I didn't have enough time to make it look like HSL but instead it could give us a detailed plan of the journey based on 2 markers on the map which have coordinates.

- Also, I made a feature to filter out the type of traveling. It would have a different color for example: purple for train, blue for bus, red for metro, green for tram and dark green for ferry. Each color has another light shade next to it to depict the backward direction.

- As to find the way from A to B, now it allows only 2 markers to be set on the map and will be removed after closing the details dialog or by clicking the Remove all navigation button. The details dialog includes the first two routes with the details of duration, CO2 emissions, mode of transport, destination and origin, scheduled time. For better UX, it has a loading indicator to show that the data is being fetched.

- As a side feature, I added a snackbar to show the user the recent alert from HSL about the changes and deviated routes. The data is fetched as an array and each alert is displayed once every 6 seconds and is replaced by the next alert. The color of the alert is based on the severity of the alert as well. The new list of alerts is fetched every 1 minute.

## Difficulties

- I had to do some research to understand how to setup apollo client and use it in the project.
- I had to do some research to understand how to use the useQuery hook to fetch data.
- I had to do some research to understand how to use the gql to create the query.
- I had to research the HSL API to understand how to use it and what endpoints to use to get the data.
- I had to try out some endpoints to see what data fits the best for the task and ran into some deprecated endpoints.
- I had to do some research to understand how to use mapbox-gl.js to create a map.
- I had to do some research to understand how to use the GeolocateControl to track user current location.
- Using @toolpad/core was a bit tricky because it conflicts with the material ui components imports. Thus, I suspended using it for now and will try to fix the conflicts and use it in the future since it supports a dashboard layout out of the box.
- Removing the third marker when there are already 2 markers is challenging though i tried wiping the array of markers and coordinates but it didn't work. Have to spend more time to figure out the solution.
- Showing the alert periodically is challenging because the data is fetched as an array. Have to do some tricks on logical handling to it
- CI/CD is also a thing to bear in mind. I deployed to Vercel and it worked fine. In order to fulfill the CI/CD pipeline, I added a Dockerfile to build the image, a docker compose file to run the container and a docker-image.yml file to deploy the image using Github Actions. For some reason, the secrect key of HSL API is not accessible, only the one from Mapbox is accessible.

## Future improvements

- Remove the third marker when there are already 2 markers
- Responsiveness
- Better performance since the map loading is heavy when we paint the markers and popups
- Add marker to distinguish between the different modes of transport
- Ability to watch real time vehicle location
- More utilities to users like nearby search, save favorite routes, etc.
