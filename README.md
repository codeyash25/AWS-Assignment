# A. Deploy Your Flask Backend and Express Frontend on a Single Amazon EC2 Instance

## Solution

### Deployment Steps ->

1. Launch an Ubuntu EC2 instance.
2. Configure the Security Group to allow ports **22 (SSH)**, **8000 (Backend)**, and **3000 (Frontend)**.
3. Connect to the EC2 instance using SSH.
4. Install Python, Node.js, and the required project dependencies.
5. Copy the project files to the EC2 instance.
6. Start the Flask backend application.
7. Start the Express frontend application.
8. Verify that both applications are accessible through the EC2 public IP.

### Commands Used ->

```bash
# Copy Project
scp -i <your-key>.pem -r <project-folder> ubuntu@<ec2-public-dns>:~/folder

# Start Backend
cd backend
source venv/bin/activate
nohup python app.py > backend.log 2>&1 &

# Start Frontend
cd ../frontend
nohup node app.js > frontend.log 2>&1 &
```

### Public URLs ->

Backend API : http://15.206.81.122:8000/api

Frontend : http://15.206.81.122:3000/

---

# B. Deploy Your Flask Backend and Express Frontend on Separate Amazon EC2 Instances

## Solution

### Deployment Steps ->

1. Launch two Ubuntu EC2 instances (one for the Backend and one for the Frontend).
2. Configure the Security Groups to allow the required ports.
3. Connect to both EC2 instances using SSH.
4. Copy the backend project to the Backend EC2 instance.
5. Install Python, create a virtual environment, and install the backend dependencies.
6. Start the Flask backend application.
7. Copy the frontend project to the Frontend EC2 instance.
8. Install Node.js and the frontend dependencies.
9. Update the backend API URL in the frontend application using the Backend EC2 public IP.
10. Start the Express frontend application.
11. Verify that the frontend communicates successfully with the backend.

### Commands Used ->

#### Backend EC2

```bash
scp -i backend-aws.pem -r backend ubuntu@<backend-ec2-public-dns>:~/BackEnd

cd BackEnd
source venv/bin/activate
nohup python app.py > backend.log 2>&1 &
```

#### Frontend EC2

```bash
scp -i frontend_aws.pem -r frontend ubuntu@<frontend-ec2-public-dns>:~/FrontEnd

cd FrontEnd
export BACKEND_URL=http://13.127.237.6:8000/api
nohup node app.js > frontend.log 2>&1 &
```

### Public URLs ->

Backend API : http://13.127.237.6:8000/api

Frontend : http://13.203.229.212:3000/

---

# C. Deploy Your Flask Backend and Express Frontend Docker Containers Using AWS ECR, ECS, and VPC

## Solution

### Deployment Steps ->

1. Create Dockerfiles for the Flask backend and Express frontend.
2. Build Docker images for both applications.
3. Create separate Amazon ECR repositories for the backend and frontend.
4. Authenticate Docker with Amazon ECR.
5. Tag and push the Docker images to their respective ECR repositories.
6. Create an Amazon ECS Cluster.
7. Create Task Definitions for the backend and frontend containers.
8. Configure CPU, Memory, Port Mapping, CloudWatch Logs, and the Task Execution Role.
9. Create ECS Services for the task definitions.
10. Configure the VPC, Subnets, Security Groups, and assign a Public IP.
11. Deploy the ECS Services and wait until the tasks are in the **RUNNING** state.
12. Verify that both the backend API and frontend application are accessible.

### Commands Used ->

```bash
# Build Docker Images
docker build -t backend .
docker build -t frontend .

# Login to Amazon ECR
aws ecr get-login-password --region ap-south-1 | docker login --username AWS --password-stdin <ACCOUNT_ID>.dkr.ecr.ap-south-1.amazonaws.com

# Tag Docker Images
docker tag backend:latest <ACCOUNT_ID>.dkr.ecr.ap-south-1.amazonaws.com/backend:latest
docker tag frontend:latest <ACCOUNT_ID>.dkr.ecr.ap-south-1.amazonaws.com/frontend:latest

# Push Docker Images
docker push <ACCOUNT_ID>.dkr.ecr.ap-south-1.amazonaws.com/backend:latest
docker push <ACCOUNT_ID>.dkr.ecr.ap-south-1.amazonaws.com/frontend:latest
```

### AWS Services Used ->

- Amazon EC2
- Amazon ECR
- Amazon ECS
- Amazon VPC
- Amazon CloudWatch Logs
- IAM Roles
- Security Groups

### Public URLs ->

Backend API : http://43.205.134.26:8000/api

Frontend : http://43.205.134.26:3000/
