pipeline {
 agent any
 
 environment {
 PROJECT_NAME = "tianshichat"
 COMPOSE_FILE = "docker-compose.yml"
 IMAGE_NAME = "lobe-chat:database"
 APP_PORT = "3210"
 }
 
 stages {
 stage("Checkout") {
 steps {
 echo "拉取代码..."
 checkout scm
 }
 }
 }
}
