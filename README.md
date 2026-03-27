## HearthBook – Earthy Recipe Discovery

### Stack
- React + Vite (plain JS)
- Tailwind CSS styling with custom earthy palette
- React Router DOM for navigation + Framer Motion animations
- axios clients for API Ninjas Recipe API + `json-server`
- react-pageflip for flipping recipe book
- React Three Fiber hero scene, react-parallax-tilt cards, react-hot-toast feedback

### Getting Started
1. **Install deps**  
   ```bash
   npm install
   ```
2. **Set environment variables**  
   Create `.env` with:
   ```
   VITE_API_NINJAS_KEY=your_api_ninjas_key
   VITE_JSON_SERVER_URL=http://localhost:4000
   ```
3. **Start dev servers**  
   Terminal A:
   ```bash
   npm run dev
   ```
   Terminal B:
   ```bash
   npm run server
   ```

### Features
- Landing hero with 3D clay pot scene and staggered animations
- Discover page hitting API Ninjas Recipe API, earthy filters, tilting cards, save-to-cookbook
- FlipBook recipe detail with page turning, tags, actions (cook mode, CRUD)
- Cook Mode fullscreen overlay with progress + animated steps
- Full CRUD forms for recipes via json-server
- Auth, profile, settings, and empty states aligned to earthy brand

