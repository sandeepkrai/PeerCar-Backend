# Backend Repository for Peer-to-Peer Car Rental Application 

This repository contains the code for the backend system of a peer-to-peer car rental application. The backend is implemented using Node.js and provides an efficient API layer for user authentication, car management, reservations, and secure payments.


## Features

<li>Developed backend system using Node.js, providing a robust and scalable API layer for the car rental application.</li><li>User authentication: Implements secure user registration and login functionalities, ensuring the privacy and security of user information.</li><li>Car management: Allows users to list their cars for rent, update car details, and manage availability.</li><li>Reservations: Handles the reservation process, including checking car availability, calculating rental fees, and confirming bookings.</li><li>Secure payments: Integrates a secure payment gateway to facilitate online transactions between car owners and renters.</li><li>MySQL database: Utilizes MySQL for structured data storage and retrieval, ensuring effective organization of user profiles, car details, reservations, and transactions.</li>


## Setup Instructions

To set up the development environment and run the backend system locally, follow these steps:
<p>Clone this repository to your local machine.</p><pre><div class="bg-black rounded-md mb-4"><div class="p-4 overflow-y-auto"><code class="!whitespace-pre hljs language-bash">git <span class="hljs-built_in">clone</span> [https://github.com/username/backend-repo.git](https://github.com/sandeepkrai/PeerCar-Backend)
</code></div></div></pre><p>Install the required Node.js packages. Navigate to the cloned repository's directory and run the following command:</p><pre><div class="bg-black rounded-md mb-4"><div class="flex items-center relative text-gray-200 bg-gray-800 px-4 py-2 text-xs font-sans justify-between rounded-t-md"></div><div class="p-4 overflow-y-auto"><code class="!whitespace-pre hljs">npm install
</code></div></div></pre><p>Set up the MySQL database. Ensure you have MySQL installed and create a new database for the project. Update the MySQL connection details in the configuration file located at <code>config.js</code>.</p><p>Run the backend server. In the repository's directory, execute the following command:</p><pre><div class="bg-black rounded-md mb-4"><div class="flex items-center relative text-gray-200 bg-gray-800 px-4 py-2 text-xs font-sans justify-between rounded-t-md"><span>sql</span></div><div class="p-4 overflow-y-auto"><code class="!whitespace-pre hljs language-sql">npm <span class="hljs-keyword">start</span>
</code></div></div></pre><p>The backend server should now be up and running on the specified port. You can test the API endpoints using tools like Postman or by integrating it with the frontend application.</p>


## Contributions

Contributions to this project are welcome. If you find any bugs or have suggestions for improvement, please feel free to open an issue or submit a pull request.


## License

This project is licensed under the <a href="LICENSE" target="_new">MIT License</a>. Feel free to use and modify the code according to your needs.
