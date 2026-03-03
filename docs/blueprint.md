# **App Name**: EchoEvents

## Core Features:

- Event Browse & Filter: Display a responsive grid of event cards featuring image, title, date, location, price, and category badge. Includes a search bar for filtering by title and selectable category filters.
- Dynamic Event Details: Provide a dedicated page for each event, accessible via a dynamic route, displaying comprehensive information including a large banner, title, organizer, full description, remaining seats, and pricing.
- Simulated Booking Flow: Manage a frontend-only booking process within a modal, capturing attendee name, email, and ticket quantity, auto-calculating total price, simulating seat reduction via local state, and providing a confirmation success state.
- Simulated User Authentication: Present an optional modal for mock login and signup, allowing for a simulated 'authenticated' user state within the frontend for enhanced UI interactions.
- Animated User Interface: Integrate Framer Motion for a visually dynamic experience, including an animated hero headline, staggered fade-in of event cards, subtle card hover effects (scale, glow), and smooth page and modal transitions.
- Adaptive Responsive Design: Ensure the application provides a seamless experience across devices, featuring a stacked layout with a hamburger menu on mobile and a max-width container with a multi-column grid on desktop.
- Local Data Management: Handle all event data and state updates locally using a static JavaScript array, simulating async data fetching with Promises and updating seat availability directly within the client-side state.

## Style Guidelines:

- Background Color: A deep, subtly desaturated plum-black (#17151A) providing a premium, immersive canvas for content.
- Primary Color: A vibrant violet-blue (#A673F7), chosen for its modern, sophisticated feel, to highlight interactive elements and key typography.
- Accent Color: A bright, energetic aqua (#59F5FD) used for focal points, subtle glow effects on hover, and echoing the app's digital aesthetic.
- Gradient Accent: A dynamic gradient transitioning from a rich indigo (#6366F1) to an electric cyan (#06B6D4), employed for design accents and elevated visual emphasis.
- Headlines: 'Space Grotesk' (sans-serif) for large, bold hero typography and prominent titles, imparting a tech-savvy and impactful feel.
- Body Text: 'Inter' (sans-serif) for clean readability, UI labels, and all other text content, ensuring clarity and a modern, objective look.
- Utilize modern, outline-style icons from a library like Lucide, consistent with shadcn/ui's minimalist aesthetic, ensuring clear communication and a contemporary feel.
- Adhere strictly to an 8px grid system for all spacing, padding, and component sizing, ensuring consistency and visual harmony. Implement glassmorphism cards with backdrop blur, rounded '2xl' components, and subtle shadows for depth.
- The layout is responsive, transitioning from a single-column stacked design with a hamburger menu on mobile (where modals are full-screen) to a max-width container with a prominent 3-column grid for event cards on desktop.
- Implement Framer Motion for key interactions, including an animated hero headline entrance, staggered fade-in for event card grids, smooth page transitions, modal appearances, and an animated booking confirmation success state. Include soft glow accents on hover and subtle motion on micro-interactions.