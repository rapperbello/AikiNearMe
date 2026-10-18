# AikiNearMe

A mobile-first local services marketplace starter for Nigeria.

## What works in demo mode
- Search by service, provider name, location and description
- Category, location, rating, price and availability filters
- Provider profiles and profile view counter
- Booking requests and status changes
- Provider profile creation/editing in this browser
- Reviews tied to completed bookings with duplicate-review protection in the browser demo
- Report and block actions
- Subscription and featured-listing request records (not payments)
- Admin demo for provider verification, moderation, booking review, report review and JSON export
- Responsive layout for mobile, tablet and desktop

## Important limitations
Demo data is stored in localStorage on one browser/device. It does not sync across users or devices and is not secure for production. The admin page is not protected. Do not publish it as a real admin system until authentication and server-side authorization are implemented. Example providers are fictional demo listings. No real payment is taken. Premium and featured requests remain unpaid until a real backend verifies payment.

## Run locally
1. Extract the project folder.
2. Use a static server (ES modules may not run correctly from `file://`). Easiest: upload the folder to GitHub and enable GitHub Pages, or use a local editor with Live Server.
3. Open the site URL in Chrome.
4. Test search, profile, booking, provider dashboard and admin.

## Deploy to GitHub Pages
1. Create a GitHub repository.
2. Upload all files and folders while preserving structure.
3. Repository Settings -> Pages -> deploy from branch -> `main` -> `/ (root)`.
4. Wait for the published URL. If using a project repository, URL normally ends in `/repository-name/`.

## Firebase and Paystack production work still required
- Create Firebase project, Authentication, Firestore and Storage.
- Implement authenticated user/provider ownership and Firestore rules.
- Move all marketplace data from localStorage to Firestore.
- Add server-side admin role/custom claims.
- Add secure Cloud Function to initialize a Paystack transaction and verify the transaction reference against Paystack API, checking expected amount, currency, owner, plan, expiration and idempotency before activating subscription.
- Configure `PAYSTACK_SECRET_KEY` using Firebase Secret Manager. Never expose it to frontend.
- The included webhook is only a signature-validation starter and intentionally does not activate subscriptions.
- Set a valid Paystack public key in `js/config.js` only when the backend checkout flow is implemented.

## Prices
- Weekly: ₦500
- Monthly: ₦1,500
- 3 months: ₦4,000
- Featured listing demo request: ₦1,000 placeholder; change this to your actual price before production.
