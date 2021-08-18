pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                echo 'Building deployable artifact'
                sh "npm install"
                sh "npm run build"
                sh "zip -r build.zip build/*"
                archiveArtifacts artifacts: 'build.zip'
            }
        }
        stage('FileTransfering') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'webserver_login', usernameVariable: 'USERNAME', passwordVariable: 'USERPASS')]) {
                    sshPublisher(
                        failOnError: true,
                        continueOnError: false,
                        publishers: [
                            sshPublisherDesc(
                                configName: 'development',
                                sshCredentials: [
                                    username: "$USERNAME",
                                    encryptedPassphrase: "$USERPASS"
                                ], 
                                transfers: [
                                    sshTransfer(
                                        sourceFiles: 'build.zip',
                                        remoteDirectory: '/tmp'
                                        execCommand: 'rm -r /var/www/html/build && unzip /tmp/build.zip -d /var/www/html && rm /tmp/build.zip'
                                    )
                                ]
                            )
                        ]
                    )
                }
            }
        }
    }
}