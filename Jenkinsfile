pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                echo 'Building deployable artifact'
                sh "npm install"
                sh "npm run build"
                archiveArtifacts artifacts: 'build/*'
            }
        }
    }
}