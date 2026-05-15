Deployment templates and scripts for EC2 (Ubuntu) — edit placeholders before use.

Templates:
- systemd/*.template: unit files for Gunicorn, Daphne, Celery worker and beat.
- nginx/gigpulse.conf.template: Nginx site template; replace {{SERVER_NAME}}, {{STATIC_ROOT}}, {{MEDIA_ROOT}}.

Quick usage (on EC2 instance):
1. Clone repository to the deploy user home.
2. Edit `deployment/scripts/deploy_ec2.sh` to set APP_PATH, VENV_PATH, DEPLOY_USER.
3. Run the script as the deploy user: `bash deployment/scripts/deploy_ec2.sh`

Notes:
- These are templates and examples; adapt for your environment and security policies.
- Ensure `SECRET_KEY`, database and storage credentials are provided via environment or systemd EnvironmentFile.
