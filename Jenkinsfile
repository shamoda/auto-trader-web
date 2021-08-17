pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                echo 'Building deployable artifact'
                sh 'git clone https://github.com/shamoda/auto-trader-web; npm install; npm run build'
                archiveArtifacts artifacts: 'build'
            }
        }
    }
}