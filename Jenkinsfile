pipeline {
  agent any

  environment {
    DOCKER_NETWORK = "appnet"
    WEB_IMAGE = "my-web-app"
    CYPRESS_IMAGE = "my-cypress-tests"
  }

  stages {

    stage('Build Web App Image') {
      steps {
        script {
          docker.build(WEB_IMAGE, "-f Dockerfile.web .")
        }
      }
    }

    stage('Build Cypress Image') {
      steps {
        script {
          docker.build(CYPRESS_IMAGE, "-f Dockerfile.cypress .")
        }
      }
    }

    stage('Create Docker Network') {
      steps {
        sh """
          docker network inspect ${DOCKER_NETWORK} >/dev/null 2>&1 \
          || docker network create ${DOCKER_NETWORK}
        """
      }
    }

    stage('Launch Web Server') {
      steps {
        sh """
          docker run -d --rm \
            --name web \
            --network ${DOCKER_NETWORK} \
            ${WEB_IMAGE}
        """
      }
    }

    stage('Wait for Web App') {
      steps {
        sh """
          docker run --rm \
            --network ${DOCKER_NETWORK} \
            curlimages/curl:8.6.0 \
            sh -c 'until curl -s http://web:3000 > /dev/null; do echo "Waiting for web..."; sleep 5; done'
        """
      }
    }

    stage('Run Cypress Tests') {
      steps {
        sh """
          docker run --rm \
            --network ${DOCKER_NETWORK} \
            -e CYPRESS_baseUrl=http://web:3000 \
            ${CYPRESS_IMAGE}
        """
      }
    }
  }

  post {
    always {
      sh "docker rm -f web || true"
      sh "docker network rm ${DOCKER_NETWORK} || true"
    }
  }
}
