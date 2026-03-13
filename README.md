# Java RMI Calculator - Distributed Computing Demo

A full-stack distributed calculator application demonstrating Java RMI (Remote Method Invocation) with Spring Boot backend, PostgreSQL database, and React frontend with Tailwind CSS.

## Architecture Overview

This project demonstrates the use of Java RMI for distributed computing:

```
React Frontend (Port 3000)
    ?
Spring Boot REST API (Port 8080)
    ?
Java RMI Server (Port 1099)
    ?
PostgreSQL Database (Supabase)
```

### How RMI Works in This Project

1. **RMI Interface** (`CalculatorRMI.java`): Defines remote methods (add, subtract, multiply, divide)
2. **RMI Implementation** (`CalculatorRMIImpl.java`): Extends `UnicastRemoteObject` and implements the interface
3. **RMI Registry**: Spring Boot starts an RMI registry on port 1099 and binds the calculator service
4. **Client Invocation**: Service layer looks up the RMI registry and invokes remote methods
5. **Distribution**: Methods execute on the RMI server and results are returned to the client

## Technology Stack

### Backend
- **Java 17**: Programming language
- **Spring Boot 3.2**: Application framework
- **Java RMI**: Remote Method Invocation for distributed computing
- **Spring Data JPA**: Database access layer
- **PostgreSQL**: Database (via Supabase)
- **Maven**: Build tool

### Frontend
- **React 18**: UI library
- **Tailwind CSS**: Styling framework
- **Vite**: Build tool
- **Lucide React**: Icons

### Database
- **PostgreSQL**: Primary database
- **Supabase**: Database hosting

## Project Structure

```
.
+-- backend/                      # Spring Boot Backend
¦   +-- src/main/java/com/rmi/calculator/
¦   ¦   +-- rmi/                 # RMI Interface & Implementation
¦   ¦   ¦   +-- CalculatorRMI.java
¦   ¦   ¦   +-- CalculatorRMIImpl.java
¦   ¦   +-- config/              # RMI Server Configuration
¦   ¦   +-- controller/          # REST Controllers
¦   ¦   +-- service/             # Business Logic
¦   ¦   +-- entity/              # JPA Entities
¦   ¦   +-- repository/          # Data Access Layer
¦   ¦   +-- dto/                 # Data Transfer Objects
¦   +-- pom.xml                  # Maven configuration
+-- src/                         # React Frontend
¦   +-- components/              # React Components
¦   ¦   +-- Calculator.jsx
¦   ¦   +-- HistoryPanel.jsx
¦   ¦   +-- InfoPanel.jsx
¦   +-- services/               # API Services
¦   +-- App.jsx                 # Main App Component
+-- Dockerfile                   # Docker configuration
+-- docker-compose.yml          # Docker Compose setup
+-- README.md                   # This file
```

## Prerequisites

### For Local Development
- Java 17 or higher
- Maven 3.6+
- Node.js 18+
- PostgreSQL (or use Supabase)

### For Docker Deployment
- Docker
- Docker Compose

## Setup Instructions

### 1. Database Setup

The database is already configured with Supabase. The migration creates:
- `calculator_operations` table with columns for storing calculation history
- Row Level Security (RLS) policies
- Indexes for performance

### 2. Backend Setup

```bash
cd backend

# Build the project
mvn clean install

# Run the application
mvn spring-boot:run
```

The backend will start on:
- REST API: `http://localhost:8080`
- RMI Registry: Port `1099`

### 3. Frontend Setup

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

The frontend will start on `http://localhost:3000`

## Running with Docker

### Build and Run

```bash
# Build the Docker image
docker-compose build

# Start all services
docker-compose up

# Run in detached mode
docker-compose up -d

# Stop services
docker-compose down
```

## AWS Deployment Guide

### Option 1: EC2 Deployment

1. **Launch EC2 Instance**
   - Choose Amazon Linux 2 or Ubuntu
   - Instance type: t2.medium or higher
   - Configure security group:
     - Port 22 (SSH)
     - Port 80 (HTTP)
     - Port 443 (HTTPS)
     - Port 8080 (Spring Boot)
     - Port 1099 (RMI)
     - Port 3000 (React dev server, optional)

2. **Install Dependencies**
   ```bash
   # Update system
   sudo yum update -y  # For Amazon Linux
   # OR
   sudo apt update && sudo apt upgrade -y  # For Ubuntu

   # Install Docker
   sudo yum install docker -y
   sudo service docker start
   sudo usermod -a -G docker ec2-user

   # Install Docker Compose
   sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
   sudo chmod +x /usr/local/bin/docker-compose
   ```

3. **Deploy Application**
   ```bash
   # Clone your repository
   git clone <your-repo-url>
   cd calculator-rmi

   # Set environment variables
   export SPRING_DATASOURCE_URL=<your-db-url>
   export SPRING_DATASOURCE_USERNAME=<your-db-username>
   export SPRING_DATASOURCE_PASSWORD=<your-db-password>

   # Build and run
   docker-compose up -d
   ```

4. **Configure Nginx (Optional)**
   ```bash
   sudo yum install nginx -y
   # Configure nginx to proxy to port 8080
   ```

### Option 2: ECS Deployment

1. Create ECR repository
2. Push Docker image to ECR
3. Create ECS task definition
4. Create ECS service
5. Configure Application Load Balancer

### Option 3: Elastic Beanstalk

1. Create `.ebextensions` folder with configuration
2. Use EB CLI to deploy:
   ```bash
   eb init
   eb create
   eb deploy
   ```

## API Endpoints

### Calculator API

- **POST** `/api/calculator/calculate`
  ```json
  {
    "operand1": 10,
    "operand2": 5,
    "operation": "ADD"
  }
  ```
  Operations: `ADD`, `SUBTRACT`, `MULTIPLY`, `DIVIDE`

- **GET** `/api/calculator/history`
  - Returns last 20 calculations

- **GET** `/api/calculator/health`
  - Health check endpoint

## Features

### RMI Implementation
- Remote method invocation for calculator operations
- RMI registry management with Spring Boot
- Distributed computing demonstration
- Automatic service binding and lookup

### Calculator Features
- Basic arithmetic operations (add, subtract, multiply, divide)
- Real-time calculation using RMI
- Operation history tracking
- Error handling for invalid operations

### Database Features
- PostgreSQL with Supabase
- Automatic operation logging
- History retrieval
- Row Level Security (RLS)

### UI Features
- Modern, responsive design
- Real-time calculation feedback
- Operation history display
- Architecture information panel
- Server status monitoring

## Configuration

### Backend Configuration (`application.properties`)

```properties
# Server
server.port=8080

# Database
spring.datasource.url=<your-supabase-url>
spring.datasource.username=<your-username>
spring.datasource.password=<your-password>

# RMI
rmi.port=1099
rmi.service.name=CalculatorService
```

### Frontend Configuration

Create `.env` file:
```
VITE_API_URL=http://localhost:8080/api
VITE_SUPABASE_URL=<your-supabase-url>
VITE_SUPABASE_ANON_KEY=<your-anon-key>
```

## Testing

### Test RMI Server
```bash
# Check if RMI registry is running
netstat -an | grep 1099

# Test REST API
curl http://localhost:8080/api/calculator/health
```

### Test Calculator
```bash
curl -X POST http://localhost:8080/api/calculator/calculate \
  -H "Content-Type: application/json" \
  -d '{"operand1": 10, "operand2": 5, "operation": "ADD"}'
```

## Troubleshooting

### RMI Connection Issues
- Ensure port 1099 is open in firewall
- Check `java.rmi.server.hostname` is set correctly
- Verify RMI registry is bound properly

### Database Connection Issues
- Verify database credentials
- Check network connectivity to Supabase
- Ensure SSL is properly configured

### CORS Issues
- Check CORS configuration in Spring Boot
- Verify allowed origins include your frontend URL

## Security Considerations

1. **RMI Security**
   - Use security manager for production
   - Implement authentication for RMI calls
   - Consider using SSL/TLS for RMI

2. **Database Security**
   - Use environment variables for credentials
   - Enable RLS policies
   - Regular security audits

3. **API Security**
   - Implement rate limiting
   - Add authentication/authorization
   - Use HTTPS in production

## Performance Optimization

1. **Database**
   - Connection pooling configured
   - Indexes on frequently queried columns
   - Query optimization

2. **RMI**
   - Connection reuse
   - Proper exception handling
   - Timeout configuration

3. **Frontend**
   - Code splitting
   - Lazy loading
   - Production build optimization

## Future Enhancements

- [ ] Add user authentication
- [ ] Implement advanced calculator functions (sin, cos, sqrt, etc.)
- [ ] Add calculation sharing feature
- [ ] Implement WebSocket for real-time updates
- [ ] Add unit and integration tests
- [ ] Implement caching layer
- [ ] Add monitoring and logging (ELK stack)
- [ ] Implement CI/CD pipeline

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.

## Contact

For questions or support, please open an issue in the repository.

## Acknowledgments

- Spring Boot team for the excellent framework
- React team for the powerful UI library
- Supabase for the database infrastructure
- Tailwind CSS for the styling framework
