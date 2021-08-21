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
        stage('Deploying to Dev Env') {
            when {
                branch 'master'
            }
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
                                        remoteDirectory: '/tmp',
                                        execCommand: 'rm -rf /var/www/html/build; unzip /tmp/build.zip -d /var/www/html; rm /tmp/build.zip'
                                    )
                                ]
                            )
                        ]
                    )
                }
            }
        }
        stage('Deploying to Production') {
            when {
                branch 'master'
            }
            steps {
                input 'Does the Dev environment look OK?'
                milestone(1)
                withCredentials([usernamePassword(credentialsId: 'webserver_login', usernameVariable: 'USERNAME', passwordVariable: 'USERPASS')]) {
                    sshPublisher(
                        failOnError: true,
                        continueOnError: false,
                        publishers: [
                            sshPublisherDesc(
                                configName: 'production',
                                sshCredentials: [
                                    username: "$USERNAME",
                                    encryptedPassphrase: "$USERPASS"
                                ], 
                                transfers: [
                                    sshTransfer(
                                        sourceFiles: 'build.zip',
                                        remoteDirectory: '/tmp',
                                        execCommand: 'rm -rf /var/www/html/build; unzip /tmp/build.zip -d /var/www/html'
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