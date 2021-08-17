pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                echo 'Building deployable artifact'
                sh 'npm install; npm run build'
                archiveArtifacts artifacts: 'build'
            }
        }
    }
}