#!/usr/bin/env -S zsh -e

(
  cd /home/pi/remote-ac-controller
  source /home/pi/.zshrc
  source /home/pi/remote-ac-controller/venv/activate
  git pull
  pip install -r requirements.txt
  npm install --omit=dev

  python manage.py migrate
  python manage.py collectstatic --noinput

  npm run build

  sudo systemctl restart ac-remote-*
)
