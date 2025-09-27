pipeline {
  agent any

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Run Cypress Tests') {
      steps {
        sh 'docker-compose up --abort-on-container-exit --build'
      }
    }

    stage('Collect Results') {
      steps {
        junit 'ui-testing/results/test-results.xml'
      }
    }
  }

  post {
    always {
      archiveArtifacts artifacts: 'ui-testing/videos/**/*, ui-testing/screenshots/**/*', allowEmptyArchive: true
      sh 'docker-compose down -v'
    }
  }
}
