pipeline {
  agent any

  environment {
    DOCKER_NETWORK = "appnet"
  }

  stages {

    stage('Build Web App Image') {
      steps {
        sh 'docker build -t my-web-app -f Dockerfile.web .'
      }
    }

    stage('Build Cypress Image') {
      steps {
        sh 'docker build -t my-cypress-tests -f Dockerfile.cypress .'
      }
    }

    stage('Create Docker Network') {
      steps {
        sh 'docker network inspect appnet >/dev/null 2>&1 || docker network create appnet'
      }
    }

    stage('Launch Web Server') {
      steps {
        sh '''
          docker run -d --rm \
            --name web \
            --network appnet \
            my-web-app
        '''
      }
    }

    stage('Wait for Web Port') {
      steps {
        sh '''
          docker run --rm \
            --network appnet \
            busybox \
            sh -c '
              for i in $(seq 1 30); do
                nc -z web 3000 && exit 0
                sleep 5
              done
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
			-e API_URL=http://web:3001 \
			my-cypress-tests
		'''
	  }
	}


  post {
    always {
      sh 'docker rm -f web || true'
      sh 'docker network rm appnet || true'
    }
  }
 }
}