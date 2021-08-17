pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                echo 'Building deployable artifact'
                sh "sudo /root/.nvm/versions/node/v14.17.0/bin/npm install"
                sh "sudo /root/.nvm/versions/node/v14.17.0/bin/npm run build"
                archiveArtifacts artifacts: 'build'
            }
        }
    }
}