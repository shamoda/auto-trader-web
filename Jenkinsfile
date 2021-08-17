pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                echo 'Building deployable artifact'
                sh "sudo npm install"
                sh "sudo npm run build"
                archiveArtifacts artifacts: 'build'
            }
        }
    }
}