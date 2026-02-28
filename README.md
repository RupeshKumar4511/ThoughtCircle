# ThoughtCircle 
A social media web application that brings together my frontend and backend skills into one complete product.

#  Key Features
✅ Sign up securely with email verification (via OTP) and log in with authentication using JSON Web Tokens (JWT)
<br>
✅ Role based Access
<br>
✅ Create, edit, and delete users' own posts
<br>
✅ Like or dislike other users' posts
<br>
✅ Search and explore users' content effortlessly

# Backend API :
All Backend API and API documentation are : 
<br> 
<strong> In the "./server" directory.</strong>

# Scalability Note : 
<a href="./Scalability-note.md">Scalability-note</a>

# How to write Efficient, Scalable and Secure Backend API : 
<b>For Efficiency & Scalability : </b>
<br>
1. Proper structure of API endpoints(Versioning) e.g : "api/v1/users" to maintain backward compatibility. 
<br>
2. Follow Clean Architecture (Controllers, Services, Middlwares, routes) to keep code modular and maintainable.
<br>
3. Efficient Database Design (Use indexing, primary and foreign keys and normalization)
<br> 
4. Use optimized Query
<br> 
5. Implement caching using redis
<br>
6. Use pagination and filtering to prevent memory overflow and slow response times.
<br>
7. Use of Message service like kafka for heavy tasks.
<br>
8. Use Database Connection pooling to avoid a new connection for every request.
<br>
9. Make API stateless
<br>
10. Implement Error Handling.


<b>For Security : </b>
<br>
1. Input Validation and Sanitization 
<br>
2. Use Hashing to secure sensitive data
<br> 
3. Use JWT for secure authentication
<br>
4. Implement role based access
<br> 
5. Implement ratelimiting for non-idempotent request(POST,PUT,DELETE)
<br>
6. Use environment variables to store secrets.
<br>
7. Use CORS middleware.
<br>
8. Use helmet middlware to set security-related HTTP headers.
<br>
9. Implement logging and monitoring.
<br>
10. Enable HTTPS (SSL/TLS)

# Live Project Link : 
Deployed on Render.
<br>
https://thoughtcircle-frontend.onrender.com
