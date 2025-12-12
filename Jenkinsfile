pipeline {
  agent any

  environment {
    DOCKER_NETWORK = "appnet"
  }

  stages {
    stage('Build Web App Image') {
      steps {
        script {
          docker.build("my-web-app", "-f Dockerfile.web .")
        }
      }
    }

    stage('Build Cypress Test Image') {
      steps {
        script {
          docker.build("my-cypress-tests", "-f Dockerfile.cypress .")
        }
      }
    }

    stage('Launch Server') {
      steps {
        script {
          // Create the network if not exists
          sh "docker network inspect ${DOCKER_NETWORK} >/dev/null 2>&1 || docker network create ${DOCKER_NETWORK}"

          // Run web service in background
          sh """
            docker run -d --rm \
              --name web \
              --network ${DOCKER_NETWORK} \
              my-web-app
          """

        }
      }
    }
  }

  post {
    always {
      script {
        // Cleanup containers + network
        sh "docker rm -f web || true"
        sh "docker network rm ${DOCKER_NETWORK} || true"
      }
    }
  }
}
