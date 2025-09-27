# AppSync Event API Frontend Demo

A Next.js application demonstrating real-time event publishing and subscription using AWS AppSync Event API with AWS Amplify.

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**

   Copy the Event API details from your SAM deployment outputs and create a `.env.local` file:

   ```env
   NEXT_PUBLIC_EVENT_API_ENDPOINT=https://your-event-api-endpoint.amazonaws.com/event
   NEXT_PUBLIC_EVENT_API_KEY=your-api-key
   NEXT_PUBLIC_EVENT_API_REGION=us-east-1
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open [http://localhost:3000](http://localhost:3000)** to access the demo interface.

