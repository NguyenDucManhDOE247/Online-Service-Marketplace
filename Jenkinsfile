pipeline {
  agent any

  environment {
    DOCKER_HUB_USER = 'nguyenducmanh247'
    IMAGE_TAG = "latest"
    K8S_PATH = 'k8s'
  }

  stages {
    stage('Build & Push Docker Images') {
      steps {
        script {
          def services = ['user-service', 'product-service', 'order-service', 'payment-service', 'frontend', 'gateway']
          services.each { svc ->
            sh "docker build -t ${DOCKER_HUB_USER}/${svc}:${IMAGE_TAG} ${svc}"
            sh "docker push ${DOCKER_HUB_USER}/${svc}:${IMAGE_TAG}"
          }
        }
      }
    }

    stage('Deploy to Kubernetes') {
      steps {
        sh "kubectl apply -f ${K8S_PATH}/"
      }
    }
  }
}
