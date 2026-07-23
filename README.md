A. Deploy Your flask backend and express frontend in amazon single ec2 instance.
Solution :
Deployment Steps ->
1. Launch an Ubuntu EC2 instance.
2. Configure the Security Group to allow the required ports.
3. Connect to the instance using SSH.
4. Install Python, Node.js, and project dependencies.
5. Start the Flask backend.
6. Start the Express frontend.
7. Verify both applications are accessible.

Commands Used -> 
scp -i <your-key>.pem -r <project-folder> ubuntu@<ec2-public-dns>:~/folder
cd backend
source venv/bin/activate
nohup python app.py > backend.log 2>&1 &

cd ../frontend
nohup npm start > frontend.log 2>&1 &

Public URL
Backend API : http://15.206.81.122:8000/api

B. 
