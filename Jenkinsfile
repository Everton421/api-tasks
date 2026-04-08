pipeline {
    agent any

    stages {
        stage('Build docker Image'){
            steps { 
                sh ' echo "Executando o docker build"'
            }
        }
           stage('Push docker Image'){
            steps { 
                sh ' echo "Executando o comando docker push "'
            }
        }
           stage(' Deploy no kubernetes'){
            steps { 
                sh ' echo "Executando o comando docker kubectl apply  "'
            }
        }
    }
}