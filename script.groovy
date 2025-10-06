def checkoutCode() {
    checkout scm
    echo "Checked out source code"
}

def buildAndPushDockerImages() {
    withCredentials([usernamePassword(credentialsId: "docker-hub", usernameVariable: "DOCKER_USER",
    passwordVariable: "DOCKER_PASS")]) {
        sh "echo \$DOCKER_PASS | docker login -u \$DOCKER_USER --password-stdin"
        def services = ["user-service", "product-service", "order-service", "payment-service", "frontend", "gateway"]
        services.each { svc ->
            echo "Building and pushing image for: ${svc}"
            sh "docker build -t ${DOCKER_HUB_USER}/energy-${svc}:${IMAGE_TAG} ./${svc}"
            sh "docker push ${DOCKER_HUB_USER}/energy-${svc}:${IMAGE_TAG}"
        }
    }
}

def deployToKubernetes() {
    echo "Deploying all Kubernetes manifests from ${K8S_PATH}/"
    sh "kubectl apply -f ${K8S_PATH}/"
    echo "Deployment completed successfully"
}

def verifyDeployment() {
    echo "Verifying deployment..."
    sh "kubectl get pods"
    sh "kubectl get services"
}

return this