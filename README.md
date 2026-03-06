<h1 align="center">Sixty Barbershop</h1>

# About
This web application is a combination of a company profile integrated with dynamic booking system and payment gateway.
This website displays information such as the services offered, the capsters who work at the shop, as well as the barbershop’s location and operating hours.

The main problem of the application is that services have various prices depending on each capster’s expertise and experience. 
To solve this, the system implements a dynamic pricing mechanism that allows different prices for the same service based on the selected capster.
In addition, the booking schedule is automatically adjusted according to the duration of each service to prevent overlapping appointments. 
Customers can make bookings by selecting a service and a capster, choosing an available date and time slot, and completing the payment through Midtrans integration.

On the admin panel, administrators can monitor booking schedules and manage service and capster data, including setting dynamic prices 
for each service and capster combination. Administrators can also disable services that are temporarily unavailable or deactivate
capsters who are on leave or no longer working.

# Features
🔒Authentication and Authorization <br>
🧑‍🤝‍🧑Multi User: User and Admin <br>
📱Responsive layout design

### Users
📄 Accessing information of the barbershop <br>
🖊️ Make an appoiment booking <br>
❌ Cancel a booking when booking and payment status are still pending <br>
💵 Making a payment via Midtrans <br>
🔒 Change account name or password <br>
🖌️ Switch theme mode (Light/Dark) <br>
📓 View active and booking history

### Admin
📄 Accessing information of the barbershop <br>
📘 Manage Service data (CRU) <br>
📘 Manage Capster data (CRU) <br>
📘 Manage dynamic pricing for each service and capster combination (CRU) <br>
📓 View active bookings and booking history with filtering by date or booking/payment status  <br>
💈 Control service and capster availability <br>
🔒 Change account name or password <br>
🖌️ Switch theme mode (Light/Dark) <br>

# Get Started
### Requirement
- PHP 8.1
- Composer
- MySQL
- Node.JS >= 16
- NPM

### Instalation
- Install PHP dependencies
```
composer install
```
- Install frontend dependencies
```
npm install
```
- Install Tailwind
```
npm install tailwindcss @tailwindcss/vite
```
- Generate Application key
```
php artisan key:generate
```
- Database configuration
- - Create a new database
  - Open .env file and configure
    ```
    DB_DATABASE=your_database_name
    DB_USERNAME=your_username
    DB_PASSWORD=your_password
    ```
  - Run migration:
    ```
    php artisan migrate
    ```

- Storage configuration
```
php artisan storage:link
```
- How to run:
```
npm run dev
php artisan serve
```

# Contribution
Feel free to report bugs or suggesting new features into the app.
Thank you for helping me to improve Sixty Barbershop 🔥

