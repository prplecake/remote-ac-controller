#!/usr/bin/env -S zsh -e

(
  cd /home/pi/remote-ac-controller
  source /home/pi/.zshrc
  source /home/pi/remote-ac-controller/venv/bin/activate
  git pull
  pip install -r requirements.txt
  npm install --omit=dev
  npm run build
  python manage.py migrate
  python manage.py collectstatic --noinput

  sudo systemctl restart ac-remote-*
)
