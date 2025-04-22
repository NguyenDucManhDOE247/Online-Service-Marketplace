pipeline {
  agent any

  environment {
    DOCKER_HUB_USER = 'nguyenducmanh247'
    IMAGE_TAG = 'latest'
    K8S_PATH = 'k8s'
  }

  stages {
    stage('Build & Push Docker Images') {
      steps {
        script {
          def services = ['user-service', 'product-service', 'order-service', 'payment-service', 'frontend', 'gateway']
          for (svc in services) {
            echo "🔧 Building and pushing image for: ${svc}"
            sh """
              docker build -t ${DOCKER_HUB_USER}/${svc}:${IMAGE_TAG} ${svc}
              docker push ${DOCKER_HUB_USER}/${svc}:${IMAGE_TAG}
            """
          }
        }
      }
    }

    stage('Deploy to Kubernetes') {
      steps {
        echo "🚀 Deploying all Kubernetes manifests from ${K8S_PATH}/"
        sh "kubectl apply -f ${K8S_PATH}/"
      }
    }
  }
}
