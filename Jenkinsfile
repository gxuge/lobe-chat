pipeline {
    agent any

    environment {
        PROJECT_NAME = "tianshichat"
        COMPOSE_FILE = "docker-compose.yml"
        IMAGE_NAME = "lobe-chat:database"
        APP_PORT = "3210"
        DOCKER_BUILDKIT = "1"
    }

    options {
        // 保留最近 10 次构建记录
        buildDiscarder(logRotator(numToKeepStr: '10'))
        // 禁止并发构建
        disableConcurrentBuilds()
        // 超时设置
        timeout(time: 30, unit: 'MINUTES')
    }

    stages {
        stage('Checkout') {
            steps {
                echo '📥 拉取代码...'
                checkout scm
                script {
                    // 获取 Git 提交信息用于构建标识
                    env.GIT_COMMIT_SHORT = sh(
                        script: "git rev-parse --short HEAD",
                        returnStdout: true
                    ).trim()
                    env.BUILD_TAG = "${env.BUILD_NUMBER}-${env.GIT_COMMIT_SHORT}"
                }
            }
        }

        stage('Environment Check') {
            steps {
                echo '🔍 检查环境...'
                sh '''
                    echo "Docker 版本:"
                    docker --version
                    echo "Docker Compose 版本:"
                    docker compose version
                    echo "当前工作目录:"
                    pwd
                    echo "检查 docker-compose.yml 文件:"
                    ls -lh ${COMPOSE_FILE}
                '''
            }
        }

        stage('Stop Old Containers') {
            steps {
                echo '🛑 停止旧容器...'
                sh '''
                    if docker compose -f ${COMPOSE_FILE} ps -q | grep -q .; then
                        echo "发现运行中的容器，正在停止..."
                        docker compose -f ${COMPOSE_FILE} down
                    else
                        echo "没有运行中的容器"
                    fi
                '''
            }
        }

        stage('Clean Old Images') {
            steps {
                echo '🧹 清理旧镜像...'
                sh '''
                    # 清理悬空镜像
                    docker image prune -f || true
                    # 可选：清理未使用的镜像（谨慎使用）
                    # docker image prune -a -f --filter "until=24h" || true
                '''
            }
        }

        stage('Build & Start') {
            steps {
                echo '🏗️ 构建并启动服务...'
                sh '''
                    # 使用 docker compose up -d 构建镜像并启动容器
                    docker compose -f ${COMPOSE_FILE} up -d --build
                '''
            }
        }

        stage('Health Check') {
            steps {
                echo '🏥 健康检查...'
                script {
                    def maxRetries = 12
                    def retryInterval = 10
                    def success = false

                    for (int i = 1; i <= maxRetries; i++) {
                        try {
                            sh '''
                                # 检查容器是否运行
                                if ! docker compose -f ${COMPOSE_FILE} ps | grep -q "Up"; then
                                    echo "容器未运行"
                                    exit 1
                                fi

                                # 检查应用是否响应
                                if ! curl -f -s http://localhost:${APP_PORT} > /dev/null; then
                                    echo "应用未响应"
                                    exit 1
                                fi

                                echo "✅ 服务健康检查通过"
                            '''
                            success = true
                            break
                        } catch (Exception e) {
                            if (i < maxRetries) {
                                echo "⏳ 第 ${i} 次检查失败，${retryInterval}秒后重试..."
                                sleep(retryInterval)
                            } else {
                                error "❌ 健康检查失败：服务未能在预期时间内启动"
                            }
                        }
                    }
                }
            }
        }

        stage('Display Info') {
            steps {
                echo '📊 显示部署信息...'
                sh '''
                    echo "=================================="
                    echo "🎉 部署完成！"
                    echo "=================================="
                    echo "项目名称: ${PROJECT_NAME}"
                    echo "构建标签: ${BUILD_TAG}"
                    echo "应用端口: ${APP_PORT}"
                    echo "访问地址: http://localhost:${APP_PORT}"
                    echo "=================================="
                    echo "运行中的容器:"
                    docker compose -f ${COMPOSE_FILE} ps
                    echo "=================================="
                    echo "容器日志（最近 20 行）:"
                    docker compose -f ${COMPOSE_FILE} logs --tail=20
                '''
            }
        }
    }

    post {
        success {
            echo '✅ 构建成功！'
            // 可以在这里添加通知，比如发送邮件、Slack、企业微信等
        }
        failure {
            echo '❌ 构建失败！'
            sh '''
                echo "查看容器日志以诊断问题:"
                docker compose -f ${COMPOSE_FILE} logs --tail=50 || true
            '''
            // 可以在这里添加失败通知
        }
        always {
            echo '🧹 清理工作区...'
            // 清理工作区（可选）
            // cleanWs()
        }
    }
}
