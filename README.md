
<img src="https://imgur.com/0bh7xd0.png" />

## Features

• 📡 Streaming using your preferred protocol (WHIP/RTMP) from any Platform you like (OBS, Zoom etc.)


• 🔐 Google OAuth

• 📸 Upload custom stream thumbnail

• 💬 Real-time Stream chat

• 👥 Following and Recommendation system

• 👢 Blocking Kicking participants from a stream in real-time

• 🎛️ Streamer Dashboard

• 🐢 Slow chat mode

• 🔒 Followers only chat mode

• 📴 Enable/Disable chat

• 🔍 Search Streams and Users

• 🎨 Modern design

• 🌗 Dark/Light mode

• 🌐 Multi-lingual support

• 📄 SSR (Server-Side Rendering) and SEO optimization


## Usage

### 1. Create a .env file in the root directory and add the following environment variables:
```env
NEXTAUTH_URL= 
NEXTAUTH_SECRET=

// For help with the oauth id and secret check this https://support.google.com/cloud/answer/6158849?hl=en
AUTH_GOOGLE_ID=
AUTH_GOOGLE_SECRET=

DATABASE_URL=

LIVEKIT_API_URL=
LIVEKIT_API_KEY=
LIVEKIT_API_SECRET=
NEXT_PUBLIC_LIVEKIT_WS_URL=

UPLOADTHING_TOKEN=
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup Prisma

```bash
npx prisma generate
npx prisma db push
```

### 4. Run dev server

```bash
npm run dev
```