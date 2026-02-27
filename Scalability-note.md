#  SCALABILITY NOTES (Backend / Full-Stack Applications)


## HORIZONTAL SCALING
- Run multiple app instances instead of one powerful server
- Use a Load Balancer to distribute traffic

Users → Load Balancer → App Instance 1,
                          App Instance 2,
                          App Instance 3

Benefits:
- Handles high traffic
- Fault tolerance
- Zero-downtime deployments


## LOAD BALANCING
- Distributes traffic across multiple servers
- Performs health checks
- Removes unhealthy instances
- Works with auto-scaling

Common Strategies:
- Round Robin
- Least Connections
- IP Hash


## CACHING (Performance Booster)

### Application-Level Cache (Redis)
- Cache API responses
- Cache session data
- Cache frequent queries
- Reduces database load

Use Cases:
- Dashboard stats
- User profiles
- Product listings

### CDN Caching
- Cache static assets (images, CSS, JS)
- Reduces global latency
- Offloads origin server

### Database Query Caching
- Cache expensive DB queries
- Reduce repeated reads


## DATABASE SCALABILITY

### Vertical Scaling
- Increase CPU/RAM
- Simple but limited

### Horizontal Scaling
- Read Replicas (reads go to replicas)
- Primary handles writes
- Sharding (split data across DB servers)

Best Practice:
Writes → Primary DB
Reads → Replica DB


## MICROSERVICES ARCHITECTURE
- Split large app into independent services
- Example services:
  Auth Service,
  User Service,
  Payment Service,
  Notification Service

Benefits:
- Independent deployment
- Fault isolation
- Scale services independently

Tradeoffs:
- Increased complexity
- Requires inter-service communication (REST/gRPC/Message Queue)


### STATELESS ARCHITECTURE
- Do NOT store sessions in memory
- Store sessions in Redis or Database
- Any instance can handle any request
- Required for proper horizontal scaling


### ASYNCHRONOUS PROCESSING
- Offload heavy tasks to background workers

Examples:
- Email sending
- Image processing
- Report generation
- Payment confirmation

Use:
- Message queues
- Job queues

Benefit:
- Prevents blocking API response time


### AUTO SCALING
- Automatically add instances during traffic spikes
- Remove instances during low traffic
- Common in cloud environments


## MODERN SAAS SCALABLE STACK EXAMPLE
- Multiple App Instances (Docker containers)
- Load Balancer
- PostgreSQL (Primary + Read Replica)
- Redis (Caching + Sessions)
- CDN (Static assets)
- Background Worker Service
- Auto-scaling infrastructure

