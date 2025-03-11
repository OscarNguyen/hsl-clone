import { gql } from "@apollo/client";

export const getStop = gql`
  query getStop($id: String!) {
    stop(id: $id) {
      name
      lat
      lon
      wheelchairBoarding
    }
  }
`;

export const getAlerts = gql`
  query getAlerts($lang: String) {
    alerts {
      alertCause
      alertDescriptionText(language: $lang)
      alertEffect
      alertHash
      alertHeaderText
      alertSeverityLevel
      alertUrl
      effectiveEndDate
      effectiveStartDate
      feed
      id
    }
  }
`;

export const getAgencies = gql`
  query getAgencies($lang: String) {
    agencies {
      alerts {
        alertCause
        alertDescriptionText(language: $lang)
        alertEffect
        alertHeaderText(language: $lang)
        alertSeverityLevel
        alertUrl(language: $lang)
        effectiveEndDate
        effectiveStartDate
        id
      }
      fareUrl
      gtfsId
      id
      lang
      name
      phone
      timezone
      url
    }
  }
`;

export const getCancelledTrips = gql`
  query getCancelledTrips($lang: String) {
    canceledTrips {
      edges {
        cursor
        node {
          end {
            realTime {
              arrival {
                delay
                time
              }
              departure {
                delay
                time
              }
            }
            schedule {
              time {
                ... on ArrivalDepartureTime {
                  arrival
                  departure
                }
              }
            }
          }
          serviceDate
          start {
            realTime {
              arrival {
                delay
                time
              }
              departure {
                delay
                time
              }
            }
            schedule {
              time {
                ... on ArrivalDepartureTime {
                  arrival
                  departure
                }
              }
            }
          }
          stopCalls {
            realTime {
              arrival {
                delay
                time
              }
              departure {
                delay
                time
              }
            }
            schedule {
              time {
                ... on ArrivalDepartureTime {
                  arrival
                  departure
                }
              }
            }
          }
          trip {
            activeDates
            arrivalStoptime {
              arrivalDelay
              departureDelay
              dropoffType
              headsign(language: $lang)
              pickupType
              realtime
              realtimeArrival
              realtimeDeparture
              realtimeState
              scheduledArrival
              scheduledDeparture
              serviceDay
              stopPosition
              stopPositionInPattern
              timepoint
              trip {
                activeDates
                bikesAllowed
                blockId
                directionId
                geometry
                gtfsId
                id
                occupancy {
                  occupancyStatus
                }
                routeShortName
                semanticHash
                serviceId
                shapeId
                tripHeadsign(language: $lang)
                tripShortName
                wheelchairAccessible
              }
            }
            bikesAllowed
            blockId
            directionId
            geometry
            gtfsId
            id
            occupancy {
              occupancyStatus
            }
            routeShortName
            semanticHash
            serviceId
            shapeId
            tripHeadsign(language: $lang)
            tripShortName
            wheelchairAccessible
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
    }
  }
`;

// empty result
export const getClusters = gql`
  query getClusters($lang: String) {
    clusters {
      gtfsId
      id
      lat
      lon
      name
      stops {
        alerts(types: ROUTES) {
          alertCause
          alertDescriptionText(language: $lang)
          alertEffect
          alertHeaderText(language: $lang)
          alertSeverityLevel
          alertUrl(language: $lang)
          effectiveEndDate
          effectiveStartDate
          feed
          id
        }
        cluster {
          gtfsId
          id
          lat
          lon
          name
        }
        code
        desc(language: $lang)
        direction
        geometries {
          geoJson
          googleEncoded {
            length
            points
          }
        }
        gtfsId
        id
        lat
        locationType
        lon
        name(language: $lang)
        parentStation {
          name(language: $lang)
          platformCode
          timezone
          transfers(maxDistance: 10) {
            distance
            id
          }
          url(language: $lang)
          vehicleMode
          vehicleType
          wheelchairBoarding
          zoneId
        }
        platformCode
        timezone
        transfers {
          distance
          id
        }
        url(language: $lang)
        vehicleMode
        vehicleType
        wheelchairBoarding
        zoneId
      }
    }
  }
`;

// not useful
export const getFeeds = gql`
  query getFeeds($lang: String) {
    feeds {
      agencies {
        alerts(types: ROUTES) {
          alertDescriptionText(language: $lang)
          alertEffect
          alertHeaderText(language: $lang)
          alertSeverityLevel
          alertUrl(language: $lang)
          effectiveEndDate
          effectiveStartDate
          feed
          id
        }
        fareUrl
        gtfsId
        id
        lang
        name
        phone
        timezone
        url
      }
      alerts(types: ROUTE_TYPES) {
        alertDescriptionText(language: $lang)
        alertEffect
        alertHeaderText(language: $lang)
        alertSeverityLevel
        alertUrl(language: $lang)
        effectiveEndDate
        effectiveStartDate
        feed
        id
      }
      feedId
      publisher {
        name
        url
      }
    }
  }
`;

// not working
export const getPatterns = gql`
  query getPatterns($lang: String) {
    patterns {
      alerts(types: TRIPS) {
        alertCause
        alertDescriptionText(language: $lang)
        alertEffect
        alertHeaderText(language: $lang)
        alertSeverityLevel
        alertUrl(language: $lang)
        effectiveEndDate
        effectiveStartDate
        id
      }
      code
      directionId
      geometry {
        lat
        lon
      }
      headsign
      id
      name
      originalTripPattern {
        id
        name
      }
      patternGeometry {
        length
        points
      }
      route {
        bikesAllowed
        color
        desc
        gtfsId
        id
        longName(language: $lang)
        mode
        shortName
        sortOrder
        textColor
      }
      vehiclePositions {
        heading
        label
        lastUpdated
        lat
        lon
        speed
        stopRelationship {
          status
          stop {
            name(language: $lang)
            platformCode
            timezone
          }
        }
        trip {
          id
          occupancy {
            occupancyStatus
          }
          routeShortName
          tripHeadsign(language: $lang)
          tripShortName
        }
        vehicleId
      }
    }
  }
`;

// No data
export const getRentalVehicles = gql`
  query getRentalVehicles($formFactors: [RentalVehicleFormFactor!]) {
    rentalVehicles(formFactors: $formFactors) {
      allowPickupNow
      id
      lat
      lon
      name
      operative
      rentalNetwork {
        networkId
        url
      }
      rentalUris {
        android
        ios
        web
      }
      vehicleId
      vehicleType {
        formFactor
        propulsionType
      }
    }
  }
`;

export const getRoutes = gql`
  query getRoutes($lang: String) {
    routes {
      color
      desc
      gtfsId
      id
      longName(language: $lang)
      mode
      patterns {
        code
        directionId
        geometry {
          lat
          lon
        }
        headsign
        id
        name
        patternGeometry {
          length
          points
        }
        semanticHash
        vehiclePositions {
          heading
          label
          lastUpdated
          lat
          lon
          speed
          stopRelationship {
            status
          }
          vehicleId
        }
      }
      shortName
      sortOrder
      textColor
      type
      url
    }
  }
`;

export const getServiceTimeRange = gql`
  query getServiceTimeRange {
    serviceTimeRange {
      end
      start
    }
  }
`;

export const getStations = gql`
  query getStations($lang: String) {
    stations {
      alerts {
        alertDescriptionText(language: $lang)
        alertEffect
        alertHeaderText(language: $lang)
        alertSeverityLevel
        alertUrl(language: $lang)
        effectiveEndDate
        effectiveStartDate
        feed
        id
      }
      cluster {
        gtfsId
        id
        lat
        lon
        name
        stops {
          code
          desc(language: $lang)
          direction
          geometries {
            geoJson
            googleEncoded {
              length
              points
            }
          }
          gtfsId
          id
          lat
          locationType
          lon
          name(language: $lang)
          parentStation {
            code
            desc(language: $lang)
            direction
            id
            name(language: $lang)
            platformCode
          }
          patterns {
            code
            directionId
            geometry {
              lat
              lon
            }
            headsign
            id
            name
            patternGeometry {
              length
              points
            }
            semanticHash
          }
          platformCode
          timezone
          url
          vehicleMode
          vehicleType
          wheelchairBoarding
          zoneId
        }
      }
      code
      desc(language: $lang)
      direction
      geometries {
        geoJson
        googleEncoded {
          length
          points
        }
      }
      gtfsId
      id
      lat
      locationType
      lon
      name(language: $lang)
      patterns {
        code
        geometry {
          lat
          lon
        }
        headsign
        id
        name
      }
      platformCode
      url(language: $lang)
      vehicleMode
      vehicleType
      wheelchairBoarding
      zoneId
    }
  }
`;

export const getStops = gql`
  query getStops($lang: String) {
    stops {
      code
      desc(language: $lang)
      direction
      gtfsId
      id
      locationType
      name(language: $lang)
      url(language: $lang)
      zoneId
    }
  }
`;

export const getTicketTypes = gql`
  query getTicketTypes {
    ticketTypes {
      currency
      fareId
      id
      price
      zones
    }
  }
`;

// 504 Gateway Timeout
export const getTrips = gql`
  query getTrips($lang: String) {
    trips {
      activeDates
      blockId
      directionId
      id
      occupancy {
        occupancyStatus
      }
      routeShortName
      semanticHash
      serviceId
      shapeId
      tripGeometry {
        length
        points
      }
      tripHeadsign(language: $lang)
      tripShortName
      wheelchairAccessible
    }
  }
`;

export const getVehicleParkings = gql`
  query getVehicleParkings($lang: String) {
    vehicleParkings {
      anyCarPlaces
      availability {
        bicycleSpaces
        carSpaces
        wheelchairAccessibleCarSpaces
      }
      bicyclePlaces
      capacity {
        bicycleSpaces
        carSpaces
        wheelchairAccessibleCarSpaces
      }
      carPlaces
      detailsUrl
      id
      imageUrl
      lat
      lon
      name(language: $lang)
      note(language: $lang)
      openingHours {
        osm
      }
      realtime
      state
      tags
      vehicleParkingId
      wheelchairAccessibleCarPlaces
    }
  }
`;

export const getVehicleRentalStations = gql`
  query getVehicleRentalStations {
    vehicleRentalStations {
      allowDropoff
      allowDropoffNow
      allowOverloading
      allowPickup
      allowPickupNow
      availableSpaces {
        byType {
          count
          vehicleType {
            formFactor
            propulsionType
          }
        }
        total
      }
      availableVehicles {
        byType {
          count
          vehicleType {
            formFactor
            propulsionType
          }
        }
        total
      }
      capacity
      id
      lat
      lon
      name
      operative
      realtime
      rentalNetwork {
        networkId
        url
      }
      rentalUris {
        android
        ios
        web
      }
      stationId
    }
  }
`;

export const getPlanConnection = gql`
  query getPlanConnection(
    $originLong: CoordinateValue!
    $originLat: CoordinateValue!
    $destinationLong: CoordinateValue!
    $destinationLat: CoordinateValue!
  ) {
    planConnection(
      origin: {
        location: {
          coordinate: { latitude: $originLat, longitude: $originLong }
        }
      }
      destination: {
        location: {
          coordinate: { latitude: $destinationLat, longitude: $destinationLong }
        }
      }
      first: 2
    ) {
      pageInfo {
        endCursor
      }
      edges {
        node {
          start
          end
          numberOfTransfers
          legs {
            fareProducts {
              id
              product {
                id
                medium {
                  id
                  name
                }
                name
                riderCategory {
                  id
                  name
                }
              }
            }
            from {
              name
            }
            to {
              name
            }
            start {
              scheduledTime
            }
            end {
              scheduledTime
            }
            mode
            duration
            realtimeState
            headsign
            route {
              id
              mode
              shortName
            }
          }
          emissionsPerPerson {
            co2
          }
        }
      }
    }
  }
`;
