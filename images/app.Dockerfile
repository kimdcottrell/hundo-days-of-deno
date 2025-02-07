# syntax=docker/dockerfile:1
FROM denoland/deno:2.1.9

# Prefer not to run as root.
ARG LOCAL_MACHINE_GID=${LOCAL_MACHINE_GID:-1000}
ARG LOCAL_MACHINE_UID=${LOCAL_MACHINE_UID:-1000}
RUN usermod -u ${LOCAL_MACHINE_UID} -o deno && groupmod -g ${LOCAL_MACHINE_GID} -o deno

# install python
RUN apt-get -y update; \ 
    apt-get install -y --no-install-recommends python3 python3-pip; \
    apt-get clean; \
    rm -rf /var/lib/apt/lists/*; \
    python3 -m pip config set global.break-system-packages true;


# fix all the permissions issues for deno
RUN mkdir -p /home/deno /app /home/.deno/bin; \
    chown -R deno:deno /home; \
    chown -R deno:deno /app; \
    chown -R deno:deno /deno-dir; 

USER deno

WORKDIR /app

# Cache the dependencies as a layer (the following two steps are re-run only when deps.ts is modified).
# Ideally cache deno.json will download and compile _all_ external files used in main.ts.
COPY deno.jsonc .

# Copy in any workspace referenced in deno.json
COPY src/typewriter/modules/markdown ./src/typewriter/modules/markdown
RUN --mount=type=cache,target=${DENO_DIR},uid=${LOCAL_MACHINE_UID},gid=${LOCAL_MACHINE_GID} \
    deno install

# These steps will be re-run upon each file change in your working directory:
COPY . .

WORKDIR /app/src

# Compile the main app so that it doesn't need to be compiled each startup/entry.
# RUN deno cache main.ts

# The port that your application listens to.
EXPOSE 1991

# ENV OTEL_DENO=1 
# ENV DENO_UNSTABLE_OTEL_DETERMINISTIC=1
# ENV OTEL_EXPORTER_OTLP_PROTOCOL="http/json"
# ENV OTEL_EXPORTER_OTLP_ENDPOINT="http://0.0.0.0:1991"
CMD ["serve", "--reload", "--unstable-otel", "--watch", "--allow-read", "--location", "http://0.0.0.0:1991", "--port", "1991", "--allow-env", "main.ts"]
# CMD ["run", "--reload", "--unstable-otel", "--watch", "--allow-read", "--location", "http://0.0.0.0:1991", "--allow-net", "--allow-env", "main.ts"]

