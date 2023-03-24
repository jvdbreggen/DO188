FROM registry.ocp4.example.com:8443/ubi9/ubi:9.0.0-1468

ENV VERSION="1.16.8" \
    GITEA_WORK_DIR=/var/lib/gitea/ \
    GITEA_BIN_DIR=/usr/local/bin/ \
    GITEA_PORT="3030" \
    HOME="/opt/app-root"

# Download and deploy Gitea binary
RUN dnf install -y git && \
    curl "https://dl.gitea.io/gitea/${VERSION}/gitea-${VERSION}-linux-amd64" -o ${GITEA_BIN_DIR}/gitea && \
    chmod +x ${GITEA_BIN_DIR}/gitea

# Configure gitea to run as any user with the root group
# This is necessary when deploying on OpenShift
RUN mkdir -p /var/lib/gitea/{custom,data,log} && \
  mkdir /opt/app-root && \
  chgrp -R 0 /var/lib/gitea/ && \
  chmod -R g=u /var/lib/gitea/ && \
  mkdir /etc/gitea && \
  chgrp -R 0 /etc/gitea && \
  chgrp -R 0 /opt/app-root && \
  chmod -R g=u /etc/gitea && \
  chmod -R g=u /opt/app-root && \
  useradd  \
    --uid 1001 \
    --system \
    --gid 0 \
    --home-dir /opt/app-root \
    --shell /sbin/nologin \
    --comment "Default Application User" \
    default

USER 1001
WORKDIR /opt/app-root
EXPOSE ${GITEA_PORT}

CMD gitea --port ${GITEA_PORT}
