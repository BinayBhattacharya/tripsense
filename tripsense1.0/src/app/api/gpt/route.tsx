// src/app/api/gpt/route.tsx

import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { formData } = await request.json();
    const apiKey = "_";  // Replace with your actual API key

    if (!apiKey) {
      return NextResponse.json({ error: 'API key not found' }, { status: 500 });
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `Generate an itinerary based on the following details:\n\n${JSON.stringify(formData, null, 2)}
            Format the output as follows:

      {
        "Day 1": [
          {
            "activity": "check in, check-out, name of place",
            "date": "start date is day 1",
            "stop time": "in minutes",
            "reach time": "in 00:00 24-hr format",
            "spend": "average money spent per person at this place in rupees",
            "rating": "google rating of the place"
          },
          {
            "activity": "next activity",
            "date": "check from input json",
            "stop time": "in minutes",
            "reach time": "in 00:00 24-hr format",
            "spend": "average money spent per person",
            "rating": "google rating of the place"
          }
        ],
        "Day 2": [
          {
            "activity": "check in, check-out, name of place",
            "date": "check from input json",
            "stop time": "in minutes",
            "reach time": "in 00:00 24-hr format",
            "spend": "average money spent per person",
            "rating": "google rating of the place"
          }
        ],
        ... Day 3, and as many mentioned
      }
      Strictly adhere to the JSON input given to you.
      Ensure the traveller is in the hotel 2-3 hours before checkout time mentioned in the input, and no travel should be done after checkout time. and people don't travel after 10 pm, then should be back to hotel.
       Ensure the itinerary is formatted correctly with details for each day, and the data is in JSON format with proper indentation and newlines for readability.
      `
          }
        ],
        max_tokens: 20,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response from GPT API:', errorText);
      return NextResponse.json({ error: 'Error from GPT API' }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.json({ error: 'Error processing request' }, { status: 500 });
  }
}