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
        sh 'docker build -t $WEB_IMAGE -f Dockerfile.web .'
      }
    }

    stage('Build Cypress Image') {
      steps {
        sh 'docker build -t $CYPRESS_IMAGE -f Dockerfile.cypress .'
      }
    }

    stage('Create Docker Network') {
      steps {
        sh 'docker network inspect $DOCKER_NETWORK >/dev/null 2>&1 || docker network create $DOCKER_NETWORK'
      }
    }

    stage('Launch Web Server') {
      steps {
        sh '''
          docker run -d --rm \
            --name web \
            --network $DOCKER_NETWORK \
            $WEB_IMAGE
        '''
      }
    }

    stage('Wait for Backend Health') {
      steps {
        sh '''
          docker run --rm \
            --network $DOCKER_NETWORK \
            curlimages/curl:8.6.0 \
            sh -c '
              for i in $(seq 1 30); do
                curl -sf http://web:3001/health && exit 0
                echo "Waiting for backend..."
                sleep 5
              done
              echo "Backend never became ready"
              exit 1
            '
        '''
      }
    }

	stage('Run Cypress Tests') {
	  steps {
		sh '''
		  docker run --rm \
			--network appnet \
			-e CYPRESS_baseUrl=http://web:3000 \
			-e CYPRESS_apiUrl=http://web:3001 \
			my-cypress-tests
		'''
	  }
	}

  }

  post {
    always {
      sh 'docker rm -f web || true'
      sh 'docker network rm $DOCKER_NETWORK || true'
    }
  }
}
