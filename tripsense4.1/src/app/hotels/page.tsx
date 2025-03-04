"use client"; // Ensure client-side rendering

import { useState, useEffect, useRef } from 'react';

// Updated hotel data with correct image URLs and links
const hotels = [
    
    {
        name: "Hotel Silver Star",
        review: "The hotel offers mixed reviews. While many guests praise the friendly staff, good food, and mountain views, others faced issues like dirty rooms, dampness, poor service, and a lack of basic amenities. The location is convenient, but maintenance and service quality need improvement for a better overall experience.",
        price: { 
          makemytrip: 1409, 
          goibibo: 1650, 
          booking: 1879 
        },
        links: {
          makemytrip: "https://www.makemytrip.com/hotels/hotel-listing/?checkin=11012024&topHtlId=201908021410474931&city=CTXOI&checkout=11032024&roomStayQualifier=2e0e&locusId=CTXOI&country=IN&locusType=city&searchText=Mount%20Bashera%20Boutique%20Hotel&regionNearByExp=3&rsc=1e2e0e",
          goibibo: "https://www.goibibo.com/hotels/find-hotels-in-Darjeeling/4863087815102631912/4863087815102631912/%7B%22ci%22:%2220241101%22,%22co%22:%2220241103%22,%22r%22:%221-2-0%22%7D/?{%22filter%22:{}}&sec=dom&cc=IN&locusId=CTIXB&locusType=city&cityCode=CTIXB&mmtId=201909251927459787",
          booking: "https://www.booking.com/searchresults.en-gb.html?ss=Hotel+Mount+Meridian%2C+Robertson+Road%2C+Chauk+Bazaar%2C+Darjeeling%2C+West+Bengal%2C+India&ssne=Hotel+Mount+Meridian%2C+Robertson+Road%2C+Chauk+Bazaar%2C+Darjeeling%2C+West+Bengal%2C+India&ssne_untouched=Hotel+Mount+Meridian%2C+Robertson+Road%2C+Chauk+Bazaar%2C+Darjeeling%2C+West+Bengal%2C+India&label=gen173nr-1FCAEoggI46AdIM1gEaGyIAQGYAQm4AQfIAQzYAQHoAQH4AQyIAgGoAgO4AtKEi7YGwAIB0gIkMmUwYTljNDgtOTlkZi00ZGY0LWE2ZGUtMzc4NWZjNmIwMTFh2AIG4AIB&sid=efe0494992f0480abefe252b8559621a&aid=304142&lang=en-gb&sb=1&src_elem=sb&src=searchresults&dest_id=ChIJKwFyVusu5DkRXt-YYvlzuFw&dest_type=landmark&place_id=ChIJKwFyVusu5DkRXt-YYvlzuFw&latitude=27.0430709&longitude=88.2667003&ac_position=0&ac_click_type=g&ac_langcode=en-gb&ac_suggestion_list_length=1&search_selected=true&search_pageview_id=ce39367baf610488&ac_meta=IAAoAjIFZW4tZ2JaEXBvaW50X29mX2ludGVyZXN0&checkin=2024-11-13&checkout=2024-11-14&group_adults=1&no_rooms=1&group_children=0"
        },
        image: "/hotels/silver_star/silver1.avif",
        fullReview: "The hotel offers mixed reviews. While many guests praise the friendly staff, good food, and mountain views, others faced issues like dirty rooms, dampness, poor service, and a lack of basic amenities. The location is convenient, but maintenance and service quality need improvement for a better overall experience.",
        amenities: ["WiFi", "Non-smoking rooms", "AC Room", "Restaurant", "Free WiFi"],
        checkIn: "14:00 to 23:59",
        checkOut: "11:00 to 12:00",
        rankReason: "Ranked for its location and friendly staff, but cleanliness and service issues bring down its ranking.",
        images: [
          "/hotels/silver_star/silver1.avif",
          "/hotels/silver_star/silver2.jpg",
          "/hotels/silver_star/silver3.jpg",
          "/hotels/silver_star/silver4.avif",
          "/hotels/silver_star/silver5.webp"
        ]
    },
    {
        name: "Jagjeet's Hotel Pradhan",
        review: "The hotel is praised for its cleanliness, spacious rooms, and excellent service, with guests enjoying the food and views from certain rooms. However, some note that it’s far from Mall Market, food is expensive, and amenities like internet are lacking.",
        price: { 
          makemytrip: 2062, 
          goibibo: 2403, 
          booking: 1890 
        },
        links: {
          makemytrip: "https://www.makemytrip.com/hotels/hotel-listing/?checkin=11012024&topHtlId=201908021410474931&city=CTXOI&checkout=11032024&roomStayQualifier=2e0e&locusId=CTXOI&country=IN&locusType=city&searchText=Mount%20Bashera%20Boutique%20Hotel&regionNearByExp=3&rsc=1e2e0e",
          goibibo: "https://www.goibibo.com/hotels/jagjeets-pradhan-hotel-in-darjeeling-3748029908612649839/?hquery={%22ci%22:%2220241106%22,%22co%22:%2220241107%22,%22r%22:%221-1-0%22,%22ibp%22:%22%22}&cc=IN&vcid=4863087815102631912&locusId=CTIXB&locusType=city&cityCode=CTIXB&city=Darjeeling",
          booking: "https://www.booking.com/searchresults.en-gb.html?ss=Hotel+Zambala+Retreat+and+Spa+Darjeeling+By+Anant+Group+of+Hotels%2C+near+DARJEELING+HERITAGE%2C+Limbugaon%2C+Darjeeling%2C+West+Bengal%2C+India&ssne=Hotel+Zambala+Retreat+and+Spa+Darjeeling+By+Anant+Group+of+Hotels%2C+near+DARJEELING+HERITAGE%2C+Limbugaon%2C+Darjeeling%2C+West+Bengal%2C+India&ssne_untouched=Hotel+Zambala+Retreat+and+Spa+Darjeeling+By+Anant+Group+of+Hotels%2C+near+DARJEELING+HERITAGE%2C+Limbugaon%2C+Darjeeling%2C+West+Bengal%2C+India&efdco=1&label=gen173nr-1FCAEoggI46AdIM1gEaGyIAQGYAQm4AQfIAQzYAQHoAQH4AQyIAgGoAgO4AtKEi7YGwAIB0gIkMmUwYTljNDgtOTlkZi00ZGY0LWE2ZGUtMzc4NWZjNmIwMTFh2AIG4AIB&sid=efe0494992f0480abefe252b8559621a&aid=304142&lang=en-gb&sb=1&src_elem=sb&src=searchresults&latitude=27.0370833&longitude=88.2624751&checkin=2024-11-03&checkout=2024-11-04&group_adults=1&no_rooms=1&group_children=0"
        },
        image: "/hotels/jagjeet/jagjeet1.jpeg",
        fullReview: "The hotel is praised for its cleanliness, spacious rooms, and excellent service, with guests enjoying the food and views from certain rooms. However, some note that it’s far from Mall Market, food is expensive, and amenities like internet are lacking.",
        amenities: ["WiFi", "Non-smoking rooms", "AC Room", "Restaurant", "Free WiFi"],
        checkIn: "14:00 to 23:59",
        checkOut: "11:00 to 12:00",
        rankReason: "Ranked for its spacious rooms and cleanliness but distance from Mall Market and expensive food affect its ranking.",
        images: [
          "/hotels/jagjeet/jagjeet1.jpeg",
          "/hotels/jagjeet/jagjeet3.webp",
          "/hotels/jagjeet/jagjeet4.jpeg",
          "/hotels/jagjeet/jagjeet5.jpeg"
        ]
      },
      {
        name: "Sumitel Vista",
        review: "The hotel is praised for its cleanliness, friendly staff, and good food. However, there are issues with the location...",
        price: { makemytrip: 1755, goibibo: 1806, booking: 2835 },
        links: {
          makemytrip: "https://www.makemytrip.com/hotels/hotel-listing/?checkin=11012024&topHtlId=201908021410474931&city=CTXOI&checkout=11032024&roomStayQualifier=2e0e&locusId=CTXOI&country=IN&locusType=city&searchText=Mount%20Bashera%20Boutique%20Hotel&regionNearByExp=3&rsc=1e2e0e",
          goibibo: "https://www.goibibo.com/hotels/sumitel-500-meters-from-mall-road-hotel-in-darjeeling-3066357810677576749/?hquery={%22ci%22:%2220241106%22,%22co%22:%2220241107%22,%22r%22:%221-2-0%22,%22ibp%22:%22%22}&cc=IN&vcid=4863087815102631912&locusId=CTIXB&locusType=city&cityCode=CTIXB&city=Darjeeling",
          booking: "https://www.booking.com/hotel/in/sumitel-suites-amp-spa-darjeeling.en-gb.html?aid=304142&label=gen173nr-1FCAEoggI46AdIM1gEaGyIAQGYAQm4AQfIAQzYAQHoAQH4AQyIAgGoAgO4AtKEi7YGwAIB0gIkMmUwYTljNDgtOTlkZi00ZGY0LWE2ZGUtMzc4NWZjNmIwMTFh2AIG4AIB&sid=efe0494992f0480abefe252b8559621a&all_sr_blocks=490063605_401141600_2_42_0;checkin=2024-11-06;checkout=2024-11-07;dest_id=4900636;dest_type=hotel;dist=0;group_adults=2;group_children=0;hapos=1;highlighted_blocks=490063605_401141600_2_42_0;hpos=1;matching_block_id=490063605_401141600_2_42_0;no_rooms=1;req_adults=2;req_children=0;room1=A%2CA;sb_price_type=total;sr_order=popularity;sr_pri_blocks=490063605_401141600_2_42_0__567000;srepoch=1729319809;srpvid=551f2e71e62d0324;type=total;ucfs=1&",
        },
        image: "/hotels/sumitel/sumitel1.jpg",
        fullReview: "The hotel is praised for its cleanliness, friendly staff, and good food. However, there are issues with the location, as transport can't reach the entrance, requiring a walk with luggage.",
        amenities: ["WiFi", "Family rooms", "Airport shuttle", "Free breakfast"],
        checkIn: "14:00 to 23:59",
        checkOut: "11:00 to 12:00",
        rankReason: "Ranked for cleanliness and good food, but location is inconvenient.",
        images: [
          "/hotels/sumitel/sumitel1.jpg",
          "/hotels/sumitel/sumitel2.jpg",
          "/hotels/sumitel/sumitel3.jpg",
          "/hotels/sumitel/sumitel4.jpg",
          "/hotels/sumitel/sumitel5.jpg",
        ],
    },
  {
    name: "Mount Bashera Boutique Hotel",
    review: "The hotel has a great location near railway stations, with friendly staff and good hospitality. However, rooms are small and overpriced...",
    price: { makemytrip: 2390, goibibo: 2978, booking: 4000 },
    links: {
      makemytrip: "https://www.makemytrip.com/hotels/hotel-listing/?checkin=11012024&topHtlId=201908021410474931&city=CTXOI&checkout=11032024&roomStayQualifier=2e0e&locusId=CTXOI&country=IN&locusType=city&searchText=Mount%20Bashera%20Boutique%20Hotel&regionNearByExp=3&rsc=1e2e0e",
      goibibo: "https://www.goibibo.com/hotels/mount-bashera-boutique-hotel-in-kurseong-5789731638468055756/?hquery={%22ci%22:%2220241101%22,%22co%22:%2220241103%22,%22r%22:%221-2-0%22,%22ibp%22:%22%22}&cc=IN&vcid=7795668900179279291&locusId=CTXOI&locusType=city&cityCode=CTXOI&city=Kurseong",
      booking: "https://www.booking.com/searchresults.en-gb.html?ss=Kurseong&ssne=Kurseong&ssne_untouched=Kurseong&efdco=1&label=gen173nr-1BCAEoggI46AdIM1gEaGyIAQGYAQm4AQfIAQzYAQHoAQGIAgGoAgO4AtKEi7YGwAIB0gIkMmUwYTljNDgtOTlkZi00ZGY0LWE2ZGUtMzc4NWZjNmIwMTFh2AIF4AIB&sid=5b299e98ebdcf4c75953f685dadcc86d&aid=304142&lang=en-gb&sb=1&src_elem=sb&src=searchresults&dest_id=900057442&dest_type=city&checkin=2024-11-01&checkout=2024-11-02&group_adults=2&no_rooms=1&group_children=0",
    },
    image: "/hotels/mount_bashera/mount_bashera1.jpg",
    fullReview: "The hotel has a great location near railway stations, with friendly staff and good hospitality. However, rooms are small and overpriced, food quality is poor with limited breakfast options, and amenities are lacking. It's clean and decent for a short stay, but not exceptional for the price.",
    amenities: ["WiFi", "Non-smoking rooms", "AC Room", "Restaurant", "Free WiFi"],
    checkIn: "14:00 to 23:00",
    checkOut: "11:00 to 12:00",
    rankReason: "Ranked for its location near major transit points but lacks value for money.",
    images: [
      "/hotels/mount_bashera/mount_bashera1.jpg",
      "/hotels/mount_bashera/mount_bashera2.jpg",
      "/hotels/mount_bashera/mount_bashera3.jpg",
      "/hotels/mount_bashera/mount_bashera4.jpg",
      "/hotels/mount_bashera/mount_bashera5.jpg",
      "/hotels/mount_bashera/mount_bashera6.jpg",
    ],
  },
  {
    name: "Summit Grace Boutique Hotel & Spa",
    review: "The hotel offers stunning views of Darjeeling, including the Kanchenjunga peak, but has several downsides. Rooms are small and cold in winter, with poor insulation, and bathrooms often have unpleasant smells. While the location is peaceful, it's far from the city center and requires taxis for steep climbs.",
    price: { makemytrip: 3518, goibibo: 6290, booking: 6841 },
    links: {
      makemytrip: "https://www.makemytrip.com/hotels/hotel-listing/?checkin=11012024&topHtlId=201908021410474931&city=CTXOI&checkout=11032024&roomStayQualifier=2e0e&locusId=CTXOI&country=IN&locusType=city&searchText=Mount%20Bashera%20Boutique%20Hotel&regionNearByExp=3&rsc=1e2e0e",
      goibibo: "https://www.goibibo.com/hotels/summit-grace-boutique-spa-hotel-in-darjeeling-4721327478096658533/?hquery={%22ci%22:%2220241106%22,%22co%22:%2220241107%22,%22r%22:%221-2-0%22,%22ibp%22:%22%22}&cc=IN&vcid=4863087815102631912&locusId=CTIXB&locusType=city&cityCode=CTIXB&city=Darjeeling",
      booking: "https://www.booking.com/hotel/in/grace-resort.en-gb.html?aid=304142&label=gen173nr-1FCAEoggI46AdIM1gEaGyIAQGYAQm4AQfIAQzYAQHoAQH4AQyIAgGoAgO4AtKEi7YGwAIB0gIkMmUwYTljNDgtOTlkZi00ZGY0LWE2ZGUtMzc4NWZjNmIwMTFh2AIG4AIB&sid=efe0494992f0480abefe252b8559621a&all_sr_blocks=39260802_390099140_2_42_0_502600;checkin=2024-11-06;checkout=2024-11-07;dest_id=392608;dest_type=hotel;dist=0;group_adults=2;group_children=0;hapos=1;highlighted_blocks=39260802_390099140_2_42_0_502600;hpos=1;matching_block_id=39260802_390099140_2_42_0_502600;no_rooms=1;req_adults=2;req_children=0;room1=A%2CA;sb_price_type=total;sr_order=popularity;sr_pri_blocks=39260802_390099140_2_42_0_502600_684090;srepoch=1729320418;srpvid=72b22f7c3110030f;type=total;ucfs=1&"
    },
    image: "/hotels/summit_grace/summit1.jpg",
    fullReview: "The hotel offers stunning views of Darjeeling, including the Kanchenjunga peak, but has several downsides. Rooms are small and cold in winter, with poor insulation, and bathrooms often have unpleasant smells. While the location is peaceful, it's far from the city center and requires taxis for steep climbs.",
    amenities: ["WiFi", "Non-smoking rooms", "AC Room", "Restaurant", "Free WiFi"],
    checkIn: "14:00 to 23:59",
    checkOut: "11:00 to 12:00",
    rankReason: "Ranked for its stunning views of Darjeeling and Kanchenjunga, but the distance from the city center and lack of insulation in rooms affects its ranking.",
    images: [
      "/hotels/summit_grace/summit1.jpg",
      "/hotels/summit_grace/summit2.jpg",
      "/hotels/summit_grace/summit3.jpg",
      "/hotels/summit_grace/summit4.jpg",
      "/hotels/summit_grace/summit5.jpg"
    ]
  },
  {
    name: "Viceroy Hotel",
    review: "The hotel has a great location, friendly staff, and good views. However, some guests found the rooms smaller than expected and faced issues like mold and renovation disruptions. Despite these drawbacks, it’s generally good value but can feel overpriced for some.",
    price: { 
      makemytrip: 5491, 
      goibibo: 5682, 
      booking: 11800 
    },
    links: {
      makemytrip: "https://www.makemytrip.com/hotels/hotel-listing/?checkin=11012024&topHtlId=201908021410474931&city=CTXOI&checkout=11032024&roomStayQualifier=2e0e&locusId=CTXOI&country=IN&locusType=city&searchText=Mount%20Bashera%20Boutique%20Hotel&regionNearByExp=3&rsc=1e2e0e",
      goibibo: "https://www.goibibo.com/hotels/viceroy-hotel-in-darjeeling-7306040839871763886/?hquery={%22ci%22:%2220241106%22,%22co%22:%2220241107%22,%22r%22:%221-2-0%22,%22ibp%22:%22%22}&cc=IN&vcid=4863087815102631912&locusId=CTIXB&locusType=city&cityCode=CTIXB&city=Darjeeling",
      booking: "https://www.booking.com/hotel/in/viceroy.en-gb.html?aid=304142&label=gen173nr-1FCAEoggI46AdIM1gEaGyIAQGYAQm4AQfIAQzYAQHoAQH4AQyIAgGoAgO4AtKEi7YGwAIB0gIkMmUwYTljNDgtOTlkZi00ZGY0LWE2ZGUtMzc4NWZjNmIwMTFh2AIG4AIB&sid=efe0494992f0480abefe252b8559621a&all_sr_blocks=42990003_401480172_2_0_0;checkin=2024-11-06;checkout=2024-11-07;dest_id=429900;dest_type=hotel;dist=0;group_adults=1;group_children=0;hapos=1;highlighted_blocks=42990003_401480172_2_0_0;hpos=1;matching_block_id=42990003_401480172_2_0_0;no_rooms=1;req_adults=1;req_children=0;room1=A;sb_price_type=total;sr_order=popularity;sr_pri_blocks=42990003_401480172_2_0_0__627456;srepoch=1729323753;srpvid=190c362a673109a3;type=total;ucfs=1&"
    },
    image: "/hotels/viceroy/viceroy1.jpg",
    fullReview: "The hotel has a great location, friendly staff, and good views. However, some guests found the rooms smaller than expected and faced issues like mold and renovation disruptions. Despite these drawbacks, it’s generally good value but can feel overpriced for some.",
    amenities: ["WiFi", "Non-smoking rooms", "AC Room", "Restaurant", "Free WiFi"],
    checkIn: "14:00 to 23:59",
    checkOut: "11:00 to 12:00",
    rankReason: "Ranked for its central location and friendly staff, but room size and renovation issues affected the ranking.",
    images: [
      "/hotels/viceroy/viceroy1.jpg",
      "/hotels/viceroy/viceroy2.jpg",
      "/hotels/viceroy/viceroy3.jpg",
      "/hotels/viceroy/viceroy4.jpg",
      "/hotels/viceroy/viceroy5.jpg"
    ]
  },
  {
    name: "Hotel Shikhar",
    review: "HOTEL SHIKHAR offers good value and a convenient location with friendly service, but limited amenities. Smoking, pets, and guests under 18 are not allowed, and electric kettles are not provided.",
    price: { 
      makemytrip: 6371, 
      goibibo: 6339, 
      booking: 7128 
    },
    links: {
      makemytrip: "https://www.makemytrip.com/hotels/hotel-listing/?checkin=11012024&topHtlId=201908021410474931&city=CTXOI&checkout=11032024&roomStayQualifier=2e0e&locusId=CTXOI&country=IN&locusType=city&searchText=Mount%20Bashera%20Boutique%20Hotel&regionNearByExp=3&rsc=1e2e0e",
      goibibo: "https://www.goibibo.com/hotels/shikhar-hotel-in-darjeeling-8374686127299924840/?hquery={%22ci%22:%2220241106%22,%22co%22:%2220241107%22,%22r%22:%221-1-0%22,%22ibp%22:%22%22}&cc=IN&vcid=4863087815102631912&locusId=CTIXB&locusType=city&cityCode=CTIXB&city=Darjeeling",
      booking: "https://www.booking.com/hotel/in/viceroy.en-gb.html?aid=304142&label=gen173nr-1FCAEoggI46AdIM1gEaGyIAQGYAQm4AQfIAQzYAQHoAQH4AQyIAgGoAgO4AtKEi7YGwAIB0gIkMmUwYTljNDgtOTlkZi00ZGY0LWE2ZGUtMzc4NWZjNmIwMTFh2AIG4AIB&sid=efe0494992f0480abefe252b8559621a&all_sr_blocks=42990003_401480172_2_0_0;checkin=2024-11-06;checkout=2024-11-07;dest_id=429900;dest_type=hotel;dist=0;group_adults=1;group_children=0;hapos=1;highlighted_blocks=42990003_401480172_2_0_0;hpos=1;matching_block_id=42990003_401480172_2_0_0;no_rooms=1;req_adults=1;req_children=0;room1=A;sb_price_type=total;sr_order=popularity;sr_pri_blocks=42990003_401480172_2_0_0__627456&srepoch=1729323753&srpvid=190c362a673109a3;type=total;ucfs=1&"
    },
    image: "/hotels/shikhar/shikhar1.avif",
    fullReview: "HOTEL SHIKHAR offers good value and a convenient location with friendly service, but limited amenities. Smoking, pets, and guests under 18 are not allowed, and electric kettles are not provided.",
    amenities: ["WiFi", "Non-smoking rooms", "AC Room", "Restaurant", "Free WiFi"],
    checkIn: "14:00 to 23:59",
    checkOut: "11:00 to 12:00",
    rankReason: "Ranked for its convenient location and friendly service, but limited amenities affected its overall ranking.",
    images: [
      "/hotels/shikhar/shikhar1.avif",
      "/hotels/shikhar/shikhar2.jpg",
      "/hotels/shikhar/shikhar3.jpg",
      "/hotels/shikhar/shikhar4.jpg"
    ]
  },
  {
    name: "Hotel Mount Meridian",
    review: "The hotel is praised for its good location, friendly staff, and clean rooms. Guests enjoyed the food, especially dishes like Puri Sabji and Garlic Noodles. However, some mentioned slow service and maintenance issues. Overall, it’s a decent value-for-money option, with room for improvement in service.",
    price: { 
      makemytrip: 1444, 
      goibibo: 1808, 
      booking: 2120 
    },
    links: {
      makemytrip: "https://www.makemytrip.com/hotels/hotel-listing/?checkin=11012024&topHtlId=201908021410474931&city=CTXOI&checkout=11032024&roomStayQualifier=2e0e&locusId=CTXOI&country=IN&locusType=city&searchText=Mount%20Bashera%20Boutique%20Hotel&regionNearByExp=3&rsc=1e2e0e",
      goibibo: "https://www.goibibo.com/hotels/mount-meridian-hotel-in-darjeeling-7152518730467068870/?hquery={%22ci%22:%2220241106%22,%22co%22:%2220241107%22,%22r%22:%221-2-0%22,%22ibp%22:%22%22}&cc=IN&vcid=4863087815102631912&locusId=CTIXB&locusType=city&cityCode=CTIXB&city=Darjeeling",
      booking: "https://www.booking.com/searchresults.en-gb.html?ss=Hotel+Mount+Meridian%2C+Robertson+Road%2C+Chauk+Bazaar%2C+Darjeeling%2C+West+Bengal%2C+India&ssne=Hotel+Mount+Meridian%2C+Robertson+Road%2C+Chauk+Bazaar%2C+Darjeeling%2C+West+Bengal%2C+India&ssne_untouched=Hotel+Mount+Meridian%2C+Robertson+Road%2C+Chauk+Bazaar%2C+Darjeeling%2C+West+Bengal%2C+India&label=gen173nr-1FCAEoggI46AdIM1gEaGyIAQGYAQm4AQfIAQzYAQHoAQH4AQyIAgGoAgO4AtKEi7YGwAIB0gIkMmUwYTljNDgtOTlkZi00ZGY0LWE2ZGUtMzc4NWZjNmIwMTFh2AIG4AIB&sid=efe0494992f0480abefe252b8559621a&aid=304142&lang=en-gb&sb=1&src_elem=sb&src=searchresults&dest_id=ChIJKwFyVusu5DkRXt-YYvlzuFw&dest_type=landmark&place_id=ChIJKwFyVusu5DkRXt-YYvlzuFw&latitude=27.0430709&longitude=88.2667003&ac_position=0&ac_click_type=g&ac_langcode=en-gb&ac_suggestion_list_length=1&search_selected=true&search_pageview_id=ce39367baf610488&ac_meta=IAAoAjIFZW4tZ2JaEXBvaW50X29mX2ludGVyZXN0&checkin=2024-11-13&checkout=2024-11-14&group_adults=1&no_rooms=1&group_children=0"
    },
    image: "/hotels/meridian/meridian1.jpg",
    fullReview: "The hotel is praised for its good location, friendly staff, and clean rooms. Guests enjoyed the food, especially dishes like Puri Sabji and Garlic Noodles. However, some mentioned slow service and maintenance issues. Overall, it’s a decent value-for-money option, with room for improvement in service.",
    amenities: ["WiFi", "Non-smoking rooms", "AC Room", "Restaurant", "Free WiFi"],
    checkIn: "14:00 to 23:59",
    checkOut: "11:00 to 12:00",
    rankReason: "Ranked for its good location and value-for-money offering, but slow service and maintenance issues affected its ranking.",
    images: [
      "/hotels/meridian/meridian1.jpg",
      "/hotels/meridian/meridian2.jpg",
      "/hotels/meridian/meridian3.jpg",
      "/hotels/meridian/meridian4.jpeg",
      "/hotels/meridian/meridian5.jpeg"
    ]
  },
  {
    name: "Hotel Zambala Retreat & Spa",
    review: "The hotel is praised for its excellent location near Darjeeling Railway Station and tourist spots like Mall Road and Mahakal Temple. Guests appreciate the clean, affordable rooms and friendly staff, though some note slow service and dirty bed sheets. Overall, it’s a good value for money stay, especially for its location.",
    price: { 
      makemytrip: 2126, 
      goibibo: 2891, 
      booking: 4158 
    },
    links: {
      makemytrip: "https://www.makemytrip.com/hotels/hotel-listing/?checkin=11012024&topHtlId=201908021410474931&city=CTXOI&checkout=11032024&roomStayQualifier=2e0e&locusId=CTXOI&country=IN&locusType=city&searchText=Mount%20Bashera%20Boutique%20Hotel&regionNearByExp=3&rsc=1e2e0e",
      goibibo: "https://www.goibibo.com/hotels/find-hotels-in-Darjeeling/4863087815102631912/4863087815102631912/%7B%22ci%22:%2220241101%22,%22co%22:%2220241103%22,%22r%22:%221-1-0%22%7D/?{%22filter%22:{}}&sec=dom&cc=IN&locusId=CTIXB&locusType=city&cityCode=CTIXB&mmtId=202010311820599293",
      booking: "https://www.booking.com/searchresults.en-gb.html?ss=Hotel+Zambala+Retreat+and+Spa+Darjeeling+By+Anant+Group+of+Hotels%2C+near+DARJEELING+HERITAGE%2C+Limbugaon%2C+Darjeeling%2C+West+Bengal%2C+India&ssne=Hotel+Zambala+Retreat+and+Spa+Darjeeling+By+Anant+Group+of+Hotels%2C+near+DARJEELING+HERITAGE%2C+Limbugaon%2C+Darjeeling%2C+West+Bengal%2C+India&ssne_untouched=Hotel+Zambala+Retreat+and+Spa+Darjeeling+By+Anant+Group+of+Hotels%2C+near+DARJEELING+HERITAGE%2C+Limbugaon%2C+Darjeeling%2C+West+Bengal%2C+India&efdco=1&label=gen173nr-1FCAEoggI46AdIM1gEaGyIAQGYAQm4AQfIAQzYAQHoAQH4AQyIAgGoAgO4AtKEi7YGwAIB0gIkMmUwYTljNDgtOTlkZi00ZGY0LWE2ZGUtMzc4NWZjNmIwMTFh2AIG4AIB&sid=efe0494992f0480abefe252b8559621a&aid=304142&lang=en-gb&sb=1&src_elem=sb&src=searchresults&latitude=27.0370833&longitude=88.2624751&checkin=2024-11-03&checkout=2024-11-04&group_adults=1&no_rooms=1&group_children=0"
    },
    image: "/hotels/zambala/zambala1.jpg",
    fullReview: "The hotel is praised for its excellent location near Darjeeling Railway Station and tourist spots like Mall Road and Mahakal Temple. Guests appreciate the clean, affordable rooms and friendly staff, though some note slow service and dirty bed sheets. Overall, it’s a good value for money stay, especially for its location.",
    amenities: ["WiFi", "Non-smoking rooms", "AC Room", "Restaurant", "Free WiFi"],
    checkIn: "14:00 to 23:59",
    checkOut: "11:00 to 12:00",
    rankReason: "Ranked for its prime location near key tourist spots, but issues with cleanliness and service impact the overall experience.",
    images: [
      "/hotels/zambala/zambala1.jpg",
      "/hotels/zambala/zambala2.jpg",
      "/hotels/zambala/zambala3.jpg",
      "/hotels/zambala/zambala4.jpg",
      "/hotels/zambala/zambala5.jpg"
    ]
  },
  {
    name: "Hotel Seven Seventeen",
    review: "The hotel has a great location and friendly staff, with clean rooms and good views. However, issues like poor WiFi, lack of room service, noise, and discomfort with beds were noted. Some guests found it overpriced for the services offered.",
    price: { 
      makemytrip: 1351, 
      goibibo: 2651, 
      booking: 3300 
    },
    links: {
      makemytrip: "https://www.makemytrip.com/hotels/hotel-listing/?checkin=11012024&topHtlId=201908021410474931&city=CTXOI&checkout=11032024&roomStayQualifier=2e0e&locusId=CTXOI&country=IN&locusType=city&searchText=Mount%20Bashera%20Boutique%20Hotel&regionNearByExp=3&rsc=1e2e0e",
      goibibo: "https://www.goibibo.com/hotels/seven-seventeen-hotel-in-darjeeling-4975776644486108646/?hquery={%22ci%22:%2220241106%22,%22co%22:%2220241107%22,%22r%22:%221-1-0%22,%22ibp%22:%22%22}&cc=IN&vcid=4863087815102631912&locusId=CTIXB&locusType=city&cityCode=CTIXB&city=Darjeeling",
      booking: "https://www.booking.com/searchresults.en-gb.html?ss=hotel+Seven+Seventeen%2C+Darjeeling%2C+West+Bengal%2C+India&ssne=Darjeeling&ssne_untouched=Darjeeling&efdco=1&label=gen173nr-1BCAEoggI46AdIM1gEaGyIAQGYAQm4AQfIAQzYAQHoAQGIAgGoAgO4AtKEi7YGwAIB0gIkMmUwYTljNDgtOTlkZi00ZGY0LWE2ZGUtMzc4NWZjNmIwMTFh2AIF4AIB&sid=5b299e98ebdcf4c75953f685dadcc86d&aid=304142&lang=en-gb&sb=1&src_elem=sb&src=searchresults&dest_id=484410&dest_type=hotel&ac_position=0&ac_click_type=b&ac_langcode=en&ac_suggestion_list_length=3&search_selected=true&search_pageview_id=b4ed37e35065021e&ac_meta=GhBiNGVkMzdlMzUwNjUwMjFlIAAoATICZW46D3NldmVuIHNldmVudGVlbkAASgBQAA%3D%3D&checkin=2024-11-07&checkout=2024-11-08&group_adults=1&no_rooms=1&group_children=0"
    },
    image: "/hotels/seven_seventeen/seven2.jpg",
    fullReview: "The hotel has a great location and friendly staff, with clean rooms and good views. However, issues like poor WiFi, lack of room service, noise, and discomfort with beds were noted. Some guests found it overpriced for the services offered.",
    amenities: ["WiFi", "Non-smoking rooms", "AC Room", "Restaurant", "Free WiFi"],
    checkIn: "14:00 to 23:59",
    checkOut: "11:00 to 12:00",
    rankReason: "Ranked for its clean rooms and great location but issues like poor WiFi, noise, and lack of room service affect its ranking.",
    images: [
      "/hotels/seven_seventeen/seven2.jpg",
      "/hotels/seven_seventeen/seven1.jpg",
      "/hotels/seven_seventeen/seven3.jpg",
      "/hotels/seven_seventeen/seven4.jpg",
      "/hotels/seven_seventeen/seven5.jpg"
    ]
  }
  
  
];

export default function HotelsPage() {
  const [calloutVisible, setCalloutVisible] = useState<number | null>(null);
  const [selectedHotel, setSelectedHotel] = useState<any | null>(null); // Hotel selected for modal
  const [modalOpen, setModalOpen] = useState(false);
  const calloutRef = useRef<HTMLDivElement | null>(null);

  // Effect to handle clicks outside the callout
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (calloutRef.current && !calloutRef.current.contains(event.target as Node)) {
        setCalloutVisible(null); // Close the callout if clicked outside
      }
    };

    if (calloutVisible !== null) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [calloutVisible]);

  const handleInfoClick = (index: number, e: React.MouseEvent) => {
    e.stopPropagation(); // Stop click event from propagating
    setCalloutVisible(index === calloutVisible ? null : index);
  };

  const handleDetailsClick = (hotel: any) => {
    setSelectedHotel(hotel);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center mb-[50px]">
      <h1 className="text-3xl font-bold mt-[50px] mb-6">Ranked Hotels in Darjeeling</h1>
      <div className="space-y-4">
        {hotels.map((hotel, index) => {
          const bestPrice = Math.min(
            hotel.price.makemytrip,
            hotel.price.goibibo,
            hotel.price.booking
          );
          const bestPriceSite =
            bestPrice === hotel.price.makemytrip
              ? "MakeMyTrip"
              : bestPrice === hotel.price.goibibo
              ? "Goibibo"
              : "Booking";
  
          const siteLogo =
            bestPrice === hotel.price.makemytrip
              ? "/logos/makemytrip.png"
              : bestPrice === hotel.price.goibibo
              ? "/logos/goibibo.png"
              : "/logos/booking.png";
  
          return (
            <div
              key={hotel.name}
              className="relative w-full max-w-lg p-4 bg-white shadow-md rounded-lg"
            >
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-lg font-semibold">{hotel.name}</span>
                  <p className="text-gray-600">{hotel.review.substring(0, 50)}...</p>
                  <p className="text-green-500 flex items-center">
                   <b> Best Price: ₹{bestPrice}{" "} </b>
                    <img src={siteLogo} alt="logo" className="w-6 h-6 ml-2" />
                  </p>
                </div>
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="w-24 h-24 object-cover rounded-md"
                />
              </div>
              <div className="flex justify-between mt-4">
                <button
                  onClick={(e) => handleInfoClick(index, e)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition duration-300"
                >
                  Rank Info
                </button>
                <button
                  onClick={() => handleDetailsClick(hotel)}
                  className="px-4 py-2 bg-orange-500 text-white rounded-md shadow-md hover:bg-green-600 transition duration-300"
                >
                  Check Details
                </button>
              </div>
  
              {calloutVisible === index && (
                <div
                  ref={calloutRef}
                  className="absolute top-0 right-14 w-64 p-4 bg-white shadow-lg border rounded-md z-10 transform lg:right-auto lg:left-full lg:ml-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex justify-between items-center">
                    <h4 className="font-bold">Rank Reason</h4>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => setCalloutVisible(null)}
                    >
                      Close
                    </button>
                  </div>
                  <p>{hotel.rankReason}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
  
      {modalOpen && selectedHotel && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl h-[90vh] overflow-y-auto relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-red-500"
              onClick={() => setModalOpen(false)}
            >
              Close
            </button>
            <h2 className="text-2xl font-bold mb-4">{selectedHotel.name}</h2>
  
            {/* Carousel for Hotel Images */}
            <div className="relative w-full h-64 overflow-hidden">
              <div className="absolute inset-0 flex justify-between items-center">
                <button
                  className="text-2xl text-white bg-black bg-opacity-50 p-2 rounded-full"
                  onClick={() =>
                    setSelectedHotel((prevHotel: any) => ({
                      ...prevHotel,
                      currentImageIndex:
                        (prevHotel.currentImageIndex + 1) % prevHotel.images.length,
                    }))
                  }
                >
                  &larr;
                </button>
                <button
                  className="text-2xl text-white bg-black bg-opacity-50 p-2 rounded-full"
                  onClick={() =>
                    setSelectedHotel((prevHotel: any) => ({
                      ...prevHotel,
                      currentImageIndex:
                        prevHotel.currentImageIndex > 0
                          ? prevHotel.currentImageIndex - 1
                          : prevHotel.images.length - 1,
                    }))
                  }
                >
                  &rarr;
                </button>
              </div>
              <img
                src={selectedHotel.images[selectedHotel.currentImageIndex || 0]}
                alt="Hotel Image"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
  
            <p className="text-gray-600 mb-4 mt-4">{selectedHotel.fullReview}</p>
            <h3 className="font-bold mb-2">Prices from Booking Sites:</h3>
            <ul className="mb-4 space-y-2">
              <li>
                <img
                  src="/logos/makemytrip.png"
                  alt="MakeMyTrip"
                  className="inline-block w-6 h-6 mr-2"
                />
                <a
                  href={selectedHotel.links.makemytrip}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  MakeMyTrip: ₹{selectedHotel.price.makemytrip}
                </a>
              </li>
              <li>
                <img
                  src="/logos/goibibo.png"
                  alt="Goibibo"
                  className="inline-block w-6 h-6 mr-2"
                />
                <a
                  href={selectedHotel.links.goibibo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  Goibibo: ₹{selectedHotel.price.goibibo}
                </a>
              </li>
              <li>
                <img
                  src="/logos/booking.png"
                  alt="Booking"
                  className="inline-block w-6 h-6 mr-2"
                />
                <a
                  href={selectedHotel.links.booking}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  Booking: ₹{selectedHotel.price.booking}
                </a>
              </li>
            </ul>
  
            <h3 className="font-bold mb-2">Amenities</h3>
            <ul className="list-disc list-inside mb-4">
              {selectedHotel.amenities.map((amenity: string, index: number) => (
                <li key={index}>{amenity}</li>
              ))}
            </ul>
            <p>
              <strong>Check-in:</strong> {selectedHotel.checkIn}
            </p>
            <p>
              <strong>Check-out:</strong> {selectedHotel.checkOut}
            </p>
          </div>
        </div>
      )}
    </div>
  );
  
}
