#!/usr/bin/env bash
# Example deployment script for EC2 (Ubuntu). Edit variables before use.

APP_PATH={{APP_PATH}}
VENV_PATH={{VENV_PATH}}
DEPLOY_USER={{DEPLOY_USER}}
NGINX_CONF=/etc/nginx/sites-available/gigpulse
SYSTEMD_DIR=/etc/systemd/system

set -euo pipefail

echo "Installing system packages..."
sudo apt update
sudo apt install -y python3-venv python3-pip nginx git build-essential

echo "Creating venv and installing requirements..."
python3 -m venv "$VENV_PATH"
source "$VENV_PATH/bin/activate"
pip install -U pip
pip install -r "$APP_PATH/requirements/production.txt"

echo "Collecting static files..."
cd "$APP_PATH"
source "$VENV_PATH/bin/activate"
python manage.py collectstatic --noinput

echo "Installing systemd units and nginx config..."
sudo cp "$APP_PATH/deployment/systemd/gunicorn.service.template" "$SYSTEMD_DIR/gunicorn.service"
sudo cp "$APP_PATH/deployment/systemd/daphne.service.template" "$SYSTEMD_DIR/daphne.service"
sudo cp "$APP_PATH/deployment/systemd/celery.service.template" "$SYSTEMD_DIR/celery.service"
sudo cp "$APP_PATH/deployment/systemd/celery-beat.service.template" "$SYSTEMD_DIR/celery-beat.service"

sudo systemctl daemon-reload
sudo systemctl enable --now gunicorn daphne celery celery-beat

sudo cp "$APP_PATH/deployment/nginx/gigpulse.conf.template" "$NGINX_CONF"
sudo ln -sf "$NGINX_CONF" /etc/nginx/sites-enabled/gigpulse
sudo nginx -t
sudo systemctl restart nginx

echo "Deployment completed (template-based)."
