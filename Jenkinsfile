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

    stage('Run Tests') {
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

          // Run Cypress tests (waits for web:3000)
          sh """
            docker run --rm \
              --network ${DOCKER_NETWORK} \
              -e CYPRESS_baseUrl=http://web:3000 \
              my-cypress-tests
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
